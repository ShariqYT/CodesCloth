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
                const userIdentifier = user.phoneNumber ? user.phoneNumber.split('+91')[1] : user.email || '';
                getUser(userIdentifier);
            } else {
                router.push('/sign-in');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const getUser = async (user) => {
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user }),
            });
            let result = await response.json();
            if (result.success) {
                setName(result.name);
                setEmail(result.email);
                setPhone(result.phone || '');
                setAddress(result.address);
                setPincode(result.pincode || '');
            } else {
                toast.error(result.message, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
            }
        } catch (error) {
            toast.error('Failed to fetch user data', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        }
    };

    const handleChange = (e) => {
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
                if (/^\d{0,10}$/.test(value)) {
                    setPhone(value);
                }
                break;
            case 'pincode':
                if (/^\d{0,6}$/.test(value)) {
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
        const data = { name, email, address, pincode, phone };
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/updateUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let result = await response.json();
            if (result.success) {
                toast.success(result.message, { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
                router.push('/');
            } else {
                toast.error(result.message, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
            }
        } catch (error) {
            toast.error('Failed to update user data', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        }
    }

    return (
        <div className={`my-16 md:my-12 flex flex-col items-center gap-10 min-h-screen relative ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className='flex flex-col mb-8 md:mb-24 items-center gap-1 justify-center'>
                <h3 className="text-2xl font-semibold">My Account</h3>
                <div data-aos="fade-right" data-aos-duration="1000" className="border-2 rounded border-purple-600 w-[75%]"></div>
            </div>

            <div className="md:w-full w-80 md:container ">
                <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="name" className="text-sm font-medium block mb-2">Full Name</label>
                        <input value={name} onChange={handleChange} type="text" name="name" id="name" className="shadow-sm outline-none border-2 border-gray-300 focus:border-purple-700 bg-transparent sm:text-sm rounded-lg block w-full p-2.5" placeholder="John Doe" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email" className="text-sm font-medium block mb-2">Email <span className='text-sm font-normal'>(cannot be updated)</span></label>
                        <input value={email} onChange={handleChange} type="email" name="email" id="email" className="shadow-sm outline-none border-2 border-gray-300 focus:border-purple-700 sm:text-sm bg-transparent rounded-lg block w-full p-2.5" placeholder="email@example.com" readOnly />
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="address" className="text-sm font-medium block mb-2">Address</label>
                        <textarea value={address} onChange={handleChange} id="address" rows={3} name='address' className="border-2 border-gray-300 focus:border-purple-700 resize-none rounded-lg bg-transparent outline-none block w-full p-2.5" placeholder="Your address"></textarea>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="phone" className="text-sm font-medium block mb-2">Phone Number <span className='text-sm font-normal'>(cannot be updated)</span></label>
                        <input type="text" name="phone" id="phone" className="shadow-sm outline-none border-2 border-gray-300 focus:border-purple-700 sm:text-sm rounded-lg block w-full bg-transparent p-2.5" placeholder='Enter 10-digit number' value={phone} onChange={handleChange} maxLength={10} />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="pincode" className="text-sm font-medium block mb-2">PinCode <span className='text-sm font-normal'>(India)</span></label>
                        <input type="text" name="pincode" id="pincode" className="shadow-sm outline-none border-2 border-gray-300 focus:border-purple-700 sm:text-sm rounded-lg block w-full bg-transparent p-2.5" value={pincode} onChange={handleChange} placeholder='Enter 6-digit pincode' maxLength={6} />
                    </div>
                    <div className="col-span-full flex flex-col items-center justify-center gap-4">
                        <p className='text-sm text-red-700 text-center'>Note: Please update your details here to continue</p>
                        <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save all</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default MyAccount;
