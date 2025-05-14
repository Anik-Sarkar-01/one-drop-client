import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loading from '../../components/Loading/Loading';
import { useForm } from 'react-hook-form';

import useUser from '../../hooks/useUser';
import { useEffect } from 'react';

const DonationRequestDetails = () => {
    const params = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useUser();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const { data: donationDetails, isPending, error } = useQuery({
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
        console.log(data);


        document.getElementById('my_modal_5').close();

    }



    if (isPending) {
        return <Loading></Loading>
    }

    if (error) {
        return <p className='text-2xl font-semibold text-rose-300'>Error Occurred! Try again!</p>
    }

    return (
        <div className="card bg-base-100 shadow-sm space-y-5 py-5">
            <div className='border w-fit mx-auto p-5'>
                <figure className='h-62'>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className='flex flex-col justify-center items-center space-y-3'>
                    <div className='flex gap-5'>
                        <h2>Requester Name: {donationDetails?.requesterName}</h2>
                        <h2>Requester Email: {donationDetails?.requesterEmail}</h2>
                    </div>
                    <div className='flex gap-5'>
                        <h2>Recipient District: {donationDetails?.recipientDistrict}</h2>
                        <h2>Recipient Upazila: {donationDetails?.recipientUpazila}</h2>
                    </div>
                    <div className='flex gap-5'>
                        <h2>Recipient Name: {donationDetails?.recipientName}</h2>
                        <h2>Hospital Name: {donationDetails?.hospitalName}</h2>
                        <h2>Full Address: {donationDetails?.fullAddress}</h2>
                    </div>
                    <div className='flex gap-5'>
                        <h2>Donation Date: {donationDetails?.donationDate}</h2>
                        <h2>Donation Time: {donationDetails?.donationTime}</h2>
                    </div>
                    <p>Request Message: {donationDetails?.requestMessage}</p>
                    <div className='flex gap-5'>
                        <p>Blood Group: {donationDetails?.bloodGroup}</p>
                        <p>Donation Status: {donationDetails?.donationStatus}</p>
                    </div>
                    <div className="card-actions justify-start">
                        <button className="btn btn-neutral" onClick={() => document.getElementById('my_modal_5').showModal()}>Donate</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <p className="py-4">Press ESC key to close..</p>
                                <div className="modal-action justify-center items-center">
                                    <form onSubmit={handleSubmit(onSubmit)} method="dialog" className='fieldset space-y-2'>
                                        {/* name */}
                                        <label className="label">Name</label>
                                        <input readOnly type="text" name='name' {...register("name", { required: true })} className="input w-sm" placeholder="Name" />
                                        {errors.name && <span className='text-red-500'>Name field is required</span>}

                                        {/* email */}
                                        <label className="label">Email</label>
                                        <input readOnly type="email" name='email' {...register("email", { required: true })} className="input w-sm" placeholder="Email" />
                                        {errors.email && <span className='text-red-500'>Email field is required</span>}

                                        <button className='btn w-fit btn-neutral'>Confirm</button>
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