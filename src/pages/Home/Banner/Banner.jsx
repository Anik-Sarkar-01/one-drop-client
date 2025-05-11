import React from 'react';
import bannerImg from "../../../assets/banner-image.jpg"

const Banner = () => {

    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage:
                    `url(${bannerImg})`,
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-left">
                <div className="max-w-5xl flex flex-col">
                    <h1 className="mb-5 text-[40px] font-semibold text-left"> OneDrop - Connecting Blood Donors and Recipients to Save Lives, One Drop at a Time!</h1>
                    <p className='mb-5 text-lg max-w-4xl'>Be a hero in someone's story. Join our trusted network to donate or request blood quickly, easily, and securely.</p>
                    <div className='flex gap-3'>
                        <button className="btn btn-primary">Join as a donor</button>
                        <button className="btn btn-primary">Search Donors</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;