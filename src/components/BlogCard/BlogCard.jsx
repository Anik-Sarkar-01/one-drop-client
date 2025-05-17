import useAdmin from '../../hooks/useAdmin';
import parse from 'html-react-parser';

const BlogCard = ({ blog }) => {
    const [isAdmin] = useAdmin();

    return (
        <div className="card bg-base-100 w-60 lg:w-80 xl:w-96 shadow-sm">
            <figure>
                <img
                    className='h-52 w-full object-cover'
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
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
                            <button className="btn btn-error text-white">Delete</button>

                            {blog?.status === "draft" && (
                                <button className="btn bg-blue-400 text-white">Publish</button>
                            )}

                            {blog?.status === "published" && (
                                <button className="btn bg-pink-400 text-white">Unpublish</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;