import React from "react";

const UserProfile = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-light-green text-primary font-bold text-lg">
        র
      </div>
      <div>
        <p className="font-semibold text-gray-800">রহিম মিয়া</p>
        <a href="#" className="text-xs text-gray-500 hover:underline">
          প্রোফাইল দেখুন
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
