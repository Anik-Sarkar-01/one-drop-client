import React from 'react';
import useUser from '../../hooks/useUser';

const DashboardWelcome = () => {
    const {user} = useUser();
    return (
        <div>
            <h2 className='text-4xl font-semibold'>Welcome to the Dashboard - {user?.name}</h2>
        </div>
    );
};

export default DashboardWelcome;