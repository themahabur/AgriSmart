"use client";
import Image from "next/image";
import React from "react";
import LayoutBox from "../shared/layoutBox/LayoutBox";

const Consultation = () => {
  const consultations = [
    {
      id: 1,
      name: "ডা. রহমান",
      expertise: [
        {
          type: "ছত্রাকজনিত রোগ (সবচেয়ে সাধারণ)",
          diseases: [
            "ধানের ব্লাস্ট রোগ (Magnaporthe oryzae)",
            "আলুর লেট ব্লাইট (Phytophthora infestans)",
            "গমে মরিচা রোগ (Puccinia spp.)",
            "পাউডারি মিলডিউ (অনেক ফসলে সাধারণ)",
          ],
        },
        {
          type: "ব্যাকটেরিয়াজনিত রোগ",
          diseases: [
            "ধানের ব্যাকটেরিয়াল ব্লাইট (Xanthomonas oryzae)",
            "সাইট্রাস ক্যান্কার (Xanthomonas citri)",
            "ক্যাবেজের ব্ল্যাক রট (Xanthomonas campestris)",
            "টমেটোর উইল্ট রোগ (Ralstonia solanacearum)",
          ],
        },
      ],
      features: {
        consultationType: ["রিয়েল-টাইম চ্যাট", "ভিডিও পরামর্শ"],
        tips: [
          "সমন্বিত কীট ব্যবস্থাপনা (IPM)",
          "রোগ প্রতিরোধী জাত ব্যবহার",
          "সঠিক ফসল পর্যায়ক্রমিক চাষ",
        ],
        languages: ["বাংলা", "ইংরেজি"],
      },
      extraInfo: {
        experience: "১২ বছরের অভিজ্ঞতা (উদ্ভিদ রোগতত্ত্ব)",
        rating: 4.9,
        availableTime: "সকাল ৯টা - সন্ধ্যা ৬টা",
      },
    },
    {
      id: 2,
      name: "ডা. আক্তার",
      expertise: [
        {
          type: "ভাইরাসজনিত রোগ",
          diseases: [
            "টমেটোর ইয়েলো লিফ কার্ল ভাইরাস",
            "কলা বান্চি টপ ভাইরাস",
            "পেঁপের রিং স্পট ভাইরাস",
          ],
        },
        {
          type: "ছত্রাকজনিত রোগ",
          diseases: [
            "আঙুরে ডাউনি মিলডিউ",
            "আমে অ্যানথ্রাকনোজ",
            "বাদামে লিফ স্পট",
          ],
        },
      ],
      features: {
        consultationType: ["রিয়েল-টাইম চ্যাট", "ভিডিও পরামর্শ"],
        tips: [
          "শুরুর দিকে রোগ শনাক্ত ও আক্রান্ত গাছ আলাদা করা",
          "জৈব ছত্রাকনাশক ব্যবহার",
          "সঠিক সেচ ব্যবস্থা বজায় রাখা",
        ],
        languages: ["বাংলা", "ইংরেজি"],
      },
      extraInfo: {
        experience: "৮ বছরের অভিজ্ঞতা (কৃষি গবেষণা)",
        rating: 4.7,
        availableTime: "সকাল ১০টা - বিকাল ৫টা",
      },
    },
    {
      id: 3,
      name: "ডা. হোসেন",
      expertise: [
        {
          type: "কীটপতঙ্গ সম্পর্কিত সমস্যা",
          diseases: [
            "ধানের স্টেম বোরার",
            "পোকার আক্রমণে আলুর ক্ষতি",
            "কাপাসে বলওয়ার্ম",
            "টমেটোর ফলছিদ্রকারী পোকা",
          ],
        },
        {
          type: "শস্য ব্যবস্থাপনা",
          diseases: ["ধানের অনিয়মিত ফুল আসা", "মাটির উর্বরতা হ্রাস"],
        },
      ],
      features: {
        consultationType: ["রিয়েল-টাইম চ্যাট", "ভিডিও পরামর্শ"],
        tips: [
          "সঠিক সময়ে কীটনাশক ব্যবহার",
          "প্রাকৃতিক শত্রু পোকা সংরক্ষণ",
          "ফসলের সুষম সার প্রয়োগ",
        ],
        languages: ["বাংলা", "ইংরেজি"],
      },
      extraInfo: {
        experience: "১৫ বছরের অভিজ্ঞতা (কীটতত্ত্ব)",
        rating: 4.8,
        availableTime: "সকাল ৮টা - বিকাল ৪টা",
      },
    },
    {
      id: 4,
      name: "ডা. পারভিন",
      expertise: [
        {
          type: "ফসল ব্যবস্থাপনা",
          diseases: [
            "ধানের চারা পোড়া",
            "ভুট্টার খর্বাকৃতি রোগ",
            "শাকসবজির বৃদ্ধি সমস্যা",
          ],
        },
        {
          type: "পুষ্টি ঘাটতি",
          diseases: [
            "ধানের জিঙ্ক ঘাটতি",
            "গমে নাইট্রোজেন ঘাটতি",
            "টমেটোতে পটাশ ঘাটতি",
          ],
        },
      ],
      features: {
        consultationType: ["রিয়েল-টাইম চ্যাট", "ভিডিও পরামর্শ"],
        tips: [
          "মাটির টেস্ট অনুযায়ী সার প্রয়োগ",
          "সঠিক সময়ে পানি সরবরাহ",
          "ফসল ঘনত্ব সঠিকভাবে বজায় রাখা",
        ],
        languages: ["বাংলা", "ইংরেজি"],
      },
      extraInfo: {
        experience: "১০ বছরের অভিজ্ঞতা (ফসল বিজ্ঞান)",
        rating: 4.6,
        availableTime: "সকাল ৯টা - বিকাল ৫টা",
      },
    },
    {
      id: 5,
      name: "ডা. করিম",
      expertise: [
        {
          type: "বাগান ফসলের রোগ",
          diseases: ["আমে গুঁড়ো ফাঙ্গাস", "লিচুতে পাতা ঝলসানো", "পেয়ারা উইল্ট"],
        },
        {
          type: "ফল পচন",
          diseases: ["আমের ফল পচন", "কাঁঠালে ছত্রাক আক্রমণ"],
        },
      ],
      features: {
        consultationType: ["রিয়েল-টাইম চ্যাট", "ভিডিও পরামর্শ"],
        tips: [
          "ফল সংগ্রহের পরে সঠিক সংরক্ষণ",
          "বাগানে নিয়মিত ছাঁটাই",
          "জৈব সার ব্যবহার",
        ],
        languages: ["বাংলা", "ইংরেজি"],
      },
      extraInfo: {
        experience: "২০ বছরের অভিজ্ঞতা (বাগান ফসল)",
        rating: 5.0,
        availableTime: "সকাল ৭টা - দুপুর ৩টা",
      },
    },
    {
      id: 6,
      name: "ডা. নাসরিন",
      expertise: [
        {
          type: "মৌসুমি ফসল",
          diseases: [
            "শীতকালীন সবজিতে ডাউনি মিলডিউ",
            "গ্রীষ্মকালীন ফসলে ছত্রাক আক্রমণ",
          ],
        },
        {
          type: "ভূমি ব্যবস্থাপনা",
          diseases: ["মাটির লবণাক্ততা", "অতিরিক্ত সেচের কারণে ক্ষতি"],
        },
      ],
      features: {
        consultationType: ["রিয়েল-টাইম চ্যাট", "ভিডিও পরামর্শ"],
        tips: [
          "ফসল ঘুরিয়ে চাষ করা",
          "সেচ ব্যবস্থার উন্নতি",
          "মাটির উর্বরতা রক্ষা",
        ],
        languages: ["বাংলা", "ইংরেজি"],
      },
      extraInfo: {
        experience: "৯ বছরের অভিজ্ঞতা (মাটি বিজ্ঞান)",
        rating: 4.5,
        availableTime: "সকাল ৮টা - সন্ধ্যা ৬টা",
      },
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-amber-50 to-green-50">
      <div className="container mx-auto">
        <div className="lg:grid lg:grid-cols-3">
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
            <Image
              src="/consultaion.png"
              width={400}
              height={450}
              alt="consultation_avatar"
              className="w-32 md:w-48 lg:w-56 mb-4"
            />
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 mx-auto lg:mx-0">
              অভিজ্ঞ বিশেষজ্ঞদের
              <span className="text-primary ml-2">পরামর্শ নিন</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-sm">
              আমাদের বিশেষজ্ঞরা আপনাকে সঠিক পরামর্শ দেবে যাতে আপনি আপনার শস্য
              থেকে সর্বাধিক ফসল উপার্জন করতে পারেন। আবহাওয়া সতর্কতা,
              রিয়েল-টাইম বাজার মূল্য এবং বিশেষজ্ঞ পরামর্শ একসাথে পান।
            </p>
          </div>
          <div className=" lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 ">
            {consultations.map((doctor) => (
              <div
                key={doctor.id}
                className="rounded-xl bg-white border border-gray-100 p-6 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-300 items-center text-center mt-4 "
              >
                {/* Avatar */}
                <div className="w-20 h-20 bg-green-100 rounded-full border-4 border-white -mt-12 flex items-center justify-center text-2xl font-bold text-green-700 mb-4">
                  <Image
                    src="/farmer_user_logo.jpg"
                    width={80}
                    height={80}
                    className="rounded-full h-auto "
                    alt="farmer_logo"
                  />
                </div>

                {/* Name */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {doctor.name}
                </h2>

                {/* Expertise Types */}
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">বিশেষজ্ঞতা:</span>{" "}
                  {doctor.expertise.map((e) => e.type).join(", ")}
                </p>

                {/* Experience */}
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">অভিজ্ঞতা:</span>{" "}
                  {doctor.extraInfo.experience}
                </p>

                {/* Button */}
                <button className="mt-3 px-6 py-2 border border-green-800 text-green-800 hover:btn-primary rounded-full hover:bg-green-800 hover:text-white transition">
                  বিস্তারিত দেখুন
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
