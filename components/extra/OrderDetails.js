"use client"

import Image from 'next/image';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatIndianCurrency } from '@/components/extra/FormatAmount';
import { CartContext } from '@/context/CartContext';

const OrderDetails = () => {
  const {user} = useContext(CartContext)
  const [order, setOrder] = useState({});
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  useEffect(() => {
    if(!user){
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    const orderCreatedAt = order?.createdAt || 0;
    let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const d = new Date(orderCreatedAt);
    setDate(d.toLocaleString("en-IN", options));
    setTime(d.toLocaleTimeString());
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getOrderID?id=${id}`);
        const data = await response.json();
        setOrder(data.order);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id, order?.createdAt]);

  const product = order?.products || [];
  const total = order?.amount || 0;
  const inrTotal = formatIndianCurrency(total);

  return (
    <section className="my-20 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
          Payment Successful
        </h2>
        <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase you can check your order summary from below</p>
        <div className="main-box border border-purple-700 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
            <div className="data">
              <p className="font-semibold text-2xl leading-7 text-black">Order Id: <span className="text-purple-700 font-semibold">#{order.oid}</span></p>
              <p className="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span className="text-purple-700 font-medium">{date} | {time}</span></p>
            </div>
            <div className='flex items-center gap-10'>
              <div className='flex items-center gap-2'>
                <p className="font-medium text-xl leading-7 text-black">Status:</p>
                <p className="font-medium text-md leading-6 whitespace-nowrap py-0.5 px-3 rounded-full bg-emerald-50 border border-emerald-500 text-emerald-600">
                  {order.status}
                </p>
              </div>
              <button className="rounded-full py-4 px-5 font-semibold text-sm leading-7 text-white bg-purple-700 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-purple-800 hover:shadow-purple-600">
                Track Your Order
              </button>
            </div>
          </div>
          {Object.keys(product).map((key) => {
            return (
              <div key={key} className="w-full px-3 min-[400px]:px-6">
                <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                  <div className="img-box max-lg:w-full">
                    <Image unoptimized quality={100} width={1} height={1} priority={true} src={product[key].img} alt="Premium Watch image"
                      className="aspect-square w-full lg:max-w-[140px]" />
                  </div>
                  <div className="flex flex-row items-center w-full ">
                    <div className="flex justify-between w-full">
                      <div className="flex items-center">
                        <div>
                          <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                            {product[key].name}({product[key].size}/{product[key].variant})</h2>
                          <div className="flex items-center ">
                            <p className="font-medium text-base leading-7 text-black ">Qty: <span className="text-gray-500">{product[key].qty}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center mx-20">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-xl leading-7 text-black">Price</p>
                            <p className="lg:mt-4 font-medium text-xl leading-7 text-purple-700">₹{product[key].price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-end ">
          </div>
          <p className="font-semibold text-right text-lg text-black py-6 px-6">Total Price: <span className="text-2xl text-purple-700">₹{inrTotal}</span></p>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;