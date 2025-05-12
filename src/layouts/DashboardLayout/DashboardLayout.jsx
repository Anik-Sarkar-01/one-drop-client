import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import { NavLink, Outlet } from 'react-router-dom';




const DashboardLayout = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className='flex'>
            <div className='w-64 min-h-screen bg-orange-400'>
                <ul className="menu">
                    {
                        (isAdmin) ? <>
                            <li>
                                <NavLink to={"/dashboard/adminHome"}> Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/addItems"}> Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/manageItems"}>Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/manageBookings"}> Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/users"}> All Users</NavLink>
                            </li>
                        </> : <>
                            <li>
                                <NavLink to={"/dashboard/my-donation-requests"}>My Donation Requests</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/create-donation-request"}>Create Donation Request</NavLink>
                            </li>
                            
                        </>
                    }


                    <div className="divider"></div>

                    {/* shared items */}
                    <li>
                        <NavLink to={"/"}>  Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/profile"}>  Profile</NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1 p-5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;