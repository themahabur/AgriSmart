'use client';
import React, { useState } from "react";
import { FaRobot, FaUsers, FaStethoscope } from "react-icons/fa";
import { GiLongAntennaeBug } from "react-icons/gi";
import { HiMiniBookOpen } from "react-icons/hi2";
import LayoutBox from "../shared/layoutBox/LayoutBox";
import SingleFeatureCard from "./SingleFeatureCard";
import Image from "next/image";
import FeatureModal from "./FeatureModal";

// Service data
const services = [
  {
    serviceId: 1,
    icon: <GiLongAntennaeBug className="w-5 h-5 text-primary" />,
    title: "পোকামাকড় ও রোগ শনাক্তকরণ",
    description:
      "আপনার ফসলের ছবি তুলে কৃত্রিম বুদ্ধিমত্তার সাহায্যে মুহূর্তেই রোগ ও পোকা শনাক্ত করুন।",
    link: "/services/pest-detection",
  },
  {
    serviceId: 2,
    icon: <HiMiniBookOpen className="w-5 h-5 text-primary" />,
    title: "টিউটোরিয়াল ও ব্লগ",
    description:
      "আধুনিক চাষাবাদের কৌশল, ভিডিও টিউটোরিয়াল এবং সফল কৃষকদের গল্প থেকে জ্ঞান অর্জন করুন।",
    link: "/blogs",
  },
  {
    serviceId: 3,
    icon: <FaRobot className="w-5 h-5 text-primary" />,
    title: "এআই চ্যাটবট",
    description:
      "কৃষি বিষয়ক যেকোনো প্রশ্নের তাৎক্ষণিক উত্তর পান আমাদের স্মার্ট বট থেকে।",
    link: "/dashboard/ai-chatbot",
  },
  {
    serviceId: 4,
    icon: <FaUsers className="w-5 h-5 text-primary" />,
    title: "অন্যান্য কৃষকদের মতামত",
    description:
      "বিভিন্ন সমাধান ও কৌশল নিয়ে অন্যান্য অভিজ্ঞ কৃষকদের বিশ্বস্ত মতামত পড়ুন।",
    link: "/reviews",
  },
  {
    serviceId: 5,
    icon: <FaStethoscope className="w-5 h-5 text-primary" />,
    title: "বিশেষজ্ঞের পরামর্শ",
    description:
      "আমাদের কৃষি বিশেষজ্ঞদের সাথে চ্যাট বা ভিডিও কলের মাধ্যমে ব্যক্তিগত পরামর্শ গ্রহণ করুন।",
    link: "/experts",
  },
];

const Feature = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <LayoutBox>
      <div id="services">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-28 md:w-44 mx-auto mb-6">
            <Image
              src="/smartFarmer2.png"
              alt="Farmer Illustration"
              width={176}
              height={176}
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-hind text-gray-800">
            আপনার খামারের <span className="text-primary">আধুনিক সমাধান</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-hind max-w-2xl mx-auto">
            রোগ নির্ণয় থেকে শুরু করে বিশেষজ্ঞের পরামর্শ পর্যন্ত, আমরা আপনাকে ফলন
            বাড়াতে এবং ক্ষতি কমাতে সাহায্য করি।
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {services.map((service, index) => (
            <SingleFeatureCard 
              key={index} 
              service={service} 
              onOpenModal={openModal} 
            />
          ))}
        </div>

        {/* Feature Modal */}
        {showModal && selectedService && (
          <FeatureModal 
            service={selectedService} 
            onClose={closeModal} 
          />
        )}

       
      </div>
    </LayoutBox>
  );
};

export default Feature;