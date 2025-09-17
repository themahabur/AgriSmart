
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
           <div className=""></div>
        </div>
    );
};

export default QuickAccess;