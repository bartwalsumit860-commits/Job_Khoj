import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover';

import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar"

import React from 'react';
import { Button } from "../ui/button";
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const {user} = useSelector(store =>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler= async ()=>{
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`,{
                withCredentials:true
            });

            if(res.data.success){
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
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div className='bg-white'>
                    <h1 className='text-2xl font-bold'>job <span className='text-[#0254f8]'>Khojo</span></h1>
                </div>
                <div className='flex items-center gap-13'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li>
                            <Link to='/' className='hover:text-blue-900 hover:underline transform-300'>  Home</Link>
                        </li>
                        <li>
                            <Link to='/jobs' className='hover:text-blue-900 hover:underline transform-300'>Jobs</Link>
                        </li>
                        <li>
                            <Link to='/browse' className='hover:text-blue-900 hover:underline transform-300'>Browse</Link>
                        </li>
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
                                <Avatar className='cursor-pointer h-10 w-10'>
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt="@shadcn"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80'>
                                <div className="flex gap-4 space-y-2">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="@shadcn"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 text-gray-600'>
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <User2 />
                                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                    </div>
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
        </>
    )
}

export default Navbar;