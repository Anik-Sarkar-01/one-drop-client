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
            <p>Total Published Blogs - {publishedBlogs.length}</p>
            <div className="grid grid-cols-3">
                {
                    publishedBlogs.map(blog => <PublishedBlogCard key={blog._id} blog={blog}></PublishedBlogCard>)
                }
            </div>
        </div>
    );
};

export default Blog;