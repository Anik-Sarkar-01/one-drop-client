import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedDonors from '../FeaturedDonors/FeaturedDonors';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedDonors></FeaturedDonors>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;