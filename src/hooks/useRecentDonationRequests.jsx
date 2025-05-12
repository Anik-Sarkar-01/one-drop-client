import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';


const useRecentDonationRequests = () => {
    const axiosPublic = useAxiosPublic();
    const { user: currentUser } = useAuth();

    const { data: recentRequests, isPending, error, refetch } = useQuery({
        queryKey: [currentUser?.email, 'recentRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/recent-requests/${currentUser?.email}`);
            return res.data;
        }
    });

    return { recentRequests, isLoading: isPending, error, refetch };
};

export default useRecentDonationRequests;
