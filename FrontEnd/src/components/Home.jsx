import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJob from './LatestJob'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Home = () => {
    useGetAllJobs();
    return (
        <>
            <Navbar />
            <HeroSection/>
           <CategoryCarousel/>
           <LatestJob/>
           <Footer/>
        </>
    )
}

export default Home