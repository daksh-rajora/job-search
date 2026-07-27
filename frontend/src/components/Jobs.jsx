import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchQuery, setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const Jobs = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs = [], searchedQuery = "" } = useSelector(store => store.job) || {};
  const [filterJobs, setFilterJobs] = useState(allJobs)
  
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.salary?.toString().includes(searchedQuery)
        );
      });
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])

  useEffect(() => {
    dispatch(setSearchQuery(""));
    dispatch(setSearchedQuery(""));
  }, [dispatch]);


  return (


    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-[20%]">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span className="flex-1 text-center py-10 text-gray-500 font-semibold">Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto p-2 md:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div 
                  initial={{opacity:0,x:100}}
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:-100}}
                  transition={{duration:0.3}}
                  key={job?._id}>
                    <Job job={job}/>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
