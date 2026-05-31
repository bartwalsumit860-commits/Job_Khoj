import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';


const LatestJob = () => {
    const {allJobs} = useSelector(store=>store.job);
    return (
        <>
            <div className='max-w-7xl mx-auto my-20 px-4'>
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Fresh openings</p>
                        <h1 className='text-4xl font-bold tracking-tight'><span className='text-blue-900'>Latest and Top </span>Job Openings</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr items-stretch mt-8">
                    {
                        allJobs.length === 0 ?<span className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-8 text-slate-500">No jobs available yet.</span>: allJobs.slice(0,6).map((job)=> <LatestJobCards key ={job._id} job = {job}/>)
                    }
                </div>

            </div>
        </>
    )
}

export default LatestJob
