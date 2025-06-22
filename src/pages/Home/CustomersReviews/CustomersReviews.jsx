import React, { useState, useEffect } from "react"; // add useEffect
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReviewCard from "./ReviewCard";
import CustomerTop from "../../../assets/customer-top.png";

const reviews = [
  {
    id: 1,
    review: "Posture Pro changed my life! I feel pain-free and confident every day.",
    name: "Aiko Tanaka",
    profession: "Yoga Instructor",
    image: "https://i.ibb.co/KXnLLvX/pexels-photo-3785110.jpg",
  },
  {
    id: 2,
    review: "Best posture support ever. Super comfy and highly effective!",
    name: "John Carter",
    profession: "Fitness Coach",
    image: "https://i.ibb.co/kXpNLMP/pexels-photo-3812011.jpg",
  },
  {
    id: 3,
    review: "I was skeptical at first but it's the real deal!",
    name: "Sarah Kim",
    profession: "Physiotherapist",
    image: "https://i.ibb.co/8s2dVHT/pexels-photo-10031556.jpg",
  },
  {
    id: 4,
    review: "Back pain gone! I wear it while working and it feels great.",
    name: "Emily Zhang",
    profession: "Office Worker",
    image: "https://i.ibb.co/NWgDfmj/pexels-photo-1239288.jpg",
  },
  {
    id: 5,
    review: "Solid build, great service, and it works!",
    name: "Michael Lee",
    profession: "Nurse",
    image: "https://i.ibb.co/19nQx2f/pexels-photo-220453.jpg",
  },
];

const CustomersReviews = () => {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  const prev = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  const visible = [current, (current + 1) % total, (current - 1 + total) % total];

  // ✅ Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 3000); // every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [total]);

  return (
    <section className="py-12 max-w-7xl mx-auto text-center px-4 md:px-8">
      {/* Illustration */}
      <img
        src={CustomerTop}
        alt="Illustration"
        className="mx-auto mb-6 w-32 h-32 object-contain"
      />

      {/* Section Title + Paragraph */}
      <h2 className="text-3xl font-bold mb-2 text-primary">What our customers are saying</h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      {/* Cards Section */}
      <div className="flex justify-center gap-12 mb-6 flex-wrap">
        {reviews.map((item, index) => {
          const isCenter = index === current;
          const isVisible = visible.includes(index);
          return (
            isVisible && (
              <ReviewCard key={item.id} review={item} isCenter={isCenter} />
            )
          );
        })}
      </div>

      {/* Arrows + Pagination Dots */}
      <div className="flex items-center justify-center gap-4 mt-14">
        <button
          onClick={prev}
          className="text-2xl text-gray-400 hover:text-primary"
        >
          <IoIosArrowBack />
        </button>

        <div className="flex gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === current ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="text-2xl text-gray-400 hover:text-primary"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  );
};

export default CustomersReviews;
