"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Logo from '@/public/logo-2.png';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const router = useRouter()

    const handleOnChange = (e) => {
        if (e.target.name === 'Email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'Password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await signIn('credentials', { email, password, redirect: false })
        if(data.error){
            toast.error(data.error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } })
        }else{
            toast.success('Login Successful', { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } })
            router.push('/admin')
        }
    }

    return (
        <div className="min-h-fit mt-20 flex flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className='mx-auto h-32 w-auto relative overflow-hidden'>
                    <Image className="object-contain" priority sizes='(max-width: 768px) 100vw, 768px' fill={true} src={Logo} alt="logo" />
                </div>
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold">
                    Sign-In Admin Account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="py-8 px-4 sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="Email" className="block text-sm font-medium leading-5 ">Email address</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="Email" name="Email" placeholder="user@example.com" type="email" required onChange={handleOnChange} value={email} className="appearance-none block bg-transparent w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="Password" className="block text-sm font-medium leading-5">Password</label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input id="Password" name="Password" type="password" required onChange={handleOnChange} value={password} className="appearance-none block w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-transparent placeholder-gray-400 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:border-purple-900 focus:shadow-outline-indigo active:bg-purple-900 transition-all duration-200 ease-in-out">
                                    Sign-In
                                </button>
                            </span>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AdminLogin
