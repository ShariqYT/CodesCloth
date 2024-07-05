"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useDarkMode } from '@/context/DarkModeContext';

const Tshirts = ({ products }) => {
    const { isDarkMode } = useDarkMode();
    return (
        <section className="body-font min-h-screen">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4 justify-center">
                    {Object.keys(products).length === 0 && <div className='flex flex-col justify-center items-center'>
                        <svg className='w-20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none">
                            <path d="M12 22C11.1818 22 10.4002 21.6708 8.83693 21.0123C4.94564 19.3734 3 18.5539 3 17.1754V7.54234M12 22C12.8182 22 13.5998 21.6708 15.1631 21.0123C19.0544 19.3734 21 18.5539 21 17.1754V7.54234M12 22V12.0292M21 7.54234C21 8.15478 20.1984 8.54152 18.5953 9.315L15.6741 10.7244C13.8712 11.5943 12.9697 12.0292 12 12.0292M21 7.54234C21 6.9299 20.1984 6.54316 18.5953 5.76969L17 5M3 7.54234C3 8.15478 3.80157 8.54152 5.40472 9.315L8.32592 10.7244C10.1288 11.5943 11.0303 12.0292 12 12.0292M3 7.54234C3 6.9299 3.80157 6.54317 5.40472 5.76969L7 5M6 13.0263L8 14.0234" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10 2L12 4M12 4L14 6M12 4L10 6M12 4L14 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        <p className='min-h-screen'>Sorry all the Tshirts are currently out of stock. New stock coming soon. Stay Tuned!</p>
                    </div>}
                    {Object.keys(products).map((item) => {
                        return (
                            <Link key={item} href={`/product/${products[item].slug}`} className="md:w-1/5 shadow-lg m-6 border rounded-lg border-gray-200 p-4 w-full">
                                <div className="flex justify-center  items-center relative rounded overflow-hidden">
                                    <Image unoptimized quality={100} width={1} height={1} className="w-52 rounded" priority={true} src={products[item].img} alt="tshirt" />
                                </div>
                                <div className="mt-4">
                                    <h3 className=" text-xs tracking-widest title-font mb-1">Hoodies</h3>
                                    <h2 className=" title-font text-lg font-medium">{products[item].title}</h2>
                                    <p className={`mt-1 text-purple-600 tracking-wider font-semibold drop-shadow-[0_0_20px_rgba(255,255,255,1)] text-2xl`}>₹{products[item].price}</p>
                                    <div className='mt-1'>
                                        {products[item].size.includes('S') && <span className={`border ${isDarkMode?'border-white':'border-black'} px-1 mx-1`}>S</span>}
                                        {products[item].size.includes('M') && <span className={`border ${isDarkMode?'border-white':'border-black'} px-1 mx-1`}>M</span>}
                                        {products[item].size.includes('L') && <span className={`border ${isDarkMode?'border-white':'border-black'} px-1 mx-1`}>L</span>}
                                        {products[item].size.includes('XL') && <span className={`border ${isDarkMode?'border-white':'border-black'} px-1 mx-1`}>XL</span>}
                                        {products[item].size.includes('XXL') && <span className={`border ${isDarkMode?'border-white':'border-black'} px-1 mx-1`}>XXL</span>}
                                    </div>
                                    <div className='mt-1'>
                                        {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-5 h-5 focus:outline-none"></button>}
                                        {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-5 h-5 focus:outline-none"></button>}
                                        {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-5 h-5 focus:outline-none"></button>}
                                        {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-5 h-5 focus:outline-none"></button>}
                                        {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-5 h-5 focus:outline-none"></button>}
                                        {products[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-5 h-5 focus:outline-none"></button>}
                                        {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-5 h-5 focus:outline-none"></button>}
                                        {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-300 rounded-full w-5 h-5 focus:outline-none"></button>}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Tshirts
