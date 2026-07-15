import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialogue = ({open,setOpen}) => {

    const [loading,setLoading] = useState(false)
    const {user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()

    const [input,setInput] = useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.profile?.resume
    })

    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]:e.target.value})
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input,file})
    }

    useEffect(() => {
        if (open && user) {
            setInput({
                fullname: user.fullname || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.profile?.bio || "",
                skills: user.profile?.skills?.join(", ") || "",
                file: user.profile?.resume || ""
            });
        }
    }, [open, user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("fullname",input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if(input.file){
            formData.append("file", input.file)
        }     

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData,{
                headers:{
                    "content-type":"multipart/form-data"
                },
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong.")
        } finally {
            setLoading(false)
        }
        setOpen(false)
    }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className='sm:max-w-[425px]' onInteractOutside={()=>setOpen(false)}>
            <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler}>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>Name</Label>
                        <input 
                            id='name'
                            name='fullname'
                            onChange={changeEventHandler}
                            value={input.fullname}
                            className='col-span-3 border rounded-xl px-2 py-1' 
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='email' className='text-right'>Email</Label>
                        <input 
                            id='email'
                            name='email'
                            type='email'
                            onChange={changeEventHandler}
                            value={input.email}
                            className='col-span-3 border rounded-xl px-2 py-1' 
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='number' className='text-right'>Number</Label>
                        <input 
                            id='number'
                            name='phoneNumber'
                            onChange={changeEventHandler}
                            value={input.phoneNumber}
                            className='col-span-3 border rounded-xl px-2 py-1' 
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='bio' className='text-right'>Bio</Label>
                        <input 
                            id='bio'
                            name='bio'
                            onChange={changeEventHandler}
                            value={input.bio}
                            className='col-span-3 border rounded-xl px-2 py-1' 
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='skills' className='text-right'>Skills</Label>
                        <input 
                            id='skills'
                            name='skills'
                            onChange={changeEventHandler}
                            value={input.skills}
                            className='col-span-3 border rounded-xl px-2 py-1' 
                        /> 
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='file' className='text-right'>File</Label>
                        <input 
                            id='file'
                            name='file'
                            type='file'
                            onChange={fileChangeHandler}
                            accept='application/pdf'
                            className='col-span-3 border rounded-xl px-2 py-1' 
                        />
                    </div>
                </div>
                <DialogFooter>
                    {
                        loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> : <Button type="submit" className='w-full my-4'>Update</Button>
                    }
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialogue
