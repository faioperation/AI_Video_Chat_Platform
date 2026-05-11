"use client";
import React, { useState } from 'react'
import Container from './Container'
import Image from 'next/image'
import icon from '@/public/icon.png'
import FAQdropdown from './FAQdropdown';

const FAQsection = () => {
   
  return (
    <div className='md:pt-20 pt-5 md:pb-[300px] pb-40'>
        <Container className={`flex justify-center flex-col items-center`}>

        <div className='md:w-[240px] w-[128px] py-2.5 rounded-full shadow-3xl bg-[#E0E7FF] flex items-center justify-center gap-2'>
            <Image src={icon} alt='icon' />
            <h3 className="font-inter font-bold text-center  text-[#1447E6]  ">
          FAQ
        </h3>

        </div>
        <div className="mt-[30px]">
          <h3 className="font-inter font-bold md:text-[36px] text-center dark:text-white text-[#0F172B]">
            Frequently Asked 
            <span className='text-[#00AEEF]'> Questions</span>
          </h3>
          <p className="font-onest text-[18px] text-[#45556C] dark:text-[#8B8B8C] mt-2 text-center ">
           Find answers to the most common questions about our platform and how it can help you succeed.
          </p>
        </div>



            <div className='w-full mt-[88px]'>
                <FAQdropdown
            className='border-b'
            question="What is the AI Video Chat Platform?"
            answer="AI Video Chat Platform is aaaaaaaaaaaaaaaaaaaaaaaaaaa"
            />

            <FAQdropdown
            className='border-b'
            question="Do I need to install any software to use it?"
            answer="AI Video Chat Platform is aaaaaaaaaaaaaaaaaaaaaaaaaaa"
            />

            <FAQdropdown
            className='border-b'
            question="How realistic are the AI avatars?"
            answer="AI Video Chat Platform is aaaaaaaaaaaaaaaaaaaaaaaaaaa"
            />

            <FAQdropdown
            className='border-b'
            question="Can I choose different avatars or voices?"
            answer="AI Video Chat Platform is aaaaaaaaaaaaaaaaaaaaaaaaaaa"
            />

            <FAQdropdown
            question="Is my data and conversation secure?"
            answer="AI Video Chat Platform is aaaaaaaaaaaaaaaaaaaaaaaaaaa"
            />
            </div>

        </Container>
      
    </div>
  )
}

export default FAQsection
