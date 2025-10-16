
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
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="font-bold text-2xl text-green-700 mb-2"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="font-bold text-xl text-green-700 mb-2"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="font-bold text-lg text-green-700 mb-2"
                  {...props}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  className="font-bold text-base text-green-700 mb-2"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => <p className="mb-2" {...props} />,
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 mb-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5 mb-2" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              strong: ({ node, ...props }) => (
                <strong className="font-bold" {...props} />
              ),
              em: ({ node, ...props }) => <em className="italic" {...props} />,
              a: ({ node, ...props }) => (
                <a
                  className="text-green-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="bg-gray-100 rounded px-1 py-0.5 text-sm"
                  {...props}
                />
              ),
            }}
          >
            {aiResponse}
          </ReactMarkdown>
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
