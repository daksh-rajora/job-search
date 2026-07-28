import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const {singleJob}=useSelector(store=>store.job)
  const {user} = useSelector(store=>store.auth)
  const params = useParams()
  const jobId = params.id;
  const dispatch = useDispatch()

  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const applyJobHandler = async()=> {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`)
      if(res.data.success){
        setIsApplied(true); //update the local state
        toast.success(res.data.message);
        const updatedSingleJob = {...singleJob, applications:[...(singleJob?.applications || []), {applicant:user?._id}]}
        dispatch(setSingleJob(updatedSingleJob)) //help us to update the real time ui
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(()=>{
        const fetchSingleJob = async() => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`)
                console.log(res)        
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job?.applications?.some(application => application.applicant == user?._id) || false) // Ensure the state is sync with fetched data
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
    },[jobId,dispatch,user?._id])

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-4">
        {/* Left Side: Title and Badges */}
        <div className="order-2 md:order-1">
          <h1 className="font-bold text-2xl text-gray-900">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Right Side: Company Logo and Details (Top on Mobile, Side on Desktop) */}
        <div className="order-1 md:order-2 flex items-center gap-3 w-full md:w-auto shrink-0 md:bg-gray-50 md:border md:border-gray-200 md:p-3 md:rounded-lg md:shadow-2xs">
          <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-md p-1 bg-white shadow-xs shrink-0">
            {singleJob?.company?.logo ? (
              <img 
                src={singleJob?.company?.logo} 
                alt={`${singleJob?.company?.name} logo`} 
                className="max-w-full max-h-full object-contain" 
              />
            ) : (
              <span className="font-bold text-lg text-gray-700">
                {singleJob?.company?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-base text-gray-800 leading-tight">{singleJob?.company?.name}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{singleJob?.location || "India"}</p>
          </div>
        </div>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
      <div className="my-4">
        <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
        <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} yrs</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span></h1>
        <h1 className="font-bold my-1">Total Applicant: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
        <h1 className="font-bold my-1">Post Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt?.split("T")[0]}</span></h1>
      </div>
      <div className="my-6">
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`w-full sm:w-auto rounded-lg py-3 px-6 text-sm font-semibold transition-colors duration-200 ${isApplied ? "bg-gray-600 cursor-not-allowed text-white" : "bg-[#7209b7] hover:bg-[#5d32ad] cursor-pointer text-white"}`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
    </div>
  );
};

export default JobDescription;
