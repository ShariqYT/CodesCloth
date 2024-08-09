"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-hot-toast';
import { useDarkMode } from '@/context/DarkModeContext';
import Tshirt from '@/public/collections/tshirt.webp';
import Mug from '@/public/collections/mugs.webp';
import Cap from '@/public/collections/caps.webp';
import Hoodie from '@/public/collections/hoodies.webp';
import { getAllPromocodes } from '@/actions/Admin/getAllPromocodes';
import CarouselComponent from './extra/Carousel';
import { getBestSellingProducts } from '@/actions/Admin/getBestSellingProducts';
import BestSellingProducts from './extra/BestSellingProducts';

const getBestProducts = async () => {
    const response = await getBestSellingProducts();
    return response;
};

const Home = () => {
    const [bestProducts, setBestProducts] = useState([]);
    const { isDarkMode } = useDarkMode();
    const [loading, setLoading] = useState(true);
    const [spin, setSpin] = useState(false);
    const [promocode, setPromocode] = useState([]);
    const [showPromocodeBanner, setShowPromocodeBanner] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
        window.scrollTo(0, 0);

        getBestProducts().then((res) => {
            setBestProducts(JSON.parse(res));
        });

        async function getAllPromoCodes() {
            const promo = await getAllPromocodes();
            setPromocode(promo);
            setLoading(false);
            
            // Check if the promocode is expired
            if (promo[1]?.expiry) {
                const expiryDate = new Date(promo[1].expiry);
                const now = new Date();
                
                if (now > expiryDate) {
                    setShowPromocodeBanner(false);
                }
            }
        }

        getAllPromoCodes();
    }, []);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(promocode[1]?.code);
        setSpin(true);
        toast.success('Code Copied!', { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
        setTimeout(() => setSpin(false), 300);
    };

    const expiryDate = promocode[1]?.expiry ? new Date(promocode[1].expiry) : null;

    return (
        <main className='overflow-x-hidden'>
            {/* SlideShow */}
            <CarouselComponent />
            {/* End of SlideShow */}

            {/* Discount Banner */}
            {showPromocodeBanner && (
                <div className={`${loading ? '-translate-x-[2000px]' : 'translate-x-0'} transition-all duration-1000 ease-in-out container mt-12 p-4 mx-auto`}>
                    <div className="bg-gradient-to-br from-purple-900 to-purple-700 text-white text-center py-10 md:px-20 rounded-lg relative">
                        <div className="before:blur-xl before:opacity-80 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-br before:from-purple-900 before:to-purple-500 before:z-10"></div>
                        <h3 className="md:text-2xl z-20 font-semibold mb-4 relative">Flat Rs.100 OFF on All Products</h3>
                        <p className="md:text-sm z-20 text-xs mb-4 relative">Claim Now Before It&apos;s Too Late</p>
                        <div className="flex z-20 justify-center gap-2 rounded-lg flex-col md:flex-row items-center space-x-2 mb-6 relative">
                            <span className="border-dashed border text-white px-4 py-2 rounded-lg">{promocode[1]?.code}</span>
                            <button onClick={handleCopyCode} className={`border flex items-center justify-center gap-1 border-white -mr-8 transition-all duration-300 ease-in-out bg-white text-purple-600 px-4 py-2 rounded-lg cursor-pointer`}>
                                {spin && <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>}
                                Copy Code
                            </button>
                        </div>
                        <p className="text-sm z-20 relative">Valid Till: {expiryDate ? expiryDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
                        <div className={`w-12 h-12 ${isDarkMode ? 'bg-black' : 'bg-white'} rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6`}></div>
                        <div className={`w-12 h-12 ${isDarkMode ? 'bg-black' : 'bg-white'} rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6`}></div>
                    </div>
                </div>
            )}
            {/* End of Discount Banner */}

            {/* Collections */}
            <section className='container mt-12 flex justify-center items-center flex-col md:min-h-screen mx-auto'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 data-aos="fade-down" className='text-3xl md:text-4xl font-bold'>COLLECTIONS</h1>
                    <div data-aos="fade-right" data-aos-duration="1000" className="border-2 rounded border-purple-600 w-[75%]"></div>
                </div>

                <div className='grid md:grid-cols-3 grid-cols-2 place-items-center gap-y-4 gap-x-12 md:gap-10 w-fit h-fit md:mt-20 mt-10'>
                    <Link href={'/caps'} data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className={`cards1 rounded-lg ${isDarkMode ? `` : `border-2 `}`}>
                        <div className='p-2 w-40 md:w-80 overflow-hidden relative rounded-xl cursor-pointer'>
                            <Image src={Cap} className=' transition-all ease-in-out duration-200 hover:scale-110 rounded-md' priority={true} alt="caps" />
                        </div>
                    </Link>
                    <Link href={'/mugs'} data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className={`cards1 rounded-lg ${isDarkMode ? `` : `border-2`}`}>
                        <div className='p-2 w-40 md:w-80 overflow-hidden relative rounded-xl cursor-pointer'>
                            <Image src={Mug} className=' transition-all ease-in-out duration-200 hover:scale-110 rounded-md' priority={true} alt="mugs" />
                        </div>
                    </Link>

                    <Link href={'/tshirts'} data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className={`cards1 rounded-lg ${isDarkMode ? `` : `border-2`}`}>
                        <div className='p-2 w-40 md:w-80 overflow-hidden relative rounded-xl cursor-pointer'>
                            <Image src={Tshirt} className=' transition-all ease-in-out duration-200 hover:scale-110 rounded-md' priority={true} alt="tshirt" />
                        </div>
                    </Link>
                    <Link href={'/hoodies'} data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className={`cards1 rounded-lg ${isDarkMode ? `` : `border-2`}`}>
                        <div className='p-2 w-40 md:w-80 overflow-hidden relative rounded-xl cursor-pointer'>
                            <Image src={Hoodie} className=' transition-all ease-in-out duration-200 hover:scale-110 rounded-md' priority={true} alt="hoodies" />
                        </div>
                    </Link>
                </div>
            </section>
            {/* End of Collections */}

            {/* Popular products */}
            <section className='text-gray-600 md:my-32 my-20 body-font flex items-center justify-center md:flex-row flex-col md:container mx-auto'>
                <div data-aos="fade-right" className="container px-5 flex items-center justify-center flex-col py-24 mx-auto">
                    <div className='flex flex-col items-center justify-center'>
                        <h1 data-aos="fade-down" className='text-xl md:text-4xl font-bold'>BEST SELLING PRODUCTS</h1>
                        <div data-aos="fade-right" data-aos-duration="1000" className="border-2 rounded border-purple-600 w-[80%]"></div>
                    </div>
                    <div className='grid md:grid-cols-4 grid-cols-2 place-items-center gap-y-4 gap-x-12 md:gap-10 w-fit h-fit md:mt-20 mt-10'>
                        {bestProducts.map((product, index) => (
                            <BestSellingProducts key={index} product={product} />
                        ))}
                    </div>
                </div>
            </section>
            {/* End of Popular products */}

            {/* Services */}
            <section className="text-gray-600 md:my-32 my-20 body-font flex items-center justify-center md:flex-row flex-col md:container mx-auto">
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
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-black'} leading-relaxed text-base`}>Ship all over India for FREE.</p>
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
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-black'} leading-relaxed text-base text-center`}>Amazing offers & discounts on our products.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* End of Services */}
        </main>
    );
};

export default Home;
