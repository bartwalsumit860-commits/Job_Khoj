import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (e) => {
        e.preventDefault();
        dispatch(setSearchedQuery(query.trim()));
        navigate("/browse");
    };

    return (
        <div className='relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_36%),linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] text-center'>
            <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
            <div className='relative flex flex-col gap-6 px-4 py-16'>
                <span className='mx-auto rounded-full border border-blue-100 bg-white px-4 py-2 font-bold text-blue-900 shadow-sm'>
                    Best Job Searching Platform
                </span>
                <h1 className='text-5xl font-bold leading-tight tracking-tight md:text-6xl'>
                    Search, Apply &amp;<br /> Find Your <span className='text-blue-900'>Dream Jobs</span>
                </h1>

                <p className='mx-auto max-w-2xl text-base text-slate-600 md:text-lg'>
                    Find fresher and experienced roles from trusted recruiters in one place.
                </p>

                <form onSubmit={searchJobHandler} className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-blue-100/40">
                    <input
                        type="text"
                        placeholder="Search jobs, companies, or skills"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full border-none bg-transparent px-4 py-3 outline-none"
                    />

                    <Button type="submit" className='rounded-xl bg-blue-900 px-6 hover:bg-blue-800'>
                        <Search className='h-5 w-5'/>
                    </Button>
                </form>
            </div>
            <div className="h-8" />
        </div>
    )
}

export default HeroSection
