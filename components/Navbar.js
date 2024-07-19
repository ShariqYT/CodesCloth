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
      <Image unoptimized src='/logo4.png' priority={true} width={1} height={1} className={`w-24 filter ${isDarkMode ? `drop-shadow-[0_0px_10px_rgba(0,0,0,1)]` : `drop-shadow-[0_0px_2px_rgb(0_0_0/_100%)`}`} alt='logo' />
    </Link>
  )
};

const MenuItems = () => {
  const pathname = usePathname();
  const { isDarkMode } = useDarkMode();
  const categories = ['tshirts', 'hoodies', 'mugs', 'caps'];

  return (
    <ul className={`md:flex justify-center flex-col ${isDarkMode ? "text-white" : "text-gray-800"} hidden md:flex-row gap-8 items-center font-bold`}>
      {categories.map(category => (
        <Link href={`/${category}`} key={category}>
          <li className={`p-1 ${pathname === `/${category}` ? 'border-2 border-purple-700 rounded-md px-4' : ''} cursor-pointer [text-shadow:_0_0px_20px_rgb(255_255_255_/_100%)] hover:text-purple-800 transition-all duration-200 ease-in-out`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        </Link>
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
      <div className={`${isDarkMode ? 'bg-[rgba(0,0,0,1)] text-white' : 'bg-white'} border-2 border-purple-700 w-48 absolute top-14 md:top-16 right-0 flex flex-col p-4 rounded-lg shadow-xl font-semibold transform transition-transform duration-200 ease-in-out`}>
        <ol className='space-y-2'>
          <li className='p-1'>
            <Link className='hover:text-purple-700 flex items-center gap-2 transition-colors duration-200 ease-in-out' href='/myaccount'>
              <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path d="M10.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C8.12805 13.9629 11.2057 13.6118 14 14.4281" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M18.4332 13.8485C18.7685 13.4851 18.9362 13.3035 19.1143 13.1975C19.5442 12.9418 20.0736 12.9339 20.5107 13.1765C20.6918 13.2771 20.8646 13.4537 21.2103 13.8067C21.5559 14.1598 21.7287 14.3364 21.8272 14.5214C22.0647 14.9679 22.0569 15.5087 21.8066 15.9478C21.7029 16.1298 21.5251 16.3011 21.1694 16.6437L16.9378 20.7194C16.2638 21.3686 15.9268 21.6932 15.5056 21.8577C15.0845 22.0222 14.6214 22.0101 13.6954 21.9859L13.5694 21.9826C13.2875 21.9752 13.1466 21.9715 13.0646 21.8785C12.9827 21.7855 12.9939 21.6419 13.0162 21.3548L13.0284 21.1988C13.0914 20.3906 13.1228 19.9865 13.2807 19.6232C13.4385 19.2599 13.7107 18.965 14.2552 18.375L18.4332 13.8485Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              My Account
            </Link>
          </li>
          <li className='p-1'>
            <Link className='hover:text-purple-700 flex items-center gap-2 transition-colors duration-200 ease-in-out' href='/my-orders'>
              <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path d="M20 12.5C19.9751 12.4136 19.9499 12.326 19.9244 12.2373C18.8875 8.63723 17.4956 7.5 13.4291 7.5H9.65019C5.74529 7.5 4.23479 8.48796 3.1549 12.2373C2.18223 15.6144 1.6959 17.3029 2.20436 18.6124C2.51576 19.4143 3.06862 20.1097 3.79294 20.6104C5.17171 21.5636 8.63187 22.0381 12 21.9976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 8V6.36364C7 3.95367 9.01472 2 11.5 2C13.9853 2 16 3.95367 16 6.36364V8" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 11H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              My Orders
            </Link>
          </li>
          <li className='p-1'>
            <Link className='hover:text-purple-700 flex items-center gap-2 transition-colors duration-200 ease-in-out' href='/my-wishlist'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-6' fill="none" >
                <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              My Wishlist
            </Link>
          </li>
          <li className='p-1'>
            <p
              onClick={() => {
                signOut(auth)
                toast.success('Logged out successfully', {
                  duration: 5000,
                  style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' }
                })
              }}
              className='hover:text-red-500 hover:fill-red-500 flex items-center gap-2 cursor-pointer transition-colors duration-200 ease-in-out'
            >
              <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path d="M4 9.20433C4 7.13117 4 6.09459 4.35762 5.25272C4.65634 4.54951 5.1278 3.94591 5.7219 3.50609C6.43314 2.97955 7.38764 2.79412 9.29665 2.42326C11.2817 2.03762 12.2743 1.8448 13.0467 2.15208C13.6884 2.40733 14.229 2.88944 14.5789 3.51833C15 4.27538 15 5.35327 15 7.50906V16.4909C15 18.6467 15 19.7246 14.5789 20.4817C14.229 21.1106 13.6884 21.5927 13.0467 21.8479C12.2743 22.1552 11.2817 21.9624 9.29665 21.5767C7.38764 21.2059 6.43314 21.0205 5.7219 20.4939C5.1278 20.0541 4.65634 19.4505 4.35762 18.7473C4 17.9054 4 16.8688 4 14.7957V9.20433Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M15 19.7982C16.4473 19.9487 18.3999 20.4116 19.4375 19.0885C20 18.3712 20 17.2786 20 15.0934V8.90664C20 6.72138 20 5.62876 19.4375 4.91152C18.3999 3.58841 16.4473 4.05129 15 4.20177" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 13L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 19.7266L22 19.7266" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 20H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
  const categories = ['tshirts', 'hoodies', 'mugs', 'caps'];

  const handleItemClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='md:hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
      
        <div onClick={() => setIsOpen(!isOpen)} className={`${isDarkMode ? 'bg-[rgba(0,0,0,1)] !z-10 text-white' : 'bg-[rgba(255,255,255,1)] text-black'} ${isOpen ? 'translate-x-0' : '-translate-x-[500px]'} w-full absolute top-20 border-2  border-purple-700 left-0 flex flex-col p-4 rounded-lg shadow-xl font-semibold  transform  transition-all duration-300 ease-in-out`}>
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
    </div>
  );
};


const Navbar = () => {
  const { cart } = useContext(CartContext)
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  // if (loading) {
  //   return (
  //     <nav className={`animate-pulse flex justify-between z-50 items-center md:flex-row md:px-8 md:py-4 py-4 px-6 md:my-3 md:mx-32 md:rounded-full sticky top-0 md:top-3 ${isDarkMode ? 'bg-[rgba(0,0,0,0.6)]' : 'bg-[rgba(255,255,255,0.3)]'} backdrop-blur ${isDarkMode ? 'shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'shadow-[0_0_30px_rgba(0,0,0,0.2)]'}`}>
  //     <p className='w-52 h-10 bg-gray-300 icon p-2 rounded-full'></p>
  //     <p className='w-96 h-10 bg-gray-300 icon p-2 rounded-full'></p>
  //     <p className='w-8 h-10 bg-gray-300 icon p-2 rounded-full'></p>
  //   </nav>
  //   );
  // }

  return (
    <nav className={`flex ${loading ? '-translate-y-32' : 'translate-y-0'} border-b-4 md:border-4 border-purple-900 transition-all duration-1000 ease-in-out justify-between z-50 items-center md:flex-row md:px-8 md:py-4 py-4 px-6 md:my-3 md:mx-32 md:rounded-full sticky top-0 md:top-3 ${isDarkMode ? 'bg-[rgba(0,0,0,0.6)]' : 'bg-[rgba(255,255,255,0.3)]'} backdrop-blur ${isDarkMode ? 'shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'shadow-[0_0_30px_rgba(0,0,0,0.2)]'}`}>
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
        <Link href='/my-cart' className={`${pathname === `/my-cart` ? 'border-2 border-purple-700 icon rounded-md' : ''} p-1 hidden md:block relative rounded`}>
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
