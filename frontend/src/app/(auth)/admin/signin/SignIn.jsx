"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/auth_logo.png";
import InputField from "@/src/component/InputField";
import Password from "@/src/component/Password";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
const LOGIN_URL = `${API_BASE}/api/admin-login`;

const setAxiosAuthHeader = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
};

const SignIn = () => {
  const router = useRouter();
  const sp = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl = sp.get("redirect") || "/dashboard";

  // If already logged in → redirect
  useEffect(() => {
    const existingToken = Cookies.get("admin_token");
    if (existingToken) {
      setAxiosAuthHeader(existingToken);
      router.replace(callbackUrl);
    }
  }, [callbackUrl, router]);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        LOGIN_URL,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("LOGIN RESPONSE:", res.data);

      const token = res?.data?.token;
      if (!token) throw new Error("Token not found");

      // --------------------------------------------
      // SAVE LOGIN EMAIL DIRECTLY (NO TOKEN DECODE)
      // --------------------------------------------
      Cookies.set("admin_email", formData.email, {
        expires: 7,
        path: "/",
      });

      Cookies.set("admin_token", token, {
        expires: 7,
        path: "/",
      });

      // axios header attach
      setAxiosAuthHeader(token);

      // Redirect to dashboard
      router.replace(callbackUrl);

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      setError(msg);
      console.log("ERROR:", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="h-screen grid justify-center items-center py-20">
      <div className="w-[500px] gap-5 flex flex-col items-center rounded-2xl">
        <Image src={logo} alt="" />

        <h3 className="font-inter font-bold text-[30px] text-[#333333] mb-9">
          Sign in to your account
        </h3>

        <InputField
          label="Email Address"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Password
          label="Password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex justify-between items-center w-full mt">
          <div className="flex gap-2.5">
            <input type="checkbox" className="accent-[#000000]" />
            <p className="text-[#333333] font-inter">Remember Password</p>
          </div>
          <a
            href="/admin/resetpass"
            className="text-[#333333] hover:text-[#00AEEF] font-inter underline"
          >
            Forgot Password?
          </a>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#010006] text-white w-full font-inter py-3 rounded-[8px] cursor-pointer mt-4"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </div>
    </main>
  );
};

export default SignIn;
