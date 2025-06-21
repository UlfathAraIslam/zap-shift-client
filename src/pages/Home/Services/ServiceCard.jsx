import React from "react";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;

  return (
    <div className="card bg-base-100 shadow-md border transition duration-300 group hover:bg-[#CAEB66] hover:border-[#CAEB66]">
      <div className="card-body items-center text-center">
        <Icon className="text-4xl text-primary mb-4 transition-colors duration-300 group-hover:text-[#FFFF]" />

        <h3 className="card-title text-lg font-bold transition-colors duration-300 group-hover:text-[#03373D]">
          {title}
        </h3>

        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
