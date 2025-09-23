"use client";
import React, { useEffect, useState } from "react";

const SelectArea = ({ divisionCode, setDistUpaCode }) => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [distId, setDistId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");

  // Get district data
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error("Failed to load districts:", err));
  }, []);

  const defineDistrict = districts.filter(
    (dist) => dist.division_id == divisionCode
  );

  // Get upazila data
  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data))
      .catch((err) => console.error("Failed to load upazilas:", err));
  }, []);

  const defineUpazila = upazilas.filter((up) => up.district_id == distId);

  // Update parent state whenever distId or upazilaId changes
  useEffect(() => {
    setDistUpaCode({ distId, upazilaId });
  }, [distId, upazilaId, setDistUpaCode]);

  // Handlers
  const getDistrictId = (e) => setDistId(e.target.value);
  const getUpazilaId = (e) => setUpazilaId(e.target.value);

  return (
    <div className="flex items-center gap-2">
      {/* District Select */}
      <div className="flex-1">
        {/* <label className="block mb-2 text-lg font-medium text-gray-700">
          জেলা নির্বাচন করুন
        </label> */}
        <select
          onChange={getDistrictId}
          value={distId}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">একটি জেলা নির্বাচন করুন</option>
          {defineDistrict.map((dist) => (
            <option key={dist.id} value={dist.id}>
              {dist.bn_name}
            </option>
          ))}
        </select>
      </div>

      {/* Upazila Select */}
      <div className="flex-1">
        {/* <label className="block mb-2 text-lg font-medium text-gray-700">
          উপজেলা নির্বাচন করুন
        </label> */}
        <select
          onChange={getUpazilaId}
          value={upazilaId}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">একটি উপজেলা নির্বাচন করুন</option>
          {defineUpazila.map((up) => (
            <option key={up.id} value={up.id}>
              {up.bn_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectArea;
