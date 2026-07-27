import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialogue from "./UpdateProfileDialogue";
import { useSelector } from "react-redux";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  useGetAppliedJob()
  const [open,setOpen] = useState(false)
  const {user} = useSelector(store=>store.auth)
  const isResume = !!user?.profile?.resume;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-8 mx-4 md:mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto || "https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/3:2/w_2560%2Cc_limit/google-logo.jpg"} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-gray-600 mt-1 max-w-md">
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2" variant="outline">
            <Pen className="h-4 w-4" />
            <span className="sm:hidden">Edit Profile</span>
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-gray-700">
            <Mail className="h-5 w-5 text-gray-500" />
            <span className="text-sm md:text-base">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-gray-700">
            <Contact className="h-5 w-5 text-gray-500" />
            <span className="text-sm md:text-base">{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-semibold text-gray-800 mb-2">Skills</h1>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user?.profile?.skills?.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span className="text-gray-500 text-sm">No Skills Found</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold text-gray-850">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer text-sm md:text-base"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500 text-sm">NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl px-4 md:px-0 my-5">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialogue open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
