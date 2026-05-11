"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "@/public/auth_logo.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputField from "@/src/component/InputField";

const CheckOTP = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Enable credential cookies globally
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  // Get email from sessionStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.push("/admin/resetpass");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp) {
      setError("Please enter your OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/admin-verify-otp",
        {
          email: email,
          otp: otp,
        },
        {
          withCredentials: true, // IMPORTANT
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200 && res.data.status === "success") {
        setSuccess("OTP Verified Successfully!");

        // 🚀 Cookie is already stored automatically.

        // Redirect to new password page
        setTimeout(() => {
          router.push("/admin/newpass");
        }, 800);
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "OTP verification failed";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen grid justify-center items-center py-20">
      <form
        className="w-[500px] gap-5 flex flex-col items-center rounded-2xl"
        onSubmit={handleSubmit}
      >
        <Image src={logo} alt="logo" />

        <h3 className="font-inter font-bold text-[30px] text-[#333333] mb-6">
          Verify OTP
        </h3>

        <p className="text-sm text-[#6A7282] mb-4">
          OTP sent to: <span className="font-semibold">{email}</span>
        </p>

        <InputField
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-1">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#010006] text-white w-full font-inter py-3 rounded-[8px] cursor-pointer mt-5"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </main>
  );
};

export default CheckOTP;