"use client";

import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

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
    answer:
      "হ্যাঁ, আমাদের প্ল্যাটফর্ম ইংরেজি ও বাংলায় উভয় ভাষায় ব্যবহার করা যাবে।",
  },
  {
    question: "AgriSmart ব্যবহার করতে কি খরচ আছে?",
    answer:
      "প্রাথমিক অনেক ফিচার ফ্রি, তবে এক্সপার্ট কনসাল্টেশন এবং কিছু প্রিমিয়াম টুলের জন্য আলাদা ফি থাকতে পারে।",
  },
  {
    question: "আমি কিভাবে AgriSmart-এ যোগ দিতে পারি?",
    answer: "হোমপেজে 'Join Now' বাটনে ক্লিক করে সহজেই একাউন্ট খুলতে পারবেন।",
  },
];

const Fqa = () => {
  const [openIndex, setOpenIndex] = useState(0); // ডিফল্ট প্রথমটা খোলা থাকবে

  const toggleFAQ = (index) => {
    setOpenIndex(index); // সবসময় নতুনটা খোলবে (একটাই খোলা থাকবে)
  };

  return (
    <section className="bg-white py-16 font-hind px-5">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Left Side */}
        <div className="flex flex-col items-start">
          <img
            src="/faq.png"
            alt="প্রশ্নের উত্তর"
            className="w-24 md:w-28 lg:w-36 mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-900">
            সচরাচর জানতে চাওয়া{" "}
            <span className="text-green-600">প্রশ্নের উত্তর</span>
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            আপনাদের সাধারণ কিছু প্রশ্নের উত্তর আমরা এখানে সাজিয়ে দিয়েছি।
            প্রশ্ন করার আগে যদি একবার এই তালিকাটি পড়ে নেন, তাহলে হয়তো আপনার
            প্রয়োজনীয় উত্তর এখানেই পেয়ে যাবেন। এতে আপনার সময় বাঁচবে,
            অপ্রয়োজনীয় অপেক্ষা করতে হবে না, আর আমাদের টিমও আরও দ্রুত আপনাদের
            সহায়তা করতে পারবে। তবুও যদি আপনার প্রশ্নের উত্তর এখানে না পান,
            নির্দ্বিধায় আমাদের সাথে যোগাযোগ করতে পারেন। আমরা সবসময় আপনাদের
            পাশে আছি।
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
                <SlArrowDown
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
