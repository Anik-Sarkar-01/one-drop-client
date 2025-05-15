import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';


const usePublishedBlogs = () => {
    const axiosPublic = useAxiosPublic();

    const { data: publishedBlogs, isLoading, isError } = useQuery({
        queryKey: ['published-blogs', 'published'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/published-blogs?status=published');
            return data;
        }
    });

    return { publishedBlogs, isLoading, isError };
};

export default usePublishedBlogs;