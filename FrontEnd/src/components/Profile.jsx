import { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge';
import { Label } from './ui/label'
import ApplicationJobTable from './ApplicationJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'




const Profile = () => {
  const isHavingResume = true;
  const [open, setOpen] = useState(false);

  const { user } = useSelector(store => store.auth)

  console.log(user)

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto border-gray-200 rounded-2xl my-5 p-8 bg-white border'>
        <div className='flex justify-between'>
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto}
                alt="profile" />
            </Avatar>
            <div className=''>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
        </div>

        <div className='my-5'>
          <div className="flex gap-5 my-4 items-center">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex gap-5 my-4 items-center">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className='my-5'>
          <h1 className='text-lg text-blue-800 font-medium mb-4'>Skills</h1>
          <div className="flex items-center gap-2">
            {
              user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((skill, index) =>
                <Badge key={index} variant='outline'>{skill}</Badge>) : <div> <h2>N/A</h2></div>
            }
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className='text-md font-bold'>Resume</Label>
          {
            isHavingResume ? <a href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferer"
              className='text-blue-700 w-full cursor-pointer hover:underline'>{user?.profile?.resumeOriginalName}</a> : <span></span>
          }
        </div>
      </div>

      <div className='max-w-4xl mx-auto'>
        <h1 className='font-bold text-lg'>Applied Jobs</h1>
        <ApplicationJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
