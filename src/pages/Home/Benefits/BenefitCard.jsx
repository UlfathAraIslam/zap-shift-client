import React from "react";

const BenefitCard =  ({benefit}) => {
const { image, title, description } = benefit;

  return (
    <div className="fade-in flex flex-col md:flex-row items-center gap-6 md:gap-10">
      {/* Illustration */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={image}
          alt={title}
          className="w-[200px] h-[200px] object-contain"
        />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px h-40 border-l-2 border-dashed border-gray-300"></div>

      {/* Text */}
      <div className="w-full md:w-2/3">
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">
          {title}
        </h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
