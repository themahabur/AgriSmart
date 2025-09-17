import React from "react";

const FarmerReview = () => {
  const reviews = [
    {
      id: 1,
      name: "রহিম",
      photo: "/farmers/rahim.jpg",
      review: {
        bn: "AgriSmart আমার চাষের ধরন পরিবর্তন করেছে।",
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
      name: "আফরিন",
      photo: "/farmers/afrin.jpg",
      review: {
        bn: "পরামর্শগুলো খুব কার্যকর।",
        en: "The advice was very effective.",
      },
      rating: 5,
    },
    {
      id: 5,
      name: "মেহেরাব",
      photo: "/farmers/meherab.jpg",
      review: {
        bn: "চাষের খরচ কমেছে।",
        en: "Reduced my farming expenses.",
      },
      rating: 4,
    },
  ];
  return <div></div>;
};

export default FarmerReview;
