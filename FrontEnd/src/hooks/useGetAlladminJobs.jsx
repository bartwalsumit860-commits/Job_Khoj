import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constant';

const useGetAlladminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_ENDPOINT}/getAdminJob`,
                    {
                        withCredentials: true,
                    }
                );

                console.log("Admin Jobs Response:", res.data);

                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(
                    "Error fetching admin jobs:",
                    error.response?.data || error.message
                );
            }
        };

        fetchAllAdminJobs();
    }, [dispatch]);
};

export default useGetAlladminJobs;