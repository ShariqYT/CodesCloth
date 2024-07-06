'use client'

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '@/app/config';
import { Toaster, toast } from 'react-hot-toast';
import { useDarkMode } from '@/context/DarkModeContext';
import { CartContext } from '@/context/CartContext';

const MobileNav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const {cart} = useContext(CartContext);

    const auth = getAuth(app);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, [auth]);

    const handleItemClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`md:hidden flex justify-between z-[99999] items-center px-5 py-1 sticky bottom-0 ${isDarkMode ? 'bg-[rgba(0,0,0,0.6)]' : 'bg-[rgba(255,255,255,0.4)]'} backdrop-blur ${isDarkMode ? 'shadow-[0_0_50px_rgba(255,255,255,0.3)]' : 'shadow-[0_0_30px_rgba(0,0,0,0.2)]'}`}>
            <Link href={'/'} className={`p-1 ${pathname === '/' ? 'bg-purple-700 rounded-xl px-4' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-8 icon' color="#000000" fill="#ffffff">
                    <path d="M9.06165 4.82633L3.23911 9.92134C2.7398 10.3583 3.07458 11.1343 3.76238 11.1343C4.18259 11.1343 4.52324 11.4489 4.52324 11.8371V15.0806C4.52324 17.871 4.52324 19.2662 5.46176 20.1331C6.40029 21 7.91082 21 10.9319 21H13.0681C16.0892 21 17.5997 21 18.5382 20.1331C19.4768 19.2662 19.4768 17.871 19.4768 15.0806V11.8371C19.4768 11.4489 19.8174 11.1343 20.2376 11.1343C20.9254 11.1343 21.2602 10.3583 20.7609 9.92134L14.9383 4.82633C13.5469 3.60878 12.8512 3 12 3C11.1488 3 10.4531 3.60878 9.06165 4.82633Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16H12.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>

            <button onClick={toggleDarkMode}>
                {!isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-8 icon' color="#000000" fill="none">
                        <path d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-8  fill-white' color="#ffffff" fill="none">
                        <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                )}
            </button>

            <Link href={'/my-cart'} className={`p-1 ${pathname === '/my-cart' ? 'bg-purple-700 rounded-xl px-4' : ''}`}>
                <Image unoptimized src={'/cart.gif'} className={`w-8 scale-x-[-1] relative ${isDarkMode ? 'cart-svg' : ''} icon`} width={500} height={500} alt='cart' />
                <div className='w-5 h-5 bg-purple-700 flex md:hidden absolute bottom-7 right-28 rounded-full text-white justify-center items-center'>
                    {Object.keys(cart).length}
                </div>
            </Link>

            <button className={`p-1 ${['/myaccount', '/sign-in', '/my-orders'].includes(pathname) ? 'bg-purple-700 rounded-xl px-4' : ''}`} onClick={() => setIsOpen(prev => !prev)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-8 icon' color="#000000" fill="#ffffff">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {isOpen && (
                    <div className={`${isDarkMode ? 'bg-[rgba(0,0,0,1)] z-50 text-white' : 'bg-white text-black'} w-full absolute ${user ? 'top-[-9.5rem] p-4' : "top-[-4.2rem]"} border-2 border-purple-700 left-0 flex flex-col rounded-lg shadow-xl font-semibold transform transition-transform duration-300 ease-in-out`}>
                        <ul className='flex flex-col gap-4 items-center font-bold'>
                            {!user ? (
                                <Link href='/sign-in'>
                                    <li className='cursor-pointer w-[100vw] p-4 [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-purple-800' onClick={handleItemClick}>
                                        Sign in
                                    </li>
                                </Link>
                            ) : (
                                <>
                                    <Link href={`/myaccount`}>
                                        <li className='cursor-pointer w-[100vw] [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-purple-800' onClick={handleItemClick}>
                                            My Account
                                        </li>
                                    </Link>
                                    <Link href={`/my-orders`}>
                                        <li className='cursor-pointer w-[100vw] [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-purple-800' onClick={handleItemClick}>
                                            My Orders
                                        </li>
                                    </Link>
                                    <li onClick={() => {
                                        signOut(auth);
                                        toast.success('Logged out successfully', {
                                            duration: 5000,
                                            style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' }
                                        });
                                        handleItemClick();
                                    }} className='cursor-pointer w-[100vw] [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-purple-800'>
                                        Sign Out
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </button>
        </div>
    );
};

export default MobileNav;
