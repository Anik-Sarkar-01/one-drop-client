import React from 'react';
import { BsDropletFill } from "react-icons/bs";
import { Link } from 'react-router-dom';


const JoinUs = () => {
    return (
        <div className='bg-base-200 w-full xl:w-6xl mx-auto text-center px-16 py-24 mt-20 space-y-4'>
            <div className='flex justify-center'>
                <BsDropletFill className='text-red-500 text-5xl'/>
            </div>
            <h1 className='text-3xl md:text-4xl font-bold text-red-500'>
                Be the Reason Someone Smiles Today
            </h1>
            <h4 className='text-sm md:text-lg leading-loose'>
                Your blood donation can make a difference in emergencies, surgeries, and for those battling chronic illnesses.
                With thousands of donation centers across the globe, giving hope has never been this easy.
            </h4>
            <Link to={"/register"} className='btn btn-md md:btn-lg w-40 bg-red-500 text-white'>JOIN US</Link>
        </div>
    );
};

export default JoinUs;