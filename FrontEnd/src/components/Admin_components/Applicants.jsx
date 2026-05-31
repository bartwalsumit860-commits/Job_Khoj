import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table';

const statusClassName = {
    pending: "text-yellow-700 border-yellow-200 bg-yellow-50",
    accepted: "text-green-700 border-green-200 bg-green-50",
    rejected: "text-red-700 border-red-200 bg-red-50",
};

const Applicants = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingApplicationId, setUpdatingApplicationId] = useState("");

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${id}/applicants`, {
                    withCredentials: true
                });

                if (res.data.success) {
                    setJob(res.data.job);
                    setApplications(res.data.job?.applications || []);
                }
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "Unable to load applicants");
                if (error?.response?.status === 403) {
                    navigate("/admin/jobs");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [id, navigate]);

    const updateStatus = async (applicationId, status) => {
        try {
            setUpdatingApplicationId(applicationId);
            const res = await axios.post(
                `${APPLICATION_API_ENDPOINT}/status/${applicationId}/update`,
                { status },
                { withCredentials: true }
            );

            if (res.data.success) {
                setApplications((currentApplications) =>
                    currentApplications.map((application) =>
                        application._id === applicationId
                            ? { ...application, status }
                            : application
                    )
                );
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Unable to update application status");
        } finally {
            setUpdatingApplicationId("");
        }
    };

    return (
        <div>
            <Navbar />

            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div>
                        <Button variant="outline" onClick={() => navigate('/admin/jobs')} className="mb-4 flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
                            Applications
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                            {job?.title || "Job applicants"}
                        </h1>
                        <p className="mt-1 text-slate-500">
                            {job?.company?.company_name || "Company"} | {applications.length} candidate{applications.length === 1 ? "" : "s"}
                        </p>
                    </div>

                    <div className="grid gap-3 rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-700 md:min-w-64">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Role</span>
                            <span className="font-medium">{job?.title || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Location</span>
                            <span className="font-medium">{job?.location || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-500">Openings</span>
                            <span className="font-medium">{job?.position || "N/A"}</span>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <Table>
                        <TableCaption className="py-4">
                            Review applicants and update their status in one place.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Resume</TableHead>
                                <TableHead>Applied</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-12 text-center text-slate-500">
                                        <div className="inline-flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Loading applicants...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : applications.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-12 text-center text-slate-500">
                                        No applications yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                applications.map((application) => (
                                    <TableRow key={application._id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-950">
                                                    {application?.applicant?.fullname || "N/A"}
                                                </span>
                                                <span className="text-sm text-slate-500">
                                                    {application?.applicant?.role || "student"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-sm text-slate-600">
                                                <span>{application?.applicant?.email || "N/A"}</span>
                                                <span>{application?.applicant?.phoneNumber || "N/A"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {application?.applicant?.profile?.resume ? (
                                                <a
                                                    href={application.applicant.profile.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-medium text-blue-700 hover:underline"
                                                >
                                                    {application?.applicant?.profile?.resumeOriginalName || "View resume"}
                                                </a>
                                            ) : (
                                                <span className="text-slate-500">N/A</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-slate-600">
                                            {application?.createdAt?.split("T")[0] || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Badge
                                                    variant="outline"
                                                    className={statusClassName[application?.status] || ""}
                                                >
                                                    {application?.status || "pending"}
                                                </Badge>
                                                <Select
                                                    value={application?.status || "pending"}
                                                    onValueChange={(value) => updateStatus(application._id, value)}
                                                    disabled={updatingApplicationId === application._id}
                                                >
                                                    <SelectTrigger className="w-32 rounded-xl border-slate-200 bg-slate-50">
                                                        <SelectValue placeholder="Update" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="pending">Pending</SelectItem>
                                                            <SelectItem value="accepted">Accepted</SelectItem>
                                                            <SelectItem value="rejected">Rejected</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Applicants;
