import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";


const Login = () => {
    const { login, toastSuccess, toastError } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
        const email = data?.email;
        const password = data?.password;
        login(email, password)
        .then(res => {
            if(res?.user) {
                toastSuccess("Login Successful.")
            }
            navigate("/");
        })
        .catch(error => {
            toastError(error?.code)
        })

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
                                    type='email' placeholder='Email' className="input w-sm" {...register("email", { required: true })}
                                    
                                />
                                {errors.email && <p className='text-red-500' >Email is Required.</p>}

                                {/* password field */}
                                <label className="label">Password</label>
                                <input
                                    type='password' placeholder='Password' className="input w-sm" {...register("password", { required: true })}
                                />
                                {errors.password && <p className='text-red-500'>Password is Required.</p>}
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