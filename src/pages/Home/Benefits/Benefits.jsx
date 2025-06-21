import React from "react";
import liveTrackingImg from '../../../assets/live-tracking.png';
import safeDeliveryImg from '../../../assets/safe-delivery.png';
import BenefitCard from "./BenefitCard";


const benefits = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: liveTrackingImg,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safeDeliveryImg,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: safeDeliveryImg,
  },
];

const Benefits = () => {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        {benefits.map((benefit, index) => (
          <BenefitCard
          key={index}
          benefit= {benefit}
          />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
