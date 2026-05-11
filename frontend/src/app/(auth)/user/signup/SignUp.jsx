"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from "@/public/auth_logo.png"
import InputField from '@/src/component/InputField'
import Password from '@/src/component/Password'
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();

  // form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    heardFrom: '',
    password: '',
    confirmPassword: '',
  });

  // for showing messages or loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  // input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // frontend validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/api/user-registration", {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        hear_about_us: formData.heardFrom,
      });

      if (res.status === 200 || res.status === 201) {
        setSuccess("Account created successfully!");
        setTimeout(() => {
          router.push("/user/signin");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen grid justify-center items-center py-20 overflow-y-auto hide-scrollbar">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] text-cente gap-5 flex flex-col items-center rounded-2xl"
      >
        <Image src={logo} alt="" />

        <h3 className='font-inter font-bold text-[30px] text-[#333333] mb-9 mt-15'>
          Create your free account
        </h3>

        <div className='w-full flex flex-col gap-5'>
          <InputField
            label='Full Name'
            placeholder='Enter your name here'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            label='Email Address'
            placeholder='Enter your email here'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />

           <InputField
            label='Phone Number'
            placeholder='Enter your molbile number here'
            name='mobile'
            value={formData.mobile}
            onChange={handleChange}
          />

          <InputField
            label='Where did you hear about us?'
            placeholder='Facebook'
            name='heardFrom'
            value={formData.heardFrom}
            onChange={handleChange}
          />

          <Password
            label='Password'
            placeholder="Enter your password"
            name='password'
            value={formData.password}
            onChange={handleChange}

          />

          <Password
            label='Confirm Password'
            placeholder="Enter your password again"
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between items-center w-full mt">
          <div className="flex gap-2.5">
            <input type="checkbox" className="accent-[#6A7282]" />
            <p className="text-[#6A7282] font-inter text-[12px]">
              I’d like to receive updates, exclusive offers, and product news via email.
            </p>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-3">{success}</p>}

        <button
          type='submit'
          disabled={loading}
          className='bg-[#010006] text-white w-full font-inter py-3 mt-9 rounded-[8px]'
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* <div className='w-full flex items-center justify-between '>
          <span className='w-[45%] bg-[#989898] h-[1px]'></span>
          <p className='font-inter text-[#6A7282]'>or</p>
          <span className='w-[45%] bg-[#989898] h-[1px]'></span>
        </div> */}

        <p className='font-inter text-[#6A7282] mt-9'>
          Already have an account? 
          <a href="/user/signin" className='text-[#333333] underline'>
            Sign in
          </a>
        </p>

        {/* <button className='border-[#010006] border cursor-pointer relative w-full font-inter py-3 rounded-full mt-9'>
          Continue with Google
          <FcGoogle className='w-6 h-6 absolute top-1/2 left-32 -translate-y-1/2' />
        </button> */}
      </form>
    </main>
  )
}

export default SignUp;
