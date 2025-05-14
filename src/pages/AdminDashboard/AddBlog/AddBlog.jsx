import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';

const AddBlog = () => {
    const {  toastSuccess, toastError } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="card bg-base-100 max-w-2xl shadow-2xl px-5 py-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl font-bold text-center">Add Blog</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                                {/* title field */}
                                <label className="label">Title</label>
                                <input
                                    type='text' placeholder='Title' className="input w-sm" {...register("title", { required: true })}
                                />
                                {errors.title && <span className='text-red-500'>Title is required</span>}

                                {/* Image field */}
                                <label className="label">Thumbnail</label>
                                <input
                                    type='url' placeholder='Thumbnail' className="input w-sm" {...register("thumbnail", { required: true })}
                                />
                                {errors.thumbnail && <span className='text-red-500'>Thumbnail is required</span>}
                                
                                <button className="btn btn-neutral mt-4">Add Blog</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddBlog;