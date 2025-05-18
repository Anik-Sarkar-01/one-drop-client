import React from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";



const PublishedBlogCard = ({ blog }) => {
    const { title, content } = blog;

    return (

        <div className="card lg:card-side bg-base-100 shadow-sm">
            <figure className='w-full lg:w-4/12'>
                <img
                    src={blog?.thumbnail}
                    alt="thumbnail photo" />
            </figure>
            <div className="card-body w-full lg:w-8/12">
                <h2 className="card-title">{title}</h2>
                <h5>{parse(content.slice(0, 100))}...</h5>
                <div className="card-actions justify-start">
                    <Link to={`/blog-details/${blog._id}`} className="text-red-500 text-sm font-semibold flex items-center">READ MORE <MdKeyboardDoubleArrowRight /></Link>
                </div>
            </div>
        </div>

    );
};

export default PublishedBlogCard;