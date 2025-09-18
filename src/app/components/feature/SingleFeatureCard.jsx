import React from "react";

const SingleFeatureCard = ({ service }) => {
  return (
    <div
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm
                         border-t-4 border-primary
                         flex flex-col text-center
                         transition-all duration-300 ease-in-out
                         hover:shadow-xl hover:-translate-y-2 group"
    >
      <div className="mb-5">{service.icon}</div>
      <h3 className="text-xl font-bold font-hind text-gray-900 mb-3">
        {service.title}
      </h3>
      <p className="text-gray-600 font-hind leading-relaxed flex-grow">
        {service.description}
      </p>
      {/* Action Link  */}
      <a
        href={service.link}
        className="mt-6 font-semibold font-hind text-primary transition-colors duration-300
                           group-hover:text-secondary"
      >
        আরও জানুন &rarr;
      </a>
    </div>
  );
};

export default SingleFeatureCard;
