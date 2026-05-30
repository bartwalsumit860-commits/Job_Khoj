import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const ApplicationJobTable = () => {
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
          {
            [1,2,3].map((job)=>(
              <TableRow key={job}>
                <TableCell>21-05-2026</TableCell>
                <TableCell>Full Stack Developer</TableCell>
                <TableCell>Company private Limited</TableCell>
                <TableCell className='text-right'><Badge variant='outline'>Selected</Badge></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicationJobTable
