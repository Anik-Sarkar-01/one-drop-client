import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    
                    <div className="card bg-base-100 max-w-2xl shadow-2xl px-5 py-8">
                        <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold text-center">Login Now!</h1>
                    </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                                {/* email field */}
                                <label className="label">Email</label>
                                <input
                                    type='email' placeholder='Email' className="input w-sm" {...register("email", { required: "Email Address is required" })}
                                    aria-invalid={errors.mail ? "true" : "false"}
                                />
                                {errors.mail && <p className='text-red-500' role="alert">{errors.mail?.message}</p>}

                                {/* password field */}
                                <label className="label">Password</label>
                                <input
                                    type='password' placeholder='Password' className="input w-sm" {...register("password", { required: "Password is required" })}
                                    aria-invalid={errors.mail ? "true" : "false"}
                                />
                                {errors.password && <p className='text-red-500' role="alert">{errors.password?.message}</p>}
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </form>
                            <p className='text-center'>Don't have an Account? <Link to={"/register"} className='btn btn-neutral'>Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;