import React from "react";

const InputField = ({ label, type = "text", name, placeholder, onChange, className = "", required }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full py-3 px-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-green-500 hover:border-gray-300 bg-white ${className}`}
        required={required}
      />
    </div>
  );
};

export default InputField;