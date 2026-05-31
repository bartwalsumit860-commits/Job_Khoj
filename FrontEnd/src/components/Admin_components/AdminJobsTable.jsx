import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table';

import { Edit2, Eye, MoreHorizontal } from 'lucide-react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '../ui/popover';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const navigate = useNavigate();

    const {
        allAdminJobs = [],
        searchJobByText = ''
    } = useSelector((state) => state.job);

    const filteredJobs = allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;

        const search = searchJobByText.toLowerCase();

        return (
            (job?.title || "").toLowerCase().includes(search) ||
            (job?.company?.company_name || "").toLowerCase().includes(search)
        );
    });
    return (
        <div className="mt-5">
            <Table>
                <TableCaption>
                    List of all your recently posted jobs
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredJobs.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center py-4"
                            >
                                No Jobs Found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>
                                    {job?.company?.company_name || "N/A"}
                                </TableCell>

                                <TableCell>
                                    {job?.title}
                                </TableCell>

                                <TableCell>
                                    {job?.createdAt
                                        ? job.createdAt.split('T')[0]
                                        : 'N/A'}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className="cursor-pointer"
                                            >
                                                <MoreHorizontal />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-32">
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/jobs/edit/${job._id}`
                                                    )
                                                }
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
                                            </div>

                                            <div
                                                onClick={() =>
                                                    navigate(`/admin/jobs/${job._id}/applicants`)
                                                }
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <Eye className='w-4 h-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
