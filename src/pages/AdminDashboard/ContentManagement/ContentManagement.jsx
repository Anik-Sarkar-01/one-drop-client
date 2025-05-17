import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import BlogCard from '../../../components/BlogCard/BlogCard';
import useBlogs from '../../../hooks/useBlogs';
import WelcomeMessage from '../../../components/WelcomeMessage/WelcomeMessage';

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
            <WelcomeMessage heading={"Manage Your Contents"} subheading={""}></WelcomeMessage>
            <div className='flex justify-between pt-5'>
                <div className="mb-4 flex justify-between items-center">

                    <div className="flex flex-col lg:flex-row items-center gap-2">
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
                <Link to={"/dashboard/content-management/add-blog"} className='btn bg-pink-500 text-white'>Add Blog</Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                {filteredBlogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)}
            </div>

        </div>
    );
};

export default ContentManagement;