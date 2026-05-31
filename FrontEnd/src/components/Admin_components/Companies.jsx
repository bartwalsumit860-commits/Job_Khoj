import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
  const [input,setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
dispatch(setSearchCompanyByText(input))
  },[input, dispatch]);
  return (
    <div>
      <Navbar />
      <div className="mx-auto my-10 max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4">
          <Input
            className='h-11 w-full max-w-sm rounded-xl border-slate-200 bg-white px-4'
            placeholder="Filter By Name"
            onChange={(e) =>setInput(e.target.value)}
          />
          <Button className='rounded-xl bg-blue-600 hover:bg-blue-700'
                  onClick = {() => navigate('/admin/companies/create')}>New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
