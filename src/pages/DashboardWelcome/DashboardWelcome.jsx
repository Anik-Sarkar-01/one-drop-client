
import { Link } from 'react-router-dom';
import useRecentDonationRequests from '../../hooks/useRecentDonationRequests';
import useUser from '../../hooks/useUser';
import useAdmin from '../../hooks/useAdmin';

const MyDonationRequest = () => {
    const { recentRequests = [] } = useRecentDonationRequests();

    console.log(recentRequests);
    const { user } = useUser();
    const [isAdmin] = useAdmin();

    return (
        <div className='space-y-10'>
            <h2 className='text-4xl font-semibold'>Welcome to the Dashboard - {user?.name}</h2>

            {isAdmin ? <></> : <>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table table-xs">
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
                            {recentRequests.map((request, index) => (
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
                </div>
                <div className='flex justify-center'>
                    <Link to={"/dashboard/my-donation-requests"} className='btn '>View My All Request</Link>
                </div>
            </>}
        </div>
    );
};

export default MyDonationRequest;
