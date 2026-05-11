"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Dropdown = ({
//   label = "Select Option",
  placeholder = "",
  options = [],
  onSelect,
  className,
  inputClass,
  spanClass,
}) => {
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    setSelected(value);
    setShow(false);
    if (onSelect) onSelect(value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col gap-2  relative ${className}`}
    >
      {/* Label */}
      {/* <label className="font-roboto text-[#000000] text-[16px]">
        {label}
        <span className={`text-[#F46B6A] ${spanClass}`}>*</span>
      </label> */}

      {/* Input Box */}
      <div className="relative">
        <div onClick={() => setShow(!show)}>
          <input
            readOnly
            value={selected || ""}
            className={`w-full bg-white rounded-[10px] outline-none py-2.5 px-2 text-[#000000] placeholder:text-[#000000] font-inter text-[16px] border-2 border-[#00AEEF] font-medium  cursor-pointer ${inputClass}`}
            placeholder={placeholder}
          />

          {/* Arrow Icon */}
          <div className="w-6 h-6  flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 text-[#000000]">
            {show ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`absolute left-0 top-[105%] w-full bg-white border border-[#00AEEF] rounded-md shadow-md font-roboto text-[14px] text-[#000000] z-30 transition-all duration-300 text-center overflow-y-scroll hide-scrollbar ${
            show
              ? "opacity-100 visible max-h-60 overflow-auto"
              : "opacity-0 invisible max-h-0 overflow-hidden"
          }`}
        >
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="py-2 hover:bg-[#00AEEF] font-inter text-[#000000] hover:text-white cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;