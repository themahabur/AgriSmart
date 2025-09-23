"use client";
import React from "react";
import SecondaryBtn from "../shared/buttons/SecondaryBtn";
import CountUp from "react-countup";

const CallToAction = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-amber-50 py-20 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <img src="/Farming Journey.png" alt="কৃষিকাজ যাত্রা" className="w-28 md:w-36 mx-auto mb-5" />
          {/* Section title */}
          <h2 className="text-3xl md:text-4xl font-bold font-hind text-gray-800">
            রূপান্তর করুন তোমার <span className="text-green-600">কৃষিকাজ যাত্রা</span>{" "}
          </h2>

          {/* Supporting text */}
          <p className="mt-4 text-lg text-gray-600 font-hind max-w-xl mx-auto">
            আমাদের স্মার্ট ফার্মিং প্ল্যাটফর্মের মাধ্যমে হাজার হাজার কৃষকের সাথে
            যোগ দিন যারা ইতিমধ্যেই তাদের ফলন এবং লাভ বৃদ্ধি করছেন।
          </p>
        </div>

        {/* Stats showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2"> <CountUp
                key={"1"} 
                start={0}
                end={30}
                delay={0.8}
                duration={2}
                suffix="%"
              /></div>
            <div className="text-gray-700">গড় ফলন বৃদ্ধি</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-amber-100 text-center">
            <div className="text-3xl font-bold text-amber-500 mb-2"><CountUp
                key={"1"} 
                start={0}
                end={50}
                delay={0.8}
                duration={2}
                suffix="K+"
              /> </div>
            <div className="text-gray-700">সক্রিয় কৃষক</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">২৪/৭</div>
            <div className="text-gray-700">বিশেষজ্ঞ সহায়তা</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <SecondaryBtn>বিনামূল্যে ট্রায়াল শুরু করুন</SecondaryBtn>

          <button className="group border-2 border-green-600 text-green-600 font-bold py-4 px-8 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center min-w-[200px]">
            <span>ডেমো দেখুন</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>

        {/* Additional reassurance text */}
        <p className="text-center text-gray-500 text-sm mt-8">
          কোনও ক্রেডিট কার্ডের প্রয়োজন নেই • বিনামূল্যে ১৪ দিনের ট্রায়াল •
          যেকোনো সময় বাতিল করুন
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
