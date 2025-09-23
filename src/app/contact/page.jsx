"use client";
import React, { useState } from "react";
import { FaPaperPlane, FaLeaf } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log(formData);
    alert("ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে।");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section className="min-h-screen bg-white py-16 px-4">
      {/* Unique Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-block mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <FaLeaf className="text-3xl text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          কথা বলুন
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Unique Visual Element */}
          <div className="relative">
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-200 rounded-full opacity-60"></div>
            <div className="absolute top-1/2 -right-4 w-6 h-6 bg-blue-200 rounded-full opacity-60"></div>
            <div className="absolute bottom-4 left-1/4 w-10 h-10 bg-yellow-200 rounded-full opacity-40"></div>
            
            {/* Main Visual */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border-2 border-dashed border-green-200">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg border">
                  <FaPaperPlane className="text-4xl text-green-600" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-800">সরাসরি যোগাযোগ</h3>
                  <p className="text-gray-600">আমরা ২৪ ঘন্টার মধ্যে উত্তর দেই</p>
                </div>

                {/* Contact Points */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>+৮৮০ ১৬৩৪ ৫৬৭৮৯০</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>support@agrismart.com</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span>ঢাকা, বাংলাদেশ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unique Form Design */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className="w-full pt-6 pb-2 px-4 border-b-2 border-gray-300 focus:border-green-500 outline-none text-lg bg-transparent transition-all duration-300"
                required
              />
              <label className="absolute top-2 left-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none">
                আপনার নাম
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-focus-within:w-full"></div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className="w-full pt-6 pb-2 px-4 border-b-2 border-gray-300 focus:border-green-500 outline-none text-lg bg-transparent transition-all duration-300"
                required
              />
              <label className="absolute top-2 left-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none">
                ইমেইল ঠিকানা
              </label>
            </div>

            {/* Subject Field */}
            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder=" "
                className="w-full pt-6 pb-2 px-4 border-b-2 border-gray-300 focus:border-green-500 outline-none text-lg bg-transparent transition-all duration-300"
                required
              />
              <label className="absolute top-2 left-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none">
                বিষয়
              </label>
            </div>

            {/* Message Field */}
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                rows={4}
                className="w-full pt-6 pb-2 px-4 border-b-2 border-gray-300 focus:border-green-500 outline-none text-lg bg-transparent transition-all duration-300 resize-none"
                required
              ></textarea>
              <label className="absolute top-2 left-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none">
                আপনার বার্তা
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative overflow-hidden bg-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-600 transition-all duration-300 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    পাঠানো হচ্ছে...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    বার্তা পাঠান
                  </>
                )}
              </span>
              
              {/* Button Hover Effect */}
              <div className="absolute inset-0 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </form>
        </div>

        {/* Unique Footer Note */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>সাধারণত ২৪ ঘন্টার মধ্যে উত্তর</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        input:focus + label,
        textarea:focus + label,
        input:not(:placeholder-shown) + label,
        textarea:not(:placeholder-shown) + label {
          transform: translateY(-20px) scale(0.8);
          color: #10b981;
        }
      `}</style>
    </section>
  );
}