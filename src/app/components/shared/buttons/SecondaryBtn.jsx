"use client";
import React from "react";

const SecondaryBtn = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center min-w-[200px] ${className}`}
    >
      <span>{children}</span>
      <svg
        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        ></path>
      </svg>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-700 to-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
    </button>
  );
};

export default SecondaryBtn;
