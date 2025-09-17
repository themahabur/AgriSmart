
import React from 'react';

const QuickAccess = () => {
    return (
        <div>
          <div className="font-[font-hind ]">
            {/* Left Section - Illustration + Heading + Text */}
             <div className="lg:col-span-1 flex flex-col justify-center">
                <img 
            src="https://i.ibb.co.com/JRWK1yPK/8104781.jpg"
            alt="Farmer Illustration"
            className="w-52 mb-6 rounded-4xl"
          />
          <h2 className="text-3xl font-extrabold text-white mb-4">
            অসাধারণ <span className="text-sky-400">কৃষি টুলস</span>
          </h2>
          <p className="text-gray-300 leading-relaxed">
            আধুনিক কৃষিকে আরও কার্যকর করতে আমরা এনেছি স্মার্ট টুলস —
            যেগুলো সহজ, কার্যকরী, আর বাংলায় সহজ ভাষায় উপস্থাপিত।
            এখানে প্রতিদিনের বাজার দর, আবহাওয়ার খবর, পোকামাকড় নিয়ন্ত্রণ,
            এবং আরও অনেক কৃষি সম্পর্কিত তথ্য একসাথে পাবেন।
          </p>
             </div>
          </div>
           {/* Right Section - Grid of Cards */}
           <div className="">
            {/* 1 */}
             <div
             
              className=" rounded-xl shadow hover:shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-105"
            >
             
              <div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.color} text-white text-xl mb-4`}>
                 📊
                </div>
                <h3 className="text-lg font-semibold text-white">বাজার দর</h3>
                <p className="mt-2 text-sm text-gray-400">প্রতিদিনের আপডেটেড ফসলের দাম দেখে সঠিক দামে বিক্রি করুন</p>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium">
                এখনই দেখুন →
              </button>
            </div>
            {/* 2 */}
             <div
             
              className=" rounded-xl shadow hover:shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-105"
            >
             
              <div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.color} text-white text-xl mb-4`}>
                 🐞
                </div>
                <h3 className="text-lg font-semibold text-white">পোকা ব্যবস্থাপনা</h3>
                <p className="mt-2 text-sm text-gray-400">ফসলের ছবির মাধ্যমে এআই-ভিত্তিক পোকা ও রোগ শনাক্তকরণ</p>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium">
                এখনই দেখুন →
              </button>
            </div>
            {/* 3 */}
             <div
             
              className=" rounded-xl shadow hover:shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-105"
            >
             
              <div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.color} text-white text-xl mb-4`}>
                 👨‍🌾
                </div>
                <h3 className="text-lg font-semibold text-white">এক্সপার্ট পরামর্শ</h3>
                <p className="mt-2 text-sm text-gray-400">ব্যক্তিগত পরামর্শের জন্য কৃষি বিশেষজ্ঞদের সাথে যুক্ত হোন</p>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium">
                এখনই দেখুন →
              </button>
            </div>
            {/* 4 */}
             <div
             
              className=" rounded-xl shadow hover:shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-105"
            >
             
              <div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.color} text-white text-xl mb-4`}>
                🌦️
                </div>
                <h3 className="text-lg font-semibold text-white">আবহাওয়া সতর্কতা</h3>
                <p className="mt-2 text-sm text-gray-400">বৃষ্টি, ঝড়, খরা ইত্যাদি পূর্বাভাসের রিয়েল-টাইম নোটিফিকেশন</p>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium">
                এখনই দেখুন →
              </button>
            </div>
            {/* 5 */}
             <div
             
              className=" rounded-xl shadow hover:shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-105"
            >
             
              <div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.color} text-white text-xl mb-4`}>
                 🧮
                </div>
                <h3 className="text-lg font-semibold text-white">লাভ ক্যালকুলেটর</h3>
                <p className="mt-2 text-sm text-gray-400">উৎপাদন খরচ ও লাভ/ক্ষতির হিসাব সহজে করুন</p>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium">
                এখনই দেখুন →
              </button>
            </div>
            {/* 6 */}
            <div
              className=" rounded-xl shadow hover:shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-105"
            >
             
              <div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.color} text-white text-xl mb-4`}>
                 📚
                </div>
                <h3 className="text-lg font-semibold text-white">চাষাবাদ টিউটোরিয়াল</h3>
                <p className="mt-2 text-sm text-gray-400">আধুনিক কৃষি পদ্ধতি ও প্রযুক্তি শেখার সহজ উপায়</p>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium">
                এখনই দেখুন →
              </button>
            </div>
           </div>
        </div>
    );
};

export default QuickAccess;