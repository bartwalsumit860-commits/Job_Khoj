import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { JOB_API_ENDPOINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

const PostJobs = () => {
    useGetAllCompanies();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [loadingJob, setLoadingJob] = useState(isEditMode);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirement: "",
        salary: "",
        location: "",
        job_type: "",
        experienceLevel: "",
        position: "",
        company: "",
    });

    const { companies } = useSelector((store) => store.company);

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const fetchJob = async () => {
            try {
                setLoadingJob(true);
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${id}`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    const job = res.data.job;
                    setInput({
                        title: job.title || "",
                        description: job.description || "",
                        requirement: Array.isArray(job.requirement) ? job.requirement.join(", ") : "",
                        salary: job.salary?.toString() || "",
                        location: job.location || "",
                        job_type: job.job_type || "",
                        experienceLevel: job.experienceLevel?.toString() || "",
                        position: job.position?.toString() || "",
                        company: job.company?._id || job.company || "",
                    });
                }
            } catch (error) {
                console.log(error.response?.data || error.message);
                toast.error(error?.response?.data?.message || "Unable to load job details");
            } finally {
                setLoadingJob(false);
            }
        };

        fetchJob();
    }, [id, isEditMode]);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const selectChangeHandler = (value) => {
        setInput({
            ...input,
            company: value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (
            !input.title.trim() ||
            !input.description.trim() ||
            !input.requirement.trim() ||
            !input.salary.trim() ||
            !input.experienceLevel.trim() ||
            !input.location.trim() ||
            !input.job_type.trim() ||
            !input.position.trim() ||
            !input.company.trim()
        ) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const endpoint = isEditMode
                ? `${JOB_API_ENDPOINT}/update/${id}`
                : `${JOB_API_ENDPOINT}/post`;

            const res = await axios.post(
                endpoint,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            console.log(error.response?.data || error.message);

            toast.error(
                error?.response?.data?.message ||
                error?.response?.data?.messege ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="mx-auto my-10 max-w-2xl px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                        {isEditMode ? "Update Job" : "Post Your Job Here!"}
                    </h1>
                    <p className="mt-2 text-slate-500">
                        {isEditMode ? "Refine the listing before it goes live again." : "You can change these details later."}
                    </p>
                </div>

                <form
                    onSubmit={submitHandler}
                    className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
                >
                    <div className="grid grid-cols-1 gap-5">

                        <div className="space-y-2">
                            <Label htmlFor="title" className="font-semibold text-slate-700">
                                Title
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                disabled={loadingJob}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="font-semibold text-slate-700">
                                Description
                            </Label>
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                disabled={loadingJob}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="requirement" className="font-semibold text-slate-700">
                                Requirements
                            </Label>
                            <Input
                                id="requirement"
                                type="text"
                                name="requirement"
                                placeholder="React, Node.js, MongoDB"
                                value={input.requirement}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                disabled={loadingJob}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="salary" className="font-semibold text-slate-700">
                                Salary
                            </Label>
                            <Input
                                id="salary"
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                disabled={loadingJob}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="font-semibold text-slate-700">
                                Location
                            </Label>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                disabled={loadingJob}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="job_type" className="font-semibold text-slate-700">
                                Job Type
                            </Label>
                            <Input
                                id="job_type"
                                type="text"
                                name="job_type"
                                placeholder="Full Time"
                                value={input.job_type}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                disabled={loadingJob}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="experienceLevel" className="font-semibold text-slate-700">
                                Experience Level
                            </Label>
                            <Input
                                id="experienceLevel"
                                type="number"
                                name="experienceLevel"
                                placeholder="2"
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                disabled={loadingJob}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="position" className="font-semibold text-slate-700">
                                Positions
                            </Label>
                            <Input
                                id="position"
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                disabled={loadingJob}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="font-semibold text-slate-700">
                                Company
                            </Label>

                            <Select value={input.company} onValueChange={selectChangeHandler} disabled={loadingJob}>
                                <SelectTrigger className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2">
                                    <SelectValue placeholder="Select a company" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {companies?.map((company) => (
                                            <SelectItem
                                                key={company._id}
                                                value={company._id}
                                            >
                                                {company.company_name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {loading ? (
                            <Button disabled className="mt-4 w-full rounded-xl">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="mt-4 w-full rounded-xl"
                                disabled={loadingJob}
                            >
                                {isEditMode ? "Update Job" : "Submit"}
                            </Button>
                        )}

                        {companies?.length === 0 && !loadingJob && (
                            <p className="text-center text-sm font-medium text-red-600">
                                *Please register a company first before posting a job
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJobs;
