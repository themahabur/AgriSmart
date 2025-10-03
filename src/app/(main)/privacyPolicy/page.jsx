"use client";
export default function App() {
  // স্ট্যাটিক ডেট ফরম্যাটিং (Bengali locale)
  const lastUpdatedDate = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // আধুনিক ডিজাইনের জন্য Emerald/Teal রং ব্যবহার করা হয়েছে
  const primaryColor = "emerald";

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <header className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
              গোপনীয়তা নীতি
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              কৃষিস্মার্ট (Agrismart)-এর পক্ষ থেকে আমরা আপনার গোপনীয়তাকে
              গুরুত্ব সহকারে বিবেচনা করি এবং আপনার তথ্যের সুরক্ষার জন্য
              প্রতিশ্রুতিবদ্ধ।
            </p>
          </header>

          {/* Last Updated Box */}
          <div
            className={`bg-green-50 border-l-4 border-green-600 p-4 mb-10 rounded-lg shadow-sm`}
          >
            <p
              className={`text-green-800 text-base md:text-lg font-medium`}
            >
              <strong>সর্বশেষ আপডেট:</strong> {lastUpdatedDate}
            </p>
          </div>

          {/* Privacy Policy Content Container */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-12 border border-gray-100">
            {/* Introduction - ১. ভূমিকা */}
            <section>
              <h2
                className={`text-3xl font-bold text-green-700 mb-5 border-b pb-3 border-gray-100`}
              >
                ১. ভূমিকা
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-justify">
                কৃষিস্মার্ট (Agrismart) অ্যাপ্লিকেশনে আপনাকে স্বাগত। আমরা আপনার
                গোপনীয়তা রক্ষা এবং আপনার ব্যক্তিগত তথ্য সঠিক, স্বচ্ছ ও
                নিরাপদভাবে সংগ্রহ ও ব্যবহার নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। এই
                গোপনীয়তা নীতি ব্যাখ্যা করে আমরা কীভাবে আমাদের কৃষি সেবা এবং
                প্ল্যাটফর্ম ব্যবহার করার সময় আপনার তথ্য সংগ্রহ, ব্যবহার এবং
                সুরক্ষা প্রদান করি। এই নীতি শুধুমাত্র কৃষিস্মার্ট অ্যাপ্লিকেশনের
                জন্য প্রযোজ্য।
              </p>
            </section>

            {/* Information We Collect - ২. আমরা কোন তথ্য সংগ্রহ করি */}
            <section>
              <h2
                className={`text-3xl font-bold text-green-700 mb-5 border-b pb-3 border-gray-100`}
              >
                ২. আমরা কোন তথ্য সংগ্রহ করি
              </h2>
              <div className="space-y-8">
                <div>
                  <h3
                    className={`text-xl font-bold text-green-800 mb-3 border-l-4 border-green-500 pl-3`}
                  >
                    ২.১. সরাসরি প্রদত্ত তথ্য
                  </h3>
                  <p className="text-gray-700 mb-3 text-justify">
                    আপনি যখন অ্যাপ্লিকেশনে একটি অ্যাকাউন্ট তৈরি করেন বা আমাদের
                    পরিষেবা ব্যবহার করেন, তখন আপনি নিম্নলিখিত তথ্যগুলি প্রদান
                    করতে পারেন:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>
                      ব্যবহারকারীর নাম, যোগাযোগের তথ্য (ইমেল বা ফোন নম্বর)।
                    </li>
                    <li>
                      খামারের অবস্থান (জিআইএস বা ভৌগোলিক স্থানাঙ্ক) এবং বিবরণ।
                    </li>
                    <li>
                      ফসলের তথ্য, বীজ, সার এবং চাষাবাদের পদ্ধতি সম্পর্কিত ইনপুট
                      ডেটা।
                    </li>
                  </ul>
                </div>
                <div>
                  <h3
                    className={`text-xl font-bold text-green-800 mb-3 border-l-4 border-green-500 pl-3`}
                  >
                    ২.২. স্বয়ংক্রিয়ভাবে সংগৃহীত তথ্য
                  </h3>
                  <p className="text-gray-700 mb-3 text-justify">
                    আপনি যখন আমাদের অ্যাপ ব্যবহার করেন, তখন আপনার ডিভাইস বা
                    ব্যবহারের ধরণ সম্পর্কে কিছু তথ্য স্বয়ংক্রিয়ভাবে সংগ্রহ করা
                    হয়:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>
                      ডিভাইসের তথ্য: আইপি অ্যাড্রেস, অপারেটিং সিস্টেম এবং
                      ডিভাইসের মডেল।
                    </li>
                    <li>
                      ব্যবহারের ডেটা: আপনি কোন ফিচারগুলো ব্যবহার করেছেন এবং
                      কতক্ষণ ব্যবহার করেছেন (অ্যানালিটিক্স)।
                    </li>
                    <li>
                      কুকিজ এবং ট্র্যাকিং প্রযুক্তি: সেশন বজায় রাখতে এবং
                      ব্যবহারকারীর পছন্দ মনে রাখতে ব্যবহার করা হয়।
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information - ৩. আমরা আপনার তথ্য কিভাবে ব্যবহার করি */}
            <section>
              <h2
                className={`text-3xl font-bold text-green-700 mb-5 border-b pb-3 border-gray-100`}
              >
                ৩. আমরা আপনার তথ্য কিভাবে ব্যবহার করি
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4 text-lg text-justify">
                আমরা সংগৃহীত তথ্য নিম্নলিখিত মূল উদ্দেশ্যে ব্যবহার করি:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4 text-lg text-justify">
                <li>
                  আমাদের কৃষি পরামর্শ সেবা প্রদান এবং অ্যাপ্লিকেশনের কার্যকারিতা
                  নিশ্চিত করা।
                </li>
                <li>
                  আপনার খামারের ডেটার উপর ভিত্তি করে কাস্টমাইজড চাষাবাদের
                  সুপারিশ প্রদান করা।
                </li>
                <li>
                  আবহাওয়া সতর্কতা, রোগ/পোকা সংক্রান্ত বিজ্ঞপ্তি এবং অন্যান্য
                  গুরুত্বপূর্ণ কৃষি সংক্রান্ত তথ্য পাঠানো।
                </li>
                <li>
                  গ্রাহক সহায়তা প্রদান এবং আপনার জিজ্ঞাসা বা সমস্যার সমাধান
                  করা।
                </li>
                <li>
                  অ্যাপ্লিকেশন উন্নত করতে এবং নতুন বৈশিষ্ট্য তৈরি করতে বেনামী
                  গবেষণা ও বিশ্লেষণ পরিচালনা করা।
                </li>
                <li>আইনি বাধ্যবাধকতা (যদি থাকে) পালন করা।</li>
              </ul>
            </section>

            {/* Data Sharing - ৪. তথ্য শেয়ারিং এবং প্রকাশ */}
            <section>
              <h2
                className={`text-3xl font-bold text-green-700 mb-5 border-b pb-3 border-gray-100`}
              >
                ৪. তথ্য শেয়ারিং এবং প্রকাশ
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4 text-lg text-justify">
                আমরা আপনার **ব্যক্তিগত তথ্য** তৃতীয় পক্ষের কাছে **বিক্রি,
                বাণিজ্য বা ভাড়া দিই না**। আমরা আপনার তথ্য নিম্নলিখিত সীমিত
                পরিস্থিতিতে শেয়ার করতে পারি:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4 text-lg text-justify">
                <li>
                  <strong className="text-green-900">সেবা প্রদানকারী:</strong> যারা আমাদের হয়ে কাজ করেন
                  (যেমন ডেটা হোস্টিং, অ্যানালিটিক্স)। তারা শুধুমাত্র আমাদের
                  নির্দেশ অনুযায়ী আপনার তথ্য ব্যবহার করতে পারবে।
                </li>
                <li>
                  <strong className="text-green-900">আইনি প্রয়োজন:</strong> আইন দ্বারা নির্দেশিত হলে বা
                  সরকারি অনুরোধের প্রতিক্রিয়ায়।
                </li>
                <li>
                  <strong className="text-green-900">কৃষি গবেষণা:</strong> শুধুমাত্র **মোট (aggregated)**
                  এবং **বেনামী** ডেটা কৃষি গবেষক বা অংশীদারদের সাথে শেয়ার করা
                  হতে পারে, যা আপনার পরিচয় প্রকাশ করবে না।
                </li>
              </ul>
            </section>

            {/* Data Security - ৫. তথ্য সুরক্ষা */}
            <section>
              <h2
                className={`text-3xl font-bold text-green-700 mb-5 border-b pb-3 border-gray-100`}
              >
                ৫. তথ্য সুরক্ষা
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-justify">
                আপনার ব্যক্তিগত তথ্য অননুমোদিত প্রবেশ, পরিবর্তন, প্রকাশ বা ধ্বংস
                থেকে রক্ষা করার জন্য আমরা উপযুক্ত প্রযুক্তিগত এবং সাংগঠনিক
                সুরক্ষা ব্যবস্থা বাস্তবায়ন করি। এতে এনক্রিপশন, অ্যাক্সেস
                কন্ট্রোল এবং নিয়মিত সুরক্ষা মূল্যায়ন অন্তর্ভুক্ত। তবে,
                ইন্টারনেটের মাধ্যমে ডেটা আদান-প্রদান কখনোই $100\%$ নিরাপদ নয়।
              </p>
            </section>

            {/* Your Rights - ৬. আপনার অধিকার */}
            <section>
              <h2
                className={`text-3xl font-bold text-green-700 mb-5 border-b pb-3 border-gray-100`}
              >
                ৬. আপনার অধিকার
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-justify">
                আপনার তথ্যের বিষয়ে আপনার নিম্নলিখিত অধিকার রয়েছে, যা আপনি
                আমাদের সাথে যোগাযোগ করে প্রয়োগ করতে পারেন:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4 text-lg text-justify">
                <li>
                  আপনার ব্যক্তিগত ডেটা অ্যাক্সেস এবং পর্যালোচনা করার অধিকার।
                </li>
                <li>
                  ভুল বা অসম্পূর্ণ ডেটা সংশোধন করার অনুরোধ জানানোর অধিকার।
                </li>
                <li>
                  আইনগতভাবে প্রযোজ্য হলে আপনার তথ্য মুছে ফেলার অনুরোধ জানানোর
                  অধিকার।
                </li>
                <li>আপনার ডেটা প্রক্রিয়াকরণে আপত্তি জানানোর অধিকার।</li>
              </ul>
            </section>

            {/* Changes to Policy - ৭. নীতিতে পরিবর্তন */}
            <section>
              <h2
                className={`text-3xl font-bold text-green-700 mb-5 border-b pb-3 border-gray-100`}
              >
                ৭. নীতিতে পরিবর্তন
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-justify">
                আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। নীতিতে কোনো
                পরিবর্তন হলে, আমরা এই পৃষ্ঠায় নতুন নীতি পোস্ট করে এবং "সর্বশেষ
                আপডেট" তারিখ আপডেট করে আপনাকে অবহিত করব। গুরুত্বপূর্ণ
                পরিবর্তনগুলোর জন্য আমরা একটি স্পষ্ট বিজ্ঞপ্তি প্রদান করব।
                পরিবর্তনগুলো পোস্ট করার পর তা কার্যকর হবে।
              </p>
            </section>

            {/* Contact - ৮. আমাদের সাথে যোগাযোগ করুন */}
            <section>
              <h2
                className={`text-3xl font-bold text-green-700 mb-5 border-b pb-3 border-gray-100`}
              >
                ৮. আমাদের সাথে যোগাযোগ করুন
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-justify">
                যদি এই গোপনীয়তা নীতি বা আমাদের ডেটা অনুশীলন সম্পর্কে আপনার কোন
                প্রশ্ন থাকে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন:
              </p>
              <div
                className={`mt-6 p-6 bg-green-50 rounded-xl border border-green-200 shadow-inner`}
              >
                <p
                  className={`text-green-800 text-lg text-justify space-y-1`}
                >
                  <strong>ইমেইল:</strong> team@agri-smart.com
                  <br />
                  <strong>ফোন:</strong> +৮৮০ ১৯৩৮৪৭৫০০০
                  <br />
                  <strong>ঠিকানা:</strong>  কৃষি জোন, ঢাকা,
                  বাংলাদেশ
                </p>
              </div>
            </section>
          </div>

         
        </div>
      </div>
    </div>
  );
}
