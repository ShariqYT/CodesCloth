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
    const { cart } = useContext(CartContext);

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
                                        <li className='cursor-pointer w-[100vw] flex gap-2 justify-center items-center [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-purple-800' onClick={handleItemClick}>
                                            <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                <path d="M10.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C8.12805 13.9629 11.2057 13.6118 14 14.4281" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M18.4332 13.8485C18.7685 13.4851 18.9362 13.3035 19.1143 13.1975C19.5442 12.9418 20.0736 12.9339 20.5107 13.1765C20.6918 13.2771 20.8646 13.4537 21.2103 13.8067C21.5559 14.1598 21.7287 14.3364 21.8272 14.5214C22.0647 14.9679 22.0569 15.5087 21.8066 15.9478C21.7029 16.1298 21.5251 16.3011 21.1694 16.6437L16.9378 20.7194C16.2638 21.3686 15.9268 21.6932 15.5056 21.8577C15.0845 22.0222 14.6214 22.0101 13.6954 21.9859L13.5694 21.9826C13.2875 21.9752 13.1466 21.9715 13.0646 21.8785C12.9827 21.7855 12.9939 21.6419 13.0162 21.3548L13.0284 21.1988C13.0914 20.3906 13.1228 19.9865 13.2807 19.6232C13.4385 19.2599 13.7107 18.965 14.2552 18.375L18.4332 13.8485Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                            </svg>
                                            My Account
                                        </li>
                                    </Link>
                                    <Link href={`/my-orders`}>
                                        <li className='cursor-pointer w-[100vw] flex gap-2 justify-center items-center [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-purple-800' onClick={handleItemClick}>
                                            <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                <path d="M20 12.5C19.9751 12.4136 19.9499 12.326 19.9244 12.2373C18.8875 8.63723 17.4956 7.5 13.4291 7.5H9.65019C5.74529 7.5 4.23479 8.48796 3.1549 12.2373C2.18223 15.6144 1.6959 17.3029 2.20436 18.6124C2.51576 19.4143 3.06862 20.1097 3.79294 20.6104C5.17171 21.5636 8.63187 22.0381 12 21.9976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M7 8V6.36364C7 3.95367 9.01472 2 11.5 2C13.9853 2 16 3.95367 16 6.36364V8" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10.5 11H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
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
                                    }} className='cursor-pointer flex justify-center items-center gap-2 w-[100vw] [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-red-500'>
                                        <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                            <path d="M4 9.20433C4 7.13117 4 6.09459 4.35762 5.25272C4.65634 4.54951 5.1278 3.94591 5.7219 3.50609C6.43314 2.97955 7.38764 2.79412 9.29665 2.42326C11.2817 2.03762 12.2743 1.8448 13.0467 2.15208C13.6884 2.40733 14.229 2.88944 14.5789 3.51833C15 4.27538 15 5.35327 15 7.50906V16.4909C15 18.6467 15 19.7246 14.5789 20.4817C14.229 21.1106 13.6884 21.5927 13.0467 21.8479C12.2743 22.1552 11.2817 21.9624 9.29665 21.5767C7.38764 21.2059 6.43314 21.0205 5.7219 20.4939C5.1278 20.0541 4.65634 19.4505 4.35762 18.7473C4 17.9054 4 16.8688 4 14.7957V9.20433Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M15 19.7982C16.4473 19.9487 18.3999 20.4116 19.4375 19.0885C20 18.3712 20 17.2786 20 15.0934V8.90664C20 6.72138 20 5.62876 19.4375 4.91152C18.3999 3.58841 16.4473 4.05129 15 4.20177" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M12 13L12 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M19 19.7266L22 19.7266" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2 20H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
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
