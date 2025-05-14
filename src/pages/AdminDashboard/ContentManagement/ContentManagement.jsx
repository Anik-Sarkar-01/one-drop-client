import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../../../components/BlogCard/BlogCard';
import useBlogs from '../../../hooks/useBlogs';

const ContentManagement = () => {
    const { blogs = [] } = useBlogs();
    const [status, setStatus] = useState('all');

    const handleFilterChange = (e) => {
        setStatus(e.target.value);
    };

    const filteredBlogs = status === 'all'
        ? blogs
        : blogs.filter(user =>
            user?.status?.toLowerCase() === status.toLowerCase()
        );
    return (
        <div>
            <div className='flex justify-between'>
                <div className="mb-4 flex justify-between items-center">

                    <div className="flex items-center gap-2">
                        <label className="font-medium">Filter by Status:</label>
                        <select
                            className="select select-bordered"
                             value={status}
                            onChange={handleFilterChange}
                        >
                            <option value="all">All</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>
                <Link to={"/dashboard/content-management/add-blog"} className='btn btn-neutral'>Add Blog</Link>
            </div>
            <div className='grid grid-cols-3 gap-5'>
                {filteredBlogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)}
            </div>

        </div>
    );
};

export default ContentManagement;