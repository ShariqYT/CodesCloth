"use client";
import Link from "next/link";
import DropdownUser from "./DropdownUser";
import { useDarkMode } from "@/context/DarkModeContext";
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import Image from "next/image";
import Logo from '@/public/logo3.png';

const Header = (props) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin/admin-signin');

  return (
    <header className={`sticky top-0 z-[999] flex w-full ${isDarkMode ? 'bg-black drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'bg-white drop-shadow-[0_0_30px_rgba(0,0,0,0.2)]'}`}>
      <div className={isAdminRoute ? "flex items-center justify-between px-4 py-4 w-full shadow-2 md:px-6 2xl:px-11" : `flex flex-grow items-center md:justify-end justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11`}>
        <div className={isAdminRoute ? "" : `flex items-center gap-2 sm:gap-4 lg:hidden`}>
          {/* Hamburger Toggle BTN */}
          {isAdminRoute ? (
            <Link href={'/'}>
              <Image priority src={Logo} alt="Logo" className="w-24" />
            </Link>
          ) : (
            <button
              aria-controls="sidebar"
              aria-label="Toggle sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-[99999] block rounded-lg border bg-transparent p-1.5 shadow-sm lg:hidden"
            >
              <span className="relative block h-5 w-5 cursor-pointer">
                <span className="absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-full bg-purple-700 delay-0 duration-200 ease-in-out  ${!props.sidebarOpen && "!w-full delay-300"}`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-full bg-purple-700 delay-150 duration-200 ease-in-out  ${!props.sidebarOpen && "delay-400 !w-full"}`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-full bg-purple-700 delay-200 duration-200 ease-in-out  ${!props.sidebarOpen && "!w-full delay-500"}`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-full bg-purple-700 delay-300 duration-200 ease-in-out  ${!props.sidebarOpen && "!h-0 !delay-0"}`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-full bg-purple-700 duration-200 ease-in-out  ${!props.sidebarOpen && "!h-0 !delay-200"}`}
                  ></span>
                </span>
              </span>
            </button>
          )}
          {/* Hamburger Toggle BTN */}
        </div>

        <Link href={'/'} target="_blank">
          <p className="hover:underline w-full">Dashboard ↗</p>
        </Link>

        <div className="flex items-center md:gap-3 ">
          <ul className="flex items-center gap-2 w-fit ">
            {/* Dark Mode Toggler */}
            <button onClick={toggleDarkMode} className="mx-10 hidden md:block" aria-label="Toggle Dark Mode">
              {!isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-7 icon' fill="none">
                  <path d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-7 fill-white' fill="none">
                  <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
            {/* Dark Mode Toggler */}
          </ul>
          {/* User Area */}
          <DropdownUser session={session} />
          {/* User Area */}
        </div>
      </div>
    </header>
  );
};

export default Header;
