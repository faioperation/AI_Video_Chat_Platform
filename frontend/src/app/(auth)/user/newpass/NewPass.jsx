"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "@/public/auth_logo.png";
import Password from "@/src/component/Password";
import axios from "axios";
import { useRouter } from "next/navigation";

// ✔ Always allow sending cookies
axios.defaults.withCredentials = true;

const NewPass = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get email from sessionStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.push("/user/resetpass");
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user-reset-password",
        {
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        // setSuccess("Password updated successfully!");

        setTimeout(() => {
          router.push("/user/success");
        });
      }
    } catch (err) {
      console.error("Reset Error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen grid justify-center items-center py-20">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] flex flex-col gap-5 items-center"
      >
        <Image src={logo} alt="logo" />

        <h3 className="font-inter font-bold text-[30px] text-[#333333] mb-4">
          Set New Password
        </h3>

        <p className="text-sm text-[#6A7282]">
          Changing password for:{" "}
          <span className="font-bold">{email}</span>
        </p>

        <Password
          label="New Password"
          name="password"
          placeholder="Enter new password"
          value={formData.password}
          onChange={handleChange}
        />

        <Password
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#010006] text-white w-full py-3 rounded-[8px] mt-4"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </main>
  );
};

export default NewPass;