import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "../ui/button";
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInitials = user?.fullname
        ?.split(" ")
        ?.map((part) => part[0])
        ?.join("")
        ?.slice(0, 2)
        ?.toUpperCase();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
        }
    }
    return (
        <>
            <div className='sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl'>
                <div className='mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4'>
                <div>
                    <h1 className='text-2xl font-black tracking-tight text-slate-950'>job <span className='text-blue-700'>Khojo</span></h1>
                </div>
                <div className='flex items-center gap-6'>
                    <ul className='flex items-center gap-5 font-medium text-slate-700'>
                        {
                            user && user.role == 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to='/admin/companies' className='transition-colors duration-200 hover:text-blue-700'>Companies</Link>
                                    </li>
                                    <li>
                                        <Link to='/admin/jobs' className='transition-colors duration-200 hover:text-blue-700'>Jobs</Link>
                                    </li>
                                </>
                            ) :
                                (
                                    <>
                                        <li>
                                            <Link to='/' className='transition-colors duration-200 hover:text-blue-700'>Home</Link>
                                        </li>
                                        <li>
                                            <Link to='/jobs' className='transition-colors duration-200 hover:text-blue-700'>Jobs</Link>
                                        </li>
                                        <li>
                                            <Link to='/browse' className='transition-colors duration-200 hover:text-blue-700'>Browse</Link>
                                        </li>
                                    </>

                                )
                        }

                    </ul>{
                        !user ? (
                            <div className='flex gap-5'>
                                <Link to="/login">
                                    <Button variant='outline'>Login</Button>
                                </Link>

                                <Link to="/signup">
                                    <Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button>
                                </Link>

                            </div>
                        ) : (<Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='h-10 w-10 cursor-pointer ring-2 ring-blue-100'>
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback className="bg-blue-100 text-blue-800">
                                        {userInitials || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80 rounded-2xl border border-slate-200 p-4 shadow-2xl'>
                                <div className="flex gap-4 space-y-2">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback className="bg-blue-100 text-blue-800">
                                            {userInitials || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 text-gray-600'>
                                    {
                                        user && user.role == 'student' && (
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link" asChild>
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )
                                    }
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut />
                                        <Button variant="link" onClick={logoutHandler}>Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>)
                    }
                </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;
