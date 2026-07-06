import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'

const Signup = () => {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className='flex my-23 items-center justify-center max-w-4xl  mx-auto'>
        <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
            <div className='my-3 '>
                <Label  className='my-1'>Full Name</Label>
                <Input
                    type='text'
                    placeholder='Enter Name'
                />
            </div>
            <div className='my-3'>
                <Label  className='my-1'>Email</Label>
                <Input
                    type='text'
                    placeholder='email@gmail.com'
                />
            </div>
            <div className='my-3'>
                <Label className='my-1'>Password</Label>
                <Input
                    type='password'
                    placeholder='Enter Password'
                />
            </div>
            <div className='flex items-center justify-between'>
                <RadioGroup className='flex items-center gap-4 my-5'>
                    <div className='flex items-center space-x-2'>
                        <Input
                        type='radio'
                        name='role'
                        value='student'
                        className='cursor-pointer   '
                        />
                        <Label htmlFor='r1'>Student</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Input
                        type='radio'
                        name='role'
                        value='recruiter'
                        className='cursor-pointer   '
                        />
                        <Label htmlFor='r1'>Recruiter</Label>
                    </div>
                </RadioGroup>
                <div className='flex items-center gap-2'>
                    <Label>Profile</Label>
                    <Input 
                    type='file' 
                    accept='image/*' 
                    className='cursor-pointer'
                    />
                </div>   
            </div> 
            <Button type='submit' className='w-full my-4'>Signup</Button>
            <span className='text-sm'>Already have an account? <a href="/login" className='text-blue-600'>Login</a></span>  
        </form>
      </div>
        
    </div>
        
  )
}

export default Signup
