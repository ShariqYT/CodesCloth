"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { CartContext } from '@/context/CartContext';
import { useDarkMode } from '@/context/DarkModeContext';
import { formatIndianCurrency } from '@/components/extra/FormatAmount';

const MyCart = () => {
    const { cart, subTotal, addToCart, removeFromCart, clearCart } = useContext(CartContext);
    const [spin, setSpin] = useState(false);
    const inrSubTotal = formatIndianCurrency(subTotal);
    const { isDarkMode } = useDarkMode();

    return (
        <div className="container min-h-screen mx-auto mb-20 md:mb-2 mt-10">
            <div className="sm:flex border border-purple-700 rounded shadow-lg my-10">
                <div className='flex flex-col md:w-[45vw] w-full justify-between'>
                    <div className="w-full px-4 md:px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                            <h2 className="font-semibold text-2xl">{Object.keys(cart).length} Items</h2>
                        </div>
                        <ul className='overflow-y-auto overflow-x-hidden pl-8 md:px-4 h-[50vh]'>
                            {Object.keys(cart).length == 0 && (
                                <div className='flex justify-center flex-col-reverse items-center'>
                                    <p className="text-2xl font-bold">
                                        Your Cart is empty.
                                    </p>
                                    <svg className={`w-12 pt-32`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                        <path d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H19M6 6.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M10.5 3L13.5 6M13.5 6L16.5 9M13.5 6L10.5 9M13.5 6L16.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="10.5" cy="20.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="17.5" cy="20.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>
                            )}
                            {Object.keys(cart).map((k) => {
                                return <li className='list-none' key={k}>
                                    <div className="flex flex-col items-center md:flex-row md:items-strech py-8 md:py-10 ">
                                        <div className="md:w-48 md:h-48 relative overflow-hidden 2xl:w-1/4 w-32 h-32 rounded-lg">
                                            <Image fill={true} src={cart[k].img} priority={true} sizes='100%' alt="Product Image" className="object-contain rounded-lg" />
                                        </div>
                                        <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                                            <div className="flex items-center justify-between w-full">
                                                <p className={`text-lg h-full font-bold md:truncate leading-none ${isDarkMode?"text-white":"text-gray-800"}`}>{cart[k].name}</p>
                                                <p aria-label="Select quantity" className="py-2 px-4 border border-gray-200 mr-6">{cart[k].qty}</p>
                                            </div>
                                            <p className={`text-sm font-semibold leading-3 ${isDarkMode?"text-gray-300":"text-gray-800"} pt-2`}>Size: {cart[k].size}</p>
                                            <p className={`text-sm font-semibold leading-3 ${isDarkMode?"text-gray-300":"text-gray-800"} py-4`}>Color: {cart[k].variant}</p>

                                            <div className="flex items-center justify-between pt-5">
                                                <div className="flex items-center">
                                                    <button onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className="text-xs font-semibold leading-3 flex  items-center gap-2 bg-purple-500 hover:bg-purple-700 rounded py-2 px-5 text-white cursor-pointer"><svg className=' w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                        <path d="M8 16.0001H15.2632C19.7508 16.0001 20.4333 13.1809 21.261 9.06916C21.4998 7.8832 21.6192 7.29022 21.3321 6.89515C21.1034 6.58048 20.7077 6.51645 20 6.50342" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M9 6.5H17M13 10.5V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <circle cx="10.5" cy="20.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                                                        <circle cx="17.5" cy="20.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                                                    </svg>Add</button>
                                                    <button onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className="text-xs font-semibold leading-3 py-2 px-6 hover:underline text-red-500 pl-5 cursor-pointer">Remove</button>
                                                </div>
                                                <p className={`md:text-xl text-2xl mx-8 md:mx-0 font-bold leading-none text-purple-700`}>₹{cart[k].price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className='flex justify-between mx-5 md:mx-20 items-center my-10'>
                        <Link href={"/"} className="flex font-semibold text-purple-800 text-sm">
                            <svg className="fill-current mr-2 text-purple-800 w-4" viewBox="0 0 448 512">
                                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                            </svg>
                            Continue Shopping
                        </Link>
                        <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className='disabled:opacity-50 disabled:hover:bg-purple-700 bg-purple-700 rounded font-semibold hover:bg-red-500 px-2 py-3 text-sm text-white uppercase flex items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>Clear Cart</button>
                    </div>
                </div>
                <div className='w-2 m-10 rounded-full opacity-50 bg-purple-700'></div>
                <div id="summary" className="w-full flex flex-col sm:w-1/4 md:w-1/2 px-8 py-10">
                    <div>
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <label className="font-medium inline-block mb-3 text-sm uppercase">
                            Shipping
                        </label>
                        <select disabled className="block p-2 border outline-none border-purple-700 focus:border-purple-900 text-gray-600 w-full text-sm">
                            <option>Standard shipping - ₹FREE</option>
                        </select>
                    </div>

                    <div className="border-t mt-8">
                        <div className="flex justify-between py-6 text-lg uppercase">
                            <span className='font-semibold'>Total cost:</span>
                            <span className='font-bold text-purple-700'>₹{inrSubTotal ? inrSubTotal : 0}</span>
                        </div>
                        <Link href={'/checkout'}>
                            <button onClick={() => {setSpin(true), setTimeout(() => {setSpin(false)}, 500)}} disabled={Object.keys(cart).length === 0} className="disabled:opacity-50 disabled:hover:bg-purple-700 bg-purple-700 flex justify-center items-center gap-1 rounded font-semibold hover:bg-purple-800 py-3 text-sm text-white uppercase w-full">
                            {spin && <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>}{spin?'Checking out...':'Proceed to checkout'}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCart
