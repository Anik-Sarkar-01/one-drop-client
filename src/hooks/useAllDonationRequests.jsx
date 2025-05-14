import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';


const useAllDonationRequests = () => {
    const axiosPublic = useAxiosPublic();

    const { data: allDonationRequests, isPending, error, refetch } = useQuery({
        queryKey: ['allDonationRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donation-requests`);
            return res.data;
        }
    });

    return { allDonationRequests, isLoading: isPending, error, refetch };
};

export default useAllDonationRequests;