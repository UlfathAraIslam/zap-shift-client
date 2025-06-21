import React from 'react';

const ServiceCard = ({ service}) => {
    const {icon: Icon, title,description} = service;
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 border">
      <div className="card-body items-center text-center">
        <Icon className="text-4xl text-primary mb-4" />
        <h3 className="card-title text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
