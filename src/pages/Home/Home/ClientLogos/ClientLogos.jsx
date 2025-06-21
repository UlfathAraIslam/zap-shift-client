import React from 'react';
import Marquee from 'react-fast-marquee';
import amazonLogo from '../../../../assets/brands/amazon.png';
import casioLogo from '../../../../assets/brands/casio.png';
import moonstarLogo from '../../../../assets/brands/moonstar.png';
import randstadLogo from '../../../../assets/brands/randstad.png';
import startPeopleLogo from '../../../../assets/brands/start-people 1.png';
import startLogo from '../../../../assets/brands/start.png';
import amazonVectorLogo from '../../../../assets/brands/start.png';

const logos = [amazonLogo, casioLogo, moonstarLogo, randstadLogo, startPeopleLogo, startLogo, amazonVectorLogo];

const ClientLogos = () => {
  return (
    <section className="py-10 bg-base-100">
      <h2 className="text-center text-2xl text-primary font-bold mb-6">We've helped thousands of sales teams</h2>

      <Marquee
        speed={50}
        gradient={false}
        pauseOnHover={true}
        direction="left"
        className="flex items-center"
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-6">
            <img src={logo} alt={`Client ${index}`} className="h-8 w-auto object-contain" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientLogos;
