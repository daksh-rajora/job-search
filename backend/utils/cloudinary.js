import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.CLOUDINARY_URL;
if (url) {
    const matches = url.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
    if (matches) {
        cloudinary.config({
            api_key: matches[1],
            api_secret: matches[2],
            cloud_name: matches[3]
        });
    }
} else {
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    })
}
export default cloudinary