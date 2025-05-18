import React from 'react';
import bgImage from "../../../assets/bgImage.jpg"
import featuredImage from "../../../assets/featuredImage.jpg"
import useFeaturedDonors from '../../../hooks/useFeaturedDonors';
import { RiDoubleQuotesL } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { Autoplay, Pagination } from 'swiper/modules';

const FeaturedDonors = () => {
    const { featuredDonors = [] } = useFeaturedDonors();

    return (
        <div className='mt-24 mb-[700px] md:mb-80'>
            <div
                className='h-40 md:h-lvh bg-cover relative'
                style={{
                    backgroundImage: `url(${bgImage})`,
                }}
            >
                <div className="hero-overlay"></div>
                <div className='absolute top-1/2 left-10 md:top-1/12 md:left-2/6 xl:top-1/4 xl:left-2/5 space-y-3'>
                    <h1 className='text-4xl font-bold text-white text-center uppercase border-b-4 border-b-red-500'>Featured Heroes</h1>
                </div>
                <div className='flex flex-col md:flex-row md:w-3xl lg:w-4xl xl:w-6xl mx-auto md:top-48 lg:top-72 xl:top-80 md:left-5 lg:left-14 xl:left-44 md:absolute shadow'>
                    <div className='md:w-1/2 bg-base-200 py-8'>
                        {(featuredDonors.length > 0) && (
                            <Swiper
                                style={{
                                    '--swiper-pagination-color': '#FB2C36',
                                    "--swiper-pagination-bullet-size": "12px",
                                }}
                                loop={true}
                                autoplay={{
                                    delay: 4000,
                                }}
                                pagination={{
                                    dynamicBullets: true,
                                    clickable: true,
                                }}
                                modules={[Autoplay, Pagination]}
                                className="mySwiper"
                            >
                                {featuredDonors.map(donor =>
                                    <SwiperSlide key={donor._id}>
                                        <div className="text-justify px-6 md:px-16 space-y-5">
                                            <h2 className="text-xl text-left leading-relaxed font-bold text-red-500 uppercase">
                                                <span className='text-5xl'><RiDoubleQuotesL /></span> {donor?.quote}
                                            </h2>
                                            <p className="text-[16px] leading-loose">
                                                {donor?.story}
                                            </p>

                                            <div className="flex flex-col gap-5">
                                                <div className="avatar">
                                                    <div className="ring-red-500 ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2">
                                                        <img src={donor?.image} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold">{donor?.name}</h3>
                                                    <p className="text-sm text-gray-500 uppercase">{donor?.city}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        )}
                    </div>
                    <div className='w-1/2'>
                        <img className='object-cover h-full hidden md:block' src={featuredImage} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedDonors;
