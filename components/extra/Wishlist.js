"use client";
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { app } from '@/app/config';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Wishlist = ({ slug }) => {
    const [saved, setSaved] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.phoneNumber || user.email);
            } else {
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    const saveWishlist = async () => {
        if (!user) {
            toast.error('Sign-In Required', {
                duration: 5000,
                style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' }
            });
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/saveWishlist`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ user, slug }),
            });

            const data = await res.json();

            if (data.success) {
                setSaved(true);
                toast.success('Item added to wishlist!', {
                    duration: 5000,
                    style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' }
                });
            } else {
                setSaved(false);
                toast.success('Item removed from wishlist!', {
                    duration: 5000,
                    style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' }
                });
            }
        } catch (error) {
            toast.error('An error occurred while saving the wishlist.', {
                duration: 5000,
                style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' }
            });
        }
    };

    return (
        <button
            onClick={saveWishlist}
            type="button"
            className="rounded-full w-10 lg:w-12 h-10 lg:h-12 bg-purple-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 lg:ml-4"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-6 transition-all duration-300 ease-in-out ${saved ? 'scale-[1.3] text-red-500' : 'scale-[1] text-gray-500'}`}
                fill={saved ? 'red' : 'white'}
            >
                <path
                    d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                    strokeWidth="1"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    );
};

export default Wishlist;
