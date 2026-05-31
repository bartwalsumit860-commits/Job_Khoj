import Navbar from './shared/Navbar'
import Job from './Job';
import { useDeferredValue } from 'react';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const deferredQuery = useDeferredValue(searchedQuery);

  const filteredJobs = allJobs.filter((job) => {
    const query = deferredQuery?.toLowerCase().trim();
    if (!query) return true;

    return [
      job?.title,
      job?.description,
      job?.location,
      job?.job_type,
      job?.company?.company_name
    ].some((value) => value?.toLowerCase().includes(query));
  });

  return (
    <div>
        <Navbar/>
        <div className="mx-auto my-10 max-w-7xl px-4">
            <h1 className="mb-10 text-center text-2xl font-bold tracking-tight text-slate-950">Search Results ({filteredJobs.length}) </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto">
                {
                    filteredJobs.map((job)=>(
                        <div key={job._id}>
                            <Job job={job}/>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Browse
