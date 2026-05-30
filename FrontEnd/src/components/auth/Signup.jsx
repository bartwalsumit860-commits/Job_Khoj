import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import store from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const navigate = useNavigate();
    const {loading} = useSelector(store=>store.auth)
    const dispatch = useDispatch();
    //text json data
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    //file data
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    //api call

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }


        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message,{position:"top-center"});
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message,{position:"top-center"});
        }finally{
            dispatch(setLoading(false));
        }
    }
    return (

        <>
            <Navbar />

            <div className='flex justify-center items-center max-w-10xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border-2 200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-6'>
                        <Label className='mb-3'>Full Name</Label>
                        <Input type="text"
                            value={input.fullName}
                            name="fullname"
                            onChange={changeEventHandler}
                            className='p-4'>
                        </Input>
                    </div>
                    <div className='my-2'>
                        <Label className='mb-2'>Email</Label>
                        <Input type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Example@gmail.com"
                            className='p-4'>
                        </Input>
                    </div>
                    <div className='my-2'>
                        <Label className='mb-2'>Phone Number</Label>
                        <Input type="tel"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder=""
                            className='p-4'>
                        </Input>
                    </div>

                    <div className='my-2'>
                        <Label className='mb-2'>Password</Label>
                        <Input type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder=""
                            className='p-4'>
                        </Input>
                    </div>

                    <div>
                        <div className="flex items-center justify-center">
                            <RadioGroup className='flex gap-4 my-5 items-center'>
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role == 'student'}
                                        onChange={changeEventHandler}
                                        className='cursor-pointer'>

                                    </Input>
                                    <Label htmlFor="option-one">Student</Label>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role == 'recruiter'}
                                        onChange={changeEventHandler}
                                        className='cursor-pointer'>
                                    </Input>
                                    <Label htmlFor="option-two">Recruiter</Label>
                                </div>
                            </RadioGroup>

                            <div className='flex items-center gap-2'>
                                <Label className='font-bold'>Profile</Label>
                                <Input
                                    type='file'
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className='cursor-pointer font-medium'
                                />
                            </div>
                        </div>
                    </div>{
                        loading?
                        <Button className='w-full my-4 p-2'>
                            <Loader2 className='h-4 w-4 animate-spin'/>
                        </Button>:   <Button className='w-full my-4 p-2'>SignUp</Button>
                    }
                 
                    <span className='text-sm'>Already have an acouunt? <Link to="/login"
                        className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </>
    )
}

export default Signup