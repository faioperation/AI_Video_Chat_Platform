"use client";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
    
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      {/* Prev Button */}
      <button
        className="px-6 py-3 rounded-md bg-[#00AEEF] disabled:bg-[#DFE0E5] font-inter flex items-center gap-2"      
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        <MdKeyboardArrowLeft className='w-6 h-6' />
            Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-500 select-none">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md transition-all duration-200 font-inter ${
              currentPage === page
                ? "bg-[#00AEEF] text-[#F1F1F1] rounded-full"
                : "hover:bg-white border border-[#00AEEF] hover:rounded-ful rounded-sm  duration-300 "
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        className="px-6 py-3 rounded-md bg-[#00AEEF] disabled:bg-[#DFE0E5] font-inter flex items-center gap-2"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next
        <MdKeyboardArrowRight className='w-6 h-6' />
      </button>
    </div>
  );
}
