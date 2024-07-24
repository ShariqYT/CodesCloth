"use client";
import { useDarkMode } from '@/context/DarkModeContext';
import Image from 'next/image';
import React, { useState } from 'react';
import sizeChartIcon from '@/public/size_chart.png';
import tshirts from '@/public/SizeChart/tshirt.webp';
import hoodies from '@/public/SizeChart/hoodie.webp';
import mugs from '@/public/SizeChart/mug.webp';
import caps from '@/public/SizeChart/cap.webp';

const ProductSizeChart = ({ product }) => {
    const { isDarkMode } = useDarkMode();
    const [open, setOpen] = useState(false);

    const sizeChartImages = {
        tshirts,
        hoodies,
        mugs,
        caps
    };

    const sizeChartImage = sizeChartImages[product.category];

    return (
        <>
            <p className='font-semibold'>Size Chart:</p>
            <Image
                onClick={() => setOpen(!open)}
                className={`w-12 h-12 transition-all duration-300 ease-in-out cursor-pointer ${isDarkMode ? 'invert hover:drop-shadow-[0px_0px_1px_rgba(107,33,168,1)]' : 'hover:drop-shadow-[0px_0px_10px_rgba(107,33,168,1)]'}`}
                src={sizeChartIcon}
                alt="size chart icon"
            />
            {open && (
                <div onClick={() => setOpen(!open)} className="flex justify-center items-center h-[100vh] w-[100vw] fixed z-10 top-0 left-0 bg-[rgba(0,0,0,0.5)]">
                    <div className='relative'>
                        <Image
                            className="lg:max-w-[50vw] lg:max-h-[60vh] w-[90vw] h-[50vh] object-cover lg:object-contain bg-white rounded-xl shadow-[0px_0px_30px_rgba(107,33,168,0.8)]"
                            src={sizeChartImage}
                            alt={`${product.category} size chart`}
                        />
                        <svg onClick={() => setOpen(!open)} className='lg:w-12 w-8 transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.1] absolute top-4 right-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
                            <path d="M10.2471 6.7402C11.0734 7.56657 11.4866 7.97975 12.0001 7.97975C12.5136 7.97975 12.9268 7.56658 13.7531 6.74022L13.7532 6.7402L15.5067 4.98669L15.5067 4.98668C15.9143 4.5791 16.1182 4.37524 16.3302 4.25283C17.3966 3.63716 18.2748 4.24821 19.0133 4.98669C19.7518 5.72518 20.3628 6.60345 19.7472 7.66981C19.6248 7.88183 19.421 8.08563 19.0134 8.49321L17.26 10.2466C16.4336 11.073 16.0202 11.4864 16.0202 11.9999C16.0202 12.5134 16.4334 12.9266 17.2598 13.7529L19.0133 15.5065C19.4209 15.9141 19.6248 16.1179 19.7472 16.3299C20.3628 17.3963 19.7518 18.2746 19.0133 19.013C18.2749 19.7516 17.3965 20.3626 16.3302 19.7469C16.1182 19.6246 15.9143 19.4208 15.5067 19.013L13.7534 17.2598L13.7533 17.2597C12.9272 16.4336 12.5136 16.02 12.0001 16.02C11.4867 16.02 11.073 16.4336 10.2469 17.2598L10.2469 17.2598L8.49353 19.013C8.0859 19.4208 7.88208 19.6246 7.67005 19.7469C6.60377 20.3626 5.72534 19.7516 4.98693 19.013C4.2484 18.2746 3.63744 17.3963 4.25307 16.3299C4.37549 16.1179 4.5793 15.9141 4.98693 15.5065L6.74044 13.7529C7.56681 12.9266 7.98 12.5134 7.98 11.9999C7.98 11.4864 7.5666 11.073 6.74022 10.2466L4.98685 8.49321C4.57928 8.08563 4.37548 7.88183 4.25307 7.66981C3.63741 6.60345 4.24845 5.72518 4.98693 4.98669C5.72542 4.24821 6.60369 3.63716 7.67005 4.25283C7.88207 4.37524 8.08593 4.5791 8.49352 4.98668L8.49353 4.98669L10.2471 6.7402Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductSizeChart;
