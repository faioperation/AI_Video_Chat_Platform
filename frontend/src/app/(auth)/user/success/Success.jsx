"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      router.push("/signin");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="bg-[#E6F7FB] w-[30%] px-30 py-30 text-center gap-5 flex flex-col items-center rounded-2xl">

        <div className="w-10 h-10 bg-[#00AF06] flex items-center justify-center rounded-full">
        <FaCheck className="text-white w-5 h-5" />

        </div>

        <p className="font-inter text-[24px] text-[#333333]">
          Password updated Successfully!
        </p>

        <Link href="/signin" className="w-full ">
          <button className="bg-[#010006] text-white w-full font-inter py-3 rounded-[8px] cursor-pointer mt-10 ">
            Back to Sign In
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success