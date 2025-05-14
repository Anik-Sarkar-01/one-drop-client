import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useBlogs = () => {
    const axiosPublic = useAxiosPublic();

    const { data: blogs, isPending, error, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get("/blogs");
            return res.data;
        }
    });

    return { blogs, isLoading: isPending, error, refetch };
};

export default useBlogs;