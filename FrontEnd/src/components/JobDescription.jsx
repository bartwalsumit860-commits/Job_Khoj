import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';

const JobDescription = () => {

    // current logged in user
    const { user } = useSelector(store => store.auth);

    // redux dispatch
    const dispatch = useDispatch();

    // get job id from url
    const params = useParams();
    const jobId = params.id;

    // get single job from redux
    const { singleJob } = useSelector(store => store.job);

    // check if user already applied
    const isInitialyApplied = singleJob?.applications?.some(
        application => application.applicant?.toString() === user?._id?.toString()
    );
    // local ui state
    const [isApplied, setIsApplied] = useState(isInitialyApplied);

    // apply job handler
    const applyJobHandler = async () => {
        try {

            const res = await axios.get(
                `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
                {
                    withCredentials: true
                }
            );

            if (res.data.success) {
                // realtime redux update
                const updateSingleJob = {
                    ...singleJob,
                    applications: [
                        ...(singleJob?.applications || []),
                        { applicant: user?._id }
                    ]
                };

                dispatch(setSingleJob(updateSingleJob));

                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    };

    // fetch single job
    useEffect(() => {

        const fetchSingleJobs = async () => {

            try {

                const res = await axios.get(
                    `${JOB_API_ENDPOINT}/get/${jobId}`,
                    {
                        withCredentials: true
                    }
                );

                if (res.data.success) {

                    dispatch(setSingleJob(res.data.job));

                    // sync applied state
                    setIsApplied(
                        res.data.job.applications.some(
                            application => application.applicant == user?._id
                        )
                    );

                    toast.success(res.data.message);
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJobs();

    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="font-bold text-xl">
                        {singleJob?.title}
                    </h1>

                    <div className="flex gap-5 items-center my-4">

                        <Badge
                            className='text-blue-600 font-bold p-3'
                            variant="outline"
                        >
                            {singleJob?.position} Positions
                        </Badge>

                        <Badge
                            className='text-green-600 font-bold p-3'
                            variant="outline"
                        >
                            {singleJob?.salary} LPA
                        </Badge>

                        <Badge
                            className='text-red-600 font-bold p-3'
                            variant="outline"
                        >
                            {singleJob?.job_type}
                        </Badge>

                    </div>
                </div>

                <Button
                    onClick={!isApplied ? applyJobHandler : null}
                    disabled={isApplied}
                    className={`rounded-lg p-2 ${isApplied
                            ? 'bg-green-500 cursor-not-allowed'
                            : 'bg-blue-700 hover:bg-blue-800'
                        }`}
                >
                    {
                        isApplied
                            ? 'Already Applied'
                            : 'Apply Now'
                    }
                </Button>

            </div>

            <h1 className='border-b-2 border-b-gray-400 font-medium my-5'>
                Job Description
            </h1>

            <div className='my-4'>

                <h1 className="font-bold my-1">
                    Role :
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.title}
                    </span>
                </h1>

                <h1 className="font-bold my-1">
                    Location :
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.location}
                    </span>
                </h1>

                <h1 className="font-bold my-1">
                    Description :
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.description}
                    </span>
                </h1>

                <h1 className="font-bold my-1">
                    Experience :
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.experience} year
                    </span>
                </h1>

                <h1 className="font-bold my-1">
                    Salary :
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.salary} LPA
                    </span>
                </h1>

                <h1 className="font-bold my-1">
                    Total Applicants :
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.applications?.length}
                    </span>
                </h1>

                <h1 className="font-bold my-1">
                    Posted-Date :
                    <span className="pl-4 font-normal text-gray-800">
                        {singleJob?.createdAt?.split("T")[0]}
                    </span>
                </h1>

            </div>
        </div>
    )
}

export default JobDescription
