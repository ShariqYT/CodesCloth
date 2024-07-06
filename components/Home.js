"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Banner from '@/public/banner/banner.jpg';
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import { useDarkMode } from '@/context/DarkModeContext';

const Home = () => {
    const { isDarkMode } = useDarkMode()
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        })
    }, [])
    return (
        <main className='overflow-x-hidden'>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <Image className='w-full h-full object-cover' width={1000} height={1000} priority src={Banner} alt="banner" />
            <section className='container flex justify-center items-center flex-col md:min-h-screen mx-auto mt-72'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 data-aos="fade-down" className='text-4xl font-bold'>COLLECTIONS</h1>
                    <div data-aos="fade-right" data-aos-duration="1000" className="border-2 rounded border-purple-600 w-[75%]"></div>
                </div>

                <div className='grid md:grid-cols-3 gap-10 w-fit h-fit mt-20 '>

                    <Link href={'/caps'} data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className={`cards1  ${isDarkMode ? `` : `border-2 `}`}>
                        <div className='p-2 overflow-hidden rounded-xl  cursor-pointer'>
                            <Image unoptimized src={"/collections/caps.png"} priority={true} width={1} height={1} className='w-72 h-full object-cover transition-all ease-in-out duration-300 hover:scale-110 rounded-md' alt="banner" />
                        </div>
                    </Link>
                    <Link href={'/mugs'} data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className={`cards1  ${isDarkMode ? `` : `border-2`}`}>
                        <div className='p-2 overflow-hidden rounded-xl  cursor-pointer'>
                            <Image unoptimized src={"/collections/mugs.png"} priority={true} width={1} height={1} className='w-72 h-full object-cover transition-all ease-in-out duration-300 hover:scale-110 rounded-md' alt="banner" />
                        </div>
                    </Link>
                    <Link href={'/mousepads'} data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className={`cards1  ${isDarkMode ? `` : `border-2`}`}>
                        <div className='p-2 overflow-hidden rounded-xl cursor-pointer'>
                            <Image unoptimized src={"/collections/mousepad.png"} priority={true} width={1} height={1} className='w-72 h-full object-cover transition-all ease-in-out duration-300 hover:scale-110 rounded-md' alt="banner" />
                        </div>
                    </Link>
                    <Link href={'/tshirts'} data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className={`cards1  ${isDarkMode ? `` : `border-2`}`}>
                        <div className='p-2 overflow-hidden rounded-xl cursor-pointer'>
                            <Image unoptimized src={"/collections/tshirt.png"} priority={true} width={1} height={1} className='w-72 h-full object-cover transition-all ease-in-out duration-300 hover:scale-110 rounded-md' alt="banner" />
                        </div>
                    </Link>
                    <Link href={'/hoodies'} data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className={`cards1  ${isDarkMode ? `` : `border-2`}`}>
                        <div className='p-2 overflow-hidden rounded-xl cursor-pointer'>
                            <Image unoptimized src={"/collections/hoodies.png"} priority={true} width={1} height={1} className='w-72 h-full object-cover transition-all ease-in-out duration-300 hover:scale-110 rounded-md' alt="banner" />
                        </div>
                    </Link>

                </div>
            </section>
            <section className="text-gray-600 m-32 body-font flex items-center justify-center md:flex-row flex-col container mx-auto">
                <div data-aos="zoom-in-right" className="p-4 w-full md:w-1/3">
                    <div className="flex justify-center w-full items-center rounded-lg h-full border-2 my-2 border-purple-700 py-8 flex-col">
                        <div className="w-10 h-10 mr-3 p-2 inline-flex items-center justify-center rounded-full bg-purple-700  flex-shrink-0">
                            <svg className='fill-white w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" /></svg>
                        </div>
                        <h2 className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg title-font font-medium`}>Premium Tshirts</h2>
                        <div className="flex-grow my-5">
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-black'} leading-relaxed text-base`}>Our T-Shirts are 100% made of cotton.</p>
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-in-up" className="p-4 w-full md:w-1/3">
                    <div className="flex justify-center w-full items-center rounded-lg h-full border-2 my-2 border-purple-700 py-8 flex-col">
                        <div className="w-10 h-10 mr-3 p-2 inline-flex items-center justify-center rounded-full bg-purple-700  flex-shrink-0">
                            <svg className='fill-white w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M640 0V400c0 61.9-50.1 112-112 112c-61 0-110.5-48.7-112-109.3L48.4 502.9c-17.1 4.6-34.6-5.4-39.3-22.5s5.4-34.6 22.5-39.3L352 353.8V64c0-35.3 28.7-64 64-64H640zM576 400a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM23.1 207.7c-4.6-17.1 5.6-34.6 22.6-39.2l46.4-12.4 20.7 77.3c2.3 8.5 11.1 13.6 19.6 11.3l30.9-8.3c8.5-2.3 13.6-11.1 11.3-19.6l-20.7-77.3 46.4-12.4c17.1-4.6 34.6 5.6 39.2 22.6l41.4 154.5c4.6 17.1-5.6 34.6-22.6 39.2L103.7 384.9c-17.1 4.6-34.6-5.6-39.2-22.6L23.1 207.7z" /></svg>
                        </div>
                        <h2 className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg title-font font-medium`}>Free Shipping</h2>
                        <div className="flex-grow my-5">
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-black'} leading-relaxed text-base`}>We ship all over India for FREE.</p>
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-in-left" className="p-4 w-full md:w-1/3">
                    <div className="flex justify-center w-full items-center rounded-lg h-full border-2 my-2 border-purple-700 py-8 flex-col">
                        <div className="w-10 h-10 mr-3 p-2 inline-flex items-center justify-center rounded-full bg-purple-700  flex-shrink-0">
                            <svg className='fill-white w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" /></svg>
                        </div>
                        <h2 className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg title-font font-medium`}>Exciting Offers</h2>
                        <div className="flex-grow my-5">
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-black'} px-5 leading-relaxed text-base text-center`}>We provide amazing offers & discounts on our products.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
