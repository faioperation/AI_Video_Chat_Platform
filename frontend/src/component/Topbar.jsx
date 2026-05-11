"use client";
import Image from "next/image";
import React from "react";
import Avatar from "@/public/Avatar.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const pathname = usePathname();
  return (
    <div className=" flex items-center justify-between ">
      {pathname === "/dashboard" ? (
        <div className="relative ml-[200px]">
          <input
            type="text"
            className="border outline-none border-[#000000] py-[14px] px-12 w-[462px] rounded-[15px] text-[#000000] placeholder:text-[#000000] font-inter md:fixed hidden"
            placeholder="Search"
          />
          <FaSearch className=" hidden md:absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>
      ) : (
        <div className="h-[60px]" />
      )}

      <div className="flex items-center gap-10 ">
        <IoMdNotificationsOutline className="h-8 w-8 text-[#020202]" />

        <Image src={Avatar} alt="profile" />
      </div>
    </div>
  );
};

export default Topbar;
