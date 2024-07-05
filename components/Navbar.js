"use client"
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { app } from '@/app/config'
import toast from 'react-hot-toast'
import { useDarkMode } from '@/context/DarkModeContext';

const Logo = () => {
  const { isDarkMode } = useDarkMode()
  return (
    <Link href='/'>
      <Image unoptimized src='/logo.png' priority={true} width={1} height={1} className={`w-52 filter ${isDarkMode ? `drop-shadow-[0_0px_2px_rgb(0_0_0/_100%)]` : `drop-shadow-[0_0px_2px_rgb(0_0_0/_100%)`}`} alt='logo' />
    </Link>
  )
};

const MenuItems = () => {
  const pathname = usePathname();
  const { isDarkMode } = useDarkMode();
  const categories = ['tshirts', 'hoodies', 'mugs', 'mousepads', 'caps'];

  return (
    <ul className={`md:flex justify-center flex-col ${isDarkMode ? "text-white" : "text-gray-800"} hidden md:flex-row gap-8 items-center font-bold`}>
      {categories.map(category => (
        <li className={`p-1 ${pathname === `/${category}` ? 'border-2 border-purple-700 rounded-md px-4' : ''} cursor-pointer [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-purple-800 transition-all duration-200 ease-linear`} key={category}>
          <Link href={`/${category}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const UserMenu = ({ auth, isDarkMode, toggleDropdown, dropdownOpen, setDropdownOpen }) => (
  <div className='relative hidden md:block'>
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
      <div className={`${isDarkMode ? 'bg-[rgba(0,0,0,1)] text-white' : 'bg-white'} border-2 border-purple-700 w-40 absolute top-14 md:top-16 flex flex-col p-4 rounded-lg shadow-xl font-semibold transform transition-transform duration-300 ease-in-out`}>
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
                  style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' }
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

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const categories = ['tshirts', 'hoodies', 'mugs', 'mousepads', 'caps'];

  const handleItemClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='md:hidden'>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className='bg-purple-700 py-1.5 px-3 rounded-lg'
        aria-label='User menu'
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-7' color="#ffff" fill="none">
          <path d="M20 12L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 5L4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 19L4 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <div className={`${isDarkMode ? 'bg-[rgba(0,0,0,1)] z-50 text-white' : 'bg-[rgba(255,255,255,1)] text-black'} w-full absolute top-20 border-2  border-purple-700 left-0 flex flex-col p-4 rounded-lg shadow-xl font-semibold  transform  transition-transform duration-300 ease-in-out`}>
          <ul className='flex flex-col gap-4 items-center font-bold'>
            {categories.map(category => (
              <Link href={`/${category}`} key={category}>
                <li className='cursor-pointer [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-purple-800' onClick={handleItemClick}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};



const Navbar = () => {
  const { cart } = useContext(CartContext)
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const pathname = usePathname();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const auth = getAuth(app)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [auth])

  return (
    <nav className={`flex justify-between z-50 items-center md:flex-row md:px-8 md:py-4 py-4 px-6 md:my-3 md:mx-32 md:rounded-full sticky top-0 md:top-3 ${isDarkMode ? 'bg-[rgba(0,0,0,0.6)]' : 'bg-[rgba(255,255,255,0.3)]'} backdrop-blur ${isDarkMode ? 'shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'shadow-[0_0_30px_rgba(0,0,0,0.2)]'}`}>
      <Logo />
      <MenuItems />
      <div className='md:flex justify-center hidden gap-5 items-center'>
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
        <Link href='/my-cart'  className={`${pathname === `/my-cart` ? 'border-2 border-purple-700 icon rounded-md' : ''} p-1 hidden md:block relative rounded`}>
          <Image unoptimized src='/cart.gif' priority={true} width={1} height={1} className={`w-7 md:flex hidden scale-x-[-1] cursor-pointer  ${isDarkMode ? 'cart-svg' : ''} icon`} alt='cart' />
          <div className='w-5 h-5 bg-purple-700 hidden md:flex absolute -top-1 -right-2 rounded-full text-white justify-center items-center'>
            {Object.keys(cart).length}
          </div>
        </Link>
        {!user ? (
          <Link href='/sign-in'>
            <button className='bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-full text-white hidden md:block'>
              Sign In
            </button>
          </Link>
        ) : (
          <UserMenu isDarkMode={isDarkMode} user={user} auth={auth} toggleDropdown={toggleDropdown} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
        )}
      </div>
      <MobileMenu />
    </nav>
  )
}

export default Navbar
