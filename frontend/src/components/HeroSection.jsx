import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4">
      <div className="flex flex-col gap-5 my-10">
        <span className="px-4 py-2 rounded-full mx-auto bg-gray-100 text-[#F83002] text-sm md:text-base">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-sm md:text-base max-w-xl mx-auto text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
          fugit error illum corporis atque!
        </p>
        <div className="flex w-full sm:w-[80%] md:w-[45%] shadow-lg border border-gray-200 pl-5 pr-1.5 py-1.5 rounded-full items-center justify-between mx-auto bg-white focus-within:ring-2 focus-within:ring-[#6A38C2]/20 transition-all">
          <input
            type="text"
            placeholder="Find your dream jobs..."
            className="outline-none border-none w-full py-1 text-sm md:text-base text-gray-800 placeholder:text-gray-400 bg-transparent"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className="bg-[#6A38C2] hover:bg-[#582fa1] w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white shrink-0 p-0 shadow-sm transition-transform active:scale-95"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
