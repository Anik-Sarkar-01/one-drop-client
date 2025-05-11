import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const { user, createUser, updateUserProfile } = useAuth();
    console.log(user);
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const navigate = useNavigate();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);


    useEffect(() => {
        fetch("districts.json")
            .then(res => res.json())
            .then(data => setDistricts(data[2].data))
    }, [])

    useEffect(() => {
        fetch("upazilas.json")
            .then(res => res.json())
            .then(data => setUpazilas(data[2].data))
    }, [])


    const onSubmit = data => {
        console.log(data);
        const email = data.email;
        const password = data.password;
        createUser(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
                const name = data.name;
                const photo = data.photo;

                updateUserProfile(name, photo)
                    .then(() => {
                        navigate("/");
                        reset();
                    })

            })
        // console.log(navigate);
        // console.log(reset);
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">

                    <div className="card bg-base-100 max-w-2xl shadow-2xl px-5 py-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl font-bold text-center">Register Now!</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                                {/* email */}
                                <label className="label">Email</label>
                                <input type="email" name='email' {...register("email", { required: true })} className="input w-sm" placeholder="Email" />
                                {errors.email && <span className='text-red-500'>Email field is required</span>}

                                {/* name */}
                                <label className="label">Name</label>
                                <input type="text" name='name' {...register("name", { required: true })} className="input w-sm" placeholder="Name" />
                                {errors.name && <span className='text-red-500'>Name field is required</span>}

                                {/* photo */}
                                <label className="label">Avatar</label>
                                <input type="url" name='name' {...register("photo", { required: true })} className="input w-sm" placeholder="Photo" />
                                {errors.photo && <span className='text-red-500'>Photo Url field is required</span>}

                                {/* blood group */}
                                <label className="label">Blood Group</label>
                                <select {...register("bloodGroup")} defaultValue="Select Your Blood Group" className="select w-sm">
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

                                <div className='flex gap-8'>
                                    {/* District */}
                                    <div className='flex flex-col'>
                                        <label className="label">District</label>
                                        <select {...register("district")} defaultValue="Select District" className="select w-44">
                                            <option disabled={true}>Select District</option>
                                            {districts.map(district => <option key={district.id}>{district.name}</option>)}
                                        </select>
                                    </div>

                                    {/* Upazila */}
                                    <div className='flex flex-col'>
                                        <label className="label">Upazila</label>
                                        <select {...register("upazila")} defaultValue="Select Upazila" className="select w-44">
                                            <option disabled={true}>Select Upazila</option>
                                            {upazilas.map(upazila => <option key={upazila.id}>{upazila.name}</option>)}
                                        </select>
                                    </div>

                                </div>

                                {/* password */}
                                <label className="label">Password</label>
                                <input type="password" name='password' {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                })} className="input w-sm" placeholder="Password" />
                                {errors.password?.type === "required" && <span className='text-red-500'>Password field is required</span>}
                                {errors.password?.type === "minLength" && <span className='text-red-500'>Password must be 6 characters</span>}
                                {errors.password?.type === "pattern" && <span className='text-red-500'>Password must have 1 uppercase, 1 lowercase, 1 special character and 1 number</span>}

                                {/* Confirm Password */}
                                <label className="label">Confirm Password</label>
                                <input type="password" name='password' {...register("confirmPassword", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                    validate: value =>
                                        value === password || "Passwords do not match."
                                })} className="input w-sm" placeholder="Password" />
                                {errors.confirmPassword?.type === "required" && <span className='text-red-500'>Password field is required</span>}
                                {errors.confirmPassword?.type === "minLength" && <span className='text-red-500'>Password must be 6 characters</span>}
                                {errors.confirmPassword?.type === "pattern" && <span className='text-red-500'>Password must have 1 uppercase, 1 lowercase, 1 special character and 1 number</span>}
                                {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
                                <button className="btn btn-neutral mt-4">Register</button>
                            </form>
                            <p className='text-center'>Already Registered? <Link className='btn btn-neutral' to={"/login"}>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;