"use client"
import Link from 'next/link';
import { formatIndianCurrency } from '@/components/extra/FormatAmount';
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { useDarkMode } from '@/context/DarkModeContext';

const MyOrders = () => {
    const { darkMode } = useDarkMode();
    const auth = getAuth(app);
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async (phoneNumber) => {
            try {
                const response = await fetch('/api/myOrders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phoneNumber }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/sign-in');
            } else {
                const phoneNumber = user.phoneNumber;
                if (phoneNumber) {
                    fetchOrders(phoneNumber);
                } else {
                    console.error("User phone number not available");
                }
            }
        });
    }, [auth, router]);

    return (
        <section className="w-full min-h-screen py-8 antialiased  ">
            <div className='flex flex-col items-center gap-1 justify-center'>
                <h3 className="text-2xl text-center mt-10 md:mt-1 font-semibold">My Orders</h3>
                <div data-aos="fade-right" data-aos-duration="1000" className="border-2 rounded border-purple-600 md:w-[4%] w-[25%]"></div>
            </div>
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-4xl">


                    {/* <div className="flex flex-wrap items-center gap-y-4 py-6">
                                <dl className="w-1/2 sm:w-1/4 md:w-auto md:flex-1">
                                    <dd className="mt-2 text-base font-semibold text-gray-900 ">
                                        <Link href="#" className="hover:underline">#FWB127364372</Link>
                                    </dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 md:w-auto md:flex-1">

                                    <dd className="mt-2 text-base font-semibold text-gray-900 ">20.12.2023</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 md:w-auto md:flex-1">

                                    <dd className="mt-2 text-base font-semibold text-gray-900 ">$4,756</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 md:w-auto md:flex-1">

                                    <dd className="me-2 mt-2 inline-flex items-center rounded bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                        </svg>
                                        Pre-order
                                    </dd>
                                </dl>

                                <div className="w-full grid sm:grid-cols-2 md:flex md:w-64 md:items-center md:justify-end gap-4">
                                    <button type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 md:w-auto">Cancel order</button>
                                    <Link href="#" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto">View details</Link>
                                </div>
                            </div> */}
                    {/* <div className="flex flex-wrap items-center gap-y-4 py-6">
                                <dl className="w-1/2 sm:w-1/4 md:w-auto md:flex-1">
                                    
                                    <dd className="mt-2 text-base font-semibold text-gray-900 ">
                                        <Link href="#" className="hover:underline">#FWB125467980</Link>
                                    </dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 md:w-auto md:flex-1">
                                    
                                    <dd className="mt-2 text-base font-semibold text-gray-900 ">11.12.2023</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 md:w-auto md:flex-1">
                                    
                                    <dd className="mt-2 text-base font-semibold text-gray-900 ">$499</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 md:w-auto md:flex-1">
                                    
                                    <dd className="me-2 mt-2 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                        </svg>
                                        In transit
                                    </dd>
                                </dl>

                                <div className="w-full grid sm:grid-cols-2 md:flex md:w-64 md:items-center md:justify-end gap-4">
                                    <button type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 md:w-auto">Cancel order</button>
                                    <Link href="#" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto">View details</Link>
                                </div>
                            </div> */}

                    {orders.map((order) => {
                        const date = new Date(order.createdAt);
                        let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
                        return (

                            <div key={order.oid} className='flex w-full justify-center flex-col my-6 rounded-lg border-2 border-purple-700'>

                                <div className="md:flex text-center md:justify-evenly items-center gap-4 py-6 px-3">
                                    {Object.values(order.products).map((key, index) => {
                                        return (
                                            <div key={index}>
                                                <dl className="sm:w-1/2 flex md:w-auto md:hidden md:gap-16 md:items-center md:justify-center">
                                                    <dd className="text-base font-semibold w-full  truncate">{key.name}s</dd>
                                                </dl>
                                            </div>
                                        )
                                    })}
                                    <dl className="sm:w-1/2 md:w-auto md:flex md:flex-col md:items-center md:justify-center">
                                        <dd className="text-xl hidden md:block text-purple-700 font-semibold w-full">#{order.oid}</dd>
                                        <dd className="text-base md:flex gap-2 font-semibold w-full text-gray-400 ">{date.toLocaleString("en-IN", options)}  <span className='hidden md:block'>  |  {date.toLocaleTimeString()}</span></dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/2 md:flex md:items-center md:justify-between md:gap-8">
                                        <div className='hidden md:block'>
                                            <p className="mt-2 text-base font-semibold ">Price:</p>
                                            <dd className="mt-2 text-base font-semibold text-purple-700 ">₹{formatIndianCurrency(order.amount)}</dd>
                                        </div>
                                        <div className='hidden md:block'>
                                            <p className="mt-2 text-base font-semibold  ">Status:</p>
                                            <dd className="me-2 mt-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                </svg>
                                                {order.status}
                                            </dd>
                                        </div>
                                        <button className="hidden md:flex md:items-center md:justify-end">
                                            <Link href={"/order-placed?id=" + order._id} className=" justify-center items-center rounded-lg border border-purple-700  px-3 py-2 text-sm font-medium  hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100  md:w-auto">View details</Link>
                                        </button>
                                    </dl>
                                </div>
                                <div className="mt-2 flex justify-center items-center pb-2 text-base font-semibold text-gray-900 ">
                                    {Object.values(order.products).map(product => (
                                        <div key={product.name} className='md:w-32 md:h-32 w-16 h-16 relative overflow-hidden flex justify-center items-center'>
                                            <Image priority src={product.img} alt={""} sizes='(100vw - 2rem)' fill={true} />
                                        </div>
                                    ))}
                                </div>
                                <button className="md:hidden mb-2">
                                    <Link href={"/order-placed?id=" + order._id} className=" justify-center items-center rounded-lg border border-purple-700  px-2 py-1 text-sm font-medium hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100  md:w-auto">View details</Link>
                                </button>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default MyOrders
