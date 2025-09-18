import React from "react";

const FooterTop = () => {
  return (
    <div className="border-b border-gray-300 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 text-white font-bold p-2 rounded-full">
            Agri
          </div>
          <h2 className="text-xl font-semibold text-green-700">AgriSmart</h2>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
