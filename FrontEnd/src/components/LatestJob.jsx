import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';


const LatestJob = () => {
    const {allJobs} = useSelector(store=>store.job);
    return (
        <>
            <div className='max-w-7xl mx-auto my-20'>
                <h1 className='text-4xl font-bold'><span className='text-blue-900'>Latest and Top </span>Job Openings</h1>
                {/* job cards  */}
                <div className="grid grid-cols-3 gap-3">
                    {
                        allJobs.length === 0 ?<span>No job Avilable</span>: allJobs.slice(0,6).map((job,index)=> <LatestJobCards key ={job._id} job = {job}/>)
                    }
                </div>

            </div>
        </>
    )
}

export default LatestJob