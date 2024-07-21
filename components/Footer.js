"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDarkMode } from '@/context/DarkModeContext';
import Logo from '@/public/logo3.png';

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <footer className={`w-full ${isDarkMode ? 'bg-black text-gray-300' : 'bg-white text-gray-600'} border-t-2 border-t-purple-700 body-font shadow-lg`}>
      <div className="container px-5 py-8 mx-auto flex flex-wrap md:flex-row md:justify-between items-start">
        <div className="w-64 flex-shrink-0 mx-auto md:mx-0 text-center md:text-left">
          <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <div className="flex justify-center items-center rounded overflow-hidden">
              <Image className="object-contain h-20 rounded-lg" src={Logo} alt="CodesCloth logo" />
            </div>
          </Link>
          <p className="mt-2 px-4 py-4 text-sm">CodesCloth provides a variety of products like t-shirts, hoodies, mugs, caps, and more for all ages.</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 md:text-left text-center md:mt-0 mt-10">
          <div className="lg:w-1/4 md:w-1/2 w-1/2 px-4">
            <h2 className="title-font font-bold text-purple-700 tracking-widest text-sm mb-3">SHOP</h2>
            <ul className="list-none">
              <li className='py-1'>
                <Link href="/tshirts" className="hover:text-purple-700">T-shirts</Link>
              </li>
              <li className='py-1'>
                <Link href="/hoodies" className="hover:text-purple-700">Hoodies</Link>
              </li>
              <li className='py-1'>
                <Link href="/mugs" className="hover:text-purple-700">Mugs</Link>
              </li>
              <li className='py-1'>
                <Link href="/caps" className="hover:text-purple-700">Caps</Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-1/2 px-4">
            <h2 className="title-font font-bold text-purple-700 tracking-widest text-sm mb-3">CUSTOMER SERVICE</h2>
            <ul className="list-none">
              <li className='py-1'>
                <Link href="/contact" className="hover:text-purple-700">Contact Us</Link>
              </li>
              <li className='py-1'>
                <Link href="/return-policy" className="hover:text-purple-700">Return Policy</Link>
              </li>
              <li className='py-1'>
                <Link href="/shipping-policy" className="hover:text-purple-700">Shipping Policy</Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full md:pt-0 pt-12 px-4">
            <h2 className="title-font font-bold text-purple-700 tracking-widest text-sm mb-3">POLICY</h2>
            <ul className="list-none">
              <li className='py-1'>
                <Link href="/privacy-policy" className="hover:text-purple-700">Privacy Policy</Link>
              </li>
              <li className='py-1'>
                <Link href="/terms-and-conditions" className="hover:text-purple-700">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} md:pb-2 pb-20`}>
        <div className="container mx-auto flex items-center justify-center flex-wrap">
          <p className="text-sm text-center">© {new Date().getFullYear()} CodesCloth — All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
