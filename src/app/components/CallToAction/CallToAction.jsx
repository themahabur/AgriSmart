import React from 'react';

const CallToAction = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-amber-50 py-20 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          {/* Section title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            রূপান্তর করুন তোমার <span className="text-green-600">কৃষিকাজ</span>{' '}
            যাত্রা
          </h2>

          {/* Supporting text */}
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            আমাদের স্মার্ট ফার্মিং প্ল্যাটফর্মের মাধ্যমে হাজার হাজার কৃষকের সাথে
            যোগ দিন যারা ইতিমধ্যেই তাদের ফলন এবং লাভ বৃদ্ধি করছেন।
          </p>
        </div>

        {/* Stats showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">৩০%</div>
            <div className="text-gray-700">গড় ফলন বৃদ্ধি</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-amber-100 text-center">
            <div className="text-3xl font-bold text-amber-500 mb-2">৫০K+</div>
            <div className="text-gray-700">সক্রিয় কৃষক</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">২৪/৭</div>
            <div className="text-gray-700">বিশেষজ্ঞ সহায়তা</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className="group relative bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center min-w-[200px]">
            <span>বিনামূল্যে ট্রায়াল শুরু করুন</span>
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
