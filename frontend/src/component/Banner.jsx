import React from "react";
import Navbar from "./Navbar";
import Container from "./Container";
import { IoIosSearch, IoIosSend } from "react-icons/io";
import Image from "next/image";
import union from "@/public/Union.png";

const Banner = () => {
  return (
    <div  className='bg-[url("/bannerLight.png")] dark:bg-[url("/bannerdark.png")] bg-cover bg-no-repeat bg-center  pt-5 md:pt-[50px] pb-[120px] relative after:absolute after:w-full after:h-full dark:after:bg-black/40 after:bg-transparent  after:top-0 z-30 after:-z-30 '>
      <Container className="">
        <Navbar />

        <div className="text-center">
          <div className="md:w-[50%] w-[90%] mx-auto text-center mt-[87px]   ">
            <div className="relative -z-30">
              <input
                className="font-inter w-full text-[#6A7282] placeholder:text-[#6A7282] py-2.5 pl-11 outline-none  border border-[#6A7282] rounded mx-auto"
                type="text"
                placeholder="Ask anything"
              />
              <div className="w-6 h-6 absolute top-1/2 right-4 -translate-y-1/2 ">
                <IoIosSend className="text-[#00AEEF]  w-full h-full " />
              </div>

              <div className="w-6 h-6 absolute top-1/2 left-4 -translate-y-1/2 ">
                <IoIosSearch className="text-[#6A7282]  w-full h-full " />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3  justify-center mt-16">
            <Image src={union} alt="union" className="" />
            <p className="text-[#00AEEF] font-outfit uppercase tracking-[4]">
              Talk to AI Avatars in Real Time
            </p>
          </div>

          <div className="mt-5">
            <h3 className="font-inter font-bold md:text-[48px] flex flex-col items-center text-[#333333] dark:text-[#F1F1F1]">
              AI
              Video Chat Platform_ MVP</h3>
            <p className="font-onest text-[#6A7282] text-[12px] md:text-[16px] dark:text-[#C9C4C4] mt-4 text-center">AI Video Chat Platform is the next-generation AI assistant platform, designed to empower developers, creators, educators and businesses with seamless access to the most advanced language models, voice capabilities, and productivity tools. </p>
          </div>


          <div className="flex flex-wrap    justify-center gap-7  mt-15">
            <p className="font-inter text-center md:text-[25px] font-medium md:w-[288px] w-[196px] md:px-10 px-8 py-12 md:py-[77px]  dark:bg-[#00AEEF] bg-white rounded-xl dark:text-white text-[#000000]">
              Real Time AI Talk
            </p>
            <p className="font-inter text-center md:text-[25px] font-medium md:w-[288px] w-[196px] md:px-10 px-8 py-12 md:py-[77px]  dark:bg-[#00AEEF] bg-white rounded-xl dark:text-white text-[#000000]">
             Lifelike Avatar
            </p>
            <p className="font-inter text-center md:text-[25px] font-medium md:w-[288px] w-[196px] md:px-5 px-5 py-12 md:py-[77px]  dark:bg-[#00AEEF] bg-white rounded-xl dark:text-white text-[#000000]">
              Browser Based Chat
            </p>
          </div>


          <button className="bg-[#0F172B] dark:bg-[#F1F1F1] mt-15 px-10 py-4 rounded text-white dark:text-black  hover:bg-[#314D91] transition-all duration-300 cursor-pointer font-inter">
           Try for free now
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
