import React from 'react';

const DonorCard = ({ donor }) => {
    return (
        <div className="rounded-lg border border-red-500 w-80">
            <div className="py-10 flex flex-col items-center text-center space-y-3">
                <h2 className="text-xl font-bold text-red-500">{donor?.name}</h2>
                <p className='text-sm'><span className='font-semibold'>Email :</span> {donor?.email}</p>
                <div className=" flex items-center justify-center w-20 h-20 rounded-full bg-red-100 ">
                    <span className="text-2xl font-bold text-red-500">{donor?.bloodGroup}</span>
                </div>
                <p className='text-sm'><span className='font-semibold'>District :</span> {donor?.district}</p>
                <p className='text-sm'><span className='font-semibold'>Upazila :</span> {donor?.upazila}</p>
            </div>
        </div>
    );
};

export default DonorCard;
