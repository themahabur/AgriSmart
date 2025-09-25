"use client";
import React, { useEffect, useState } from "react";

const SelectArea = ({ divisionCode, setDistUpaName }) => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [distId, setDistId] = useState("");
  const [upazilaName, setUpazilaName] = useState("");
  const [distName, setDistName] = useState("");

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

  // Update parent state whenever distId or upazilaName changes
  useEffect(() => {
    setDistUpaName({distName, upazilaName});
  }, [distId, upazilaName, setDistUpaName]);

  // Handlers
  const getDistrictId = (e) => {
    const selectedId = e.target.value;
    setDistId(selectedId);
    const selectedDistrict = districts.find((dist) => dist.id == selectedId);
    if (selectedDistrict) {
      setDistName(selectedDistrict.name);
    }
  };

  const getUpazilaName = (e) => setUpazilaName(e.target.value);
  // console.log(distName);
  return (
    <div className="flex items-center gap-2">
      {/* District Select */}
      <div className="flex-1">
       
        <select
          onChange={getDistrictId}
          value={distId}
          className="w-full px-4 py-3 border border-gray-400  rounded-lg shadow-sm focus:outline-none "
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
        
        <select
          onChange={getUpazilaName}
          value={upazilaName}
          className="w-full px-4 py-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none "
          required
        >
          <option value="">একটি উপজেলা নির্বাচন করুন</option>
          {defineUpazila.map((up) => (
            <option key={up.id} value={up.name}>
              {up.bn_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectArea;
