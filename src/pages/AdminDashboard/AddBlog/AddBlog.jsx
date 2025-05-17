import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import WelcomeMessage from '../../../components/WelcomeMessage/WelcomeMessage';


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
             <WelcomeMessage heading={"Add your blog"} subheading={""}></WelcomeMessage>
            <div className='overflow-x-auto py-5'>
                <div className="overflow-x-auto w-2xl xl:w-3xl bg-base-100 mx-auto rounded-xl shadow-lg p-5">
                    <div className="text-center lg:text-left">
                        <h1 className="text-xl md:text-3xl font-bold text-left text-red-500 border-b-4 p-2 w-fit">Add Blog</h1>
                    </div>
                    <div className="w-full pt-5">
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
                                type='url' placeholder='Thumbnail' className="input w-full " {...register("thumbnail", { required: true })}
                            />
                            {errors.thumbnail && <span className='text-red-500'>Thumbnail is required</span>}

                            {/* content */}
                            <label className="label">Content</label>
                            <div>
                                <JoditEditor
                                    ref={editor}
                                    value={content || ""}
                                    config={config}
                                    onChange={handleContentChange}
                                />
                            </div>
                            {errors.content && <span className="text-red-500">Content is required</span>}

                            <button className="btn bg-red-500 w-xs text-white mt-4">Create Blog</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;