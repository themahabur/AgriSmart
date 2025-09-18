"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import { MdOutlineQuestionAnswer } from "react-icons/md";

const faqs = [
   {
    question: "AgriSmart কীভাবে কৃষকদের সাহায্য করে?",
    answer:
      "AgriSmart কৃষকদের রিয়েল-টাইম মার্কেট প্রাইস, আবহাওয়ার আপডেট এবং এক্সপার্ট পরামর্শ দিয়ে স্মার্ট ফার্মিং করতে সাহায্য করে।",
  },
  {
    question: "আমি কি আমার এলাকার ফসলের বাজারদর দেখতে পারব?",
    answer:
      "হ্যাঁ, AgriSmart এর 'Market Price' সেকশন থেকে আপনার এলাকার ফসলের বাজারদর আপডেটেড দেখতে পারবেন।",
  },
  {
    question: "আবহাওয়ার পূর্বাভাস কিভাবে পাব?",
    answer:
      "'Weather Alerts' সেকশন আপনাকে বৃষ্টিপাত, ঝড় বা তাপমাত্রার পরিবর্তনের পূর্বাভাস নোটিফিকেশন দেবে।",
  },
  {
    question: "পোকামাকড় শনাক্তকরণ কীভাবে কাজ করে?",
    answer:
      "আমাদের Pest Detection ফিচারটি AI ব্যবহার করে আপনার ফসলের ছবি থেকে সম্ভাব্য রোগ বা পোকা শনাক্ত করে।",
  },
  {
    question: "আমি কি কৃষি বিশেষজ্ঞের সাথে সরাসরি কথা বলতে পারব?",
    answer:
      "হ্যাঁ, Expert Consultation ফিচারের মাধ্যমে আপনি রিয়েল-টাইম চ্যাট বা ভিডিও কলে বিশেষজ্ঞদের সাথে যোগাযোগ করতে পারবেন।",
  },
  {
    question: "AgriSmart কি বাংলা ভাষায় পাওয়া যাবে?",
    answer: "হ্যাঁ, আমাদের প্ল্যাটফর্ম ইংরেজি ও বাংলায় উভয় ভাষায় ব্যবহার করা যাবে।",
  },
  {
    question: "AgriSmart ব্যবহার করতে কি খরচ আছে?",
    answer:
      "প্রাথমিক অনেক ফিচার ফ্রি, তবে এক্সপার্ট কনসাল্টেশন এবং কিছু প্রিমিয়াম টুলের জন্য আলাদা ফি থাকতে পারে।",
  },
  {
    question: "আমি কিভাবে AgriSmart-এ যোগ দিতে পারি?",
    answer:
      "হোমপেজে 'Join Now' বাটনে ক্লিক করে সহজেই একাউন্ট খুলতে পারবেন।",
  },
];
const Fqa = () => {
     const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
    return (
         <section className="bg-white py-16 font-hind px-5">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div className="flex flex-col items-start">
         <img src="https://i.ibb.co.com/Fq4YyyQ2/v921-audi-wit-018.jpg" alt="প্রশ্নের উত্তর"  className="w-70 mb-5  rounded-3xl" />
          <h2 className="text-3xl font-bold text-gray-900">
            সচরাচর জানতে চাওয়া{" "}
            <span className="text-green-600">প্রশ্নের উত্তর</span>
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            আপনাদের কমন কিছু প্রশ্নের উত্তর আমরা এখানে লিস্ট করে দিয়েছি। 
            আপনারা প্রশ্ন করার আগে একবার পড়ে নিতে পারেন। 
            এতে আপনাদের সময় বাঁচবে এবং উত্তর দ্রুত পেয়ে যাবেন।
          </p>
        </div>

        {/* Right Side - FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-3 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  {faq.question}
                </h3>
                <FaChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default Fqa;