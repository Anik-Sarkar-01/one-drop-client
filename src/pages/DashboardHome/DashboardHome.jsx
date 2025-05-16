import { Link } from 'react-router-dom';
import useRecentDonationRequests from '../../hooks/useRecentDonationRequests';
import useUser from '../../hooks/useUser';
import useAdmin from '../../hooks/useAdmin';
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';


const MyDonationRequest = () => {
    const { recentRequests = [], refetch } = useRecentDonationRequests();
    const axiosPublic = useAxiosPublic();
    const { user } = useUser();
    const [isAdmin] = useAdmin();
    const { toastSuccess, toastError } = useAuth();

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
        }).then(async(result) => {
            if (result.isConfirmed) {
                const { data } =await axiosPublic.delete(`/donation-requests/${id}`)
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


    return (
        <div className='space-y-10'>
            <WelcomeMessage heading={`Welcome to the dashboard - ${user?.name}`} subheading={""}></WelcomeMessage>
            {isAdmin ? <></> : <>
                {
                    (recentRequests.length > 0) && <div>
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
                                    {recentRequests.map((request, index) => (
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
                                            <td><Link to={`edit-donation-request/${request?._id}`} className='btn btn-primary text-white btn-sm'>Edit</Link></td>
                                            <td><button onClick={() => handleDelete(request?._id)} className='btn btn-error text-white btn-sm'>Delete</button></td>
                                            <td><button className='btn btn-accent text-white btn-sm'>View</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-center pt-5'>
                            <Link to={"/dashboard/my-donation-requests"} className='btn btn-outline border-2 border-red-500 '>VIEW MY ALL REQUESTS</Link>
                        </div>
                    </div>
                }

            </>}
        </div>
    );
};

export default MyDonationRequest;
