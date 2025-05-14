import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';


const AddBlog = () => {
    const { toastSuccess, toastError } = useAuth();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const editor = useRef(null);
    const axiosPublic = useAxiosPublic();

    const config = useMemo(() => ({
        readonly: false,
    }), []);

    const content = watch("content");


    useEffect(() => {
        register("content", { required: true });
    }, [register]);


    const handleContentChange = (newContent) => {
        setValue("content", newContent, { shouldValidate: true });
    };

    const onSubmit = data => {
        const blog = {
            ...data,
            status: "draft"
        }
        axiosPublic.post("/blogs", blog)
            .then((response) => {
                console.log(response);
                toastSuccess("Added.")
            })
            .catch((error) => {
                console.log(error);
                toastError("Error")
            })
    }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="card bg-base-100 max-w-full shadow-2xl px-5 py-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl font-bold text-center">Add Blog</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                                {/* title field */}
                                <label className="label">Title</label>
                                <input
                                    type='text' placeholder='Title' className="input w-full" {...register("title", { required: true })}
                                />
                                {errors.title && <span className='text-red-500'>Title is required</span>}

                                {/* Image field */}
                                <label className="label">Thumbnail</label>
                                <input
                                    type='url' placeholder='Thumbnail' className="input w-full" {...register("thumbnail", { required: true })}
                                />
                                {errors.thumbnail && <span className='text-red-500'>Thumbnail is required</span>}

                                <label className="label">Content</label>
                                <div className='w-4xl'>
                                    <JoditEditor
                                        ref={editor}
                                        value={content || ""}
                                        config={config}
                                        onChange={handleContentChange}
                                    />
                                </div>
                                {errors.content && <span className="text-red-500">Content is required</span>}

                                <button className="btn btn-neutral mt-4">Create Blog</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddBlog;