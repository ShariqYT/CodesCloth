import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SidebarItem = ({ item, pageName, setPageName }) => {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : ""
    return setPageName(updatedPageName)
  }

  const pathname = usePathname()

  const isActive = item => {
    if (item.route === pathname) return true
    if (item.children) {
      return item.children.some(child => isActive(child))
    }
    return false
  }

  const isItemActive = isActive(item)

  return (
    <>
      <li className={item.route}>
        <Link
          href={item.route}
          onClick={handleClick}
          className={`${
            isItemActive ? "bg-purple-700 rounded-xl text-white" : ""
          } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium  duration-300 ease-in-out hover:bg-graydark `}
        >
          {item.icon}
          {item.label}
        </Link>
      </li>
    </>
  )
}

export default SidebarItem