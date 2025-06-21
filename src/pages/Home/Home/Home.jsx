import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../Services/Services';
import ClientLogos from '../ClientLogos/ClientLogos';
import FeatureRows from '../Benefits/Benefits';
import BeMerchant from '../BeMerchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner/>
            <OurServices/>
            <ClientLogos/>
            <FeatureRows/>
            <BeMerchant/>
        </div>
    );
};

export default Home;