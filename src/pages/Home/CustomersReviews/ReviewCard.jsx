// src/components/ReviewCard.jsx
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review, isCenter }) => {
  const { image, name, profession, review: text } = review;

  return (
    <div
      className={`bg-base-100 p-6 w-80 rounded-xl transition-all duration-500 ${
        isCenter ? "opacity-100 scale-120 z-10 bg-white shadow-2xl  rounded-2xl" : "opacity-60 scale-95 shadow-sm"
      }`}
    >
      <FaQuoteLeft className="text-2xl text-primary mb-4 text-left" />
      <p className="text-gray-700 text-sm mb-4">{text}</p>
      <hr className="border-t border-dashed border-gray-300 mb-4" />
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="text-left">
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-gray-500">{profession}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
