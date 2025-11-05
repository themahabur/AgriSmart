import React from "react";
import { FaCheckCircle, FaExclamationTriangle, FaLightbulb } from "react-icons/fa";

const FeatureModal = ({ service, onClose }) => {
  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Enhanced service details with more content
  const enhancedServiceDetails = {
    1: {
      benefits: [
        "দ্রুত রোগ শনাক্তকরণ - 95% নির্ভুলতা",
        "তাৎক্ষণিক সমাধান প্রস্তাবনা",
        "বাংলাদেশের সকল ফসলের জন্য কার্যকর",
        "ব্যবহারের জন্য কোনো প্রযুক্তিগত দক্ষতা প্রয়োজন নেই"
      ],
      process: [
        "ফসলের পাতা/গাছের ছবি তুলুন",
        "আমাদের এআই সিস্টেম ছবি বিশ্লেষণ করবে",
        "রোগ/পোকামাকড় শনাক্ত করে সমাধান প্রদান করা হবে",
        "প্রয়োজনে বিশেষজ্ঞের পরামর্শ নিন"
      ],
      tips: "সঠিক ফলাফলের জন্য পরিষ্কার আলোয় ছবি তোলা এবং প্রভাবিত অংশটি স্পষ্টভাবে ধরা দেখানো প্রয়োজন।"
    },
    2: {
      benefits: [
        "বাংলায় সহজ ভাষায় বিস্তারিত টিউটোরিয়াল",
        "অভিজ্ঞ কৃষকদের বাস্তব অভিজ্ঞতা",
        "ভিডিও টিউটোরিয়াল এবং ধাপে ধাপে গাইডলাইন",
        "নতুন কৃষি প্রযুক্তি সম্পর্কে আপডেট"
      ],
      process: [
        "আপনার ফসল নির্বাচন করুন",
        "প্রয়োজনীয় টিউটোরিয়াল খুঁজে বার করুন",
        "ভিডিও দেখে শিখুন বা ব্লগ পড়ুন",
        "প্রশ্ন করতে পারেন বিশেষজ্ঞদের"
      ],
      tips: "নিয়মিত ভিজিট করুন জ্ঞান হাব সেকশন নতুন তথ্য এবং টিউটোরিয়াল পেতে।"
    },
    3: {
      benefits: [
        "২৪/৭ কৃষি বিষয়ক প্রশ্নের উত্তর",
        "তাৎক্ষণিক সহায়তা বাংলায়",
        "ছবি আপলোড করে পরামর্শ নেওয়া যাবে",
        "বাংলাদেশের কৃষি বিষয়ক বিশেষ জ্ঞান"
      ],
      process: [
        "এআই চ্যাটবট পেজে যান",
        "আপনার প্রশ্ন লিখুন বা ছবি আপলোড করুন",
        "তাৎক্ষণিক উত্তর পান বট থেকে",
        "প্রয়োজনে বিশেষজ্ঞের পরামর্শ নিন"
      ],
      tips: "যতটা সম্ভব বিস্তারিতভাবে প্রশ্ন করুন এবং প্রাসঙ্গিক ছবি আপলোড করুন ভালো ফলাফলের জন্য।"
    },
    4: {
      benefits: [
        "অভিজ্ঞ কৃষকদের সাফল্যের গল্প",
        "বিভিন্ন অঞ্চলের চাষাবাদের অভিজ্ঞতা",
        "সমস্যা ও সমাধানের বিস্তারিত বিবরণ",
        "পারস্পরিক যোগাযোগের মাধ্যমে নতুন ধারণা"
      ],
      process: [
        "কমিউনিটি ফোরামে প্রবেশ করুন",
        "আপনার প্রশ্ন করুন বা অভিজ্ঞতা শেয়ার করুন",
        "অন্য কৃষকদের পরামর্শ পড়ুন",
        "বিশেষজ্ঞদের পরামর্শ নিন"
      ],
      tips: "অভিজ্ঞতা শেয়ার করতে লজ্জা পাবেন না, আপনার জ্ঞান অন্যদের জন্য উপকারী হতে পারে।"
    },
    5: {
      benefits: [
        "বাংলাদেশের সেরা কৃষি বিশেষজ্ঞদের সাথে সরাসরি যোগাযোগ",
        "চিকিৎসকের মতো ফসলের রোগ নির্ণয় ও সমাধান",
        "ব্যক্তিগত পরামর্শ এবং কাউন্সেলিং",
        "নির্দিষ্ট সময়ে ভিডিও কলের মাধ্যমে পরামর্শ"
      ],
      process: [
        "বিশেষজ্ঞ নির্বাচন করুন",
        "সুবিধাজনক সময় নির্ধারণ করুন",
        "ভিডিও কল বা চ্যাটের মাধ্যমে পরামর্শ নিন",
        "প্রয়োজনে ফলো-আপ করুন"
      ],
      tips: "পরামর্শের সময় আপনার ফসলের ছবি এবং সমস্যা সম্পর্কে বিস্তারিত জানান।"
    }
  };

  const details = enhancedServiceDetails[service.serviceId] || {
    benefits: ["বিস্তারিত তথ্য পরবর্তীতে যোগ করা হবে"],
    process: ["বিস্তারিত পদক্ষেপ পরবর্তীতে যোগ করা হবে"],
    tips: "বিস্তারিত টিপস পরবর্তীতে যোগ করা হবে"
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header with title */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white">{service.title}</h1>
              <p className="text-green-100 mt-2">{service.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl font-light"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Modal content */}
        <div className="p-6 space-y-6">
          {/* Benefits Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              সুবিধাসমূহ
            </h2>
            <ul className="space-y-2">
              {details.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaLightbulb className="text-amber-500 mr-2" />
              কিভাবে ব্যবহার করবেন
            </h2>
            <ol className="space-y-3">
              {details.process.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips Section */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <h2 className="text-lg font-bold text-amber-800 mb-2 flex items-center">
              <FaExclamationTriangle className="mr-2" />
              গুরুত্বপূর্ণ টিপস
            </h2>
            <p className="text-amber-700">{details.tips}</p>
          </div>
        </div>

        {/* Close button */}
        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all duration-300 font-medium"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;