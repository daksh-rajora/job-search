import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobs = () => {
    useGetAllAdminJobs()
    const [input, setInput] = useState("")
    const navigate=useNavigate()
    const dispatch= useDispatch()
    
    useEffect(()=>{
        dispatch(setSearchJobByText(input))
    },[input])

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10 px-4'>
            <div className='flex items-center justify-between my-5'>
                <Input
                    className='w-fit'
                    placeholder='Filter by name, role'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={() =>navigate('/admin/jobs/create')}>New Jobs</Button>
            </div>
            <AdminJobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs
