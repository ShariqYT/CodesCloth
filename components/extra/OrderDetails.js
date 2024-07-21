"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatIndianCurrency } from '@/components/extra/FormatAmount';
import { useDarkMode } from '@/context/DarkModeContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const OrderDetails = () => {
  const router = useRouter();
  const { isDarkMode } = useDarkMode();
  const [order, setOrder] = useState({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/sign-in');
      }
    });

    const fetchOrder = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getOrderID?id=${id}`);
        const data = await response.json();
        setOrder(data.order);

        // Format date and time
        const orderCreatedAt = data.order?.createdAt || 0;
        const d = new Date(orderCreatedAt);
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        setDate(d.toLocaleDateString("en-IN", options));
        setTime(d.toLocaleTimeString());
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id, router]);

  const product = order?.products || {};
  const total = order?.amount || 0;
  const inrTotal = formatIndianCurrency(total);

  return (
    <section className="my-20 relative min-h-screen">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-px-6 mx-auto">
        <h2 className="font-manrope font-bold text-3xl md:text-4xl leading-10 text-center">
          Payment Successful
        </h2>
        <p className={`mt-4 font-normal text-sm md:text-lg md:leading-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mb-11 text-center`}>
          Thanks for making a purchase. You can check your order summary below.
        </p>
        <div className="main-box border border-purple-700 rounded-xl pt-6 max-w-xl max-md:mx-auto md:max-w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between px-6 pb-6 border-b border-gray-200">
            <div className="data">
              <p className="font-semibold text-2xl leading-7">
                Order Id: <span className="text-purple-700 font-semibold">#{order.oid}</span>
              </p>
              <p className="font-semibold text-base leading-7 mt-4">
                Order Payment: <span className="text-purple-700 font-medium">{date} | {time}</span>
              </p>
            </div>
            <div className='flex items-center gap-10'>
              <div className='flex items-center gap-2'>
                <p className="font-medium text-xl leading-7">Status:</p>
                <p className="font-medium text-md leading-6 whitespace-nowrap py-0.5 px-3 rounded-full bg-emerald-50 border border-emerald-500 text-emerald-600">
                  {order.status}
                </p>
              </div>
              <button className="rounded-full px-2 py-2 md:py-4 md:px-5 font-semibold text-sm leading-7 text-white bg-purple-700 shadow-sm shadow-transparent transition-all duration-500 hover:bg-purple-800 hover:shadow-purple-600">
                Track Your Order
              </button>
            </div>
          </div>
          {Object.keys(product).length > 0 ? (
            Object.keys(product).map((key) => (
              <div key={key} className="w-full px-3 min-[400px]:px-6">
                <div className="flex flex-col md:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                  <div className="img-box relative w-32 h-32 overflow-hidden">
                    <Image sizes='100%' fill={true} priority={true} src={product[key].img} alt="Product" className="object-contain rounded-lg" />
                  </div>
                  <div className="flex flex-row items-center w-full ">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                      <div className="flex items-center">
                        <div>
                          <Link href={`/product/${key}`} className="font-semibold hover:text-purple-700 hover:underline md:text-xl leading-8 md:mb-3">
                            {product[key].name} ({product[key].size}/{product[key].variant})
                          </Link>
                          <div className="flex items-center">
                            <p className="font-semibold text-base leading-7">Qty: <span>{product[key].qty}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center md:mx-20">
                          <div className="flex gap-3 md:block">
                            <p className="font-medium md:text-xl leading-7">Price:</p>
                            <p className="md:mt-4 font-medium text-xl leading-7 text-purple-700">₹{product[key].price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">No products found</p>
          )}
          <p className="font-semibold text-right text-lg py-6 px-6">Total Price: <span className="text-2xl text-purple-700">₹{inrTotal}</span></p>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
