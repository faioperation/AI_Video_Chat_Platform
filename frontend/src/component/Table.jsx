import React from "react";

export default function Table({ TableHeads, TableRows }) {
  return (
    <table className="w-full my-6 border-collapse">
      {/* ==== TABLE HEADER ==== */}
      <thead>
        <tr className="">
          {TableHeads.map((head, idx) => (
            <th
              key={idx}
              className={`text-center bg-[#00AEEF]/20  font-medium text-[#000000] py-[22px]  text-[24px] font-inter
                ${idx === 0 ? "rounded-tl-2xl" : ""}
                ${idx === TableHeads.length - 1 ? "rounded-tr-2xl" : ""}`}
              style={{ width: head.width }}
            >
              {head.Title}
            </th>
          ))}
        </tr>
      </thead>

      {/* ==== TABLE BODY ==== */}
      <tbody className="">
        {TableRows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {TableHeads.map((head, headIdx) => (
              <td
                key={headIdx}
                className="border border-[#000000]/10 py-[22px] text-center px-3 font-inter text-[20px] text-[#000000]"
              >
                {/* If render function exists, use it — otherwise show plain data */}
                {head.render ? head.render(row, rowIdx) : row[head.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}