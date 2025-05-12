import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useUser from '../../hooks/useUser';
import useAuth from '../../hooks/useAuth';

const CreateDonationRequest = () => {
    const { toastSuccess, toastError } = useAuth();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { user } = useUser();

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (user) {
            reset({
                requesterName: user.name || '',
                requesterEmail: user.email || '',
                recipientDistrict: "Select District",
                recipientUpazila: "Select Upazila",
            });

        }
    }, [reset, user])


    useEffect(() => {
        fetch("/districts.json")
            .then(res => res.json())
            .then(data => setDistricts(data[2].data))
    }, [])

    useEffect(() => {
        fetch("/upazilas.json")
            .then(res => res.json())
            .then(data => setUpazilas(data[2].data))
    }, [])


    const onSubmit = data => {
        const donationRequest = {
            ...data,
            donationStatus: "pending",
        }

        axiosPublic.post("/donation-requests", donationRequest)
            .then((response) => {
                if (response?.data?.insertedId) {
                    toastSuccess("Request Created Successfully.")
                }
                else {
                    toastError("Error Occurred.")
                }
            })
            .catch((error) => {
                toastError(error?.message);
            })
        reset();
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">

                    <div className="card bg-base-100 max-w-2xl shadow-2xl px-5 py-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl font-bold text-center">Create Donation Request!</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                                {/* requester name */}
                                <label className="label">Requester Name</label>
                                <input type="text" readOnly name='requesterName' {...register("requesterName", { required: true })} className="input w-full" placeholder="Requester Name" />
                                {errors.requesterName && <span className='text-red-500'>This field is required</span>}

                                {/* requester email */}
                                <label className="label">Requester Email</label>
                                <input type="requesterEmail" readOnly name='requesterEmail' {...register("requesterEmail", { required: true })} className="input w-full" placeholder="Requester Email" />
                                {errors.requesterEmail && <span className='text-red-500'>This field is required</span>}

                                {/* recipient name */}
                                <label className="label">Recipient Name</label>
                                <input type="text" name='recipientName' {...register("recipientName", { required: true })} className="input w-full" placeholder="Recipient Name" />
                                {errors.recipientName && <span className='text-red-500'>This field is required</span>}

                                <div className='flex gap-8'>
                                    {/* recipient district */}
                                    <div className='flex flex-col'>
                                        <label className="label">Recipient District</label>
                                        <select {...register("recipientDistrict")} className="select w-44">
                                            <option disabled={true}>Select District</option>
                                            {districts.map(district => <option key={district.id}>{district.name}</option>)}
                                        </select>
                                    </div>

                                    {/* Upazila */}
                                    <div className='flex flex-col'>
                                        <label className="label">Recipient Upazila</label>
                                        <select {...register("recipientUpazila")} className="select w-44">
                                            <option disabled={true}>Select Upazila</option>
                                            {upazilas.map(upazila => <option key={upazila.id}>{upazila.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* hospital name */}
                                <label className="label">Hospital Name</label>
                                <input type="text" name='hospitalName' {...register("hospitalName", { required: true })} className="input w-full" placeholder="Hospital Name" />
                                {errors.hospitalName && <span className='text-red-500'>This field is required</span>}

                                {/* full address */}
                                <label className="label">Full Address</label>
                                <input type="text" name='fullAddress' {...register("fullAddress", { required: true })} className="input w-full" placeholder="Full Address" />
                                {errors.fullAddress && <span className='text-red-500'>This field is required</span>}

                                {/* blood group */}
                                <label className="label">Blood Group</label>
                                <select {...register("bloodGroup")} defaultValue="Select Your Blood Group" className="select w-full">
                                    <option disabled={true}>Select Your Blood Group</option>
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                </select>

                                {/* donation date */}
                                <label className="label">Donation Date</label>
                                <input type="date" name='donationDate' {...register("donationDate", { required: true })} className="input w-full" placeholder="Donation Date" />
                                {errors.donationDate && <span className='text-red-500'>This field is required</span>}

                                {/* donation time */}
                                <label className="label">Donation Time</label>
                                <input type="time" name='donationTime' {...register("donationTime", { required: true })} className="input w-full" placeholder="Donation Time" />
                                {errors.name && <span className='text-red-500'>This field is required</span>}

                                {/* request message */}
                                <label className="label">Request Message</label>
                                <textarea type="text" name='requestMessage' {...register("requestMessage", { required: true })} className="textarea w-full" placeholder="write why do you need the blood?"></textarea>
                                {errors.requestMessage && <span className='text-red-500'>This field is required</span>}
                                <button className="btn btn-neutral mt-4">Request Now.</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreateDonationRequest;