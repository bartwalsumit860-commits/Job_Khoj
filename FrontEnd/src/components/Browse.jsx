import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';

const randomJobs = [1,2,3,4,5,6,7];
const Browse = () => {
  return (
    <div>
        <Navbar/>
        <div className="max-w-7xl mx-auto my-10">
            <h1 className="font-bold text-center text-xl mb-10">Search Results ({randomJobs.length}) </h1>
            <div className="grid grid-cols-3 gap-4 overflow-y-auto">
                {
                    randomJobs.map((job,index)=>(
                        <div>
                            <Job/>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Browse