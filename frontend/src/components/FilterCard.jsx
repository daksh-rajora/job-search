import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType:"Location",
    array:["Delhi NCR","Chandigarh","Hyderabad", "Banglore", "Mumbai"]
  },
  {
    filterType:"Industry",
    array:["Accountant","Frontend Developer","Data Analyst","Full stack Developer","HR","Java Developer","SDE"]
  },
  {
    filterType:"Salary",
    array:["0-1L","1-2L","2-3L","3-4L","4-5L"]
  }
]

const FilterCard = () => {
  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  const clearFilters = () => {
    setSelectedValue('')
  }

  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue, dispatch])

  return (
    <div className='w-full bg-white p-4 rounded-md border border-gray-200 shadow-sm'>
      {/* Mobile Toggle Header */}
      <div className='flex items-center justify-between cursor-pointer md:cursor-default' onClick={() => setIsOpen(!isOpen)}>
        <h1 className='font-bold text-lg text-gray-800'>Filter Jobs</h1>
        <div className="flex items-center gap-3">
          {selectedValue && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                clearFilters();
              }} 
              className='text-xs font-semibold text-red-500 hover:text-red-700 transition-colors hover:underline p-1'
            >
              Clear
            </button>
          )}
          <button className='md:hidden text-sm font-semibold text-[#6A38C2] hover:underline p-1'>
            {isOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>
      
      {/* Filter Body - always visible on desktop, toggled on mobile */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block mt-3 animate-in fade-in duration-200`}>
        <hr className='mb-3 border-gray-100'/>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {
            filterData.map((data, index) => (
              <div key={index} className="mb-4">
                <h1 className='font-bold text-md text-gray-700 mb-2'>{data.filterType}</h1>
                <div className="space-y-2">
                  {
                    data.array.map((item, idx) => {
                      const itemId = `r${index}-${idx}`
                      return (
                        <div key={itemId} className='flex items-center space-x-2'>
                          <RadioGroupItem value={item} id={itemId} />
                          <Label htmlFor={itemId} className="text-sm font-normal text-gray-650 cursor-pointer">{item}</Label>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            ))
          }
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCard;
