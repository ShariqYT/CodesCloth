"use client"
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useDarkMode } from '@/context/DarkModeContext';

const MyAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('');
    const { isDarkMode } = useDarkMode();
    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.phoneNumber) {
                    setPhone(user.phoneNumber.split('+91')[1] || '');
                    getUser(user.phoneNumber.split('+91')[1] || '');
                } else {
                    setEmail(user.email || '');
                    getUser(user.email || '');
                }
            } else {
                router.push('/sign-in');
                setPhone('');
                setEmail('');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const getUser = async (user) => {
        let u = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
        });
        let res = await u.json();
        if (res.success) {
            setName(res.name);
            setEmail(res.email);
            setPhone(res.phone || '');
            setAddress(res.address);
            setPincode(res.pincode || '');
        }else{
            toast.error(res.message, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        }

    };

    const handleChange = async (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'phone':
                if (value.length <= 10) {
                    setPhone(value);
                }
                break;
            case 'pincode':
                if (value.length <= 6) {
                    setPincode(value);
                }
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !address || !phone || !pincode) {
            toast.error('All fields are required', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
            return;
        }
        const data = {
            name,
            email,
            address,
            pincode,
            phone
        }
        let u = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/updateUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let res = await u.json();
        if (res.success) {
            router.push('/');
            toast.success(res.message, { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
        } else {
            toast.error(res.message, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        }
    }
    return (
        <div>
            <div className="my-16 md:my-12 items-center gap-10 flex flex-col min-h-screen relative">
                <div className='flex flex-col mb-8 md:mb-24 items-center gap-1 justify-center'>
                    <h3 className="text-2xl text-center  font-semibold">My Account</h3>
                    <div data-aos="fade-right" data-aos-duration="1000" className="border-2 rounded border-purple-600 w-[75%]"></div>
                </div>

                <div className="md:w-full w-96 container ">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="name" className="text-sm font-medium block mb-2">Full Name</label>
                            <input value={name} onChange={handleChange} type="text" name="name" id="name" className={`shadow-sm outline-none ${isDarkMode ? "bg-black" : "bg-white"} border-2 border-gray-300 focus:border-purple-700 sm:text-sm rounded-lg block w-full p-2.5`} placeholder=" John Doe" required />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="email" className="text-sm font-medium block mb-2">Email <span className='text-sm font-normal'>(cannot be updated)</span></label>
                            <input value={email} onChange={handleChange} type="email" name="email" id="email" className={`shadow-sm outline-none ${isDarkMode ? "bg-black" : "bg-white"} border-2 border-gray-300 focus:border-purple-700 sm:text-sm rounded-lg block w-full p-2.5`} placeholder="email@example.com" required />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="address" className="text-sm font-medium block mb-2">Address</label>
                            <textarea value={address} onChange={handleChange} id="address" rows={3} name='address' className={`${isDarkMode ? "bg-black" : "bg-white"} border-2 focus:border-purple-700 resize-none border-gray-300 sm:text-sm rounded-lg outline-none block w-full p-2.5`} placeholder="Your address"></textarea>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="phone" className="text-sm font-medium block mb-2">Phone Number <span className='text-sm font-normal'>(cannot be updated)</span></label>
                            <input type="number" name="phone" id="phone" className={`shadow-sm outline-none ${isDarkMode ? "bg-black" : "bg-white"} border-2 border-gray-300 focus:border-purple-700 sm:text-sm rounded-lg block w-full p-2.5`} placeholder='Enter 10-digit number' value={phone} onChange={handleChange} />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="pincode" className="text-sm font-medium block mb-2">PinCode <span className='text-sm font-normal'>(India)</span></label>
                            <input type="number" maxLength={6} name="pincode" id="pincode" className={`shadow-sm outline-none ${isDarkMode ? "bg-black" : "bg-white"} border-2 border-gray-300 focus:border-purple-700 sm:text-sm rounded-lg block w-full p-2.5`} value={pincode} onChange={handleChange} placeholder='Enter 6-digit pincode' required />
                        </div>
                    </div>
                </div>
                <p className='text-sm text-red-700'>Note: Please update your details here to continue</p>
                <button type="submit" onClick={handleSubmit} className="text-white mx-6 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save all</button>
            </div>
        </div>
    )
}

export default MyAccount
