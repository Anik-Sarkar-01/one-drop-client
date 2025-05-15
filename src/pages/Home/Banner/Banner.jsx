import React from 'react';
import bannerImg from "../../../assets/banner-image.jpg"
import { Link } from 'react-router-dom';

const Banner = () => {

    return (
        <div
            className="hero min-h-screen border-b-4 border-red-500"
            style={{
                backgroundImage:
                    `url(${bannerImg})`,
            }}
        >
            <div className="hero-overlay "></div>
            <div className="hero-content text-neutral-content text-left">
                <div className="max-w-4xl flex flex-col">
                    <h1 className="mb-5 text-2xl md:text-3xl lg:text-5xl font-semibold text-left"> OneDrop - Connecting Blood Donors and Recipients, One Drop at a Time!</h1>
                    <p className='mb-5 text-lg max-w-4xl'>Be a hero in someone's story. Join our trusted network to donate or request blood quickly, easily, and securely.</p>
                    <div className='flex gap-3'>
                        <Link to={"/register"} className="btn md:btn-lg bg-red-500 text-white">Join as a donor</Link>
                        <Link to={"/search-donor"} className="btn md:btn-lg text-red-500 ">Search Donors</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;