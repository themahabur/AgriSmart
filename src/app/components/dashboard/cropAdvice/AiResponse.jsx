import React from "react";
import { BiCheck } from "react-icons/bi";
import { FaHistory, FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const AiResponse = ({ aiResponse }) => {
  return (
    <>
      <div className="flex items-center mb-4">
        <FaRobot className="text-2xl text-green-600 mr-3" />
        <h3 className="text-lg font-bold text-green-800">
          AI বিশেষজ্ঞের পরামর্শ
        </h3>
      </div>
      <div className="bg-white rounded-lg p-4 border border-green-100">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{aiResponse}</ReactMarkdown>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="px-3 py-1 inline-flex items-center bg-green-100 text-green-700 rounded-full text-sm">
          <BiCheck size={25} /> AI বিশ্লেষণ সম্পূর্ণ
        </span>
        <span className="px-3 py-1 inline-flex items-center gap-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          <FaHistory size={20} /> ইতিহাসে সংরক্ষিত
        </span>
      </div>
    </>
  );
};

export default AiResponse;
