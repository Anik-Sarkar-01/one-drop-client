import { Link } from 'react-router-dom';
import useRecentDonationRequests from '../../hooks/useRecentDonationRequests';
import useUser from '../../hooks/useUser';
import useAdmin from '../../hooks/useAdmin';
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useUsers from '../../hooks/useUsers';
import { FaUsers } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import useAllDonationRequests from '../../hooks/useAllDonationRequests';
import { FaClipboardList } from "react-icons/fa";


const MyDonationRequest = () => {
    const { recentRequests = [], refetch } = useRecentDonationRequests();
    const axiosPublic = useAxiosPublic();
    const { user } = useUser();
    const [isAdmin] = useAdmin();
    const { toastSuccess, toastError } = useAuth();
    const { users } = useUsers();
    const { allDonationRequests } = useAllDonationRequests();

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


    return (
        <div className='space-y-10'>
            <WelcomeMessage heading={`Welcome to the dashboard - ${user?.name}`} subheading={""}></WelcomeMessage>
            {isAdmin ? <>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                    <div className="rounded-xl p-7 bg-gradient-to-l from-red-300 to-red-100 flex gap-2 items-center justify-evenly shadow-xl h-40 ">
                        <div className='space-y-2'>
                            <h1 className='text-3xl md:text-5xl font-semibold text-center'>{users?.length}</h1>
                            <p className='text-lg md:text-xl text-center font-semibold'>Total Users</p>
                        </div>
                        <div className='bg-white rounded-full p-5'>
                            <FaUsers className='text-5xl text-red-500'></FaUsers>
                        </div>
                    </div>
                    <div className="rounded-xl p-7 bg-gradient-to-l from-orange-300 to-orange-100 flex  gap-2 items-center justify-evenly shadow-xl h-40">
                        <div className='space-y-2'>
                            <h1 className='text-xl font-semibold text-center'>Updating Soon..</h1>
                            <p className='text-lg md:text-xl text-center font-semibold'>Total Funding</p>
                        </div>
                        <div className='bg-white rounded-full p-5'>
                            <FaSackDollar className='text-5xl text-orange-500'></FaSackDollar>
                        </div>
                    </div>
                    <div className="rounded-xl p-7 bg-gradient-to-l from-indigo-300 to-indigo-100 flex gap-2 items-center justify-evenly shadow-xl h-40">
                        <div className='space-y-2'>
                            <h1 className='text-3xl md:text-5xl font-semibold text-center'>{allDonationRequests?.length}</h1>
                            <p className='text-lg md:text-xl text-center font-semibold'>Total Blood Donation Request</p>
                        </div>
                        <div className='bg-white rounded-full p-5'>
                            <FaClipboardList className='text-5xl text-indigo-500'></FaClipboardList>

                        </div>
                    </div>
                </div>
            </> : <>
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
                                            <td><Link to={`/donation-request-details/${request?._id}`} className='btn btn-accent text-white btn-sm'>View</Link></td>
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
