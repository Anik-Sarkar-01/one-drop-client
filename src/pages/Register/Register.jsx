import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage';

const imagebb_api_key = import.meta.env.VITE_imagebb_apikey;
const imagebb_hosting_api = `https://api.imgbb.com/1/upload?key=${imagebb_api_key}`;

const Register = () => {
    const { createUser, updateUserProfile, toastSuccess, toastError } = useAuth();
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const navigate = useNavigate();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const axiosPublic = useAxiosPublic();


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
        const avatarFile = { image: data.avatar[0] };
        const res = await axiosPublic.post(imagebb_hosting_api, avatarFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const email = data.email;
            const password = data.password;
            const avatarImgUrl = res?.data?.data?.display_url;
            createUser(email, password)
                .then((res) => {
                    if (res.user) {
                        const name = data?.name;
                        const avatar = avatarImgUrl;
                        updateUserProfile(name, avatar)
                            .then(() => {
                                const user = {
                                    name: name,
                                    email: email,
                                    avatar: avatar,
                                    district: data?.district,
                                    upazila: data?.upazila,
                                    bloodGroup: data?.bloodGroup,
                                    role: "donor",
                                    status: "Active",
                                }
                                axiosPublic.post("/users", user)
                                    .then((response) => {
                                        if (response.data.insertedId) {
                                            toastSuccess("User Created Successfully.")
                                        }
                                    })
                                    .catch((error) => {
                                        toastError(`${error?.message}`)
                                    });
                                navigate("/");
                                reset();
                            })
                            .catch((error) => {
                                toastError(`${error?.message}`)
                            })
                    }
                })
                .catch((error) => {
                    toastError(`${error?.message}`)
                })
        }
    }

    return (
        <div>
            <WelcomeMessage heading={"Register with One Drop"} subheading={"Register today and give the gift of life. Every drop counts, every donor matters."}></WelcomeMessage>
            <div className="hero bg-base-200 py-5 ">
                <div className="hero-content flex-col bg-gray-100 xl:p-15">
                    <div className="card bg-base-100 min-w-sm md:min-w-3xl lg:min-w-4xl shadow-2xl px-10 py-10">
                        <h2 className='font-semibold text-3xl  w-fit mx-auto'><span className='text-red-500'>REGISTER</span> HERE</h2>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset space-y-5">
                                <div className='flex flex-col md:flex-row  gap-4'>
                                    {/* email */}
                                    <label className="label text-sm font-semibold">EMAIL :</label>
                                    <input type="email" name='email' {...register("email", { required: true })} className="input w-full" placeholder="Email" />
                                    {errors.email && <span className='text-red-500'>Email field is required</span>}

                                    {/* name */}
                                    <label className="label text-sm font-semibold">NAME :</label>
                                    <input type="text" name='name' {...register("name", { required: true })} className="input w-full" placeholder="Name" />
                                    {errors.name && <span className='text-red-500'>Name field is required</span>}
                                </div>

                                <div className='flex flex-col md:flex-row gap-4'>
                                    {/* avatar */}
                                    <label className="label text-sm font-semibold">AVATAR :</label>
                                    <input type="file" accept='image/*' name='avatar' {...register("avatar", { required: true })} className="file-input w-full" placeholder="avatar" />
                                    {errors.avatar && <span className='text-red-500'>Avatar is required</span>}

                                    {/* blood group */}
                                    <label className="label text-sm font-semibold">BLOOD GROUP :</label>
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
                                </div>

                                <div className='flex flex-col md:flex-row gap-4'>
                                    {/* District */}
                                    <label className="label text-sm font-semibold">DISTRICT :</label>
                                    <select {...register("district")} defaultValue="Select District" className="select w-full">
                                        <option disabled={true}>Select District</option>
                                        {districts.map(district => <option key={district.id}>{district.name}</option>)}
                                    </select>


                                    {/* Upazila */}
                                    <label className="label text-sm font-semibold">UPAZILA :</label>
                                    <select {...register("upazila")} defaultValue="Select Upazila" className="select w-full">
                                        <option disabled={true}>Select Upazila</option>
                                        {upazilas.map(upazila => <option key={upazila.id}>{upazila.name}</option>)}
                                    </select>

                                </div>

                                <div className='flex flex-col md:flex-row gap-4'>
                                    {/* password */}
                                    <label className="label text-sm font-semibold">PASSWORD :</label>
                                    <input type="password" name='password' {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                    })} className="input w-full" placeholder="Password" />
                                    {errors.password?.type === "required" && <span className='text-red-500'>Password field is required</span>}
                                    {errors.password?.type === "minLength" && <span className='text-red-500'>Password must be 6 characters</span>}
                                    {errors.password?.type === "pattern" && <span className='text-red-500'>Password must have 1 uppercase, 1 lowercase, 1 special character and 1 number</span>}

                                    {/* Confirm Password */}
                                    <label className="label text-sm font-semibold">CONFIRM PASSWORD :</label>
                                    <input type="password" name='password' {...register("confirmPassword", {
                                        required: true,
                                        minLength: 6,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                        validate: value =>
                                            value === password || "Passwords do not match."
                                    })} className="input w-full" placeholder="Password" />
                                    {errors.confirmPassword?.type === "required" && <span className='text-red-500'>Password field is required</span>}
                                    {errors.confirmPassword?.type === "minLength" && <span className='text-red-500'>Password must be 6 characters</span>}
                                    {errors.confirmPassword?.type === "pattern" && <span className='text-red-500'>Password must have 1 uppercase, 1 lowercase, 1 special character and 1 number</span>}
                                    {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
                                </div>
                                <div className='flex justify-center'>
                                    <button className="btn bg-red-500 text-white w-48 mt-4">REGISTER</button>
                                </div>
                            </form>
                            <p className='text-center'>Already Registered? <Link className='btn btn-outline text-red-500' to={"/login"}>LOGIN</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;