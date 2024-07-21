"use client";
import React, { useState, useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import toast from 'react-hot-toast';

const AddtoCart = ({ slug, product }) => {
    const { addToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    const handleAddToCart = () => {
        setLoading(true);
        addToCart(slug, 1, product.price, product.title, product.size, product.color, product.img);
        toast.success('Added to your cart', {
            duration: 5000,
            style: {
                border: '2px solid #7e22ce',
                padding: '15px 20px',
                marginBottom: '40px',
            },
        });
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };

    return (
        <button
            disabled={product.availableQty === 0 || loading}
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="flex items-center justify-center gap-1 text-white bg-purple-700 border-0 py-2 px-6 focus:outline-none hover:bg-purple-900 rounded disabled:opacity-25"
        >
            {loading ? (
                <>
                    <svg
                        className="w-4 h-4 animate-spin"
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
                    <p className='pl-2'>Adding...</p>
                </>
            ) : (
                'Add to cart'
            )}
        </button>
    );
};

export default AddtoCart;
