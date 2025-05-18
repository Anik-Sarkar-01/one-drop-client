import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';


const usePendingDonationRequests = () => {
    const axiosPublic = useAxiosPublic();

    const { data: pendingDonationRequests, isPending, isError } = useQuery({
        queryKey: ['pending-donation-requests', 'pending'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/pending-donation-requests?status=Pending');
            return data;
        }
    });

    return { pendingDonationRequests, isPending, isError };
};

export default usePendingDonationRequests;
