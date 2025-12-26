import React from 'react';
import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const serviceCenters = useLoaderData();
    console.log(serviceCenters);
    return (
        <div className="min-h-screen bg-base-100 p-6">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="mt-2 text-3xl font-bold text-center text-gray-500">
          We are available in all 64 districts of Bangladesh
        </h1>
      </div>

      {/* Map Section */}
      <BangladeshMap serviceCenters={serviceCenters}/>
    </div>
    );
};

export default Coverage;