import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-6 my-9'>
                <span className='px-4 py-2 mx-auto rounded-full bg-gray-100 text-blue-900 font-bold'>Best Job Searching Platform</span>
                <h1 className='text-5xl font-bold'>Search, Apply &<br /> Find Your <span className='text-blue-900 font-medium'>Dream Jobs</span></h1>

                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum saepe accusamus at eum.</p>

                <div className="flex w-1/3 shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                    <input
                        type="text"
                        placeholder="Search Job"
                        className="outline-none border-none w-full">
                    </input>

                    <Button className='rounded-r-full bg-blue-900'><Search className='h-5 w-5'/></Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
