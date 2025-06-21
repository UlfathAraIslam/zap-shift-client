import React from "react";
import locationMerchant from "../../../assets/location-merchant.png";
// import merchantBg from "../../../assets/be-a-merchant-bg.png";

const BeMerchant = () => {
  return (
    <div data-aos="zoom-in-up" className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] p-20 rounded-4xl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={locationMerchant}
        />
        <div>
          <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
          <p className="py-6">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn btn-primary text-black rounded-full">Become A Merchant</button>
          <button className="btn btn-outline btn-primary rounded-full">Earn with Profast Courier</button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
