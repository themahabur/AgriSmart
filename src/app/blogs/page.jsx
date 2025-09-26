"use client";
import { useState } from "react";
import SecondaryBtn from "../components/shared/buttons/SecondaryBtn";

const Blog = () => {
  const [activeTab, setActiveTab] = useState("tutorials");

  //  Tutorials
  const tutorials = [
    {
      id: 1,
      title: "ধান চাষের সম্পূর্ণ গাইড",
      videoUrl: "https://youtu.be/sNzu7Jc-YgI",
      category: "ধান চাষ",
    },
    {
      id: 2,
      title: "জৈব সারের ব্যবহার পদ্ধতি",
      videoUrl: "https://youtu.be/aluO3sHQVO8",
      category: "সার ব্যবস্থাপনা",
    },
    {
      id: 3,
      title: "আমের রোগ ব্যবস্থাপনা",
      videoUrl: "https://youtu.be/BkVCEd1l5F4",
      category: "ফল চাষ",
    },
  ];

  const updates = [
    {
      id: 1,
      title: "নতুন কৃষি নীতি ঘোষণা",
      date: "২০২৪-০৩-১৫",
      content:
        "সরকার নতুন কৃষি নীতি ঘোষণা করেছেন যা কৃষকদের জন্য বেশি সুবিধা নিয়ে এসেছে।",
    },
    {
      id: 2,
      title: "বৃষ্টির পূর্বাভাস সতর্কতা",
      date: "২০২৪-০৩-১০",
      content:
        "আগামী সপ্তাহে ভারী বৃষ্টির সম্ভাবনা রয়েছে, কৃষকদের যথাযথ প্রস্তুতি নেওয়ার পরামর্শ।",
    },
    {
      id: 3,
      title: "কৃষি উপকরণ ভর্তুকি",
      date: "২০২৪-০৩-০৫",
      content: "কৃষি উপকরণে ৩০% ভর্তুকি প্রদানের নতুন প্রকল্প চালু হয়েছে।",
    },
  ];

  const reviews = [
    {
      id: 1,
      farmerName: "মোহাম্মদ আলী",
      location: "ঢাকা",
      rating: 4.5,
      comment:
        "এই প্ল্যাটফর্মটি আমার চাষাবাদে অনেক সাহায্য করেছে। ভিডিও টিউটোরিয়ালগুলো খুবই উপকারী।",
      date: "২০২৪-০৩-১২",
    },
    {
      id: 2,
      farmerName: "সুজাতা বেগম",
      location: "বগুড়া",
      rating: 5,
      comment:
        "আপডেট তথ্যগুলো সময়মতো পাওয়ায় ফসল রক্ষা করতে পেরেছি। ধন্যবাদ টিমকে।",
      date: "২০২৪-০৩-08",
    },
    {
      id: 3,
      farmerName: "রবিউল ইসলাম",
      location: "রংপুর",
      rating: 4,
      comment:
        "কৃষক পর্যালোচনা সেকশনটি খুব ভালো হয়েছে। অন্যান্য কৃষকদের অভিজ্ঞতা জানতে পারছি।",
      date: "২০২৪-০৩-০৫",
    },
  ];

  // helper function
  const getEmbedUrl = (url) =>
    url
      .replace("youtu.be/", "www.youtube.com/embed/")
      .replace("watch?v=", "embed/");

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-amber-50 to-green-50 py-8 px-4">
      <div className="container mx-auto">
        <div className=" flex justify-center items-center">
          <img
            src="/blogsFarmer.png"
            alt="Farmer Illustration"
            className="w-50 md:w-65 mx-auto lg:mx-0 mb-4"
          />
        </div>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-3">
            🌾 কৃষক ব্লগ ও রিসোর্স সেন্টার
          </h1>
          <p className="text-lg text-gray-700">
            কৃষি সম্পর্কিত সর্বশেষ তথ্য, ভিডিও টিউটোরিয়াল এবং কৃষকদের অভিজ্ঞতা
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="সেকশন নির্বাচন"
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <button
            role="tab"
            aria-selected={activeTab === "tutorials"}
            onClick={() => setActiveTab("tutorials")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              activeTab === "tutorials"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-green-700 border border-green-300 hover:bg-green-50"
            }`}
          >
            🎥 কৃষি টিউটোরিয়াল
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "updates"}
            onClick={() => setActiveTab("updates")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              activeTab === "updates"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-green-700 border border-green-300 hover:bg-green-50"
            }`}
          >
            📢 তথ্য আপডেট
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              activeTab === "reviews"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-green-700 border border-green-300 hover:bg-green-50"
            }`}
          >
            👨‍🌾 কৃষক অভিজ্ঞতা
          </button>
        </div>

        {/* Tutorials */}
        {activeTab === "tutorials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-sm transition-shadow duration-300"
              >
                <div className="relative pt-[56.25%] bg-gray-200">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={getEmbedUrl(tutorial.videoUrl)}
                    title={tutorial.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {tutorial.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    {tutorial.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Updates */}
        {activeTab === "updates" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.map((update) => (
              <div
                key={update.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    📢 আপডেট
                  </span>
                  <span className="text-sm text-gray-500">{update.date}</span>
                </div>
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  {update.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {update.content}
                </p>
                <SecondaryBtn
                  children={"বিস্তারিত জানুন"}
                  className="mt-4 w-full flex items-center rounded-2xl justify-center gap-2 bg-blue-600 text-white px-4 py-2.5  hover:bg-blue-700 transition-colors"
                />
              </div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {review.farmerName}
                    </h4>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 text-sm font-semibold">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {review.comment}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{review.date}</span>
                  <button
                    aria-label="উত্তর দিন"
                    className="flex items-center gap-1 text-green-700 hover:text-green-900 transition-colors"
                  >
                    {/* <MessageSquare size={14} /> উত্তর দিন */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Tips */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            ✅ দ্রুত টিপস
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: 1,
                title: "বীজ বাছাই",
                text: "সার্টিফাইড বীজ ব্যবহার করুন। অঙ্কুরোদগম পরীক্ষা করুন।",
                icon: "🌱",
              },
              {
                id: 2,
                title: "পানি ব্যবস্থাপনা",
                text: "জমিতে পানি জমতে দেবেন না, নিকাশী ঠিক রাখুন।",
                icon: "💧",
              },
              {
                id: 3,
                title: "পোকা দমন",
                text: "ফেরোমন ট্র্যাপ ব্যবহার করুন, প্রয়োজনে বিশেষজ্ঞের পরামর্শ নিন।",
                icon: "🐛",
              },
              {
                id: 4,
                title: "সারের সময়",
                text: "ফসলের বয়স ও মাটির পরীক্ষার রিপোর্ট দেখে সার দিন।",
                icon: "🧪",
              },
            ].map((tip) => (
              <div
                key={tip.id}
                className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition"
              >
                <div className="text-2xl mb-2">{tip.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-700">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Topics */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-3 text-center">
            🔥 জনপ্রিয় বিষয়
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "ধান",
              "সবজি",
              "জৈব সার",
              "পানি সেচ",
              "আম",
              "রোগ দমন",
              "বীজ সংরক্ষণ",
            ].map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm hover:bg-green-200 cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* Weather Alert (Placeholder) */}
        <section className="mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">
                ⛅ আবহাওয়া সতর্কতা (ডেমো)
              </h3>
              <p className="text-sm text-blue-800">
                আজ সন্ধ্যায় বৃষ্টির সম্ভাবনা। কাটিং/স্প্রে আজ এড়িয়ে চলুন।
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              আরো জানুন
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            ❓ সাধারণ প্রশ্ন
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "ধানের চারা কখন রোপণ করবো?",
                a: "বৃষ্টি শুরু হলে ও মাটিতে পর্যাপ্ত আর্দ্রতা থাকলে, ২০–২৫ দিনের চারা রোপণ ভালো।",
              },
              {
                q: "জৈব সার কতদিন পর পর দেবো?",
                a: "ফসলভেদে ভিন্ন। সাধারণত মাটির পরীক্ষার রিপোর্ট দেখে ৩০–৪৫ দিনে একবার।",
              },
              {
                q: "পোকার আক্রমণ হলে কি করবো?",
                a: "প্রথমে শনাক্ত করুন, কম ক্ষেতে হাত দিয়ে তুলে ফেলুন, প্রয়োজনে অনুমোদিত বায়ো-পেস্টিসাইড ব্যবহার করুন।",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="bg-white rounded-xl shadow group open:shadow-md"
              >
                <summary className="cursor-pointer list-none p-4 font-medium text-gray-900 flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition">
                    ⌄
                  </span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-700">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              📰 কৃষি খবর পেতে ইমেইল দিন
            </h3>
            <p className="text-gray-700 mb-4">
              সাপ্তাহিক টিপস, আবহাওয়া ও নীতিমালা আপডেট
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                name="email"
                placeholder="আপনার ইমেইল লিখুন"
                className="w-full sm:w-72 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                className="px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Help Center */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            📞 কৃষি সহায়তা কেন্দ্র
          </h2>
          <p className="text-gray-700 mb-4">
            সমস্যা হলে সঙ্গে সঙ্গে যোগাযোগ করুন
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors">
              ☎️ হেল্পলাইন: ১৬১২৩
            </button>
            <button className="bg-amber-500 text-white px-6 py-2.5 rounded-lg hover:bg-amber-600 transition-colors">
              👨‍🔬 বিশেষজ্ঞ পরামর্শ
            </button>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
              📘 ই-বুক ডাউনলোড
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
