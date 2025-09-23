import React, { useEffect, useState } from "react";

const SelectArea = ({ divisionCode }) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error("Failed to load districts:", err));
  }, []);
  const defineDistrict = districts.filter(
    (dist) => dist.division_id == divisionCode
  );
  console.log(defineDistrict, "selectarea");
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <label
          htmlFor="division"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          আপনার এলাকা নির্বাচন করুন
        </label>
        <select
          id="district"
          name="district"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option className="bg-green-500 " value="">
            একটি বিভাগ নির্বাচন করুন
          </option>
          {defineDistrict.map((dist) => (
            <option key={dist.id} value="1">{dist.bn_name}</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label
          htmlFor="division"
          className="block mb-2 text-lg font-medium text-gray-700"
        >
          আপনার এলাকা নির্বাচন করুন
        </label>
        <select
          id="upo-zila"
          name="uop-zila"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option className="bg-green-500 " value="">
            একটি বিভাগ নির্বাচন করুন
          </option>
          <option value="1">ঢাকা</option>
          <option value="2">চট্টগ্রাম</option>
          <option value="3">রাজশাহী</option>
          <option value="4">খুলনা</option>
          <option value="5">বরিশাল</option>
          <option value="6">সিলেট</option>
          <option value="7">রংপুর</option>
          <option value="8">ময়মনসিংহ</option>
        </select>
      </div>
    </div>
  );
};

export default SelectArea;
