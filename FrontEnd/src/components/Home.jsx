import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJob from './LatestJob'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role == 'recruiter') {
            navigate('/admin/companies');
        }

    }, [navigate, user?.role]);
    useGetAllJobs();
    return (
        <>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJob />
            <Footer />
        </>
    )
}

export default Home
