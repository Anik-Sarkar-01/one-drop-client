import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';


const useDonationRequests = () => {
    const axiosPublic = useAxiosPublic();
    const { user: currentUser } = useAuth();

    const { data: donationRequests, isPending, error, refetch } = useQuery({
        queryKey: [currentUser?.email, 'donationRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donation-requests/${currentUser?.email}`);
            return res.data;
        }
    });

    return { donationRequests, isLoading: isPending, error, refetch };
};

export default useDonationRequests;
