import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
const filterData = [
    {
        filterType: "Location",
        array: ["Delhi Jamnagar", "Dehradun", "Ahamdabad", "Mumbai", "Rudraprayag"]
    },
    {
        filterType: "Role",
        array: ["FrontEnd Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "41-80k", "80k-1Lakh", "1Lakh-3Lakh"]
    },
]
const FilterCard = () => {
    return (
        <>
            <div className="w-full bg-white p-3 rounded-md">
                <h1 className='font-bold text-2xl text-blue-800'>Filter Jobs</h1>
                <hr className="mt-3" />
                <RadioGroup>
                    {
                        filterData.map((data, index) => (
                            <div>
                                <h1 className='font-bold text-lg'>{data.filterType}</h1>
                                {
                                    data.array.map((arr, index) => {
                                        return (
                                            <div className='flex space-y-2 items-center space-x-2'>
                                                <RadioGroupItem value={arr}/>
                                                <Label>{arr}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ))
                    }
                </RadioGroup>
            </div>
        </>
    )
}

export default FilterCard