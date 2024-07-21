'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { formatIndianCurrency } from './FormatAmount';
import { useDarkMode } from '@/context/DarkModeContext';

const ProductSlider = ({ products }) => {
    const { isDarkMode } = useDarkMode();

    const renderColorButtons = (colors) => {
        return colors.map((color, index) => {
            const colorClass = color.toLowerCase() === 'black' || color.toLowerCase() === 'white'
                ? `bg-${color.toLowerCase()}`
                : `bg-${color.toLowerCase()}-500`;
            return (
                <button
                    key={index}
                    title={color}
                    className={`border-2 border-gray-300 ml-1 ${colorClass} rounded-full w-3 md:w-4 h-3 md:h-4 transition-all duration-300 ease-in-out focus:outline-none`}
                ></button>
            );
        });
    };

    return (
        <div className='my-10 md:container'>
            <h1 className='text-2xl p-4 font-semibold'>Other T-Shirts</h1>
            <div id="productSlider" className="flex items-center pb-12 overflow-x-scroll scrollbar-hide">
                {Object.values(products).map((product, index) => (
                    <Link
                        key={index}
                        href={`/product/${product.slug}`}
                        className="md:w-52 shadow-lg mx-4 border rounded-lg border-gray-200 p-2 w-2/4"
                    >
                        <div className="flex h-32 justify-center items-center relative rounded-lg">
                            <Image
                                className="rounded-lg object-contain bg-white"
                                fill={true}
                                sizes="(min-width: 1540px) 272px, (min-width: 1280px) 220px, (min-width: 1040px) 169px, (min-width: 780px) 118px, (min-width: 680px) 550px, calc(94.44vw - 73px)"
                                priority={true}
                                src={product.img}
                                alt={product.title}
                            />
                        </div>
                        <div className="mt-4">
                            <h3 className="md:text-[12px] text-[10px] tracking-widest mb-1">T-Shirts</h3>
                            <h2 className="md:text-md truncate font-medium">{product.title}</h2>
                            <p className={`mt-1 text-purple-600 tracking-wider font-semibold drop-shadow-[0_0_20px_rgba(255,255,255,1)] text-lg md:text-lg`}>
                                ₹{formatIndianCurrency(product.price)}
                            </p>
                            <div className='mt-1'>
                                {product.size.includes('S') && <span className={`border ${isDarkMode ? 'border-white' : 'border-black'} text-xs md:text-sm px-1 mx-1`}>S</span>}
                                {product.size.includes('M') && <span className={`border ${isDarkMode ? 'border-white' : 'border-black'} text-xs md:text-sm px-1 mx-1`}>M</span>}
                                {product.size.includes('L') && <span className={`border ${isDarkMode ? 'border-white' : 'border-black'} text-xs md:text-sm px-1 mx-1`}>L</span>}
                                {product.size.includes('XL') && <span className={`border ${isDarkMode ? 'border-white' : 'border-black'} text-xs md:text-sm px-1 mx-1`}>XL</span>}
                                {product.size.includes('XXL') && <span className={`border ${isDarkMode ? 'border-white' : 'border-black'} text-xs md:text-sm px-1 mx-1`}>XXL</span>}
                            </div>
                            <div className='mt-1'>
                                {renderColorButtons(product.color)}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProductSlider;
