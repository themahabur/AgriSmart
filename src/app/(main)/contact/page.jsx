"use client";
import React, { useState } from "react";
import { FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-16">
      {/* Container */}
      <div className="container mx-auto px-4">
        
        {/* Main Content Grid - Left: Title, Description, Contact Info | Right: Form */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Title, Description, Contact Info, Social Links */}
          <div className="space-y-8">
            {/* Header Section */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-hind text-gray-800 mb-4">
                <span className="text-emerald-600">যোগাযোগ</span> করুন
              </h1>
              <p className="text-lg text-gray-600 font-hind leading-relaxed">
                আপনার প্রশ্ন, মতামত বা পরামর্শ আমাদের কাছে গুরুত্বপূর্ণ। আমরা সর্বদাই আপনার সেবায় প্রস্তুত আছি।
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">যোগাযোগের তথ্য</h3>
              
              {/* Phone Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100 transition-colors duration-300">
                    <FaPhone className="text-emerald-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 text-base mb-1">ফোন নম্বর</h3>
                    <p className="text-emerald-700 font-medium">+৮৮০ ১৬৩৪ ৫৬৭৮৯০</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100 transition-colors duration-300">
                    <FaEnvelope className="text-emerald-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 text-base mb-1">ইমেইল</h3>
                    <p className="text-emerald-700 font-medium">support@agrismart.com</p>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100 transition-colors duration-300">
                    <FaMapMarkerAlt className="text-emerald-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 text-base mb-1">ঠিকানা</h3>
                    <p className="text-emerald-700 font-medium">ঢাকা, বাংলাদেশ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">সামাজিক যোগাযোগ</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300">
                  <FaFacebook className="text-emerald-600 text-lg" />
                </a>
                <a href="#" className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300">
                  <FaTwitter className="text-emerald-600 text-lg" />
                </a>
                <a href="#" className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300">
                  <FaLinkedin className="text-emerald-600 text-lg" />
                </a>
                <a href="#" className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300">
                  <FaInstagram className="text-emerald-600 text-lg" />
                </a>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-emerald-700 font-medium">সাধারণত ২৪ ঘন্টার মধ্যে উত্তর প্রদান</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">বার্তা পাঠান</h3>
              
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-300"
                    placeholder="আপনার পুরো নাম লিখুন"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ইমেইল ঠিকানা *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-300"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  বিষয় *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-300"
                  placeholder="বার্তার বিষয় লিখুন"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  আপনার বার্তা *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-300 resize-none"
                  placeholder="আপনার বিস্তারিত বার্তা লিখুন..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative overflow-hidden bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 active:scale-[0.99] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      পাঠানো হচ্ছে...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-lg transform group-hover:translate-x-1 transition-transform" />
                      বার্তা পাঠান
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl animate-float"></div>
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      <div className="fixed top-1/3 right-1/3 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl animate-float animation-delay-4000"></div>
    </div>
  );
}