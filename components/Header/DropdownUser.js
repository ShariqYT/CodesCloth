"use client";
import { useState } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import { useDarkMode } from "@/context/DarkModeContext";
import { signOut } from "next-auth/react";

const DropdownUser = ({ session }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isDarkMode } = useDarkMode();

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      {session && (
        <>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            className="w-full flex items-center border-2 border-purple-700 hover:bg-purple-700 hover:text-white transition-all duration-200 ease-in-out rounded-lg px-4 py-2 md:gap-4"
          >
            <span className="text-right lg:block">
              <span className="block text-[16px] md:text-sm font-medium">{session.user.name}</span>
              <span className="block text-[12px] md:text-xs">{session.user.email}</span> {/* or another user attribute */}
            </span>
            <svg
              className="hidden fill-current sm:block"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div
              className={`absolute right-0 mt-6 flex w-60 flex-col rounded-lg border-2 border-purple-700 ${isDarkMode ? "bg-black" : "bg-white"}`}
            >
              <ul className="flex flex-col gap-5 px-5 py-4">
                <li>
                  <Link
                    onClick={signOut}
                    href="/admin/admin-signin"
                    className="flex items-center gap-3.5 text-sm font-medium duration-200 ease-in-out hover:text-red-500 lg:text-base"
                  >
                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                      <path d="M6 6.50006C4.15875 8.14802 3 10.3345 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 10.3345 19.8412 8.14802 18 6.50006" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 2V11M12 2C11.2998 2 9.99153 3.9943 9.5 4.5M12 2C12.7002 2 14.0085 3.9943 14.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
