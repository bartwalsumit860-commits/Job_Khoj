import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";


const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <>
            <div onClick={() => navigate(`/jobs/description/${job?._id}`)} className="job-card job-card--compact flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow cursor-pointer hover:shadow-lg">
                <div className="job-card__company">
                    <h1 className="job-card__company-name font-medium text-lg">{job?.company?.company_name || "Company"}</h1>
                    <p className="job-card__company-location text-sm text-gray-500">{job?.location}</p>
                </div>
                <div>
                    <h1 className="job-card__title font-bold text-lg my-2">{job?.title}</h1>
                    <p className="job-card__description text-sm text-gray-600 line-clamp-3">{job?.description}</p>
                </div>
                <div className="job-card__badges my-4">
                    <Badge className='job-card__badge text-blue-600 font-bold p-3' variant="outline">{job?.position} Position</Badge>
                    <Badge className='job-card__badge text-green-600 font-bold p-3' variant="outline">{job?.job_type}</Badge>
                    <Badge className='job-card__badge text-red-600 font-bold p-3' variant="outline">{job?.salary} LPA</Badge>
                </div>
            </div>
        </>
    )
}

export default LatestJobCards
