import { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { setLoading, setUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

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
            toast.error(error?.response?.data?.message || "Unable to login");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_32%)] px-4 py-10">
                <div className="mx-auto flex max-w-7xl justify-center">
                    <form
                        onSubmit={submitHandler}
                        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
                    >
                        <div className="mb-8 text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
                                Welcome back
                            </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                                Login
                            </h1>
                        </div>

                        <div className="my-4 space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Email</Label>
                            <Input
                                type="email"
                                placeholder="example@gmail.com"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                            />
                        </div>

                        <div className="my-4 space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                            />
                        </div>

                        <div className="my-5">
                            <Label className="mb-3 block text-sm font-medium text-slate-700">
                                Account Type
                            </Label>
                            <RadioGroup
                                className="grid grid-cols-2 gap-3"
                                value={input.role}
                                onValueChange={(value) => setInput({ ...input, role: value })}
                            >
                                <Label
                                    htmlFor="student"
                                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                                >
                                    <RadioGroupItem value="student" id="student" />
                                    Student
                                </Label>
                                <Label
                                    htmlFor="recruiter"
                                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                                >
                                    <RadioGroupItem value="recruiter" id="recruiter" />
                                    Recruiter
                                </Label>
                            </RadioGroup>
                        </div>

                        {loading ? (
                            <Button className="mt-4 w-full rounded-xl p-2" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="mt-4 w-full rounded-xl p-2">
                                Login
                            </Button>
                        )}

                        <p className="mt-4 text-center text-sm text-slate-600">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-medium text-blue-700 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
