import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const savedJobsStorageKey = "job-khoj-saved-jobs";

    useEffect(() => {
        try {
            const savedJobs = JSON.parse(localStorage.getItem(savedJobsStorageKey) || "[]");
            setIsSaved(savedJobs.includes(job?._id));
        } catch {
            setIsSaved(false);
        }
    }, [job?._id]);

    const daysAgoFunction = (mongodbTime) =>{
        const createdAt = new Date(mongodbTime);

        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;

        return Math.floor(timeDiff/(1000*24*60*60));
    }

    const toggleSavedJob = () => {
        try {
            const savedJobs = JSON.parse(localStorage.getItem(savedJobsStorageKey) || "[]");
            const nextIsSaved = !isSaved;
            const updatedSavedJobs = nextIsSaved
                ? [...new Set([...savedJobs, job?._id])]
                : savedJobs.filter((savedJobId) => savedJobId !== job?._id);

            localStorage.setItem(savedJobsStorageKey, JSON.stringify(updatedSavedJobs));
            setIsSaved(nextIsSaved);
            toast.success(nextIsSaved ? "Saved for later" : "Removed from saved jobs");
        } catch (error) {
            console.log(error);
            toast.error("Unable to save this job right now");
        }
    };

    return (
        <div className="job-card flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg">
            <div className="job-card__top flex items-center justify-between gap-3">
                <p>{daysAgoFunction(job?.createdAt) == 0 ? "Today": `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant={isSaved ? "default" : "outline"} className="rounded-full shrink-0" size="icon" onClick={toggleSavedJob} type="button">
                    <Bookmark className={isSaved ? "fill-current" : ""} />
                </Button>
            </div>


            <div className="job-card__company flex items-center gap-2 my-2">
                <Button variant='outline' className="p-6 rounded-md" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>

                <div>
                    <h1 className="job-card__company-name font-bold text-xl">{job?.company?.company_name || "Company"}</h1>
                    <p className='job-card__company-location text-sm text-gray-600'>{job?.location}</p>
                </div>
            </div>


            <div>
                <h1 className='job-card__title font-bold text-lg my-2'>{job?.title}</h1>
                <p className="job-card__description text-sm text-gray-600 line-clamp-3">{job?.description}</p>
            </div>

            <div className="job-card__badges mt-4">
                <Badge className='job-card__badge text-blue-600 font-bold p-3' variant="outline">{job?.position} Position</Badge>
                <Badge className='job-card__badge text-green-600 font-bold p-3' variant="outline">{job?.job_type}</Badge>
                <Badge className='job-card__badge text-red-600 font-bold p-3' variant="outline">{job?.salary} LPA</Badge>
            </div>

            <div className="job-card__actions my-4">
                <Button className="job-card__button" variant="outline" onClick={() => navigate(`/jobs/description/${job?._id}`)}>Details</Button>
                <Button className="job-card__button bg-blue-800 text-white hover:bg-blue-900 hover:text-white" variant="outline" onClick={toggleSavedJob} type="button">
                    {isSaved ? "Saved" : "Save For Later"}
                </Button>
            </div>
        </div>
    )
}

export default Job
