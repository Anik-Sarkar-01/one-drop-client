import React from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';


const PublishedBlogCard = ({blog}) => {
    const {title, content} = blog;
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{title}</h2>
                <p>{parse(`${content}`)}</p>
                <div className="card-actions">
                    <Link to={`/blog-details/${blog._id}`} className="btn btn-primary">Read</Link>
                </div>
            </div>
        </div>
    );
};

export default PublishedBlogCard;