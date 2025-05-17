import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedDonors from '../FeaturedDonors/FeaturedDonors';
import ContactUs from '../ContactUs/ContactUs';
import JoinUs from '../JoinUs/JoinUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <JoinUs></JoinUs>
            <FeaturedDonors></FeaturedDonors>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;