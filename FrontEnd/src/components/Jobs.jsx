import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDeferredValue, useState } from 'react'

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filters, setFilters] = useState({
        location: "",
        job_type: "",
        salary: ""
    });
    const deferredQuery = useDeferredValue(searchedQuery);

    const salaryMatches = (salary, range) => {
        if (!range) return true;
        const value = Number(salary);
        if (range === "0-4 LPA") return value <= 4;
        if (range === "4-8 LPA") return value > 4 && value <= 8;
        if (range === "8-12 LPA") return value > 8 && value <= 12;
        return value > 12;
    };

    const filteredJobs = allJobs.filter((job) => {
        const query = deferredQuery?.toLowerCase().trim();
        const textMatches = !query || [
            job?.title,
            job?.description,
            job?.location,
            job?.job_type,
            job?.company?.company_name
        ].some((value) => value?.toLowerCase().includes(query));

        const locationMatches = !filters.location || job?.location === filters.location;
        const typeMatches = !filters.job_type || job?.job_type === filters.job_type;
        const salaryRangeMatches = salaryMatches(job?.salary, filters.salary);

        return textMatches && locationMatches && typeMatches && salaryRangeMatches;
    });

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            location: "",
            job_type: "",
            salary: ""
        });
    };

    return (
        <>
            <Navbar />
            <div className='mx-auto mt-8 max-w-7xl px-4'>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-1/4'>
                        <FilterCard jobs={allJobs} filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} />
                    </div>

                    {filteredJobs.length === 0 ? <span className="flex-1 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">Job not found</span> : (
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr items-stretch">
                                {
                                    filteredJobs.map((job) => (
                                        <div key={job._id} className="h-full">
                                            <Job  job = {job}/>
                                        </div>))
                                }
                            </div>
                        </div>
                    )
                    }
                </div>

            </div>
        </>
    )
}

export default Jobs
