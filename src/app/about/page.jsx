"use client";

import { useState } from "react";
import {
  FaBolt,
  FaSun,
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

import { CiUser } from "react-icons/ci";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AgriSmart সম্পর্কে
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            বাংলাদেশের কৃষকদের জন্য প্রযুক্তি নির্ভর সমাধান নিয়ে আমরা শুরু
            করেছি নতুন একটি যাত্রা
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 px-6 md:px-20">
        <div className="container mx-auto">
          <div className="flex flex-wrap border-b border-gray-200 mb-8">
            <button
              className={`px-6 py-3 font-medium text-lg ${
                activeTab === "mission"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("mission")}
            >
              আমাদের মিশন
            </button>
            <button
              className={`px-6 py-3 font-medium text-lg ${
                activeTab === "vision"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("vision")}
            >
              আমাদের ভিশন
            </button>
            <button
              className={`px-6 py-3 font-medium text-lg ${
                activeTab === "values"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("values")}
            >
              আমাদের মূল্যবোধ
            </button>
          </div>

          <div className="mb-16">
            {activeTab === "mission" && (
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    আমাদের মিশন
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    AgriSmart-এর মিশন হলো প্রযুক্তির মাধ্যমে বাংলাদেশের কৃষি
                    ক্ষেত্রে নতুন দিগন্ত উন্মোচন করা। আমরা শুরু করেছি একটি নতুন
                    যাত্রা, যেখানে প্রতিটি কৃষক পাবে প্রয়োজনীয় তথ্য ও পরামর্শ।
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>কৃষকদের জন্য সহজলভ্য তথ্য সরবরাহ</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>
                        ডিজিটাল প্রযুক্তির মাধ্যমে কৃষি পরামর্শ প্রদান
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>কৃষি উৎপাদন ও বিপণনে দক্ষতা বৃদ্ধি</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaBolt className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      কৃষিতে ডিজিটাল বিপ্লব
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    আমাদের ভিশন
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    আমাদের ভিশন হলো একটি ডিজিটাল বাংলাদেশ গড়ে তোলা যেখানে
                    প্রতিটি কৃষক প্রযুক্তির সুবিধা ভোগ করতে পারবেন এবং তাদের
                    কৃষি কাজ আরও লাভজনক ও টেকসই করতে পারবেন।
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                    <p className="text-yellow-700">
                      "প্রতিটি কৃষকের হাতে প্রযুক্তি পৌঁছে দেয়াই আমাদের লক্ষ্য"
                    </p>
                  </div>
                </div>
                <div className="bg-amber-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaSun className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      উজ্জ্বল ভবিষ্যৎ
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    আমাদের মূল্যবোধ
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    আমরা কিছু মূল নীতিমালা অনুসরণ করি যা আমাদের কাজকে নির্দেশনা
                    দেয়:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <span className="text-green-600 font-bold">১</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">কৃষক প্রথম</h4>
                        <p className="text-gray-600">
                          কৃষকদের প্রয়োজনীয়তাকে আমরা সর্বোচ্চ গুরুত্ব দেই
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <span className="text-green-600 font-bold">২</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">সততা</h4>
                        <p className="text-gray-600">
                          আমরা সর্বদা সঠিক ও নির্ভরযোগ্য তথ্য প্রদান করি
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <span className="text-green-600 font-bold">৩</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">নবায়ন</h4>
                        <p className="text-gray-600">
                          আমরা ক্রমাগত নতুন সমাধান খোঁজার চেষ্টা করি
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      মূল্যবোধ
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Started Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            কেন আমরা শুরু করলাম
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                সমস্যা
              </h3>
              <p className="text-gray-700 mb-6">
                বাংলাদেশের কৃষকরা প্রায়ই নিম্নলিখিত সমস্যাগুলোর মুখোমুখি হন:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span>বাজারে দাম সম্পর্কে সময়মত তথ্যের অভাব</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span>আবহাওয়া সম্পর্কে হালনাগাদ তথ্যের অপ্রতুলতা</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span>আধুনিক কৃষি পদ্ধতি সম্পর্কে সীমিত জ্ঞান</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span>কৃষি উপকরণের অসমবণ্টন</span>
                </li>
              </ul>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                আমাদের সমাধান
              </h3>
              <p className="text-gray-700 mb-6">
                AgriSmart নিম্নলিখিত সমাধান নিয়ে এসেছে:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>রিয়েল-টাইম বাজার দর তথ্য</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>সঠিক আবহাওয়া পূর্বাভাস</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>কৃষি বিশেষজ্ঞদের পরামর্শ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>কৃষি উপকরণের availability তথ্য</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals Section */}
      <section className="py-16 px-6 md:px-20 bg-green-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            আমাদের লক্ষ্য
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">১</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                প্রথম বছরের লক্ষ্য
              </h3>
              <p className="text-gray-600">
                ১০,০০০+ কৃষকের কাছে পৌঁছানো এবং ৫০০+ পরামর্শ প্রদান
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">২</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                দ্বিতীয় বছরের লক্ষ্য
              </h3>
              <p className="text-gray-600">
                ৫০,০০০+ কৃষক এবং ২০+ জেলায় আমাদের পরিষেবা расширение
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">৩</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                দীর্ঘমেয়াদী লক্ষ্য
              </h3>
              <p className="text-gray-600">
                সম্পূর্ণ বাংলাদেশের কৃষকদের কাছে আমাদের পরিষেবা পৌঁছে দেওয়া
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            আমাদের টিম
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            AgriSmart-এর দক্ষ ডেভেলপমেন্ট টিম যারা নিবেদিতভাবে কাজ করে যাচ্ছে
            কৃষি খাতকে ডিজিটাল করার জন্য
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Mahabur Rahman", role: "ডেভেলপার" },
              { name: "Anayet", role: "ডেভেলপার" },
              { name: "Afrin", role: "ডেভেলপার" },
              { name: "Md Meherab Hossen", role: "ডেভেলপার" },
              { name: "Arifuzzaman Rakib", role: "ডেভেলপার" },
              { name: "Sakib ul Nasib", role: "ডেভেলপার" },
            ].map((member, index) => (
              <div
                key={index}
                className="group text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-4 flex items-center justify-center relative overflow-hidden">
                    <CiUser className="text-4xl text-green-700" />
                    <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-green-500/10 to-transparent"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">
                  AgriSmart-এর ডেভেলপমেন্ট টিমের সদস্য
                </p>
                <div className="flex justify-center space-x-3">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                  >
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}