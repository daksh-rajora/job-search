import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const navigate = useNavigate()
  const {loading} = useSelector(store=>store.auth)
  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if(input.file){
        formData.append("file", input.file)
    }
    try {
        dispatch(setLoading(true))
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
        if(res.data.success){
            navigate("/login")
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occurred");
    }finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex my-23 items-center justify-center max-w-4xl  mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-3 ">
            <Label className="my-1">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter Name"
            />
          </div>
          <div className="my-3">
            <Label className="my-1">Email</Label>
            <Input
              type="text"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
              placeholder="email@gmail.com"
            />
          </div>
          <div className="my-3">
            <Label className="my-1">Phone Number</Label>
            <Input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter Number"
            />
          </div>
          <div className="my-3">
            <Label className="my-1">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer   "
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                  className="cursor-pointer   "
                />
                <Label htmlFor="r1">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                onChange={changeFileHandler}
                accept="image/*"
                className="cursor-pointer"
              />
            </div>
          </div>
          {
            loading ? <Button className='w-full my-4'><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait </Button> :<Button type="submit" className="w-full my-4">
            signup
          </Button>
          }
          
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
