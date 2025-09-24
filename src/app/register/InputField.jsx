// components/InputField.jsx
import React from "react";

const InputField = ({ label, type = "text", name, placeholder, onChange }) => {
  return (
    <div className="my-5">
      {label && (
        <label className="block mb-1  text-lg font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full  mt-1 py-3 px-5 border-[1.5px] border-green-200 rounded-[10px] outline-0 hover:bg-green-100"
        required
      />
    </div>
  );
};

export default InputField;
