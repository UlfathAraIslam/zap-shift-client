import React from "react";
import { FaMapMarkedAlt, FaMoneyBillWave, FaWarehouse, FaHandshake } from "react-icons/fa";

const steps = [
  {
    title: "Booking Pick & Drop",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: FaMapMarkedAlt,
  },
  {
    title: "Cash On Delivery",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: FaMoneyBillWave,
  },
  {
    title: "Delivery Hub",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: FaWarehouse,
  },
  {
    title: "Booking SME & Corporate",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: FaHandshake,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-10 text-left">How it works</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-lg transition p-6 text-left"
            >
              <Icon className="text-4xl text-primary mb-4 text-left" />
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
