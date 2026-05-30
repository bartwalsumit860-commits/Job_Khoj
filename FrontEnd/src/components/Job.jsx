import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


const Job = ({ job }) => {
    const navigate = useNavigate();
    // const jobId = "adfausoifusaoidfu";

    const daysAgoFunction = (mongodbTime) =>{
        const createdAt = new Date(mongodbTime);

        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;

        return Math.floor(timeDiff/(1000*24*60*60));
    }
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border-grey-200">
            <div className="flex items-center justify-between">
                <p>{daysAgoFunction(job?.createdAt) == 0 ? "Today": `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>


            <div className="flex items-center gap-2 my-2">
                <Button variant='outline' className="p-6 rounded-md" size="icon">
                    <Avatar>
                        <AvatarImage src="../src/assets/7.jpg" />
                    </Avatar>
                </Button>

                <div>
                    <h1 className="font-bold text-xl">{job?.company?.name}</h1>
                    <p className='text-sm text-gray-600'>{job?.location}</p>
                </div>
            </div>


            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            <div className="flex items-center mt-4 gap-2">
                <Badge className='text-blue-600 font-bold p-3' variant="outline">{job?.position} Position</Badge>
                <Badge className='text-green-600 font-bold p-3' variant="outline">{job?.job_type}</Badge>
                <Badge className='text-red-600 font-bold p-3' variant="outline">{job?.salary} LPA</Badge>
            </div>

            <div className="flex items-center gap-2 my-4 mx-auto">
                <Button variant="outline" onClick={() => navigate(`/jobs/description/${job?._id}`)}>Details</Button>
                <Button className="bg-blue-800 text-white hover:bg-blue-900 hover:text-white" variant="outline">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job
