import React from 'react';
import welcomeImg from "../../assets/welcome.jpg";

const WelcomeMessage = ({heading, subheading}) => {
    
    return (
        <div
            className="hero h-[40vh]"
            style={{
                backgroundImage:
                    `url(${welcomeImg})`,
            }}
        >
            <div className="hero-overlay bg-black/65"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-lg ">
                    <h1 className="mb-5 text-2xl md:text-4xl font-bold">{heading.toUpperCase()}</h1>
                    <p className="mb-5 border-b-4 pb-3 border-red-500 font-semibold">
                        {subheading.toUpperCase()}
                    </p>
                   
                </div>
            </div>
        </div>
    );
};

export default WelcomeMessage;