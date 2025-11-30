"use client";
import React, { useState } from "react";
import {
  FaPaperPlane,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

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

    await new Promise((resolve) => setTimeout(resolve, 800));

    // console.log(formData);
    alert("ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে।");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100/50 py-16 px-4 md:px-20 lg:px-0">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <div className="bg-white rounded-2xl p-8 border border-green-100 h-[600px] flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold font-hind text-gray-800 mb-2">
                  <span className="text-green-600">যোগাযোগ</span> করুন
                </h1>
                <p className="text-md text-gray-600 font-hind leading-relaxed">
                  আপনার প্রশ্ন, মতামত বা পরামর্শ আমাদের কাছে গুরুত্বপূর্ণ। আমরা
                  সর্বদা আপনার সেবায় প্রস্তুত।
                </p>
              </div>

              <div className="space-y-4 lg:space-y-4 md:space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  যোগাযোগের তথ্য
                </h3>

                <div className="bg-green-50 rounded-lg p-5 border border-green-200 hover:bg-green-100 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">ফোন নম্বর</h3>
                      <p className="text-green-700 font-medium">
                        +৮৮০ ১৬৩৪ ৫৬৭৮৯০
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-5 border border-green-200 hover:bg-green-100 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">ইমেইল</h3>
                      <p className="text-green-700 font-medium">
                        support@agrismart.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-5 border border-green-200 hover:bg-green-100 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaMapMarkerAlt className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">ঠিকানা</h3>
                      <p className="text-green-700 font-medium">
                        ঢাকা, বাংলাদেশ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                সামাজিক যোগাযোগ
              </h3>
              <div className="flex gap-3">
                {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map(
                  (Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center border border-green-200 hover:bg-green-200 transition-all duration-300"
                    >
                      <Icon className="text-green-600 text-lg" />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl p-8  border border-green-100 h-[600px]">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              বার্তা পাঠান
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                    placeholder="আপনার পুরো নাম লিখুন"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    ইমেইল ঠিকানা *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  বিষয় *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                  placeholder="বার্তার বিষয় লিখুন"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  আপনার বার্তা *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300 resize-none"
                  placeholder="আপনার বিস্তারিত বার্তা লিখুন..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    পাঠানো হচ্ছে...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-lg" />
                    বার্তা পাঠান
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 bg-green-50 rounded-lg p-5 border border-green-100 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-700 font-medium">
              সাধারণত ২৪ ঘন্টার মধ্যে উত্তর প্রদান
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
