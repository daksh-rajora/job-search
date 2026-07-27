import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies()
    const [input, setInput] = useState("")
    const navigate=useNavigate()
    const dispatch= useDispatch()
    
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input))
    },[input])

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10 px-4'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-5'>
                <Input
                    className='w-full sm:w-fit'
                    placeholder='Filter by name'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={() =>navigate('/admin/companies/create')} className="w-full sm:w-auto">New Company</Button>
            </div>
            <CompaniesTable filterText={input}/>
        </div>
    </div>
  )
}

export default Companies
