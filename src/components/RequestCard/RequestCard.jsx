import React from 'react';
import { Link } from 'react-router-dom';

const RequestCard = ({ request }) => {
    
    return (
        <div className="card w-96  shadow-2xl">
            <div className="card-body space-y-2">
                <h2 className="card-title"> Recipient Name : {request?.recipientName}</h2>
                <p><span className='font-semibold'>Blood Group :</span> {request?.bloodGroup}</p>
                <p><span className='font-semibold'>Location :</span> {request?.recipientDistrict}</p>
                <p><span className='font-semibold'>Donation Date :</span> {request?.donationDate}</p>
                <p><span className='font-semibold'>Donation Time :</span> {request?.donationTime}</p>
                <div className="card-actions justify-start">
                    <Link to={`/donation-request-details/${request._id}`} className="btn w-28 bg-red-500 text-white">VIEW</Link>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;