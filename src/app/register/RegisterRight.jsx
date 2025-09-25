"use client";
import React, { useEffect, useState } from "react";
import SelectArea from "../components/SelectArea";
import Link from "next/link";
import InputField from "./InputField";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const RegisterRight = () => {
  const [divisionCode, setDivisionCode] = useState(null);
  const [distUpaName, setDistUpaName] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [eye, setEye] = useState(false);
  const [divisionName, setDivisionName] = useState("");

  // division select
  const handleSelectDivision = (e) => {
    const selectedId = e.target.value;
    setDivisionCode(selectedId);

    const division = divisions.find((divis) => divis.id == selectedId);
    if (division) {
      setDivisionName(division.division || division.name);
    }
  };

  // const user = {
  //   name: "Anayet Rahman",
  //   email: "anayedfdgfdgs@example.com",
  //   password: "Secure@123",
  //   division: "Dhaka",
  //   district: "Gazipur",
  //   upazila: "Sreepur",
  //   phone: "01279345691",
  //   role: "farmer",
  // };
  // console.log(user);
  // form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const profileFile = form.get("profileURL");
    const formData = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
      division: divisionName,
      district: distUpaName?.distName || "",
      upazila: distUpaName?.upazilaName || "",
      phone: form.get("phone"),
      role: "farmer",
      // profileURL: profileFile ? profileFile.name : "",
    };
    
    console.log("Submit Data:", formData);

    try {
      const response = await fetch(
        "https://agri-smart-server.vercel.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Fail to post data");
      }

      const result = await response.json();
      console.log("Register Success:", result);
    } catch (error) {
      console.error("Register Error:", error);
    }

    e.target.reset();
  };

  // division load
  useEffect(() => {
    fetch("/division.json")
      .then((res) => res.json())
      .then((data) => setDivisions(data));
  }, []);

  return (
    <div className="md:w-full mx-auto p-8 lg:col-span-1 bg-white">
      <h1 className="text-2xl md:text-3xl text-center text-primary font-bold">
        এখানে একটি অ্যাকাউন্ট খুলুন ।
      </h1>

      <form className="w-full" onSubmit={handleFormSubmit}>
        {/* name */}
        <InputField
          label="আপনার পুরা নাম লেখুন"
          name="name"
          placeholder="উদাহরণ : রহিম মিয়া"
          required
        />

        <div className="flex items-center gap-2">
          {/* photo url */}
          <div className="flex-1">
            <label className="block mb-1 text-lg font-medium text-gray-700">
              আপনার প্রোফাইল ছবি পছন্দ করুণ
            </label>
            <input
              type="file"
              name="profileURL"
              className="w-full mt-1 border border-gray-400  rounded-[10px] outline-0 file:mr-4 file:border-0 file:bg-green-500 file:px-4 file:py-4 file:text-sm file:font-semibold hover:file:bg-violet-100"
             
            />
          </div>

          {/* address */}
          <div className="flex-1">
            <label
              htmlFor="division"
              className="block mb-2 text-lg font-medium text-gray-700"
            >
              আপনার এলাকা নির্বাচন করুন
            </label>
            <select
              onChange={handleSelectDivision}
              id="division"
              name="division"
              className="w-full px-4 py-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">একটি বিভাগ নির্বাচন করুন</option>
              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.ban_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* district / upazila */}
        <div className="mt-4">
          <SelectArea
            divisionCode={divisionCode}
            setDistUpaName={setDistUpaName}
          />
        </div>

        {/* email */}
        <InputField
          label="আপনার ই-মেইল ঠিকানা লিখুন"
          type="email"
          name="email"
          placeholder="উদাহরণ : info@gmail.com"
          required
        />

        {/* phone */}
        <InputField
          label="মোবাইল নাম্বার"
          type="text"
          name="phone"
          placeholder="017xxxxxxxx"
          required
        />

        {/* password */}
        <div className="relative">
          <InputField
            label="আপনার পাসওর্য়াড সেট করুণ"
            type={eye ? "text" : "password"}
            name="password"
            placeholder="উদাহরণ : !zdA?34Z.."
            required
          />
          <div
            onClick={() => setEye(!eye)}
            className="absolute bottom-2 right-2 cursor-pointer z-10 p-2"
          >
            {eye ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
          </div>
        </div>

        {/* submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-full text-gray-100 bg-green-600 hover:bg-green-700 transition-all duration-500"
        >
          অ্যাকাউন্ট খুলুন
        </button>
      </form>

      <p className="mt-2 text-sm">
        ইতিমধ্যে আপনার একটি অ্যাকাউন্ট আছে ?{" "}
        <Link className="text-blue-500 hover:text-green-700" href="#">
          এখানে লগইন করুণ
        </Link>
        ।
      </p>
    </div>
  );
};

export default RegisterRight;
