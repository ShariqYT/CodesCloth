"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Logo from '@/public/logo-2.png';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        const result = await signIn('credentials', { email, password, redirect: false });

        if (result.error) {
            toast.error(result.error, {
                duration: 5000,
                style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' },
            });
        } else {
            toast.success('Login Successful', {
                duration: 5000,
                style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' },
            });
            router.push('/admin');
        }
    };

    return (
        <div className="flex flex-col justify-center mt-20">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mx-auto h-32 w-auto relative overflow-hidden">
                    <Image
                        className="object-contain"
                        priority
                        sizes="(max-width: 768px) 100vw, 768px"
                        fill
                        src={Logo}
                        alt="logo"
                    />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold">
                    Sign In to Admin Account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="py-8 px-4 sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">Email address</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="user@example.com"
                                    required
                                    onChange={handleChange}
                                    value={formData.email}
                                    className="appearance-none bg-transparent block w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 transition duration-150 ease-in-out sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="password" className="block text-sm font-medium">Password</label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    onChange={handleChange}
                                    value={formData.password}
                                    className="appearance-none block w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-transparent placeholder-gray-400 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 transition duration-150 ease-in-out sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:border-purple-900 focus:shadow-outline-indigo active:bg-purple-900 transition-all duration-200 ease-in-out"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
