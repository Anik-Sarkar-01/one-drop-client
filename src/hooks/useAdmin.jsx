import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/admin/${user?.email}`);
            return res.data?.admin;
        }
    })

    return [isAdmin, isAdminLoading]
};

export default useAdmin;