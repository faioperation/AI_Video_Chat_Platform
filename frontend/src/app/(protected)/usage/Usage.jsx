"use client";
import Dropdown from '@/src/component/Dropdown';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { BiExport } from "react-icons/bi";


const Usage = () => {


     const TableHeads = [
    { Title: "Service", key: "service", width: "10%" },
    { Title: "Quantity Used", key: "quantity_used", width: "10%" },
    { Title: "Cost Per Unit", key: "cost", width: "10%" },
    { Title: "Estimated Cost", key: "estimated", width: "10%" },
    
  ];

  const TableRows = [
    {
      service: "GPT-40",
      quantity_used: "5,340 Minutes",
      cost: "$350.00",
      estimated: "$150.00",
     
    },
     {
      service: "ElevenLabs",
      quantity_used: "15,340 Minutes",
      cost: "$350.00",
      estimated: "$150.00",
     
    },
     {
      service: "Heygen",
      quantity_used: "5,340 Minutes",
      cost: "$350.00",
      estimated: "$150.00",
     
    },
   
  ];
     const handleOptionSelect = (option) => {
    console.log("Selected:", option);
  };

    const pathname = usePathname();
    const pathParts = pathname.split("/").filter(Boolean);
    const headerText = pathParts.join(" ");


      const handleExportCSV = () => {
  const headers = TableHeads.map((h) => h.Title);
  const rows = TableRows.map((row) =>
    TableHeads.map((h) => row[h.key]).join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "usage-report.csv";
  a.click();
  URL.revokeObjectURL(url);
};



  return (
    <div>
        <h3 className="capitalize font-inter text-[#000000] font-medium text-[24px] mb-8">
        Platform {headerText}
      </h3>

      <div className="mb-4 flex items-center justify-between">
          <Dropdown
          placeholder="Weekly"
            options={["Weekly", "Monthly", "Yearly"]}
            onSelect={handleOptionSelect}
            className={`w-[10%]`}
          />

          <div className='relative'>
            <button 
            onClick={handleExportCSV}
            className='font-inter font-medium text-[#000000] py-2.5 pl-10 pr-2 border-2 border-[#00AEEF] rounded-[8px]'>Export to CSV/XLSX</button>
            <BiExport className='w-6 h-6 top-1/2 left-2 -translate-y-1/2 absolute' />
          </div>

          
        </div>

        <div className='grid grid-cols-3 gap-7'>
            <div className='bg-[#D4EFE1] rounded-[20px] py-7 px-18 flex flex-col items-center '>
                <p className='font-inter font-medium text-[#121212]'>GPT-40 Token Used</p>
            </div>
            <div className='bg-[#F9D4C2] rounded-[20px] py-7 px-18 flex flex-col items-center'>
                <p className='font-inter font-medium text-[#121212]'>ElevenLabs Minutes Used</p>
            </div>
            <div className='bg-[#D0CFE1] rounded-[20px] py-7 px-18 flex flex-col items-center '>
                <p className='font-inter font-medium text-[#121212]'>HeyGen Minutes Used</p>
            </div>
        </div>

        <div>
            <h3 className="capitalize font-inter text-[#000000] font-medium text-[24px] mb-6 mt-10">
        Cost Estimation Table
      </h3>

            <table className="w-full my-6 border-collapse bg-[#F3F3F3] rounded-[20px]">
      {/* ==== TABLE HEADER ==== */}
      <thead>
        <tr className="">
          {TableHeads.map((head, idx) => (
            <th
             
              className={`text-center font-medium text-[#000000] py-[22px] borde border-[#000000]/10  text-[24px]
               `}
              style={{ width: head.width }}
            >
              {head.Title}
            </th>
          ))}
        </tr>
      </thead>

      {/* ==== TABLE BODY ==== */}
      <tbody className="">
        {TableRows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {TableHeads.map((head, headIdx) => (
              <td
                
                className="borde border-[#000000]/10 py-[22px] text-center px-3 font-inter text-[20px] text-[#000000]"
              >
               
                {head.render ? head.render(row, rowIdx) : row[head.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
        </div>
      
    </div>
  )
}

export default Usage
