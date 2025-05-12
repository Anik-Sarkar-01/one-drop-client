import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
    const axiosPublic = useAxiosPublic();

    const { data: users, isPending, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get("/users");
            return res.data;
        }
    });

    return { users, isLoading: isPending, error, refetch };
};

export default useUsers;