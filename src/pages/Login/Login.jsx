import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";


const Login = () => {
    const { login, toastSuccess, toastError } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
        const email = data?.email;
        const password = data?.password;
        login(email, password)
            .then(res => {
                if (res?.user) {
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
            <WelcomeMessage heading={"Login to One Drop"} subheading={"Please login to your account to continue"}></WelcomeMessage>
            <div className="hero bg-base-200 py-10">
                <div className="hero-content flex-col">
                    <div className="card bg-base-100 w-sm md:w-lg shadow-2xl px-5 py-8">
                        <h2 className='font-semibold text-3xl w-fit mx-auto'><span className='text-red-500'>LOGIN</span> HERE</h2>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                                {/* email field */}
                                <label className="label text-sm font-semibold">EMAIL :</label>
                                <input
                                    type='email' placeholder='Email' className="input w-full" {...register("email", { required: true })}

                                />
                                {errors.email && <p className='text-red-500' >Email is Required.</p>}

                                {/* password field */}
                                <label className="label text-sm font-semibold">PASSWORD :</label>
                                <input
                                    type='password' placeholder='Password' className="input w-full" {...register("password", { required: true })}
                                />
                                {errors.password && <p className='text-red-500'>Password is Required.</p>}
                                <button className="btn w-48 mx-auto mt-4 bg-red-500 text-white">LOGIN</button>
                            </form>
                            <p className='text-center'>Don't have an Account? <Link to={"/register"} className='btn btn-outline text-red-500'>REGISTER</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;