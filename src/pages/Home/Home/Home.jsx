import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../Services/Services';
import ClientLogos from '../ClientLogos/ClientLogos';
import FeatureRows from '../Benefits/Benefits';
import BeMerchant from '../BeMerchant/BeMerchant';
import CustomersReviews from '../CustomersReviews/CustomersReviews';
import FAQ from '../FAQ/FAQ';

const Home = () => {
    return (
        <div>
            <Banner/>
            <OurServices/>
            <ClientLogos/>
            <FeatureRows/>
            <BeMerchant/>
            <CustomersReviews/>
            <FAQ/>
        </div>
    );
};

export default Home;