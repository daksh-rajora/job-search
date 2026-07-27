import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <Link to={user && user.role === "recruiter" ? "/admin/companies" : "/"}>
            <h1 className="text-2xl font-bold">
              Job <span className="text-[#F83002]">Portal</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-[#6A38C2] transition-colors">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-[#6A38C2] transition-colors">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#6A38C2] transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#6A38C2] transition-colors">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-[#6A38C2] transition-colors">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@profile"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Navigation Header Items */}
        <div className="flex md:hidden items-center gap-4">
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@profile"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none p-1 rounded-md hover:bg-gray-100"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col font-medium gap-4">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-gray-700 hover:text-[#6A38C2] transition-colors"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-gray-700 hover:text-[#6A38C2] transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-gray-700 hover:text-[#6A38C2] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-gray-700 hover:text-[#6A38C2] transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-gray-700 hover:text-[#6A38C2] transition-colors"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user && (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
