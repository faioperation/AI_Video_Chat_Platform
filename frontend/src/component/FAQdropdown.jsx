"use client";
import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa';


const FAQdropdown = ({question,answer,className}) => {
    const [dropdown,setDropdown]=useState(false);
  return (
    <div className={`w-full ${className}`}>
      <div  onClick={()=>setDropdown(!dropdown)}  className="one  border-b border-white dark:border-[#282726] cursor-pointer">
                      <div  className="up flex items-center justify-between py-[25.5px]">
                          <h4 className='text-[#333333] dark:text-[#8B8B8C] md:text-[18px] font-semibold font-inter'>{question}</h4>
                          {dropdown? <FaMinus className='w-[14px] h-[14px] text-[#333333] dark:text-[#8B8B8C]' />: <FaPlus className='w-[14px] h-[14px] text-[#333333] dark:text-[#8B8B8C]' />}
                          
                      </div>
                      <p className={`text-[#45556C] dark:text-[#8B8B8C] text-[14px]  font-inter  ${dropdown? "opacity-100 h-auto visible overflow-auto pb-4" : "opacity-0 h-0 invisible overflow-hidden"}`}>{answer}</p>
                      
                  </div>
    </div>
  )
}

export default FAQdropdown
