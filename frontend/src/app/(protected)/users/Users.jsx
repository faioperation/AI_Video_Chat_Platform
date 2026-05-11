"use client";

import Dropdown from "@/src/component/Dropdown";
import Table from "@/src/component/Table";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Avatar from "@/public/Avatar.png";
import Link from "next/link";
import vector from "@/public/Vector.png";
import Pagination from "@/src/component/Pagination";
import Cookies from "js-cookie";
import axios from "axios";

export default function ActivityPage() {
  const [Active, setActive] = useState("All");
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // POPUP STATES
  const [viewOpen, setViewOpen] = useState(false);
  const [creditOpen, setCreditOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  // USER SELECTED FROM TABLE
  const [selectedUser, setSelectedUser] = useState(null);

  // 👉 SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  // ---- ACTION BUTTON FOR TABLE ----
  let ActionButton = ({ user }) => {
    return (
      <button
        onClick={() => {
          setSelectedUser(user);
          setViewOpen(true);
        }}
        className="bg-[#00AEEF] font-inter font-medium py-2 px-11 rounded-full text-[#121212] cursor-pointer hover:bg-[#00AEEF]/50 transition-all duration-300"
      >
        View
      </button>
    );
  };

  // ---- Table Heads ----
  const TableHeads = [
    { Title: "ID", key: "id", width: "10%" },
    { Title: "Name", key: "name", width: "15%" },
    { Title: "Email", key: "email", width: "15%" },
    { Title: "Phone", key: "phone", width: "15%" },
    { Title: "Token Used", key: "token_used", width: "10%" },
    { Title: "Action", key: "action", width: "10%" },
  ];

  // ---------- Fetch All Users API ----------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const email = Cookies.get("admin_email");
        const admin_token = Cookies.get("admin_token");

        if (!email || !admin_token) {
          console.log("Admin cookies missing");
          return;
        }

        const res = await axios.get("http://127.0.0.1:8000/api/all-users", {
          headers: {
            email: email,
            Authorization: `Bearer ${admin_token}`,
            Accept: "application/json",
          },
        });

        const data = res.data;

        if (data.status === "success") {
          const formatted = data.users.map((u) => ({
            name: u.name,
            id: "#" + u.id,
            user_id: u.id,
            email: u.email,
            phone: u.mobile,
            token_used: u.token_used ?? "0",
            action: <ActionButton user={u} />,
          }));

          setBaseOnTitle(formatted);
        } else {
          console.error("API Error:", data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchUsers();
  }, []);

  // ------------------ ✅ SEARCH FILTER LOGIC ------------------
  const filteredUsers = baseOnTitle.filter((item) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();

    return (
      item.name.toLowerCase().includes(search) ||
      item.email.toLowerCase().includes(search) ||
      item.phone?.toString().includes(search) ||
      item.id.toLowerCase().includes(search)
    );
  });

  // ---- Pagination (Filtered Data) ----
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const headerText = pathParts.join(" ");

  const handleOptionSelect = (option) => {};

  return (
    <div>
      <h3 className="capitalize font-inter text-[#000000] font-medium text-[24px] mb-8">
        {headerText}
      </h3>

      {/* Search + Filter */}
      <div className="flex items-center gap-14">
        <div className="relative ">
          <input
            type="text"
            className="border outline-none border-[#000000] py-[14px] px-12 w-[462px] rounded-[15px] text-[#000000] placeholder:text-[#000000] font-inter"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1); 
              setSearchTerm(e.target.value);
            }}
          />
          <FaSearch className=" absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>

        <Dropdown
          placeholder="Filter by Usage"
          options={["1", "2", "3"]}
          onSelect={handleOptionSelect}
          className={`w-[14%]`}
        />

        <Dropdown
          placeholder="Filter by Registration Date"
          options={["1", "2", "3"]}
          onSelect={handleOptionSelect}
          className={`w-[21%]`}
        />
      </div>

      {/* Table */}
      <Table TableHeads={TableHeads} TableRows={currentItems} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* ------------ POPUPS remain unchanged (keeping your code) ------------ */}

      {/* VIEW USER POPUP */}
      {viewOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
          <div className="bg-white w-[50%] rounded-[15px]">
            <div className="bg-black w-full rounded-[15px] py-6 px-8 flex items-center justify-between ">
              <p className="text-[#FFFFFF] font-inter text-[20px]">
                User Details: {selectedUser.name}
              </p>

              <ImCross
                onClick={() => setViewOpen(false)}
                className="text-white cursor-pointer "
              />
            </div>

            <div className="px-8 pt-12">
              <div className="flex items-center gap-4">
                <Image src={Avatar} alt="profile" />

                <div>
                  <h3 className="font-inter font-semibold text-[24px] text-[#000000]">
                    {selectedUser.name}
                  </h3>
                  <p className="font-inter text-[#000000] my-1">
                    {selectedUser.email}
                  </p>
                  <p className="font-inter text-[#6D6D6D]">
                    User ID: {selectedUser.id}
                  </p>
                </div>
              </div>

              {/* Usage Summary */}
              <div>
                <p className="font-inter text-[20px] text-[#000000] mt-10">
                  Usage Summary
                </p>

                <div className="flex items-center gap-14 mt-2">
                  <div className="bg-[#C4EBE9] w-[32%] rounded-2xl p-4">
                    <p className="font-inter text-[20px] text-[#000000]">
                      Total Billed Tokens: {selectedUser.token_used}
                    </p>
                    <p className="font-inter text-[20px] text-[#000000] mt-4">
                      Minutes Used: {selectedUser.minutes ?? 0}
                    </p>
                  </div>

                  <Link href="/logs">
                    <button className="font-inter text-[20px] text-[#00AEEF] cursor-pointer border-b">
                      View Session History
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex gap-6 mt-8 border-b border-[#C2C2C2] pb-4">
                <button
                  onClick={() => {
                    setViewOpen(false);
                    setCreditOpen(true);
                  }}
                  className="font-inter bg-[#00AEEF] cursor-pointer text-[#000000] py-2 px-12 rounded-[8px] font-medium"
                >
                  Add Credit
                </button>

                <button
                  onClick={() => {
                    setViewOpen(false);
                    setResetOpen(true);
                  }}
                  className="font-inter border border-[#00AEEF] cursor-pointer text-[#000000] py-2 px-12 rounded-[8px] font-medium"
                >
                  Reset Usage
                </button>
              </div>

              <div className="flex justify-between py-6">
                <button className="font-inter bg-[#E4E4E6] cursor-pointer text-[#616161] py-2 px-5 rounded-[8px] font-medium">
                  View Conversation Logs
                </button>
                <button className="font-inter bg-[#00AEEF] cursor-pointer text-[#000000] py-2 px-5 rounded-[8px] font-medium">
                  Apply Adjustment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remaining POPUP codes unchanged */}
      {creditOpen && selectedUser && (
        <>{/* your credit modal code */}</>
      )}

      {resetOpen && selectedUser && (
        <>{/* your reset modal code */}</>
      )}
    </div>
  );
}
