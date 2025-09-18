import React from "react";
import {
  FaBug,
  FaBookOpen,
  FaCalculator,
  FaUsers,
  FaStethoscope,
} from "react-icons/fa";
import LayoutBox from "../shared/layoutBox/LayoutBox";
import SingleFeatureCard from "./SingleFeatureCard";

//  Service data
const services = [
  {
    icon: <FaBug className="w-12 h-12 text-primary" />,
    title: "পোকামাকড় ও রোগ শনাক্তকরণ",
    description:
      "আপনার ফসলের ছবি তুলে কৃত্রিম বুদ্ধিমত্তার সাহায্যে মুহূর্তেই রোগ ও পোকা শনাক্ত করুন।",
    link: "/services/pest-detection",
  },
  {
    icon: <FaBookOpen className="w-12 h-12 text-primary" />,
    title: "টিউটোরিয়াল ও ব্লগ",
    description:
      "আধুনিক চাষাবাদের কৌশল, ভিডিও টিউটোরিয়াল এবং সফল কৃষকদের গল্প থেকে জ্ঞান অর্জন করুন।",
    link: "/blogs",
  },
  {
    icon: <FaCalculator className="w-12 h-12 text-primary" />,
    title: "খরচ ও লাভের হিসাব",
    description:
      "চাষের খরচ হিসাব করুন এবং সম্ভাব্য লাভের পরিমাণ জেনে সঠিক আর্থিক সিদ্ধান্ত নিন।",
    link: "/tools/calculator",
  },
  {
    icon: <FaUsers className="w-12 h-12 text-primary" />,
    title: "অন্যান্য কৃষকদের মতামত",
    description:
      "বিভিন্ন সমাধান ও কৌশল নিয়ে অন্যান্য অভিজ্ঞ কৃষকদের বিশ্বস্ত মতামত পড়ুন।",
    link: "/reviews",
  },
  {
    icon: <FaStethoscope className="w-12 h-12 text-primary" />,
    title: "বিশেষজ্ঞের পরামর্শ",
    description:
      "আমাদের কৃষি বিশেষজ্ঞদের সাথে চ্যাট বা ভিডিও কলের মাধ্যমে ব্যক্তিগত পরামর্শ গ্রহণ করুন।",
    link: "/experts",
  },
];

const Feature = () => {
  return (
    <LayoutBox>
      <div id="services">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-hind text-gray-800">
            স্মার্ট সমাধানে আপনার খামারকে করুন
            <span className="text-primary"> আরও শক্তিশালী</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-hind max-w-3xl mx-auto">
            রোগ নির্ণয় থেকে শুরু করে বিশেষজ্ঞের পরামর্শ পর্যন্ত, আমরা আপনাকে ফলন
            বাড়াতে এবং ক্ষতি কমাতে সাহায্য করি।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 justify-items-center">
          {services.map((service, index) => (
            <SingleFeatureCard key={index} service={service} />
          ))}
        </div>

        {/* call to action button */}
        <div className="text-center mt-16">
          <a
            href="/features"
            className="btn btn-primary text-lg hover:bg-secondary hover:text-black"
          >
            সকল ফিচার দেখুন &rarr;
          </a>
        </div>
      </div>
    </LayoutBox>
  );
};

export default Feature;
