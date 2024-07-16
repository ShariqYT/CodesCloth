"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDarkMode } from '@/context/DarkModeContext';
import { formatIndianCurrency } from '../extra/FormatAmount';
import FilterSection, { convertStringToQueriesObject, convertValidStringQueries } from '../extra/FilterSection';
import { useSearchParams } from 'next/navigation';

const Mugs = () => {
    const { isDarkMode } = useDarkMode();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilteredProducts = async (category) => {
            setLoading(true);
            const queryParams = convertValidStringQueries(convertStringToQueriesObject(searchParams));
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProducts?category=${category}&${queryParams}`);
            const data = await response.json();
            const productsArray = Object.values(data);
            setProducts(productsArray);
            setLoading(false);
        };

        fetchFilteredProducts('mugs');
    }, [searchParams]);

    const renderColorButtons = (colors) => {
        return colors.map((color) => {
            let buttonClasses;
            if (color.toLowerCase() === 'black' || color.toLowerCase() === 'white') {
                buttonClasses = `border-2 border-gray-300 ml-1 bg-${color.toLowerCase()} rounded-full w-4 h-4 transition-all duration-300 ease-in-out focus:outline-none`;
            } else {
                buttonClasses = `border-2 border-gray-300 ml-1 bg-${color.toLowerCase()}-500 rounded-full w-4 h-4 transition-all duration-300 ease-in-out focus:outline-none`;
            }
            return (
                <button key={color} title={`Color: ${color}`} className={buttonClasses}></button>
            );
        });
    };

    return (
        <section className="flex min-h-screen">
            <FilterSection />
            {loading ? (
                <div className='flex justify-center items-center'>
                    Loading...
                </div>
            ) : (
                <div className="max-w-[90rem] px-5 py-20 md:py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">
                        {products.length === 0 && (
                            <div className="flex flex-col justify-center items-center">
                                <svg className="w-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 22C11.1818 22 10.4002 21.6708 8.83693 21.0123C4.94564 19.3734 3 18.5539 3 17.1754V7.54234M12 22C12.8182 22 13.5998 21.6708 15.1631 21.0123C19.0544 19.3734 21 18.5539 21 17.1754V7.54234M12 22V12.0292M21 7.54234C21 8.15478 20.1984 8.54152 18.5953 9.315L15.6741 10.7244C13.8712 11.5943 12.9697 12.0292 12 12.0292M21 7.54234C21 6.9299 20.1984 6.54316 18.5953 5.76969L17 5M3 7.54234C3 8.15478 3.80157 8.54152 5.40472 9.315L8.32592 10.7244C10.1288 11.5943 11.0303 12.0292 12 12.0292M3 7.54234C3 6.9299 3.80157 6.54317 5.40472 5.76969L7 5M6 13.0263L8 14.0234" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 2L12 4M12 4L14 6M12 4L10 6M12 4L14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <p className='min-h-screen'>Sorry, all the Mugs are currently out of stock. New stock coming soon. Stay Tuned!</p>
                            </div>
                        )}
                        {products.map((product, index) => (

                            <Link key={index} href={`/product/${product.slug}`} className="md:w-72 shadow-lg md:m-4 my-2 border rounded-lg border-gray-200 p-2 w-44">
                                <div className="flex h-32 md:h-52 justify-center items-center relative rounded-lg">
                                    <Image className="rounded-lg object-cover" fill={true} sizes="(min-width: 1540px) 272px, (min-width: 1280px) 220px, (min-width: 1040px) 169px, (min-width: 780px) 118px, (min-width: 680px) 550px, calc(94.44vw - 73px)" priority={true} src={product.img} alt="tshirt" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="md:text-[12px] text-[10px] tracking-widest mb-1">CODESCLOTH</h3>
                                    <h2 className="md:text-lg truncate font-medium">{product.title}</h2>
                                    <p className={`mt-1 text-purple-600 tracking-wider font-semibold drop-shadow-[0_0_20px_rgba(255,255,255,1)] text-lg md:text-2xl`}>₹{formatIndianCurrency(product.price)}</p>
                                    <div className='mt-1'>
                                        {product.size.includes('S') && <span className={`border ${isDarkMode ? 'border-white' : 'border-black'} text-sm px-1 mx-1`}>S</span>}
                                        {product.size.includes('M') && <span className={`border ${isDarkMode ? 'border-white' : 'border-black'} text-sm px-1 mx-1`}>M</span>}
                                        {product.size.includes('L') && <span className={`border ${isDarkMode ? 'border-white' : 'border-black'} text-sm px-1 mx-1`}>L</span>}
                                        {product.size.includes('XL') && <span className={`border ${isDarkMode ? 'border-white' : 'border-black'} text-sm px-1 mx-1`}>XL</span>}
                                        {product.size.includes('XXL') && <span className={`border ${isDarkMode ? 'border-white' : 'border-black'} text-sm px-1 mx-1`}>XXL</span>}
                                    </div>
                                    <div className='mt-1'>
                                        {renderColorButtons(product.color)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Mugs;
