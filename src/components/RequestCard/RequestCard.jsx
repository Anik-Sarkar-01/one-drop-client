import React from 'react';
import { Link } from 'react-router-dom';

const RequestCard = ({ request }) => {
    console.log(request);
    return (
        <div className="card w-96 border-r-4 border-l-4 shadow-xl border-red-500">
            <div className="card-body space-y-2">
                <h2 className="card-title"> Recipient Name: {request?.recipientName}</h2>
                <p>BloodGroup : {request?.bloodGroup}</p>
                <p>Donation Date : {request?.donationDate}</p>
                <p>Donation Time : {request?.donationTime}</p>
                <div className="card-actions justify-start">
                    <Link to={`/donation-request-details/${request._id}`} className="btn w-28 bg-red-500 text-white">View</Link>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;