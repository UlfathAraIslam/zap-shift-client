import React from "react";

const faqData = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, it is designed to be adjustable and comfortable for most body types and age groups. Always check sizing guidelines.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Yes, consistent use of posture correctors can help reduce back pain and improve posture when used as recommended.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some models come with built-in vibration sensors that alert you when you slouch. Be sure to check product specifications.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You can subscribe to our back-in-stock notification by entering your email on the product page. We’ll send you an alert.",
  },
];

const FAQ = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-2 text-primary">Frequently Asked Question (FAQ)</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      <div className="flex flex-col gap-4 text-left">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow border border-base-300 rounded-lg"
          >
            <input
              type="radio"
              name="faq-accordion"
              defaultChecked={index === 0}
            />
            <div className="collapse-title text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content text-gray-600">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
