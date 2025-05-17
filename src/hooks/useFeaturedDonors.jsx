import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useFeaturedDonors = () => {
    const axiosPublic = useAxiosPublic();

    const { data: featuredDonors, isPending, error, refetch } = useQuery({
        queryKey: ['featuredDonors'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/featured-donors`);
            return res.data;
        }
    });

    return { featuredDonors, isLoading: isPending, error, refetch };
};

export default useFeaturedDonors;