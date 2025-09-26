import React from "react";
import Image from "next/image";

import { useState } from "react";

export default function MissionAndVision() {
  const [activeTab, setActiveTab] = useState("mission");
  return (
    <section className="py-16 px-6 md:px-20">
      <div className="container mx-auto">
        <div className="flex flex-wrap border-b border-gray-200 mb-8 lg:w-1/3 w-full">
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
          {/* Mission */}
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
                    <span>ডিজিটাল প্রযুক্তির মাধ্যমে কৃষি পরামর্শ প্রদান</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>কৃষি উৎপাদন ও বিপণনে দক্ষতা বৃদ্ধি</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-96">
                <Image
                  src="/mission.jpg"
                  alt="Mission Image"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Vision */}
          {activeTab === "vision" && (
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  আমাদের ভিশন
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  আমাদের ভিশন হলো একটি ডিজিটাল বাংলাদেশ গড়ে তোলা যেখানে প্রতিটি
                  কৃষক প্রযুক্তির সুবিধা ভোগ করতে পারবেন এবং তাদের কৃষি কাজ আরও
                  লাভজনক ও টেকসই করতে পারবেন।
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <p className="text-yellow-700">
                    "প্রতিটি কৃষকের হাতে প্রযুক্তি পৌঁছে দেয়াই আমাদের লক্ষ্য"
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-96">
                <Image
                  src="/vision.jpg"
                  alt="Vision Image"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Values */}
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
              <div className="rounded-2xl overflow-hidden shadow-lg h-96">
                <Image
                  src="/values.jpg"
                  alt="Values Image"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
