import {User} from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req,res) => {
    try {
        const {fullname, email, password, phoneNumber, role} = req.body;
        if(!fullname || !email || !phoneNumber || !role || !password){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const file = req.file;
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto"
            });
        }
        const user = await User.findOne({email});
        if (user){
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse ? cloudResponse.secure_url : ""
            }
        });
        return res.status(201).json({
            message:"Account created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        //check role is correct or not
        if(role !== user.role){
            return res.status(400).json({
                message: "User not found with this role",
                success: false
            })
        }
        
        const tokenData = {
            userId: user._id,
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'})

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        } 
        const cookieOptions = {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
            secure: process.env.NODE_ENV === 'development' ? false : true
        };

        return res.status(200).cookie("token", token, cookieOptions).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
            secure: process.env.NODE_ENV === 'development' ? false : true
        }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const updateProfile = async (req,res) =>{
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        
        const file = req.files?.['file']?.[0];
        const profilePhoto = req.files?.['profilePhoto']?.[0];

        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto"
            });
        }

        let profilePhotoCloudResponse;
        if (profilePhoto) {
            const fileUri = getDataUri(profilePhoto);
            profilePhotoCloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto"
            });
        }

        let skillsArray;
        if (skills){
          skillsArray = skills.split(",").map(s => s.trim()).filter(Boolean);
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        // Null safety for profile subdocument
        if (!user.profile) user.profile = {};

        // Update basic fields
        if (fullname) user.fullname = fullname;
        if (phoneNumber) user.phoneNumber = Number(phoneNumber);
        if (skills) user.profile.skills = skillsArray;
        if (bio) user.profile.bio = bio;

        // Only update email if it changed (avoid unnecessary unique index check)
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email, _id: { $ne: userId } });
            if (emailExists) {
                return res.status(400).json({
                    message: "This email is already in use by another account.",
                    success: false
                });
            }
            user.email = email;
        }

        // Resume
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        // Profile photo
        if(profilePhotoCloudResponse){
            user.profile.profilePhoto = profilePhotoCloudResponse.secure_url;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log("updateProfile error:", error);
        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email already exists. Please use a different email.",
                success: false
            });
        }
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}
