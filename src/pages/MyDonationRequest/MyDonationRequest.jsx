import React, { useState } from 'react';
import useDonationRequests from '../../hooks/useDonationRequests';

const MyDonationRequest = () => {
    const { donationRequests = [] } = useDonationRequests();
    const [status, setStatus] = useState('all');

    const handleFilterChange = (e) => {
        setStatus(e.target.value);
    };

    const filteredRequests = status === 'all'
        ? donationRequests
        : donationRequests.filter(request =>
            request.donationStatus?.toLowerCase() === status.toLowerCase()
        );

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Donation Requests ({filteredRequests.length})</h2>

                <div className="flex items-center gap-2">
                    <label className="font-medium">Filter by Status:</label>
                    <select
                        className="select select-bordered"
                        value={status}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">InProgress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient Name</th>
                            <th>Recipient Address</th>
                            <th>Donation Date</th>
                            <th>Donation Time</th>
                            <th>Blood Group</th>
                            <th>Donation Status</th>
                            <th>Donor Information</th>
                            <th>#</th>
                            <th>#</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request, index) => (
                            <tr key={request._id}>
                                <th>{index + 1}</th>
                                <td>{request?.recipientName}</td>
                                <td>{request?.recipientUpazila}, {request?.recipientDistrict}</td>
                                <td>{request?.donationDate}</td>
                                <td>{request?.donationTime}</td>
                                <td>{request?.bloodGroup}</td>
                                <td className='flex flex-col items-center gap-2'>
                                    {request?.donationStatus}
                                    {request?.donationStatus?.toLowerCase() === 'inprogress' && (
                                        <div className='flex gap-2'>
                                            <button className='btn btn-success btn-sm'>Done</button>
                                            <button className='btn btn-error btn-sm'>Cancel</button>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {request?.donorName}<br />
                                    {request?.donorEmail}
                                </td>
                                <td><button className='btn btn-primary btn-sm'>Edit</button></td>
                                <td><button className='btn btn-error btn-sm'>Delete</button></td>
                                <td><button className='btn btn-accent btn-sm'>View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredRequests.length === 0 && (
                    <div className="p-4 text-center text-gray-500">No donation requests found for selected filter.</div>
                )}
            </div>
        </div>
    );
};

export default MyDonationRequest;
