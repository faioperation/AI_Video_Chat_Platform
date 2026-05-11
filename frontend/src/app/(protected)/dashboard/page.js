"use client";
import Dropdown from "@/src/component/Dropdown";
import LineChart from "@/src/component/LineChart";
import React from "react";
import { FaDollarSign, FaGgCircle, FaUsers } from "react-icons/fa";
import { IoTime } from "react-icons/io5";


const page = () => {
  const handleOptionSelect = (option) => {
    console.log("Selected:", option);
  };

  return (
    <div>

      <div className="grid grid-cols-12 gap-10 mb-15">
        <div className="bg-[#D4EFE1] col-span-12 md:col-span-3 p-[22px] flex flex-col items-center gap-2 rounded-[20px] text-center">
          <FaUsers className="w-14 h-14" />
          <p className="font-inter text-[#121212]">
            Total Active Sessions
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            3245
          </p>
        </div>

        <div className="bg-[#F9D4C2] col-span-12 md:col-span-3 p-[22px] flex flex-col items-center gap-2 rounded-[20px] text-center">
          <IoTime className="w-14 h-14" />
          <p className="font-inter text-[#121212]">
            Total Minute Used
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            23245
          </p>
        </div>

        <div className="bg-[#D0CFE1] p-[22px] col-span-12 md:col-span-3 flex flex-col items-center gap-2 rounded-[20px] text-center ">
          <FaGgCircle  className="w-14 h-14" />
          <p className="font-inter text-[#121212]">
           Total GPT Tokens Consumed
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            32450
          </p>
        </div>

        <div className="bg-[#FBEFD2] p-[22px] col-span-12 md:col-span-3 flex flex-col items-center gap-2 rounded-[20px] text-center">
          <FaDollarSign className="w-14 h-14" />
          <p className="font-inter text-[#121212]">
            Total Revenue
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            13245
          </p>
        </div>
      </div>

      <div >
        <h3 className="font-inter font-medium text-[#000000] text-[24px]  mb-1">Usage Trends</h3>
        <div className="mb-4 flex items-center justify-between">
          <Dropdown
          placeholder="Weekly"
            options={["Weekly", "Monthly", "Yearly"]}
            onSelect={handleOptionSelect}
            className={`w-[10%]`}
          />

          <div className="w-[10%] bg-[#E8E8E8] rounded-[10px] p-2 text-center">
          <p className="font-inter text-[#000000]">
            System Status
          </p>

          <p className="flex items-center gap-1 font-inter text-[#000000] font-semibold mt-2 ">
            <span className="w-3 h-3 bg-[#199C08] rounded-full"></span>
            Healthy
          </p>

          </div>
        </div>

        <LineChart />
      </div>
    </div>
  );
};

export default page;
