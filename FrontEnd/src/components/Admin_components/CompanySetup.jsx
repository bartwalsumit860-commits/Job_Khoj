import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
    const { id } = useParams();

    useGetCompanyById(id);

    const navigate = useNavigate();

    const { singleCompany } = useSelector(
        (state) => state.company
    );

    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        company_name: '',
        description: '',
        website: '',
        location: '',
        file: null,
    });

    useEffect(() => {
        if (singleCompany) {
            setInput({
                company_name: singleCompany.company_name || '',
                description: singleCompany.description || '',
                website: singleCompany.website || '',
                location: singleCompany.location || '',
                file: null,
            });
        }
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files?.[0],
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (
            !input.company_name.trim() ||
            !input.description.trim() ||
            !input.website.trim() ||
            !input.location.trim()
        ) {
            toast.error('Please fill all fields');
            return;
        }

        const formData = new FormData();

        formData.append('company_name', input.company_name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);

        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${COMPANY_API_ENDPOINT}/update/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Unable to update company');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="mx-auto max-w-2xl px-4 py-10">
                <form onSubmit={submitHandler} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                    <div className="mb-8 flex items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/admin/companies')}
                            className="flex items-center gap-2 text-slate-600"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back</span>
                        </Button>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                                Company Setup
                            </h1>
                            <p className="text-sm text-slate-500">
                                Fill in the public details recruiters will see.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="company_name">Company Name</Label>
                            <Input
                                id="company_name"
                                type="text"
                                name="company_name"
                                value={input.company_name}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="logo">Logo</Label>
                            <Input
                                id="logo"
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="cursor-pointer rounded-xl border-slate-200 bg-slate-50 px-4 py-2"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <Button disabled className="mt-8 w-full rounded-xl">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="mt-8 w-full rounded-xl">
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
