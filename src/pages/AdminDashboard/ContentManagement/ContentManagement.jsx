import React from 'react';
import { Link } from 'react-router-dom';

const ContentManagement = () => {
    return (
        <div className='flex justify-end'>
            <Link to={"/dashboard/content-management/add-blog"} className='btn btn-neutral'>Add Blog</Link>
        </div>
    );
};

export default ContentManagement;