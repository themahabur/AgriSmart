import Link from "next/link";
import React from "react";
import FeatureBtn from "./FeatureBtn";

const SingleFeatureCard = ({ service, onOpenModal }) => {
  return (
    <div
      className="bg-[#f7fff842] p-8 rounded-xl w-full
                         border-1 border-[#daffde] hover:border-x-0 hover:border-t-2 hover:border-t-green-600
                         flex flex-col text-center
                         transition-all duration-300 ease-in-out
                         hover:-translate-y-2 group"
    >
      <div className="mb-5 mx-auto bg-green-50 p-6 rounded-full">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold font-hind text-gray-900 mb-3">
        {service.title}
      </h3>
      <p className="text-gray-600 font-hind leading-relaxed flex-grow">
        {service.description}
      </p>
      {/* Action Link  */}
      <FeatureBtn service={service} onOpenModal={onOpenModal} />
    </div>
  );
};

export default SingleFeatureCard;