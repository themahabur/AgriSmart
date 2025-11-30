"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaQuoteLeft, FaLeaf, FaTractor, FaSeedling } from "react-icons/fa";
import Image from "next/image";

const FarmerReview = () => {
  const reviews = [
    {
      id: 1,
      name: "রহিম",
      location: "রংপুর",
      photo:
        "https://t4.ftcdn.net/jpg/05/20/54/19/360_F_520541964_wQvxsiVoX2or8g4D3ZyZOUTyw0wtMkd9.jpg",
      review: {
        bn: "AgriSmart আমার চাষের ধরন সম্পূর্ণ পরিবর্তন করেছে।",
        en: "AgriSmart transformed my farming style completely.",
      },
      rating: 5,
      experience: "৩ বছর",
      icon: <FaTractor className="text-green-500" />,
    },
    {
      id: 2,
      name: "করিম",
      location: "বগুড়া",
      photo:
        "https://t4.ftcdn.net/jpg/05/20/54/19/360_F_520541964_wQvxsiVoX2or8g4D3ZyZOUTyw0wtMkd9.jpg",
      review: {
        bn: "ফসলের উৎপাদন ৪০% বেড়েছে।",
        en: "My crop yield increased by 40%.",
      },
      rating: 4,
      experience: "২ বছর",
      icon: <FaSeedling className="text-green-500" />,
    },
    {
      id: 3,
      name: "সালমা",
      location: "ঝিনাইদহ",
      photo:
        "https://www.wfp.org/sites/default/files/styles/open_graph_image/public/2022-03/WF1429688_BGD_20220111_WFP_Sayed-Asif-Mahmud__DSC7634.jpg?itok=zKjYZtby",
      review: {
        bn: "Weather alerts-এর জন্য ফসল রক্ষা পেয়েছে।",
        en: "Weather alerts saved my crops multiple times.",
      },
      rating: 5,
      experience: "১.৫ বছর",
      icon: <FaLeaf className="text-green-500" />,
    },
    {
      id: 4,
      name: "আফিয়া বেগম",
      location: "কুষ্টিয়া",
      photo:
        "https://www.ifpri.org/wp-content/uploads/2017/10/bangladesh_fish_farmer.jpg",
      review: {
        bn: "পরামর্শগুলো খুব কার্যকর এবং বাস্তবসম্মত।",
        en: "The advice was very effective and practical.",
      },
      rating: 5,
      experience: "২ বছর",
      icon: <FaTractor className="text-green-500" />,
    },
    {
      id: 5,
      name: "জব্বার",
      location: "পাবনা",
      photo:
        "https://t4.ftcdn.net/jpg/05/20/54/19/360_F_520541964_wQvxsiVoX2or8g4D3ZyZOUTyw0wtMkd9.jpg",
      review: {
        bn: "চাষের খরচ ৩০% কমেছে।",
        en: "Reduced my farming expenses by 30%.",
      },
      rating: 4,
      experience: "৩ বছর",
      icon: <FaSeedling className="text-green-500" />,
    },
    {
      id: 6,
      name: "সালিম",
      location: "নাটোর",
      photo:
        "https://t4.ftcdn.net/jpg/05/20/54/19/360_F_520541964_wQvxsiVoX2or8g4D3ZyZOUTyw0wtMkd9.jpg",
      review: {
        bn: "ফসলের মান অনেক উন্নত হয়েছে।",
        en: "The quality of my crops improved significantly.",
      },
      rating: 5,
      experience: "২.৫ বছর",
      icon: <FaLeaf className="text-green-500" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-amber-50 relative overflow-hidden">
      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 p-2 rounded-full mb-4">
            <FaQuoteLeft className="text-sm" />
            <span className="font-semibold">কৃষকদের কথা</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            আমাদের <span className="text-green-600">কৃষক ভাইবোনদের</span>{" "}
            অভিজ্ঞতা
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AgriSmart ব্যবহার করে কৃষকরা কী বলছেন, জেনে নিন তাদের সফলতার গল্প।
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active",
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="group h-full flex">
                <div className="bg-white backdrop-blur-lg border border-green-200 rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 relative w-full h-[300px] flex flex-col justify-between">
                  {/* Farmer Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full p-0.5">
                        <div className="w-full h-full bg-white rounded-full p-1">
                          <Image
                            src={review.photo}
                            width={56}
                            height={56}
                            alt={review.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full text-xs">
                        {review.icon}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {review.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{review.location}</span>
                        <span>•</span>
                        <span>{review.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="flex-1 mt-4 mb-4">
                    <p className="text-gray-700 text-lg leading-relaxed mb-3 font-bangla line-clamp-3">
                      "{review.review.bn}"
                    </p>
                    <p className="text-gray-500 text-sm italic">
                      "{review.review.en}"
                    </p>
                  </div>

                  {/* Rating + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < review.rating
                              ? "text-yellow-400 drop-shadow-sm"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                      AgriSmart User
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation + Pagination */}
        <div className="flex items-center justify-center mt-10 max-w-[100px] mx-5">
          <button className="custom-prev bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="custom-pagination flex gap-2"></div>

          <button className="custom-next bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FarmerReview;
