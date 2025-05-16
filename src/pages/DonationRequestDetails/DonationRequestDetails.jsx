import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loading from '../../components/Loading/Loading';
import { useForm } from 'react-hook-form';

import useUser from '../../hooks/useUser';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage';

const DonationRequestDetails = () => {
    const params = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useUser();
    const { toastSuccess, toastError } = useAuth();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const { data: donationDetails, isPending, refetch, error } = useQuery({
        queryKey: ['donationDetails', params?.id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/request-details/${params?.id}`);
            return data;
        }
    });

    useEffect(() => {
        if (user) {
            setValue("name", user.name);
            setValue("email", user.email);
        }
    }, [user, setValue]);

    const onSubmit = data => {
        const donorDetails = {
            ...data,
            donationStatus: "Inprogress"
        }

        axiosPublic.patch(`/pending-donation-requests/${params?.id}`, donorDetails)
            .then((response) => {
                if (response.data.modifiedCount) {
                    toastSuccess("Donation Inprogress!");
                    refetch();
                }
            })
            .catch((error) => {
                toastError(`${error?.message}`)
            })
        document.getElementById('my_modal_5').close();
    }

    const handleClose = () => {
        document.getElementById('my_modal_5').close();
    }



    if (isPending) {
        return <Loading></Loading>
    }

    if (error) {
        return <p className='text-2xl font-semibold text-rose-300'>Error Occurred! Try again!</p>
    }

    return (
        <div className="card bg-base-100 shadow-sm space-y-5">
            <WelcomeMessage heading={"Donation Request Details"} subheading={"Review the request information and confirm your donation to support someone"}></WelcomeMessage>
            <div className='px-3 pt-5 pb-16'>
                <div className='border rounded-lg border-red-500 p-16 w-full md:w-xl lg:w-3xl xl:w-5xl mx-auto relative'>
                    <div className='absolute right-0 top-0 bg-red-500 text-white rounded-tr-lg p-2'>
                        <p className='text-sm font-semibold'>Status: {donationDetails?.donationStatus}</p>
                    </div >
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
                        <h2><span className='font-semibold'>Recipient Name:</span> {donationDetails?.recipientName}</h2>
                        <h2><span className='font-semibold'>Hospital Name:</span> {donationDetails?.hospitalName}</h2>
                        <h2><span className='font-semibold'>Address:</span> {donationDetails?.fullAddress}</h2>
                        <h2><span className='font-semibold'>Recipient District:</span> {donationDetails?.recipientDistrict}</h2>
                        <h2><span className='font-semibold'>Recipient Upazila:</span> {donationDetails?.recipientUpazila}</h2>
                        <p><span className='font-semibold'>Blood Group:</span> {donationDetails?.bloodGroup}</p>
                        <h2><span className='font-semibold'>Donation Date:</span> {donationDetails?.donationDate}</h2>
                        <h2><span className='font-semibold'>Donation Time:</span> {donationDetails?.donationTime}</h2>
                        <h2><span className='font-semibold'>Requested By:</span> {donationDetails?.requesterName}</h2>
                        <h2><span className='font-semibold'>Requester Email:</span> {donationDetails?.requesterEmail}</h2>
                    </div>
                    <div className='space-y-3 py-5'>
                        <p className='font-semibold'>Request Message: </p>
                        <div className='bg-base-300 p-8'>
                            <p>{donationDetails?.requestMessage}</p>
                        </div>
                    </div>
                    <div className="card-actions justify-start">
                        <button className="btn bg-red-500 text-white" onClick={() => document.getElementById('my_modal_5').showModal()}>Donate</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <button onClick={handleClose} className='btn btn-neutral'>Close</button>
                                <div className="modal-action justify-center items-center">
                                    <form onSubmit={handleSubmit(onSubmit)} method="dialog" className='fieldset space-y-2'>
                                        <label className="label">Name</label>
                                        <input readOnly type="text" name='donorName' {...register("donorName", { required: true })} className="input w-sm" placeholder="Donor Name" />
                                        {errors.donorName && <span className='text-red-500'>This field is required</span>}

                                        <label className="label">Email</label>
                                        <input readOnly type="email" name='donorEmail' {...register("donorEmail", { required: true })} className="input w-sm" placeholder="Donor Email" />
                                        {errors.donorEmail && <span className='text-red-500'>This field is required</span>}
                                        <button className='btn w-fit bg-red-500 text-white'>Confirm</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationRequestDetails;