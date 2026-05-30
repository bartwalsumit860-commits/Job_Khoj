import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from '@/redux/authSlice'


const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    //api call
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message, { position: "top-center" });
                dispatch(setUser(res.data.user));
                navigate("/");
               

            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }

        finally {
            dispatch(setLoading(false));
        }
    }
    return (
        <>
            <Navbar />

            <div className='flex justify-center items-center max-w-10xl mx-auto'>
                <form onSubmit={submitHandler} action="" className='w-1/2 border-2 200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='my-2'>
                        <Label className='mb-2'>Email</Label>
                        <Input type="email"
                            placeholder="Example@gmail.com"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            className='p-4'>
                        </Input>
                    </div>

                    <div className='my-2'>
                        <Label className='mb-2'>Password</Label>
                        <Input type="password"
                            placeholder=""
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            className='p-4'>
                        </Input>
                    </div>

                    <div>
                        <div className="flex items-center justify-center">
                            <RadioGroup className='flex gap-4 my-2 items-center'>
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
                        </div>
                    </div>
                    {
                        loading ? <Button className='w-full my-4 p-2'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
                        </Button> : <Button type='submit' className='w-full my-4 p-2'>Login</Button>
                    }

                    <span className='text-sm'>Don't have an acouunt? <Link to="/signup"
                        className='text-blue-600'>SignUp</Link></span>
                </form>
            </div>
        </>
    )
}

export default Login
