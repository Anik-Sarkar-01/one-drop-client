import Loading from "../../components/Loading/Loading";
import usePublishedBlogs from "../../hooks/usePublishedBlogs";

const Blog = () => {
    const { publishedBlogs = [], isLoading } = usePublishedBlogs();

    if(isLoading){
        return <Loading></Loading>
    }

    
    return (
        <div>
            <p>Total Published Blogs - {publishedBlogs.length}</p>
        </div>
    );
};

export default Blog;