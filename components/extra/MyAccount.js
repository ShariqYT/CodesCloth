"use client"
import React, { useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import { CartContext } from '@/context/CartContext';

const MyAccount = () => {
    const { user } = useContext(CartContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState(0);
    const [pincode, setPincode] = useState('');
    const [disabled, setDisabled] = useState(true);
    const auth = getAuth(app);
    const router = useRouter();



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setPhone(user.phoneNumber.split('+91')[1] || '');
                getUser(user.phoneNumber.split('+91')[1] || '');
            } else {
                router.push('/login');
                setPhone('');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const getUser = async (userPhone) => {
        let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userPhone }),
        });
        let res = await u.json();
        if (res.success) {
            setName(res.name);
            setEmail(res.email);
            setAddress(res.address);
            setPincode(res.pincode);
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
            case 'pincode':
                setPincode(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            address,
            pincode,
            phone
        }
        let u = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let res = await u.json();
        if (res.success) {
            toast.success(res.message, { duration: 5000, style: { border: '2px solid green', padding: '15px 20px' } });
        } else {
            toast.error(res.message, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px' } });
        }
    }
    return (
        <div>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <div className="bg-white items-center gap-10 flex flex-col min-h-screen relative">
                <h3 className="text-2xl text-center mt-32 font-semibold">My Account</h3>

                <div className="w-full container ">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Full Name</label>
                            <input value={name} onChange={handleChange} type="text" name="name" id="name" className="shadow-sm outline-none bg-gray-50 border-2 border-gray-300 focus:border-purple-700 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder=" John Doe" required />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email <span className='text-sm font-normal'>(cannot be updated)</span></label>
                            <input value={email} onChange={handleChange} type="email" name="email" id="email" className="shadow-sm outline-none bg-gray-50 border-2 border-gray-300 focus:border-purple-700 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="email@example.com" required />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="address" className="text-sm font-medium text-gray-900 block mb-2">Address</label>
                            <textarea value={address} onChange={handleChange} id="address" rows={3} name='address' className="bg-gray-50 border-2 focus:border-purple-700 resize-none border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5" placeholder="Your address"></textarea>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-900 block mb-2">Phone Number <span className='text-sm font-normal'>(cannot be updated)</span></label>
                            <input type="number" name="phone" id="phone" className="shadow-sm outline-none bg-gray-50 border-2 border-gray-300 focus:border-purple-700 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" value={phone} onChange={handleChange} readOnly />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="pincode" className="text-sm font-medium text-gray-900 block mb-2">PinCode <span className='text-sm font-normal'>(India)</span></label>
                            <input type="number" name="pincode" id="pincode" className="shadow-sm outline-none bg-gray-50 border-2 border-gray-300 focus:border-purple-700 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" value={pincode} onChange={handleChange} required />
                        </div>
                    </div>
                </div>
                <button onClick={handleSubmit} className="text-white mx-6 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save all</button>
            </div>
        </div>
    )
}

export default MyAccount
