"use client"

import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import { FaClipboardList, FaCalendarCheck } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname()

  const getLinkClass = (path) => {
    return `flex items-center gap-3 border px-3 py-2 rounded-l transition-all ${
      pathname === path
        ? "bg-primaryColor text-white border-primaryColor"
        : "border-gray-300 text-gray-700 hover:bg-gray-100"
    }`;
  };

  const getIconClass = (path) => {
    return pathname === path ? "text-[#EDF4C2]" : "text-primaryColor";
  };

  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px ]">
        <Link
          className={getLinkClass("/dashboard/add")}
          href="/dashboard/add"
        >
          <IoIosAddCircle className={`w-5 h-5 ${getIconClass("/dashboard/add")}`} />
          <p className="hidden  md:block">Add Items</p>
        </Link>

        <Link
          className={getLinkClass("/dashboard/list")}
          href="/dashboard/list"
        >
          <FaCalendarCheck className={`w-5 h-5 ${getIconClass("/dashboard/list")}`} />
          <p className="hidden  md:block">List Items</p>
        </Link>

        <Link
          className={getLinkClass("/dashboard/orders")}
          href="/dashboard/orders"
        >
          <FaClipboardList className={`w-5 h-5 ${getIconClass("/dashboard/orders")}`} />
          <p className="hidden  md:block">Orders</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
