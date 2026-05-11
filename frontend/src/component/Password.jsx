"use client";
import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const Password = ({ label, placeholder, className, name, value, onChange }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label className="font-inter text-[#000000] font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full outline-none py-3 px-2.5 text-[#6A7282] font-inter text-[16px] placeholder-[#6A7282] border border-[#000000] rounded"
          placeholder={placeholder}
        />
        <div
          onClick={() => setShowPass(!showPass)}
          className="w-6 h-6 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 text-[#6D6E73] cursor-pointer"
        >
          {showPass ? (
            <IoEyeOutline className="text-[#6A7282] w-6 h-6" />
          ) : (
            <FaRegEyeSlash className="text-[#6A7282] w-6 h-6" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Password;
