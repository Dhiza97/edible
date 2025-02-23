"use client"

import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import { FaClipboardList, FaCalendarCheck } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";

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
    <div className="w-[18%] min-h-screen border-r-2 fixed top-[60px]">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px ]">
        <Link
          className={getLinkClass("/admin/dashboard")}
          href="/admin/dashboard"
        >
          <MdDashboard className={`w-5 h-5 ${getIconClass("/admin/dashboard")}`} />
          <p className="hidden  md:block">Dashboard</p>
        </Link>

        <Link
          className={getLinkClass("/admin/dashboard/add")}
          href="/admin/dashboard/add"
        >
          <IoIosAddCircle className={`w-5 h-5 ${getIconClass("/admin/dashboard/add")}`} />
          <p className="hidden  md:block">Add Items</p>
        </Link>

        <Link
          className={getLinkClass("/admin/dashboard/list")}
          href="/admin/dashboard/list"
        >
          <FaCalendarCheck className={`w-5 h-5 ${getIconClass("/admin/dashboard/list")}`} />
          <p className="hidden  md:block">List Items</p>
        </Link>

        <Link
          className={getLinkClass("/admin/dashboard/orders")}
          href="/admin/dashboard/orders"
        >
          <FaClipboardList className={`w-5 h-5 ${getIconClass("/admin/dashboard/orders")}`} />
          <p className="hidden  md:block">Orders</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
