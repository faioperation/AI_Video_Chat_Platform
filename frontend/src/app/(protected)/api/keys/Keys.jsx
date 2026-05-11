"use client"
;import { usePathname } from 'next/navigation';
import React from 'react'

const Keys = () => {
    const pathname = usePathname();
        const pathParts = pathname.split("/").filter(Boolean);
        const headerText = pathParts.join(" ");
  return (
    <div>
        <h3 className="capitalize font-inter text-[#000000] font-medium text-[24px] mb-8">
         {headerText}
      </h3>

      
      <div className='flex items-center gap-7 mt-20'>
        <label className='font-inter font-medium text-[24px] text-[#000000]'>Gemini</label>
        <input type="text" className='w-[20%] font-inter   text-[#000000] bg-[#D9D9D9] outline-none py-2.5 px-6 rounded-[8px]' />
        <button className=' py-2.5 px-8 bg-[#00AEEF] text-[#121212] font-inter font-medium rounded-[12px]'>Save</button>
      </div>

        <div className='flex items-center gap-7 mt-20'>
        <label className='font-inter font-medium text-[24px] text-[#000000]'>Chatgpt</label>
        <input type="text" className='w-[20%] font-inter   text-[#000000] bg-[#D9D9D9] outline-none py-2.5 px-6 rounded-[12px]' />
         <button className=' py-2.5 px-8 bg-[#00AEEF] text-[#121212] font-inter font-medium rounded-[12px]'>Save</button>
      </div>
    </div>
  )
}

export default Keys
