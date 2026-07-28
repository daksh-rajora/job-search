import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user) {
      if (user.role === 'recruiter') {
        navigate('/admin/companies');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        dispatch(setUser(res.data.user));
        if (res.data.user.role === "recruiter") {
          navigate("/admin/companies");
        } else {
          navigate("/");
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-sm border border-gray-200 rounded-xl p-6 shadow-sm bg-white"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

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
            <RadioGroup value={input.role} onValueChange={(value) => setInput({ ...input, role: value })} className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="r1" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="r2" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
