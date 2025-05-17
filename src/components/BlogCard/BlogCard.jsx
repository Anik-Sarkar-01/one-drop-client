import useAdmin from '../../hooks/useAdmin';
import parse from 'html-react-parser';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useBlogs from '../../hooks/useBlogs';
import Swal from 'sweetalert2';
import useUser from '../../hooks/useUser';

const BlogCard = ({ blog }) => {
    const [isAdmin] = useAdmin();
    const { toastSuccess, toastError } = useAuth();
    const { refetch } = useBlogs();
    const axiosPublic = useAxiosPublic();
    const { user } = useUser();

    const handlePublish = async (id) => {
        const userStatus = {
            status: "published",
        }
        const { data } = await axiosPublic.patch(`/blogs/${id}`, userStatus);
        if (data.modifiedCount > 0) {
            toastSuccess("Blog Published.");
            refetch();
        }
        else {
            toastError("Error Occurred.")
        }
    }

    const handleUnpublish = async (id) => {
        const userStatus = {
            status: "draft",
        }
        const { data } = await axiosPublic.patch(`/blogs/${id}`, userStatus);
        if (data.modifiedCount > 0) {
            toastSuccess("Blog Unpublished.");
            refetch();
        }
        else {
            toastError("Error Occurred.")
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosPublic.delete(`/blogs/${id}`)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Blog has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            }
        });
    }

    return (
        <div className="card bg-base-100 w-60 lg:w-80 xl:w-96 shadow-sm">
            <figure>
                <img
                    className='h-52 w-full object-cover'
                    src={blog?.thumbnail}
                    alt="blog thumbnail" />
            </figure>
            <div className="card-body">
                <h2 className="card-title flex-wrap">
                    <p className='overflow-x-clip'>{blog?.title}</p>
                    <div className="badge badge-outline badge-secondary">{blog?.status}</div>
                </h2>
                <h6 className='overflow-x-clip'>{parse(blog?.content.slice(0, 100))}</h6>
                <div className="card-actions justify-center">
                    {isAdmin && (
                        <div className="flex gap-2">
                            <button onClick={() => handleDelete(blog._id)} className="btn btn-error text-white">Delete</button>

                            {blog?.status === "draft" && (
                                <button onClick={() => handlePublish(blog._id)} className="btn bg-blue-400 text-white">Publish</button>
                            )}

                            {blog?.status === "published" && (
                                <button onClick={() => handleUnpublish(blog._id)} className="btn bg-pink-400 text-white">Unpublish</button>
                            )}
                        </div>
                    )}

                    {(user?.role === "volunteer" && blog?.status === "published") && (
                        <button onClick={() => handleUnpublish(blog._id)} className="btn bg-pink-400 text-white">Unpublish</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;