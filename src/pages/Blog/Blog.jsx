import Loading from "../../components/Loading/Loading";
import PublishedBlogCard from "../../components/PublishedBlogCard/PublishedBlogCard";
import usePublishedBlogs from "../../hooks/usePublishedBlogs";

const Blog = () => {
    const { publishedBlogs = [], isLoading } = usePublishedBlogs();

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            
            <div className="grid gap-5  py-10 px-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {
                    publishedBlogs.map(blog => <PublishedBlogCard key={blog._id} blog={blog}></PublishedBlogCard>)
                }
            </div>
        </div>
    );
};

export default Blog;