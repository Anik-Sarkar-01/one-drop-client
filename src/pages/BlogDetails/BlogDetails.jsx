import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import parse from 'html-react-parser';

const BlogDetails = () => {
    const params = useParams();
    const axiosPublic = useAxiosPublic()

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
        <div className="card lg:card-side bg-base-100 shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                    alt="Album" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{blogDetails?.title}</h2>
                <p>{parse(`${blogDetails?.content}`)}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Listen</button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;