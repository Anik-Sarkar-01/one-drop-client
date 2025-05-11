import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);

        reset();
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center md:w-full lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                </div>
                <div className="card bg-base-100 md:w-full max-w-sm shrink-0 shadow-2xl px-5 py-5">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                            {/* name */}
                            <label className="label">Name</label>
                            <input type="text" name='name' {...register("name", { required: true })} className="input" placeholder="Name" />
                            {errors.name && <span className='text-red-500'>Name field is required</span>}
                            
                            {/* photo */}
                            <label className="label">Photo URL</label>
                            <input type="url" name='name' {...register("photoUrl", { required: true })} className="input" placeholder="Photo Url" />
                            {errors.photoUrl && <span className='text-red-500'>Photo Url field is required</span>}
                            
                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" name='email' {...register("email", { required: true })} className="input" placeholder="Email" />
                            {errors.email && <span className='text-red-500'>Email field is required</span>}

                            {/* password */}
                            <label className="label">Password</label>
                            <input type="password" name='password' {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                            })} className="input" placeholder="Password" />
                            {errors.password?.type === "required" && <span className='text-red-500'>Password field is required</span>}
                            {errors.password?.type === "minLength" && <span className='text-red-500'>Password must be 6 characters</span>}
                            {errors.password?.type === "pattern" && <span className='text-red-500'>Password must have 1 uppercase, 1 lowercase, 1 special character and 1 number</span>}

                            <button className="btn btn-neutral mt-4">Register</button>
                        </form>
                        <p className='text-center'>Already Registered? <Link className='btn btn-neutral' to={"/login"}>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;