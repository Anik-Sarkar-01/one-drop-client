import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import useAllDonationRequests from '../../../hooks/useAllDonationRequests';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import WelcomeMessage from '../../../components/WelcomeMessage/WelcomeMessage';

const AllDonationRequests = () => {
    const { allDonationRequests = [], refetch } = useAllDonationRequests();
    const [status, setStatus] = useState('all');
    const axiosPublic = useAxiosPublic();
    const { toastSuccess, toastError } = useAuth();
    const handleFilterChange = (e) => {
        setStatus(e.target.value);
    };

    const handleComplete = async (id) => {
        const status = {
            donationStatus: "Done",
        }
        const { data } = await axiosPublic.patch(`/change-donation-status/${id}`, status);
        if (data.modifiedCount > 0) {
            toastSuccess("Status Updated.");
            refetch();
        }
        else {
            toastError("Error Occurred.")
        }
    }

    const handleCancel = async (id) => {
        const status = {
            donationStatus: "Canceled",
        }
        const { data } = await axiosPublic.patch(`/change-donation-status/${id}`, status)
        if (data.modifiedCount > 0) {
            toastSuccess("Status Updated.");
            refetch();
        }
        else {
            toastError("Error Occurred.")
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosPublic.delete(`/donation-requests/${id}`)
                console.log(data);
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your request has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }

            }
        });
    }

    const filteredRequests = status === 'all'
        ? allDonationRequests
        : allDonationRequests.filter(request =>
            request.donationStatus?.toLowerCase() === status.toLowerCase()
        );

    return (
        <div>
            <WelcomeMessage heading={`All Donation Requests`} subheading={"Find All The Donation Requests"}></WelcomeMessage>
            <div className="mb-4 flex justify-between items-center pt-5">
                <h2 className="text-lg md:text-xl font-semibold">All Donation Requests ({filteredRequests.length})</h2>
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <label className="sm:text-sm text-lg font-medium">Filter by Status:</label>
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

            <div className='space-y-10'>

                <div>
                    <div className="overflow-x-auto rounded-box border border-gray-300">
                        <table className="table table-sm">
                            <thead>
                                <tr className='bg-red-500 text-white'>
                                    <th className='py-5'>#</th>
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
                                        <td className='flex py-8 flex-col justify-center items-center gap-2'>
                                            <p className='font-semibold'>{request?.donationStatus}</p>
                                            {
                                                request?.donationStatus?.toLowerCase() === 'inprogress' && (
                                                    <div className='flex gap-2'>
                                                        <button onClick={() => handleComplete(request._id)} className='btn text-white btn-success btn-sm'>Done</button>
                                                        <button onClick={() => handleCancel(request._id)} className='btn text-white btn-error btn-sm'>Cancel</button>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                request?.donationStatus?.toLowerCase() === 'inprogress' && (
                                                    <div className='text-center'>
                                                        <p className='font-semibold'>{request?.donorName}</p>
                                                        <p className='font-semibold'>{request?.donorEmail}</p>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td><Link to={`/dashboard/edit-donation-request/${request?._id}`} className='btn btn-primary text-white btn-sm'>Edit</Link></td>
                                        <td><button onClick={() => handleDelete(request?._id)} className='btn btn-error text-white btn-sm'>Delete</button></td>
                                        <td><Link to={`/donation-request-details/${request?._id}`} className='btn btn-accent text-white btn-sm'>View</Link></td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        {filteredRequests.length === 0 && (
                            <div className="p-4 text-center text-gray-500">No donation requests found for this selected filter.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllDonationRequests;