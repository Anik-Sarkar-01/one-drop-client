import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useUsers = () => {
    const axiosPublic = useAxiosPublic();

    const { data: users, isPending: usersPending, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get("/users");
            return res.data;
        }
    });

    return { users, usersPending, error, refetch };
};

export default useUsers;