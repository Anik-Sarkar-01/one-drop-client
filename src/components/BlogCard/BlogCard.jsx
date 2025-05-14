import React from 'react';
import useAdmin from '../../hooks/useAdmin';

const BlogCard = ({ blog }) => {
    const [isAdmin] = useAdmin();
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {blog?.title}
                    <div className="badge badge-secondary">{blog?.status}</div>
                </h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions justify-end">
                    {(isAdmin) ? <div><button className='btn btn-error'>Edit</button>
                        <button className='btn btn-error'>Delete</button></div> : <></>}
                    {(blog.status === "draft" && isAdmin) ? <btn className="btn btn-neutral">Publish</btn> : (isAdmin) ? <btn className="btn btn-neutral">Unpublish</btn> : <></>}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;