import React from 'react'

export default function WhyStarted() {
  return (
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
  )
}
