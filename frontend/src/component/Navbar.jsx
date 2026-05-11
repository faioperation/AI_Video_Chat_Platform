"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { GoHome } from "react-icons/go";
import { BsStars } from "react-icons/bs";
import { PiVideoCamera } from "react-icons/pi";
import Link from "next/link";
import Cookies from "js-cookie";
import { FaUserCircle } from "react-icons/fa";

const Li = ({ children, className }) => {
  return (
    <li
      className={`text-black md:dark:text-white font-inter cursor-pointer hover:text-[#00AEEF] transition-colors duration-300 ${className}`}
    >
      {children}
    </li>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  const profileRef = useRef(null);

  // Check login status from cookie
  useEffect(() => {
    const token = Cookies.get("user_token");
    const name = Cookies.get("name");
    const email = Cookies.get("user_email");

    if (token) {
      setIsLoggedIn(true);
      setUserInfo({
        name: name || "User",
        email: email || "example@gmail.com",
      });
    }
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Logout
  const handleLogout = () => {
    Cookies.remove("user_token");
    Cookies.remove("name");
    Cookies.remove("user_email");
    setIsLoggedIn(false);
    setProfileOpen(false);
  };

  return (
    <nav className="flex justify-between items-center py-4 px-[5%] rounded-full md:border md:border-[#006489]/40 md:bg-white/20 md:backdrop-blur-sm md:dark:bg-white/20 md:dark:backdrop-blur-sm z-30">

      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-between w-[50%] py-2.5">
        <Li>Home</Li>
        <Li>Features</Li>
        <Li>Video Chat</Li>
        <Li>Pricing</Li>
        <Li>FAQ</Li>
        <Li>Blog</Li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-3 w-full md:w-auto">

        {/* Desktop Button / Avatar */}
        <div className="bg-white p-[1px] rounded-full hidden md:block relative" ref={profileRef}>
          {isLoggedIn ? (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FaUserCircle className="text-4xl text-[#0F172B] " />
              </div>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-[#0F172B] shadow-lg rounded-xl p-4 z-60">
                  <p className="font-semibold font-inter text-[#0F172B] dark:text-white">
                    {userInfo.name}
                  </p>
                  <p className="text-sm font-inter text-gray-600 dark:text-gray-300">
                    {userInfo.email}
                  </p>

                  <button
                    onClick={handleLogout}
                    className="mt-4 cursor-pointer bg-red-500 w-full py-2 rounded-lg text-white hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/user/signin">
              <button className="bg-[#0F172B] px-6 py-2.5 rounded-full hover:bg-[#314D91] transition-all duration-300 cursor-pointer text-white dark:text-black">
                JOIN
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center justify-between w-full">
          <button
            className="md:hidden text-3xl text-[#0F172B] dark:text-white cursor-pointer z-30"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX className="w-8 h-8" /> : <FiMenu className="w-8 h-8" />}
          </button>

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[0%] left-0 w-full bg-white/50 backdrop-blur-md py-15 flex flex-col items-center gap-6 shadow-lg md:hidden transition-all duration-300 z-20">
          <ul className="flex flex-col gap-5">
            <Li className="flex flex-col items-center">
              <GoHome className="h-6 w-6" />
              Home
            </Li>
            <Li className="flex flex-col items-center">
              <BsStars className="h-6 w-6" />
              Features
            </Li>
            <Li className="flex flex-col items-center">
              <PiVideoCamera className="h-6 w-6" />
              Video Chat
            </Li>
          </ul>

          {/* Mobile JOIN or Avatar */}
          {isLoggedIn ? (
            <div className="flex flex-col items-center">
              <FaUserCircle className="text-5xl text-[#0F172B]  mt-3" />

              <p className="mt-2 font-semibold">{userInfo.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{userInfo.email}</p>

              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 px-6 py-2 rounded-full text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/signin">
              <button className="bg-[#0F172B] px-6 py-2.5 rounded-full hover:bg-[#314D91] transition-all duration-300 cursor-pointer text-white dark:text-black">
                JOIN
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
