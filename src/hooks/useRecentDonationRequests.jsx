import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';


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

    return { recentRequests, isPending, error, refetch };
};

export default useRecentDonationRequests;
