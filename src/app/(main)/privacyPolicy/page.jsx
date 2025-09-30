import Link from "next/link";

// app/privacy-policy/page.js
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
              গোপনীয়তা নীতি
            </h1>
            <p className="text-lg text-green-600 max-w-2xl mx-auto">
              আমরা আপনার গোপনীয়তা রক্ষা এবং আপনার ব্যক্তিগত তথ্যের সুরক্ষা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>

          {/* Last Updated */}
          <div className="bg-green-100 border-l-4 border-green-600 p-4 mb-8">
            <p className="text-green-800">
              <strong>সর্বশেষ আপডেট:</strong> {new Date().toLocaleDateString('bn-BD', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-8">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">১. ভূমিকা</h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                এগ্রি-স্মার্ট এ স্বাগতম। আমরা আপনার গোপনীয়তা রক্ষা এবং আপনার ব্যক্তিগত তথ্য সঠিক, 
                স্বচ্ছ এবং নিরাপদভাবে সংগ্রহ ও ব্যবহার নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতি 
                ব্যাখ্যা করে কিভাবে আমরা আমাদের কৃষি সেবা এবং প্ল্যাটফর্ম ব্যবহার করার সময় আপনার তথ্য 
                সংগ্রহ, ব্যবহার এবং সুরক্ষা প্রদান করি।
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">২. আমরা কোন তথ্য সংগ্রহ করি</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-2">ব্যক্তিগত তথ্য</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-justify">
                    <li>নাম এবং যোগাযোগের তথ্য</li>
                    <li>খামারের অবস্থান এবং বিবরণ</li>
                    <li>ফসলের তথ্য এবং চাষাবাদের পদ্ধতি</li>
                    <li>পেমেন্ট এবং বিলিং তথ্য</li>
                    <li>যোগাযোগের পছন্দসমূহ</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-2">প্রযুক্তিগত তথ্য</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-justify">
                    <li>আইপি অ্যাড্রেস এবং ব্রাউজার টাইপ</li>
                    <li>ডিভাইসের তথ্য</li>
                    <li>ব্যবহারের ডেটা এবং অ্যানালিটিক্স</li>
                    <li>কুকিজ এবং অনুরূপ প্রযুক্তি</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">৩. আমরা আপনার তথ্য কিভাবে ব্যবহার করি</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-justify">
                <li>আমাদের কৃষি সেবা প্রদান এবং উন্নত করা</li>
                <li>আপনার চাষাবাদের সুপারিশ ব্যক্তিগতকরণ</li>
                <li>লেনদেন প্রক্রিয়াকরণ এবং সেবা বিজ্ঞপ্তি পাঠানো</li>
                <li>আবহাওয়া সতর্কতা এবং ফসল পরামর্শ পাঠানো</li>
                <li>চাষাবাদের ফলাফল উন্নত করতে গবেষণা এবং বিশ্লেষণ পরিচালনা</li>
                <li>আইনি বাধ্যবাধকতা পালন</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">৪. তথ্য শেয়ারিং এবং প্রকাশ</h2>
              <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                আমরা আপনার ব্যক্তিগত তথ্য বিক্রি করি না। আমরা আপনার তথ্য নিম্নলিখিতদের সাথে শেয়ার করতে পারি:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-justify">
                <li>সেবা প্রদানকারী যারা আমাদের অপারেশনে সহায়তা করে</li>
                <li>কৃষি গবেষণা অংশীদার (বেনামী ডেটা)</li>
                <li>আইন অনুযায়ী প্রয়োজনীয় সরকারি সংস্থা</li>
                <li>আপনার সমবায়ে অন্যান্য কৃষক (আপনার সম্মতিতে)</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">৫. তথ্য সুরক্ষা</h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                আমরা আপনার ব্যক্তিগত তথ্য অননুমোদিত প্রবেশ, পরিবর্তন, প্রকাশ বা ধ্বংস থেকে রক্ষা করতে 
                উপযুক্ত প্রযুক্তিগত এবং সাংগঠনিক সুরক্ষা ব্যবস্থা বাস্তবায়ন করি। এতে এনক্রিপশন, 
                অ্যাক্সেস কন্ট্রোল এবং নিয়মিত সুরক্ষা মূল্যায়ন অন্তর্ভুক্ত।
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">৬. আপনার অধিকার</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-justify">
                <li>আপনার ব্যক্তিগত তথ্য অ্যাক্সেস এবং পর্যালোচনা</li>
                <li>ভুল বা অসম্পূর্ণ ডেটা সংশোধন</li>
                <li>আপনার ব্যক্তিগত তথ্য মুছে ফেলার অনুরোধ</li>
                <li>আপনার ডেটা প্রক্রিয়াকরণে আপত্তি</li>
                <li>ডেটা পোর্টেবিলিটি</li>
                <li>যেকোনো সময় সম্মতি প্রত্যাহার</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">৭. কুকিজ এবং ট্র্যাকিং</h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                আমরা আপনার অভিজ্ঞতা উন্নত করতে, ব্যবহারের প্যাটার্ন বিশ্লেষণ করতে এবং ব্যক্তিগতকৃত 
                কন্টেন্ট প্রদান করতে কুকিজ এবং অনুরূপ প্রযুক্তি ব্যবহার করি। আপনি আপনার ব্রাউজার 
                সেটিংসের মাধ্যমে কুকিজ পছন্দ নিয়ন্ত্রণ করতে পারেন।
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">৮. আমাদের সাথে যোগাযোগ করুন</h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                যদি এই গোপনীয়তা নীতি বা আমাদের ডেটা অনুশীলন সম্পর্কে আপনার কোন প্রশ্ন থাকে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন:
              </p>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 text-justify">
                  <strong>ইমেইল:</strong> privacy@agri-smart.com<br />
                  <strong>ফোন:</strong> +৮৮০ ১XXX-XXXXXX<br />
                  <strong>ঠিকানা:</strong> ১২৩ কৃষি সড়ক, কৃষি জোন, ঢাকা, বাংলাদেশ
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4">৯. নীতিতে পরিবর্তন</h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। আমরা এই পৃষ্ঠায় নতুন নীতি 
                পোস্ট করে এবং "সর্বশেষ আপডেট" তারিখ আপডেট করে আপনাকে যেকোনো পরিবর্তন সম্পর্কে 
                অবহিত করব।
              </p>
            </section>

          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link href="/" 
             
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors duration-200"
            >
              হোমপেজে ফিরে যান
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}