/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { formatIndianCurrency } from '@/components/FormatAmount';

const page = () => {
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
        router.push('/login');
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
    <section className="bg-white min-h-screen py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">My orders</h2>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-purple-700">

              {/* <div className="flex flex-wrap items-center gap-y-4 py-6">
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                  <dd className="mt-2 text-base font-semibold text-gray-900 ">
                    <Link href="#" className="hover:underline">#FWB127364372</Link>
                  </dd>
                </dl>

                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                  <dd className="mt-2 text-base font-semibold text-gray-900 ">20.12.2023</dd>
                </dl>

                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                  <dd className="mt-2 text-base font-semibold text-gray-900 ">$4,756</dd>
                </dl>

                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                  <dd className="me-2 mt-2 inline-flex items-center rounded bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                    </svg>
                    Pre-order
                  </dd>
                </dl>

                <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                  <button type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</button>
                  <Link href="#" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</Link>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-y-4 py-6">
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                  <dd className="mt-2 text-base font-semibold text-gray-900 ">
                    <Link href="#" className="hover:underline">#FWB125467980</Link>
                  </dd>
                </dl>

                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                  <dd className="mt-2 text-base font-semibold text-gray-900 ">11.12.2023</dd>
                </dl>

                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                  <dd className="mt-2 text-base font-semibold text-gray-900 ">$499</dd>
                </dl>

                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                  <dd className="me-2 mt-2 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                    </svg>
                    In transit
                  </dd>
                </dl>

                <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                  <button type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</button>
                  <Link href="#" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</Link>
                </div>
              </div> */}

              {orders.map((order) => {
                const date = new Date(order.createdAt);
                let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
                return (
                  <div key={order.oid} className="flex justify-between items-center gap-4 py-6">
                    <div className='flex w-full'>
                      <dl className="sm:w-1/4 lg:w-auto md:flex md:gap-16 md:items-center md:justify-center">
                        <div>
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                          <dd className="mt-2 text-base font-semibold text-gray-900 ">
                            <p className="w-fit">#{order.oid}</p>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                          <dd className="mt-2 text-base font-semibold w-full text-gray-900 ">{date.toLocaleString("en-IN", options)} | {date.toLocaleTimeString()}</dd>
                        </div>
                      </dl>

                    </div>

                    <dl className="w-1/2 sm:w-1/4 md:w-auto md:flex md:items-center md:justify-center md:gap-8">
                      <div>
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                        <dd className="mt-2 text-base font-semibold text-purple-700 ">₹{formatIndianCurrency(order.amount)}</dd>
                      </div>
                      <div>
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                        <dd className="me-2 mt-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                          </svg>
                          {order.status}
                        </dd>
                      </div>
                      <div className="w-full grid sm:grid-cols-2 md:flex md:w-64 md:items-center md:justify-end gap-4">
                        <Link href={"/order-placed?id=" + order._id} className="w-full inline-flex justify-center rounded-lg  border border-purple-700 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100  lg:w-auto">View details</Link>
                      </div>
                    </dl>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page
