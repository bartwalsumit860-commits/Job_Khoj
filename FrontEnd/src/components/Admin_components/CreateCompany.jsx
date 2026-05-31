import { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { toast } from 'sonner';

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [company_name, setCompanyName] = useState("");

  const registerNewCompany = async (e) => {
    e.preventDefault();

    if (!company_name.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, { company_name }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create company");
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <form onSubmit={registerNewCompany} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-10">
            <h1 className='text-2xl font-bold tracking-tight text-slate-950'>Your Company Name</h1>
            <p className='mt-2 text-slate-500'>Pick a company name now, then finish the profile details in the next step.</p>
          </div>

          <Label htmlFor="company_name">Company Name</Label>
          <Input
            id="company_name"
            type="text"
            className='mt-2 h-11 rounded-xl border-slate-200 bg-slate-50 px-4'
            placeholder='Google, Microsoft, etc'
            value={company_name}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <div className='mt-8 flex items-center gap-3'>
            <Button type="button" variant='outline' onClick={() => navigate('/admin/companies')}>
              Cancel
            </Button>
            <Button type="submit" className='bg-blue-600 hover:bg-blue-700'>
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
