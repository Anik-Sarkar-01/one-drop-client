import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';


const useUser = () => {
    const axiosPublic = useAxiosPublic();
    const { user: currentUser } = useAuth();

    const { data: user, isPending, error, refetch } = useQuery({
        queryKey: [currentUser?.email, 'user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${currentUser?.email}`);
            return res.data;
        }
    });

    return { user, isLoading: isPending, error, refetch };
};

export default useUser;
