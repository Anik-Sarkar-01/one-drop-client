import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useUser from '../../hooks/useUser';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage';


const imagebb_api_key = import.meta.env.VITE_imagebb_apikey;
const imagebb_hosting_api = `https://api.imgbb.com/1/upload?key=${imagebb_api_key}`;

const Profile = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { user, refetch } = useUser();
    const [isEditable, setIsEditable] = useState(false);
    const { toastSuccess, toastError, updateUserProfile } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && upazilas.length > 0 && districts.length > 0) {
            reset({
                email: user?.email || '',
                name: user?.name || '',
                avatar: user?.avatar || '',
                bloodGroup: user?.bloodGroup || '',
                district: user?.district || '',
                upazila: user?.upazila || '',
            });

        }
    }, [districts.length, reset, upazilas.length, user])

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

    const onSubmit = async (data) => {
        setLoading(true)
        const avatarFile = { image: data.avatar[0] };
        const res = await axiosPublic.post(imagebb_hosting_api, avatarFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        if (res?.data?.success) {
            const avatarImgUrl = res?.data?.data?.display_url;
            const updateUser = {
                name: data?.name,
                email: data?.email,
                avatar: avatarImgUrl,
                district: data?.district,
                upazila: data?.upazila,
                bloodGroup: data?.bloodGroup,
            }
            updateUserProfile(data?.name, avatarImgUrl)
                .then(() => {
                    axiosPublic.put(`/user/${data.email}`, updateUser)
                        .then(response => {
                            if (response.data.modifiedCount) {
                                toastSuccess("Successfully Updated.")
                                refetch()
                                setLoading(false)
                            }
                            else {
                                toastError("Nothing to update!")
                            }
                        })
                        .catch((error) => {
                            toastError(`${error?.message}`)
                        });
                    setIsEditable(false);
                })
                .catch((error) => {
                    toastError(`${error?.message}`)
                })
        }
    }

    const handleCancel = () => {
        setIsEditable(false);
        reset();
    }



    return (
        <div>
            <WelcomeMessage heading={"User Profile"} subheading={""}></WelcomeMessage>
            <div className="bg-base-200 min-h-screen pt-5">
                <div className="hero-content flex-col">
                    <div className="card bg-base-100 md:w-xl shadow-2xl px-5 py-2 md:py-8">
                        {(loading) ? (
                            <div className='flex justify-center items-center'>
                                <p>Updating...</p>
                            </div>
                        ) : (
                            <div className="card-body">
                                {(!isEditable) && (
                                    <button onClick={() => setIsEditable(true)} className='btn bg-red-500 text-white  absolute right-0 top-0 md:right-12 md:top-6'>Edit</button>
                                )}

                                <div className="avatar flex justify-center">
                                    <div className="ring-red-500 ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                                        <img src={user?.avatar} />
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                                    {/* email */}
                                    <label className="label">Email</label>
                                    <input disabled={!isEditable} readOnly type="email" name='email' {...register("email")} className="input w-full" placeholder="Email" />

                                    {/* name */}
                                    <label className="label">Name</label>
                                    <input disabled={!isEditable} type="text" name='name' {...register("name", { required: true })} className="input w-full" placeholder="Name" />
                                    {errors.name && <span className='text-red-500'>Name field is required</span>}

                                    {/* avatar */}
                                    <label className="label">Avatar</label>
                                    <input disabled={!isEditable} type="file" accept='image/*' name='avatar' {...register("avatar", { required: true })} className="file-input w-full" placeholder="avatar" />
                                    {errors.avatar && <span className='text-red-500'>Avatar is required</span>}


                                    {/* blood group */}
                                    <label className="label">Blood Group</label>
                                    <select disabled={!isEditable} {...register("bloodGroup")} className="select w-full">
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

                                    <div className='flex gap-8 w-full'>
                                        {/* District */}
                                        <div className='flex flex-col w-1/2'>
                                            <label className="label">District</label>
                                            <select disabled={!isEditable} {...register("district")} className="select">
                                                <option disabled={true}>Select District</option>
                                                {districts.map(district => <option key={district.id}>{district.name}</option>)}
                                            </select>
                                        </div>

                                        {/* Upazila */}
                                        <div className='flex flex-col w-1/2'>
                                            <label className="label">Upazila</label>
                                            <select disabled={!isEditable} {...register("upazila")} className="select">
                                                <option disabled={true}>Select Upazila</option>
                                                {upazilas.map(upazila => <option key={upazila.id}>{upazila.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex flex-col-reverse md:flex-row justify-between mt-3 gap-3'>
                                        {(isEditable) && (
                                            <>
                                                <button onClick={handleCancel} className='btn  text-white bg-neutral'>Cancel</button>
                                                <button type='submit' className='btn bg-red-500 text-white'>Save</button>
                                            </>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;