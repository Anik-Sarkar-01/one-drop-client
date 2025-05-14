import React from 'react';
import { Link } from 'react-router-dom';

const RequestCard = ({ request }) => {
    return (
        <div className="card border w-96">
            <div className="card-body">
                <h2 className="card-title"> Recipient Name: {request?.recipientName}</h2>
                <p>Location: {request?.fullAddress}</p>
                <p>BloodGroup: {request?.bloodGroup}</p>
                <p>Donation Date: {request?.donationDate}</p>
                <p>Donation Time: {request?.donationTime}</p>
                <div className="card-actions justify-start">
                    <Link to={`/donation-request-details/${request._id}`} className="btn btn-neutral">View</Link>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;