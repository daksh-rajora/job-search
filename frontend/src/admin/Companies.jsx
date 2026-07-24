import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const Companies = () => {
    useGetAllCompanies()
    const [input, setInput] = useState("")
    const navigate=useNavigate()

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10 px-4'>
            <div className='flex items-center justify-between my-5'>
                <Input
                    className='w-fit'
                    placeholder='Filter by name'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={() =>navigate('/admin/companies/create')}>New Company</Button>
            </div>
            <CompaniesTable filterText={input}/>
        </div>
    </div>
  )
}

export default Companies
