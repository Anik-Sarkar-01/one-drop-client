import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import parse from 'html-react-parser';
import { FaHeart } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import useAxiosPublic from '../../hooks/useAxiosPublic';



const BlogDetails = () => {
    const params = useParams();
    const axiosPublic = useAxiosPublic();
    const { data: blogDetails, isPending, } = useQuery({
        queryKey: ['blogDetails', params?.id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/blog-details/${params?.id}`);
            return data;
        }
    });

    if (isPending) {
        return <Loading></Loading>
    }

    return (
        <div className='w-full md:w-2xl rounded-lg lg:w-3xl xl:w-4xl mx-auto bg-gray-50 p-10 my-10 space-y-5 text-justify'>
            <PhotoProvider>
                <PhotoView src={blogDetails?.thumbnail}>
                    <img className='w-full h-80 object-cover rounded-lg' src={blogDetails?.thumbnail} alt="thumbnail photo" />
                </PhotoView>

            </PhotoProvider>
            <h2 className='text-2xl font-bold'>{blogDetails?.title.toUpperCase()}</h2>
            <p className='text-lg'>{parse(blogDetails?.content)}</p>
            <div className='flex gap-3 *:text-2xl text-red-500'>
                <FaHeart />
                <IoShareSocialSharp />
            </div>
        </div>

    );
};

export default BlogDetails;