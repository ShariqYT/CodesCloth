import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const SidebarItem = ({ item, pageName, setPageName, setSidebarOpen }) => {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    setPageName(updatedPageName);
    setSidebarOpen(false); // Close the sidebar
  };

  const pathname = usePathname();

  const isActive = (item) => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some(child => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);

  return (
    <li>
      <Link
        href={item.route}
        onClick={handleClick}
        className={clsx(
          "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium transition-all duration-200 ease-in-out",
          {
            "bg-purple-700 rounded-xl text-white": isItemActive,
          }
        )}
        aria-current={isItemActive ? "page" : undefined}
      >
        {item.icon}
        {item.label}
      </Link>
    </li>
  );
};

export default SidebarItem;
