import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'

const statusClassName = {
  pending: "text-yellow-700 border-yellow-200 bg-yellow-50",
  accepted: "text-green-700 border-green-200 bg-green-50",
  rejected: "text-red-700 border-red-200 bg-red-50",
};

const ApplicationJobTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true
        });

        if (res.data.success) {
          setApplications(res.data.applications || []);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Unable to load applied jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className='mt-5'>
      <Table>
        <TableCaption>
          List of all your applied jobs
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                Loading applications...
              </TableCell>
            </TableRow>
          ) : applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                You have not applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            applications.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{application?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell>{application?.job?.title || "N/A"}</TableCell>
                <TableCell>{application?.job?.company?.company_name || "N/A"}</TableCell>
                <TableCell className='text-right'>
                  <Badge variant="outline" className={statusClassName[application?.status] || ""}>
                    {application?.status || "pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicationJobTable
