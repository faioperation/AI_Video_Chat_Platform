"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

import sideicon1 from "@/public/sideicon1.png";
import sideicon2 from "@/public/sideicon2.png";
import sideicon3 from "@/public/sideicon3.png";
import sideicon4 from "@/public/sideicon4.png";
import sideicon5 from "@/public/sideicon5.png";
import sideicon6 from "@/public/sideicon6.png";
import logout from "@/public/logout.png";

const navitems = [
  { name: "Overview", link: "/dashboard", icon: sideicon1 },
  { name: "Users", link: "/users", icon: sideicon2 },
  { name: "Usage", link: "/usage", icon: sideicon3 },
  { name: "API Keys", link: "/api/keys", icon: sideicon4 },
  { name: "Logs", link: "/logs", icon: sideicon5 },
  { name: "Settings", link: "/settings", icon: sideicon6 },
];


const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 🔥 LOGOUT HANDLER
const handleLogout = async () => {
  try {
    const email = localStorage.getItem("admin_email");
    const token = Cookies.get("admin_token");

    await axios.get("http://127.0.0.1:8000/api/admin-logout", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
        email: email
      },
      withCredentials: true
    });

    Cookies.remove("admin_token");
    Cookies.remove("email");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("email");

    window.location.href = "/admin/signin";

  } catch (error) {
    console.error("Logout failed:", error);

    Cookies.remove("admin_token");
    Cookies.remove("email");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("email");

    window.location.href = "/admin/signin";
  }
};

// const handleLogout = async () => {
//   try {
//     await axios.get("http://127.0.0.1:8000/api/admin-logout", {
//       withCredentials: true, 
//     });

   
//     Cookies.remove("admin_token");
//     localStorage.removeItem("token");

//     router.push("/signin");
//   } catch (error) {
//     console.error("Logout failed:", error);

//     Cookies.remove("admin_token");
//     localStorage.removeItem("token");

//     router.push("/signin");
//   }
// };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="2xl:hidden fixed top-5 left-5 z-50 p-2 bg-[#00AEEF] text-[#F1F1F1] rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed 2xl:static top-0 left-0 z-40 max-h-screen w-[241px] shrink-0 flex flex-col pl-2.5 pr-5 py-7 bg-[#F1F1F1] rounded-r-3xl 2xl:rounded-3xl shadow-lg transition-transform duration-300 ease-in-out overflow-scroll hide-scrollbar
        ${isOpen ? "translate-x-0" : "-translate-x-full 2xl:translate-x-0"}`}
      >
        {/* LOGO */}
        <div className="text-center">
          <p className="text-4xl font-bold py-3">Logo</p>
        </div>

        {/* NAV ITEMS */}
        <ul className="flex flex-col gap-6 mt-[90px]">
          {navitems.map((item, index) => {
            const isActive = pathname === item.link;

            return (
              <Link
                href={item.link}
                key={index}
                className={`py-2 px-2 font-inter font-medium flex items-center gap-4 cursor-pointer rounded-[8px] transition-all duration-200 ${
                  isActive
                    ? "bg-[#00AEEF] "
                    : "text-[#000000] hover:bg-[#00AEEF]"
                }`}
              >
                <Image src={item.icon} alt={item.name} className="w-6 h-6" />
                {item.name}
              </Link>
            );
          })}
        </ul>

        {/* LOGOUT BUTTON */}
        <div className="mt-60">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 py-2 px-2 w-full text-[#FF1100] hover:bg-[#00AEEF] font-inter font-medium cursor-pointer rounded-[8px] transition-all duration-200"
          >
            <Image src={logout} alt="log out" className="w-6 h-6" />
            Log Out
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 2xl:hidden"
          onClick={() => setIsOpen(false)}
        >
        </div>
      )}
    </>
  );
};

export default Sidebar;
