import React from 'react';
import Lottie from "lottie-react";
import contactAnimation from "../../../assets/animation/contactAnimation.json"
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import Swal from 'sweetalert2'


const ContactUs = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire("Thanks for your message. We will contact you soon.");
        e.target.reset();
    }

    return (
        <div className='flex flex-col gap-10 lg:flex-row items-center w-full lg:w-4xl xl:w-6xl mx-auto shadow px-20 py-10 mb-20'>
            <div className='w-full md:w-1/2 space-y-5'>
                <h1 className='text-3xl font-semibold text-red-500 border-b-4 pb-1 w-fit'>Say Hello To Us</h1>
                <p className='font-semibold text-xl'>How can we help?</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 space-y-5'>
                    <input type="text" required placeholder="Enter your name" className="input w-full input-md bg-red-500/10 border-none  focus:outline-none" />
                    <input type="text" required placeholder="Enter your email address" className="input w-full input-md bg-red-500/10 border-none focus:outline-none" />
                    <textarea placeholder="Type your message..." required className="textarea w-full textarea-md bg-red-500/10 border-none focus:outline-none"></textarea>
                    <button className="btn w-full btn-xs sm:btn-sm md:btn-md bg-red-500 text-white">Submit</button>
                </form>
            </div>
            <div className='w-full md:w-1/2 flex flex-col items-center'>
                <Lottie className='w-sm xl:w-md' animationData={contactAnimation} loop={true} />
                <div className='flex flex-col gap-5'>
                    <div className='flex items-center gap-3'>
                        <p className='border-2 p-3 rounded-full text-red-500'><FaLocationDot /></p>
                        <p>Mirpur 10, Dhaka, Bangladesh</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p className='border-2 p-3 rounded-full text-red-500'><FaPhoneAlt /></p>
                        <p> Mirpur 10, Dhaka, Bangladesh</p></div>
                    <div className='flex items-center gap-3'>
                        <p className='border-2 p-3 rounded-full text-red-500'><IoMdMailUnread /></p>
                        <p>Mirpur 10, Dhaka, Bangladesh</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;