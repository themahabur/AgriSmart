import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-50 to-amber-50 py-12 lg:py-28 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Text Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 leading-tight">
            <span className="block">স্মার্ট ফার্মিং</span>
            <span className="block text-green-600 mt-1.5">এখান থেকে শুরু</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
            রিয়েল-টাইম বাজার মূল্য, আবহাওয়ার সতর্কতা এবং বিশেষজ্ঞ কৃষি পরামর্শ
            পাওয়ার পাশাপাশি, আপনার ফসলের রোগ শনাক্তকরণ, খরচ ও লাভের হিসাব,
            আধুনিক চাষাবাদের কৌশল এবং অন্যান্য কৃষকদের অভিজ্ঞতা সম্পর্কে
            বিস্তারিত তথ্য পাবেন। এতে করে আপনি আপনার খামারের ফলন বাড়াতে, ক্ষতি
            কমাতে এবং সঠিক সিদ্ধান্ত নিতে পারবেন।
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold py-3 px-8 rounded-full shadow-sm transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
              <span>শুরু করুন</span>
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </button>
            <button className="border-2 border-green-600 shadow-sm text-green-600 hover:bg-green-600 hover:text-white  font-semibold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center">
              <span>আরও জানুন</span>
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center md:justify-start">
                ৫০K+
              </div>
              <div className="text-sm text-gray-600 mt-1">কৃষকরা</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500 flex items-center justify-center md:justify-start">
                ১০০+
              </div>
              <div className="text-sm text-gray-600 mt-1">বিশেষজ্ঞরা</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center md:justify-start">
                ২৪/৭
              </div>
              <div className="text-sm text-gray-600 mt-1">সমর্থন</div>
            </div>
          </div>
        </div>

        {/* Farmer Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-full max-w-2xl">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-amber-300 rounded-3xl transform rotate-2 opacity-20"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-8 border-white">
              <Image
                src="/banner.jpg"
                alt="Modern farmer using smart farming technology"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements around image */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 rounded-full opacity-20"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
