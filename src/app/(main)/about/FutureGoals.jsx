import React from 'react'

export default function FutureGoals() {
  return (
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
  )
}
