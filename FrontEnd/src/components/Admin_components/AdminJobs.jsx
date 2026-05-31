import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AdminJobsTable from './AdminJobsTable';
import useGetAlladminJobs from '@/hooks/useGetAlladminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
    useGetAlladminJobs();

    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    return (
        <div>
            <Navbar />

            <div className="mx-auto my-10 max-w-6xl px-4">
                <div className="flex items-center justify-between gap-4">
                    <Input
                        className="h-11 w-full max-w-sm rounded-xl border-slate-200 bg-white px-4"
                        placeholder="Filter By Name, Role"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <Button
                        className="rounded-xl bg-blue-600 hover:bg-blue-700"
                        onClick={() => navigate('/admin/jobs/create')}
                    >
                        Post New Jobs
                    </Button>
                </div>

                <AdminJobsTable />
            </div>
        </div>
    );
};

export default AdminJobs;
