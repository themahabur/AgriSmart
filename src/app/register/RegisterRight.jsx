import React, { useEffect, useState } from "react";
import SelectArea from "../components/SelectArea";
import Link from "next/link";
const RegisterRight = () => {
  const [divisionCode, setDivisionCode] = useState(null);
  const [distUpaCode, setDistUpaCode] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const handleSelectDivision = (e) => {
    const divisionName = e.target.value;
    setDivisionCode(divisionName);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    console.log(data);
    // post to database
    e.target.reset();
  };
  useEffect(() => {
    fetch("/division.json")
      .then((res) => res.json())
      .then((data) => setDivisions(data));
  }, [setDivisions]);
  return (
    <div className="md:w-full mx-auto  p-8 lg:col-span-1">
      <h1 className="text-2xl md:text-3xl text-primary font-bold">
        এখানে একটি অ্যাকাউন্ট খুলুন ।
      </h1>
      <form className="w-full" onSubmit={handleFormSubmit}>
        {/* name */}
        <div className="my-5">
          <label>আপনার পুরা নাম লেখুন</label>
          <input
            type="text"
            name="name"
            placeholder="উদাহরণ : রহিম মিয়া"
            className="w-full mt-2 py-3 px-5 border-[1.5px] border-green-200 rounded-[10px] outline-0 hover:bg-green-100"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          {/* photo url */}
          <div className=" flex-1">
            <label>আপনার প্রোফাইল ছবি পছন্দ করুণ ।</label>
            <input
              type="file"
              name="profileURL"
              className="file:mr-4  file:border-0 file:bg-green-500 file:px-4 file:py-4 file:text-sm file:font-semibold  hover:file:bg-violet-100 dark:file:bg-green-600 dark:file:text-violet-100 dark:hover:file:bg-green-700 w-full mt-2  border-[1.5px] border-green-200 rounded-[10px] outline-0 hover:bg-green-100 "
              required
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option className="bg-green-500 " value="">
                একটি বিভাগ নির্বাচন করুন
              </option>

              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.ban_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <SelectArea
            divisionCode={divisionCode}
            setDistUpaCode={setDistUpaCode}
          />
        </div>
        <div className="my-5">
          <label>আপনার ই-মেইল ঠিকানা লিখুন ।</label>
          <input
            type="email"
            name="email"
            placeholder="উদাহরণ : info@gmail.com"
            className="w-full mt-2 py-3 px-5 border-[1.5px] border-green-200 rounded-[10px] outline-0 hover:bg-green-100"
            required
          />
        </div>
        {/* password */}
        <div className="my-5">
          <label>আপনার পাসওর্য়াড সেট করুণ</label>

          <input
            type="password"
            name="password"
            placeholder="উদাহরণ :  !zdA?34Z.."
            className="w-full mt-2 py-3 px-5 border-[1.5px] border-green-200 rounded-[10px] outline-0 hover:bg-green-100"
            required
          />
        </div>
        <button
          type="submit"
          className=" text-gray-100  bg-green-600 hover:bg-green-700 hover:text-white w-full rounded-[10px] py-3 transition-all duration-500"
        >
          অ্যাকাউন্ট খুলুন
        </button>
      </form>
      <p className="mt-2 text-sm">
        ইতিমধ্যে আপনার একটি অ্যাকাউন্ট আছে ? দয়া করে{" "}
        <Link className="text-blue-500 hover:text-green-700" href="#">
          এখানে লগইন করুণ
        </Link>{" "}
        ।
      </p>
    </div>
  );
};

export default RegisterRight;
