import { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

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
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

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
                toast.success(res.data.message, { position: "top-center" });
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Unable to create account", { position: "top-center" });
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
                        className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
                    >
                        <div className="mb-8 text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
                                Create your account
                            </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                                Sign up
                            </h1>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">Email</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="example@gmail.com"
                                    className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">Phone Number</Label>
                                <Input
                                    type="tel"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    className="h-11 rounded-xl border-slate-200 bg-slate-50 px-4"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <Label className="mb-3 block text-sm font-medium text-slate-700">
                                Account Type
                            </Label>
                            <RadioGroup
                                className="grid grid-cols-1 gap-3 md:grid-cols-2"
                                value={input.role}
                                onValueChange={(value) => setInput({ ...input, role: value })}
                            >
                                <Label
                                    htmlFor="signup-student"
                                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                                >
                                    <RadioGroupItem value="student" id="signup-student" />
                                    Student
                                </Label>
                                <Label
                                    htmlFor="signup-recruiter"
                                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                                >
                                    <RadioGroupItem value="recruiter" id="signup-recruiter" />
                                    Recruiter
                                </Label>
                            </RadioGroup>
                        </div>

                        <div className="mt-6">
                            <Label className="mb-3 block text-sm font-medium text-slate-700">
                                Profile Photo
                            </Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="cursor-pointer rounded-xl border-slate-200 bg-slate-50 px-4 py-2"
                            />
                        </div>

                        {loading ? (
                            <Button className="mt-8 w-full rounded-xl p-2" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button className="mt-8 w-full rounded-xl p-2" type="submit">
                                Sign up
                            </Button>
                        )}

                        <p className="mt-4 text-center text-sm text-slate-600">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-blue-700 hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
