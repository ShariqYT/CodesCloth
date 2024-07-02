"use client"
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { app } from '@/app/config'
import { Toaster, toast } from 'react-hot-toast'

const Logo = () => (
  <Link href='/'>
    <Image unoptimized src='/logo.png' priority={true} width={1} height={1} className='w-52' alt='logo' />
  </Link>
);

const SearchBar = () => (
  <div className='flex justify-center mt-4 md:mt-0 items-center gap-2'>
    <input
      className='outline-none border-2 placeholder:text-gray-600 border-purple-400 focus:border-purple-700 md:w-[50vh] md:h-[4vh] h-[5vh] w-[40vh] px-3 rounded-full bg-[rgba(0,0,0,0.1)]'
      placeholder='Search our product'
      type='text'
      aria-label='Search products'
    />
    <button className='bg-purple-700 px-2 py-2 rounded-full' aria-label='Search'>
      <Image unoptimized src='/search.svg' priority={true} width={1} height={1} className='w-5 invert' alt='search' />
    </button>
  </div>
);

const MenuItems = () => {
  const categories = ['tshirts', 'hoodies', 'mugs', 'mousepads', 'caps'];
  return (
    <ul className='md:flex justify-center flex-col text-black hidden md:flex-row gap-8 items-center font-bold'>
      {categories.map(category => (
        <Link href={`/${category}`} key={category}>
          <li className='cursor-pointer [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-purple-800'>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        </Link>
      ))}
    </ul>
  );
};

const UserMenu = ({ user, auth, toggleDropdown, dropdownOpen, setDropdownOpen }) => (
  <div className='relative'>
    <button
      onClick={toggleDropdown}
      onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
      className='bg-purple-700 p-1 rounded-full'
      aria-label='User menu'
    >
      <svg className='w-7 text-white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
        <path d='M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path d='M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z' stroke='currentColor' strokeWidth='1.5' />
      </svg>
    </button>
    {dropdownOpen && (
      <div className='bg-white border-2 border-purple-700 w-40 absolute top-14 md:top-16 flex flex-col p-4 rounded-lg shadow-xl font-semibold transform transition-transform duration-300 ease-in-out'>
        <ol className='space-y-2'>
          <li>
            <Link className='hover:text-purple-700 transition-colors duration-200 ease-in-out' href='/myaccount'>
              My Account
            </Link>
          </li>
          <li>
            <Link className='hover:text-purple-700 transition-colors duration-200 ease-in-out' href='/my-orders'>
              My Orders
            </Link>
          </li>
          <li>
            <p
              onClick={() => {
                signOut(auth)
                toast.success('Logged out successfully', {
                  duration: 5000,
                  style: { border: '2px solid green', padding: '15px 20px' }
                })
              }}
              className='hover:text-purple-700 cursor-pointer transition-colors duration-200 ease-in-out'
            >
              Logout
            </p>
          </li>
        </ol>
      </div>
    )}
  </div>
);

const Navbar = () => {
  const { cart } = useContext(CartContext)
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const auth = getAuth(app)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [auth])

  return (
    <nav className='flex justify-between z-50 items-center flex-col md:flex-row md:px-8 md:py-4 py-2 md:my-3 md:mx-32 md:rounded-full sticky top-0 md:top-3 bg-[rgba(255,255,255,0.4)] backdrop-blur shadow-lg'>
      <Logo />
      <SearchBar />
      <MenuItems />
      <div className='flex justify-center gap-5 items-center'>
        <svg className='w-8' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
          <path d='M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
        <Link href='/my-cart' className='p-1 hover:bg-purple-800 relative rounded'>
          <Image unoptimized src='/cart.gif' priority={true} width={1} height={1} className='w-8 scale-x-[-1] cursor-pointer hidden hover:invert md:block' alt='cart' />
          <div className='w-5 h-5 bg-purple-700 absolute top-0 -right-1 rounded-full text-white flex justify-center items-center'>
            {Object.keys(cart).length}
          </div>
        </Link>
        {!user ? (
          <Link href='/login'>
            <button className='bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-full text-white hidden md:block'>
              Login
            </button>
          </Link>
        ) : (
          <UserMenu user={user} auth={auth} toggleDropdown={toggleDropdown} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
        )}
      </div>
    </nav>
  )
}

export default Navbar
