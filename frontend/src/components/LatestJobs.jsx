import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const LatestJobs = () => {
  const { allJobs = [] } = useSelector(store => store.job) || {};
  const navigate = useNavigate();

  return (
    <div className='max-w-7xl mx-auto my-10 md:my-20 px-4'>
      <div className="flex items-center justify-between mb-6">
        <h1 className='text-2xl md:text-4xl font-bold'>
          <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
        </h1>
        {allJobs.length > 5 && (
          <Button 
            onClick={() => navigate('/jobs')} 
            variant="outline" 
            className="rounded-full border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all text-xs md:text-sm shrink-0"
          >
            View All Jobs ({allJobs.length})
          </Button>
        )}
      </div>

      {/* Display top 5-6 latest jobs on Home page */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
        {allJobs.length <= 0 ? (
          <span className="text-gray-500 font-semibold col-span-full text-center py-6">No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  )
}

export default LatestJobs
