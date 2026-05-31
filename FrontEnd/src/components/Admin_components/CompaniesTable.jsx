import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table';

import { Avatar, AvatarImage } from '../ui/avatar';

import { Edit2, MoreHorizontal } from 'lucide-react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '../ui/popover';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const {
        companies = [],
        searchCompanyByText = ''
    } = useSelector((state) => state.company);

    const filteredCompanies = companies.filter((company) => {
        if (!searchCompanyByText) return true;

        return company?.company_name
            ?.toLowerCase()
            .includes(searchCompanyByText.toLowerCase());
    });

    const navigate = useNavigate();

    return (
        <div className="mt-5">
            <Table>
                <TableCaption>
                    List of all your recently registered companies
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredCompanies.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center py-4"
                            >
                                No Companies Registered
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredCompanies.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage
                                            src={company.logo}
                                            alt={company.company_name}
                                        />
                                    </Avatar>
                                </TableCell>

                                <TableCell>
                                    {company.company_name}
                                </TableCell>

                                <TableCell>
                                    {company.createdAt
                                        ? company.createdAt.split('T')[0]
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
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)}className="flex items-center gap-2 cursor-pointer">
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
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
    );
};

export default CompaniesTable;
