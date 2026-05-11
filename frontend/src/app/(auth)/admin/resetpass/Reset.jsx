"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/auth_logo.png";
import InputField from "@/src/component/InputField";
import axios from "axios";
import { useRouter } from "next/navigation";

const Reset = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);

      // ✅ OTP send request to backend
      const res = await axios.post("http://127.0.0.1:8000/api/admin-send-otp", {
        email: email,
      });
      console.log("OTP API RESPONSE:", res.data);

      if (res.status === 200 && res.data.status === "success") {
  setSuccess("OTP sent successfully!");
  sessionStorage.setItem("resetEmail", email);
  router.push("/admin/checkotp");
} else {
  setError(res.data.message || "Failed to send OTP");
}
    } catch (err) {
      console.error("OTP Send Error:", err);
      setError(err.response?.data?.message || "Failed to send OTP");
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
        <Image src={logo} alt="logo" />

        <h3 className="font-inter font-bold text-[30px] text-[#333333] mb-9 mt-15">
          Reset your password
        </h3>

        <InputField
          label="Email Address"
          placeholder="Enter your email here"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#010006] text-white w-full font-inter py-3 rounded-[8px] cursor-pointer mt-5"
        >
          {loading ? "Sending OTP..." : "Reset Password"}
        </button>

        <div className="flex justify-end w-full">
          <p className="text-[#333333] font-inter">
            Back to{" "}
            <a href="/admin/signin" className="text-[#00AEEF] font-inter underline">
              sign in
            </a>
          </p>
        </div>
      </form>
    </main>
  );
};

export default Reset;
