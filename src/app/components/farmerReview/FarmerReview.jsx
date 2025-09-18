"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const FarmerReview = () => {
  const reviews = [
    {
      id: 1,
      name: "রহিম",
      photo: "/farmers/rahim.jpg",
      review: {
        bn: " আমার চাষের ধরন পরিবর্তন করেছে।",
        en: "AgriSmart transformed my farming style.",
      },
      rating: 5,
    },
    {
      id: 2,
      name: "করিম",
      photo: "/farmers/karim.jpg",
      review: {
        bn: "ফসলের উৎপাদন অনেক বেড়েছে।",
        en: "My crop yield increased significantly.",
      },
      rating: 4,
    },
    {
      id: 3,
      name: "সালমা",
      photo: "/farmers/salma.jpg",
      review: {
        bn: "Weather alerts-এর জন্য ধন্যবাদ।",
        en: "Thanks for the weather alerts.",
      },
      rating: 5,
    },
    {
      id: 4,
      name: "আফিয়া বেগম",
      photo: "/farmers/afrin.jpg",
      review: {
        bn: "পরামর্শগুলো খুব কার্যকর।",
        en: "The advice was very effective.",
      },
      rating: 5,
    },
    {
      id: 5,
      name: "জব্বার",
      photo: "/farmers/meherab.jpg",
      review: {
        bn: "চাষের খরচ কমেছে।",
        en: "Reduced my farming expenses.",
      },
      rating: 4,
    },
    {
      id: 6,
      name: "সালিম",
      photo: "/farmers/salim.jpg",
      review: {
        bn: "ফসলের মান অনেক উন্নত হয়েছে।",
        en: "The quality of my crops improved a lot.",
      },
      rating: 5,
    },
    {
      id: 7,
      name: "ফারহানা",
      photo: "/farmers/farhana.jpg",
      review: {
        bn: "Expert advice এর জন্য ধন্যবাদ।",
        en: "Thanks for the expert advice.",
      },
      rating: 4,
    },
  ];

  return (
    <section className="py-12 bg-gray-50 px-4 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          কৃষক রিভিউ
        </h2>

        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-center justify-between w-full text-center min-h-[300px]">
                <Image
                  src="/userLogo.jpg"
                  width={400}
                  height={400}
                  alt={review.name}
                  className="w-20 h-20 rounded-full object-cover mb-3"
                />
                <h3 className="font-semibold text-gray-800">{review.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{review.review.bn}</p>
                <p className="text-sm text-gray-500 italic mb-2">
                  {review.review.en}
                </p>

                {/* Star Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FarmerReview;
