import { useNavigate } from 'react-router-dom'
import React from 'react'
import { Badge } from './ui/badge'
import { JOB_API_END_POINT } from '@/utils/constant'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-300'>
        <div className='flex items-center gap-3 my-2'>
            <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-md p-1 bg-white shadow-xs shrink-0">
              {job?.company?.logo ? (
                <img 
                  src={job?.company?.logo} 
                  alt={`${job?.company?.name} logo`} 
                  className="max-w-full max-h-full object-contain" 
                />
              ) : (
                <span className="font-bold text-lg text-gray-700">
                  {job?.company?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
                <h1 className='font-semibold text-md text-gray-800'>{job?.company?.name}</h1>
                <p className='text-xs text-gray-500'>{job?.location || "India"}</p> 
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2 text-gray-900'>{job?.title}</h1>
            <p className='text-sm text-gray-650 line-clamp-2'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className="text-blue-700 font-bold" variant='ghost'>{job?.position} Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant='ghost'>{job?.jobType}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant='ghost'>{job?.salary} LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards
