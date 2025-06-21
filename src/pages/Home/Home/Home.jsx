import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../Services/Services';
import ClientLogos from '../ClientLogos/ClientLogos';
import FeatureRows from '../Benefits/Benefits';

const Home = () => {
    return (
        <div>
            <Banner/>
            <OurServices/>
            <ClientLogos/>
            <FeatureRows/>
        </div>
    );
};

export default Home;