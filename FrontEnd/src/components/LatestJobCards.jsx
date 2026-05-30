import { Badge } from "@/components/ui/badge";
import React from 'react';


const LatestJobCards = ({job}) => {
    return (
        <>
            <div className="p-5 rounded-xl border-gray-200 shadow-xl bg-white">
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">{job?.location}</p>
                </div>
                <div>
                    <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                    <p className="text-sm text-gray-600">{job?.description}</p>
                </div>
                <div className="flex gap-5 items-center my-4">
                    <Badge className='text-blue-600 font-bold p-3' variant="outline">{job?.position} Position</Badge>
                    <Badge className='text-green-600 font-bold p-3' variant="outline">{job?.job_type}</Badge>
                    <Badge className='text-red-600 font-bold p-3' variant="outline">{job?.salary} LPA</Badge>
                </div>
            </div>
        </>
    )
}

export default LatestJobCards