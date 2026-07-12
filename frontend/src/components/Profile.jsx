import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center  gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/3:2/w_2560%2Cc_limit/google-logo.jpg" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ipsum,aut
              </p>
            </div>
            
          </div>
            <Button className="text-right" variant="outline">
              <Pen />
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
