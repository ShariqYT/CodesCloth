"use client"
import React, { useState, useContext } from 'react';
import { CartContext } from '@/context/CartContext';

const BuyNow = ({ slug, product }) => {
    const { buyNow } = useContext(CartContext);
    const [spin, setSpin] = useState(false);

    const handleClick = () => {
        setSpin(true);
        buyNow(slug, 1, product.price, product.title, product.size, product.color, product.img);
        setTimeout(() => setSpin(false), 500);
    };

    return (
        <button
            disabled={product.availableQty === 0}
            onClick={handleClick}
            className="disabled:opacity-25 flex items-center justify-center gap-1 text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-900 rounded"
        >
            {spin && (
                <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"
                    >
                        <animateTransform
                            attributeName="transform"
                            dur="0.75s"
                            repeatCount="indefinite"
                            type="rotate"
                            values="0 12 12;360 12 12"
                        />
                    </path>
                </svg>
            )}
            {spin ? 'Buying' : 'Buy Now'}
        </button>
    );
};

export default BuyNow;
