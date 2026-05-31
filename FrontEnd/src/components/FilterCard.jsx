import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'

const salaryOptions = ["0-4 LPA", "4-8 LPA", "8-12 LPA", "12+ LPA"];

const FilterCard = ({ jobs = [], filters, onFilterChange, onClearFilters }) => {
    const uniqueValues = (key) => {
        return [...new Set(jobs.map((job) => job?.[key]).filter(Boolean))].slice(0, 8);
    };

    const filterData = [
        {
            filterType: "Location",
            key: "location",
            array: uniqueValues("location")
        },
        {
            filterType: "Job Type",
            key: "job_type",
            array: uniqueValues("job_type")
        },
        {
            filterType: "Salary",
            key: "salary",
            array: salaryOptions
        },
    ];

    return (
        <>
            <div className="sticky top-24 w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                    <h1 className='text-xl font-bold text-blue-800'>Filter Jobs</h1>
                    <Button type="button" variant="ghost" className="h-8 rounded-xl px-3 text-sm" onClick={onClearFilters}>Clear</Button>
                </div>
                <hr className="my-4 border-slate-200" />
                <div className="space-y-5">
                    {
                        filterData.map((data) => data.array.length > 0 && (
                            <div key={data.filterType}>
                                <h1 className='mb-2 text-sm font-bold uppercase text-slate-500'>{data.filterType}</h1>
                                <RadioGroup value={filters[data.key] || ""} onValueChange={(value) => onFilterChange(data.key, value)}>
                                    {
                                        data.array.map((arr) => {
                                            return (
                                                <div key={arr} className='flex items-center gap-2 py-1'>
                                                    <RadioGroupItem value={arr} id={`${data.key}-${arr}`} />
                                                    <Label htmlFor={`${data.key}-${arr}`} className="cursor-pointer text-sm">{arr}</Label>
                                                </div>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default FilterCard
