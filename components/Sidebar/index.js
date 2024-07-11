"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import SidebarItem from "@/components/Sidebar/SidebarItem"
import ClickOutside from "@/components/ClickOutside"
import useLocalStorage from "@/components/hooks/useLocalStorage"
import { useDarkMode } from "@/context/DarkModeContext"

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path d="M7 17L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 17L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 17L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        ),
        label: "Dashboard",
        route: "/admin"
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="M2 19L8.91302 14.2905C11.4387 12.5698 12.5613 12.5698 15.087 14.2905L22 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M2.01592 14.551C2.08186 17.5843 2.11484 19.1009 3.24611 20.2241C4.37738 21.3473 5.95183 21.3862 9.10072 21.4641C11.0393 21.512 12.9607 21.512 14.8993 21.4641C18.0482 21.3862 19.6226 21.3473 20.7539 20.2241C21.8852 19.1009 21.9181 17.5843 21.9841 14.551C22.0164 13.0649 21.9995 11.5934 21.9334 10.0921C21.8924 9.15964 21.8719 8.69341 21.6354 8.27984C21.3989 7.86628 20.9913 7.59935 20.176 7.0655L16.4152 4.60286C14.2742 3.20096 13.2038 2.5 12 2.5C10.7962 2.5 9.72577 3.20095 7.58483 4.60286L3.82397 7.0655C3.00869 7.59935 2.60106 7.86628 2.36459 8.27984C2.12812 8.69341 2.1076 9.15965 2.06656 10.0921C2.00049 11.5934 1.98361 13.0649 2.01592 14.551Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M22 9.5L17.7346 12.6072C16.7004 13.3606 15.8504 14 14.5 14M2 9.5L6.26538 12.6072C7.29955 13.3606 8.14961 14 9.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        ),
        label: "Inbox",
        route: "/admin/inbox"
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path d="M18 15L18 22M21.5 18.5L14.5 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 16H11M7 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6.5 3.5C4.9442 3.54667 4.01661 3.71984 3.37477 4.36227C2.49609 5.24177 2.49609 6.6573 2.49609 9.48836L2.49609 15.9944C2.49609 18.8255 2.49609 20.241 3.37477 21.1205C4.25345 22 5.66767 22 8.49609 22H11.5M15.4922 3.5C17.048 3.54667 17.9756 3.71984 18.6174 4.36228C19.4961 5.24177 19.4961 6.6573 19.4961 9.48836V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6.49609 3.75C6.49609 2.7835 7.2796 2 8.24609 2H13.7461C14.7126 2 15.4961 2.7835 15.4961 3.75C15.4961 4.7165 14.7126 5.5 13.7461 5.5H8.24609C7.2796 5.5 6.49609 4.7165 6.49609 3.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        ),
        label: "Add Products",
        route: "/admin/add-products"
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M2 11.4C2 10.2417 2.24173 10 3.4 10H20.6C21.7583 10 22 10.2417 22 11.4V12.6C22 13.7583 21.7583 14 20.6 14H3.4C2.24173 14 2 13.7583 2 12.6V11.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 3.4C2 2.24173 2.24173 2 3.4 2H20.6C21.7583 2 22 2.24173 22 3.4V4.6C22 5.75827 21.7583 6 20.6 6H3.4C2.24173 6 2 5.75827 2 4.6V3.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 19.4C2 18.2417 2.24173 18 3.4 18H20.6C21.7583 18 22 18.2417 22 19.4V20.6C22 21.7583 21.7583 22 20.6 22H3.4C2.24173 22 2 21.7583 2 20.6V19.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        label: "View Products",
        route: "/admin/all-products"
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path d="M17.4776 9.01106C17.485 9.01102 17.4925 9.01101 17.5 9.01101C19.9853 9.01101 22 11.0294 22 13.5193C22 15.8398 20.25 17.7508 18 18M17.4776 9.01106C17.4924 8.84606 17.5 8.67896 17.5 8.51009C17.5 5.46695 15.0376 3 12 3C9.12324 3 6.76233 5.21267 6.52042 8.03192M17.4776 9.01106C17.3753 10.1476 16.9286 11.1846 16.2428 12.0165M6.52042 8.03192C3.98398 8.27373 2 10.4139 2 13.0183C2 15.4417 3.71776 17.4632 6 17.9273M6.52042 8.03192C6.67826 8.01687 6.83823 8.00917 7 8.00917C8.12582 8.00917 9.16474 8.38194 10.0005 9.01101" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 13L12 21M12 13C11.2998 13 9.99153 14.9943 9.5 15.5M12 13C12.7002 13 14.0085 14.9943 14.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        label: "Gallery",
        route: "/admin/gallery",
      },
      {
        icon: (
          <svg className="w-6 h-6 rotate-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M7.83152 21.3478L7.31312 20.6576C6.85764 20.0511 5.89044 20.1 5.50569 20.7488C4.96572 21.6595 3.5 21.2966 3.5 20.2523V3.74775C3.5 2.7034 4.96572 2.3405 5.50569 3.25115C5.89044 3.90003 6.85764 3.94888 7.31312 3.34244L7.83152 2.65222C8.48467 1.78259 9.84866 1.78259 10.5018 2.65222L10.5833 2.76076C11.2764 3.68348 12.7236 3.68348 13.4167 2.76076L13.4982 2.65222C14.1513 1.78259 15.5153 1.78259 16.1685 2.65222L16.6869 3.34244C17.1424 3.94888 18.1096 3.90003 18.4943 3.25115C19.0343 2.3405 20.5 2.7034 20.5 3.74774V20.2523C20.5 21.2966 19.0343 21.6595 18.4943 20.7488C18.1096 20.1 17.1424 20.0511 16.6869 20.6576L16.1685 21.3478C15.5153 22.2174 14.1513 22.2174 13.4982 21.3478L13.4167 21.2392C12.7236 20.3165 11.2764 20.3165 10.5833 21.2392L10.5018 21.3478C9.84866 22.2174 8.48467 22.2174 7.83152 21.3478Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M15 9L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 15H14.991M9.00897 9H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        label: "Promo Codes",
        route: "/admin/promo-codes",
      },
    ]
  }
]

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard")
  const { isDarkMode } = useDarkMode()

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed border-r-2 ${isDarkMode ? 'bg-black' : 'bg-white'} border-purple-700 py-10 left-0 top-0 z-[9999] flex h-screen w-72 flex-col overflow-y-hidden transition-all duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center relative justify-center gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/admin" className="flex flex-col justify-center items-center">
            <Image
              className="w-20 h-20"
              width={100}
              height={32}
              src={"/logo-2.png"}
              alt="Logo"
              priority
            />
            <h1 className="font-bold text-xl">CodesCloth Admin</h1>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="absolute -top-5 right-4 md:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-8">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      setSidebarOpen={setSidebarOpen}
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}

        </div>
      </aside>
    </ClickOutside>
  )
}

export default Sidebar
