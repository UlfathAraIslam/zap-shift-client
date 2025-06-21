import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../Services/Services';
import ClientLogos from './ClientLogos/ClientLogos';

const Home = () => {
    return (
        <div>
            <Banner/>
            <OurServices/>
            <ClientLogos/>
        </div>
    );
};

export default Home;