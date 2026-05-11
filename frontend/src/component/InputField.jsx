import React from 'react';

const InputField = ({ label, className, placeholder, name, value, onChange }) => {
  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      <label className='font-inter font-semibold text-[#333333]'>
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='border border-[#000000] outline-none py-3 px-2.5 text-[#6A7282] placeholder:text-[#6A7282] font-inter rounded'
      />
    </div>
  );
};

export default InputField;
