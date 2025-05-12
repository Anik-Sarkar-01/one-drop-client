
import useDonationRequests from '../../hooks/useDonationRequests';
import useUser from '../../hooks/useUser';

const MyDonationRequest = () => {
    const { donationRequests = [] } = useDonationRequests();
    const { user } = useUser();
   

    return (
        <div>
            <h2 className='text-4xl font-semibold'>Welcome to the Dashboard - {user?.name}</h2>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
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
                        {donationRequests.map((request, index) => (
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
        </div>
    );
};

export default MyDonationRequest;
