"use client";
import React from "react";

const FeatureBtn = ({ service, onOpenModal }) => {
  return (
    <div>
      <button
        onClick={() => onOpenModal(service)}
        className="mt-1 font-semibold font-hind text-primary transition-colors duration-300 cursor-pointer  group-hover:text-secondary"
      >
        আরও জানুন &rarr;
      </button>
    </div>
  );
};

export default FeatureBtn;
