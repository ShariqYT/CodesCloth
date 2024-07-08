"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDarkMode } from '@/context/DarkModeContext';
import Logo from '@/public/logo.png';


const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <footer className={`text-gray-600 w-full ${!isDarkMode ? 'bg-white' : 'bg-black'} border-t-2 border-t-purple-700 body-font shadow-lg`}>
      <div className="container px-5 py-8 mx-auto justify-between flex md:items-center md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link href={'/'} className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <div className="flex justify-center items-center rounded overflow-hidden">
              <Image className="object-contain rounded-lg" src={Logo} alt="logo" />
            </div>
          </Link>
          <p className="mt-2 px-4 py-4 text-sm text-gray-500">CodesCloth provide a variety of products like tshirts, hoodies, mugs, mousepads caps, etc. for all ages.</p>
        </div>
        <div className="flex-grow justify-around flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left">
          <div className="lg:w-1/4 md:w-1/2 w-1/2 px-4 text-left md:text-justify">
            <h2 className="title-font font-bold text-purple-700 tracking-widest text-sm mb-3">SHOP</h2>
            <ul className="list-none mb-10">
              <li className='py-1 md:py-0'>
                <Link href={'/tshirts'} className="text-gray-500 py-1 md:py-0 hover:text-purple-700">Tshirts</Link>
              </li>
              <li className='py-1 md:py-0'>
                <Link href={'/hoodies'} className="text-gray-500 py-1 md:py-0 hover:text-purple-700">Hoodies</Link>
              </li>
              <li className='py-1 md:py-0'>
                <Link href={'/mugs'} className="text-gray-500 py-1 md:py-0 hover:text-purple-700">Mugs</Link>
              </li>
              <li className='py-1 md:py-0'>
                <Link href={'/mousepads'} className="text-gray-500 py-1 md:py-0 hover:text-purple-700">Mousepads</Link>
              </li>
              <li className='py-1 md:py-0'>
                <Link href={'/caps'} className="text-gray-500 py-1 md:py-0 hover:text-purple-700">Caps</Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-1/2 px-4 text-right md:text-justify">
            <h2 className="title-font font-bold text-purple-700 tracking-widest text-sm mb-3">CUSTOMER SERVICE</h2>
            <ul className="list-none mb-10">
              <li className='py-1 md:py-0'>
                <Link href={'/contact'} className="text-gray-500 py-1 md:py-0 hover:text-purple-700">Contact Us</Link>
              </li>
              <li className='py-1 md:py-0'>
                <Link href={'/about'} className="text-gray-500 py-1 md:py-0 hover:text-purple-700">About Us</Link>
              </li>
              <li className='py-1 md:py-0'>
                <Link href={'/return-policy'} className="text-gray-500 py-1 md:py-0 hover:text-purple-700">Return Policy</Link>
              </li>
              <li className='py-1 md:py-0'>
                <Link href={'/shipping-policy'} className="text-gray-500 py-1 md:py-0 hover:text-purple-700">Shipping Policy</Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-center md:text-justify">
            <h2 className="title-font font-bold text-purple-700 tracking-widest text-sm mb-3">POLICY</h2>
            <ul className="list-none mb-10">
              <li className='py-1 md:py-0'>
                <Link href={'/privacy-policy'} className="text-gray-500 py-1 md:py-0 hover:text-purple-700">Privacy Policy</Link>
              </li>
              <li className='py-1 md:py-0'>
                <Link href={'/terms-and-conditions'} className="text-gray-500  py-1 md:py-0 hover:text-purple-700">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`${!isDarkMode ? 'bg-white' : 'bg-black'}`}>
        <div className="container mx-auto py-4 px-5 flex items-center justify-center flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500  text-sm text-center sm:text-left">© {new Date().getFullYear()} CodesCloth — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
