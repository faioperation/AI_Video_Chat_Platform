import React from "react";
import Container from "./Container";
import Image from "next/image";
import technology from "@/public/technology.png";
import cartoon from "@/public/cartoon.png";
import video from "@/public/video.png";
import icon from "@/public/icon.png";
import { PiSealCheckFill } from "react-icons/pi";
import Link from "next/link";

const VideoChat = () => {
  return (
    <div className="md:py-[250px] py-30">
      <Container
        className={`flex justify-center flex-col items-center  `}
      >
       <div className='md:w-[240px] w-[128px] py-2.5 rounded-full shadow-3xl bg-[#E0E7FF] flex items-center justify-center gap-2'>
        <Image src={icon} alt='icon' />
            <h3 className="font-inter font-bold text-center  text-[#1447E6]  ">
          Video Chat
        </h3>

        </div>
        <div className="mt-[30px]">
          <h3 className="font-inter font-bold md:text-[36px] text-center text-[#00AEEF]">
            Talk face to face with AI
          </h3>
          <p className="font-onest md:text-[18px] text-[#45556C] dark:text-[#8B8B8C] mt-2 text-center ">
            High-quality video chat enabling instant, face-to-face interaction
            between users and AI avatars.
          </p>
        </div>
        <div className="md:flex md:items-center justify-center md:justify-between mt-20">
          <div className="flex justify-center">
            <Image src={technology} alt="" />
          </div>
          <div className="md:w-[55%]">
            <p className="font-onest md:text-[18px] text-[#45556C] dark:text-[#8B8B8C] md:mt-2 mt-5 text-center md:text-start ">
              Leveraging GPT technology, our platform provides personalized,
              real-time assistance. Get instant feedback and tailored resources
              to enhance your learning experience.
            </p>

            <div className="flex flex-col items-center md:items-start gap-2.5 mt-[30px]">
              <p className="text-[#6A7282] dark:text-[#8B8B8C] font-inter flex items-center gap-4 px-2.5 py-2 border border-[#00AEEF] w-[60%] rounded-full ">
                <PiSealCheckFill className="w-5 h-5" />
                Face to face AI interaction
              </p>

              <p className="text-[#6A7282] dark:text-[#8B8B8C] font-inter flex items-center gap-4 px-2.5 py-2 border border-[#00AEEF] w-[60%] rounded-full ">
                <PiSealCheckFill className="w-5 h-5" />
                Real-time video responses
              </p>

              <p className="text-[#6A7282] dark:text-[#8B8B8C] font-inter flex items-center gap-4 px-2.5 py-2 border border-[#00AEEF] w-[60%] rounded-full ">
                <PiSealCheckFill className="w-5 h-5" />
                Seamless browser access
              </p>
            </div>

           <div className="flex justify-center md:justify-start">
             <button className="bg-[#00AEEF] mt-10 px-15 py-2.5 rounded-[10px] text-white   cursor-pointer">
              Try now
            </button>
           </div>
          </div>
        </div>
      </Container>

      <Container
        className={`flex justify-center flex-col items-center mt-[120px]`}
      >
        <div className="relative">
          <Image className="md:w-auto md:h-auto h-[450px] w-[450px]" src={cartoon} alt="cartoon" />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[70%] bg-[#B9ECFF] pt-[14px] pb-4 px-7 md:px-25 md:pt-5 md:pb-[45px] text-center flex flex-col items-center gap-2 md:gap-5 rounded-xl">
            <p className="text-[#000000]  font-inter font-medium text-[12px] md:text-[16px]">Kelvin is waiting for you</p>
 
 <Link href='/chatroom'>
 
            <Image src={video} alt="video"/>
 </Link>

            <p className="font-inter  text-[#000000] text-[12px] md:text-[16px]">By joining this meeting you accept our 

                <a className="text-[#00AEEF] underline" href="/"> privacy policy</a>
            </p>

          </div>
        </div>
      </Container>


    
    </div>
  );
};

export default VideoChat;
