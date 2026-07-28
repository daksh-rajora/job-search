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
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null,
        profilePhoto: null
    })

    const [profilePreview, setProfilePreview] = useState("")

    useEffect(() => {
        if (open && user) {
            setInput({
                fullname: user.fullname || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.profile?.bio || "",
                skills: user.profile?.skills?.join(", ") || "",
                file: null,
                profilePhoto: null
            });
            setProfilePreview("");
        }
    }, [open, user]);

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({...input, file})
    }

    const profilePhotoChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                toast.error("Please select a valid image file (JPG, JPEG, PNG, or WebP).");
                e.target.value = "";
                return;
            }
            setInput({...input, profilePhoto: file});
            setProfilePreview(URL.createObjectURL(file));
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file)
        }
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { "content-type": "multipart/form-data" }
            })
            if (res.data.success) {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
              <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
              <div className='grid gap-4 py-4'>
                  <div className='flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4'>
                      <Label htmlFor='name' className='sm:text-right w-full text-gray-700 font-semibold'>Name</Label>
                      <input 
                          id='name'
                          name='fullname'
                          onChange={changeEventHandler}
                          value={input.fullname}
                          className='w-full sm:col-span-3 border rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#6A38C2]' 
                      />
                  </div>
                  <div className='flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4'>
                      <Label htmlFor='email' className='sm:text-right w-full text-gray-700 font-semibold'>Email</Label>
                      <input 
                          id='email'
                          name='email'
                          type='email'
                          onChange={changeEventHandler}
                          value={input.email}
                          className='w-full sm:col-span-3 border rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#6A38C2]' 
                      />
                  </div>
                  <div className='flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4'>
                      <Label htmlFor='number' className='sm:text-right w-full text-gray-700 font-semibold'>Number</Label>
                      <input 
                          id='number'
                          name='phoneNumber'
                          onChange={changeEventHandler}
                          value={input.phoneNumber}
                          className='w-full sm:col-span-3 border rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#6A38C2]' 
                      />
                  </div>
                  <div className='flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4'>
                      <Label htmlFor='bio' className='sm:text-right w-full text-gray-700 font-semibold'>Bio</Label>
                      <input 
                          id='bio'
                          name='bio'
                          onChange={changeEventHandler}
                          value={input.bio}
                          className='w-full sm:col-span-3 border rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#6A38C2]' 
                      />
                  </div>
                  <div className='flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4'>
                      <Label htmlFor='skills' className='sm:text-right w-full text-gray-700 font-semibold'>Skills</Label>
                      <input 
                          id='skills'
                          name='skills'
                          onChange={changeEventHandler}
                          value={input.skills}
                          className='w-full sm:col-span-3 border rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#6A38C2]' 
                      /> 
                  </div>
                  <div className='flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4'>
                      <Label htmlFor='profilePhoto' className='sm:text-right w-full text-gray-700 font-semibold'>Profile Pic</Label>
                      <div className="w-full sm:col-span-3 flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                              <input 
                                  id='profilePhoto'
                                  name='profilePhoto'
                                  type='file'
                                  onChange={profilePhotoChangeHandler}
                                  accept='image/*'
                                  className='w-full border rounded-xl px-3 py-1.5 cursor-pointer file:mr-4 file:py-0.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#6A38C2]/10 file:text-[#6A38C2] hover:file:bg-[#6A38C2]/20 focus:outline-none focus:ring-1 focus:ring-[#6A38C2]' 
                              />
                              {/* Show current photo if no new one selected */}
                              {user?.profile?.profilePhoto && !profilePreview && (
                                  <div className="flex items-center gap-1 shrink-0">
                                      <img 
                                          src={user.profile.profilePhoto} 
                                          alt="Current" 
                                          className="w-9 h-9 rounded-full object-cover border border-gray-200"
                                      />
                                      <span className="text-[9px] text-gray-400">Current</span>
                                  </div>
                              )}
                              {/* Show new photo preview */}
                              {profilePreview && (
                                  <div className="flex items-center gap-1 shrink-0">
                                      <img 
                                          src={profilePreview} 
                                          alt="New" 
                                          className="w-9 h-9 rounded-full object-cover border-2 border-[#6A38C2]"
                                      />
                                      <span className="text-[9px] text-[#6A38C2] font-semibold">New</span>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
                  <div className='flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1 sm:gap-4'>
                      <Label htmlFor='file' className='sm:text-right w-full text-gray-700 font-semibold'>Resume</Label>
                      <input 
                          id='file'
                          name='file'
                          type='file'
                          onChange={fileChangeHandler}
                          accept='application/pdf'
                          className='w-full sm:col-span-3 border rounded-xl px-3 py-1.5 cursor-pointer file:mr-4 file:py-0.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#6A38C2]/10 file:text-[#6A38C2] hover:file:bg-[#6A38C2]/20 focus:outline-none focus:ring-1 focus:ring-[#6A38C2]' 
                      />
                  </div>
              </div>
              <DialogFooter>
                  {loading 
                      ? <Button className='w-full my-4' disabled><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> 
                      : <Button type="submit" className='w-full my-4'>Update</Button>
                  }
              </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialogue
