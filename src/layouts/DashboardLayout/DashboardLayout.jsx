import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/Loading/Loading';
import useUser from '../../hooks/useUser';

const DashboardLayout = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const { loading } = useAuth();
    const { user } = useUser();

    if (loading) {
        return <Loading></Loading>
    }

    if (isAdminLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='flex'>
            <div className='w-36 lg:w-64 min-h-screen bg-red-400 font-semibold text-white'>
                <ul className="menu">
                    {
                        (isAdmin) ? <>
                            <li>
                                <NavLink to={"/dashboard"}>Admin Dashboard</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/all-users"}>All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/all-donation-requests"}>All Blood Donation Request</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/content-management"}> Content Management</NavLink>
                            </li>
                        </> : (user?.role === "donor") ? <>
                            <li>
                                <NavLink to={"/dashboard"}>Donor Dashboard</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/my-donation-requests"}>My Donation Requests</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/create-donation-request"}>Create Donation Request</NavLink>
                            </li>

                        </> : <>
                            <li>
                                <NavLink to={"/dashboard"}>Volunteer Dashboard</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/all-donation-requests"}>All Blood Donation Request</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/content-management"}>Content Management</NavLink>
                            </li>
                        </>
                    }

                    <div className="divider divider-neutral"></div>

                    {/* shared items */}
                    <li>
                        <NavLink to={"/"}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/profile"}>Profile</NavLink>
                    </li>
                </ul>
            </div>
            <div className='overflow-x-auto flex-1 p-5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;