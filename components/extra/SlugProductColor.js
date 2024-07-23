"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const SlugProductColor = ({ title, product, variants }) => {
    const [color, setColor] = useState(product.color);
    const [size, setSize] = useState(product.size);
    const router = useRouter();
    const { isDarkMode } = useDarkMode();

    const refreshVariant = (newSize, newColor) => {
        const url = `${process.env.NEXT_PUBLIC_URL}/product/${variants[newColor][newSize].slug}`;
        router.push(url);
    };

    const colors = Object.keys(variants);

    return (
        <div className="mt-6 pb-2">
            <div className="flex flex-col">
                <p className="mr-3 font-semibold">Color: <span className='text-purple-700 font-medium'>{color}</span></p>
                <div className='grid grid-cols-5 lg:grid-cols-10 lg:gap-y-0 gap-y-2 mt-2'>
                    {colors.map((col) => {
                        const productVariant = variants[col][size];
                        const productDetails = title.find(t => t.slug === productVariant.slug);

                        return productVariant && productDetails ? (
                            <button
                                key={col}
                                title={col}
                                onClick={() => { setColor(col); refreshVariant(size, col); }}
                                className={`border-2 ml-1 rounded-xl w-12 h-20 focus:outline-none ${color === col ? 'border-purple-700' : 'border-purple-200'}`}
                                style={{
                                    backgroundImage: `url(${productDetails.img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></button>
                        ) : null;
                    })}
                </div>
            </div>
            <div className="flex flex-col mt-4">
                <span className="mr-3 font-semibold">Size: <span className='text-purple-700 font-medium'>{size}</span></span>
                <div className="relative">
                    <div
                        value={size}
                        onChange={(e) => { setSize(e.target.value); refreshVariant(e.target.value, color); }}
                        className="flex gap-4 items-center rounded appearance-none py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 "
                    >
                        {Object.keys(variants[color]).map((sz) => (
                            <button
                                className={` ${isDarkMode && sz === size ? 'bg-purple-700' : ''} ${sz === size ? 'border-purple-700' : 'border-purple-200'} border-2 rounded-xl w-12 h-10 focus:outline-none`}
                                key={sz}
                                title={sz}
                                onClick={() => { setSize(sz); refreshVariant(sz, color); }}
                            >
                                {sz}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SlugProductColor;
