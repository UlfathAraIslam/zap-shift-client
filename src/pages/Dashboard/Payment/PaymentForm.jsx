import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams } from "react-router";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const {parcelId} = useParams();
  console.log(parcelId);

  const [error, setError] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message)
    } else {
      setError('');
      console.log("payment method", paymentMethod);
    }
  };
  return (
    <div>
      <form className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto" onSubmit={handleSubmit}>
        <CardElement className="p-3 border rounded"/>
          <button
            className="btn btn-primary w-full text-black"
            type="submit"
            disabled={!stripe}
          >
            Pay For Prcel Pickup
          </button>
          {
            error && <p className="text-red-500">{error}</p>
          }
      </form>
    </div>
  );
};

export default PaymentForm;
