import React, { useState } from 'react';
import useUsers from '../../../hooks/useUsers';
import WelcomeMessage from '../../../components/WelcomeMessage/WelcomeMessage';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

const AllUsers = () => {
    const { users = [], refetch, } = useUsers();
    const [status, setStatus] = useState('all');
    const { toastSuccess, toastError } = useAuth();
    const axiosPublic = useAxiosPublic();

    const handleFilterChange = (e) => {
        setStatus(e.target.value);
    };

    const filteredUsers = status === 'all'
        ? users
        : users.filter(user =>
            user?.status?.toLowerCase() === status.toLowerCase()
        );

    const handleBlock = async (id) => {
        const userStatus = {
            status: "Blocked",
        }
        const { data } = await axiosPublic.patch(`/change-user-status/${id}`, userStatus);
        if (data.modifiedCount > 0) {
            toastSuccess("User Blocked.");
            refetch();
        }
        else {
            toastError("Error Occurred.")
        }
    }

    const handleUnblock = async (id) => {
        const userStatus = {
            status: "Active",
        }
        const { data } = await axiosPublic.patch(`/change-user-status/${id}`, userStatus);
        if (data.modifiedCount > 0) {
            toastSuccess("User Unblocked.");
            refetch();
        }
        else {
            toastError("Error Occurred.")
        }
    }

    const handleMakeAdmin = async (id) => {
        const userRole = {
            role: "admin",
        }
        const { data } = await axiosPublic.patch(`/change-user-role/${id}`, userRole);
        if (data.modifiedCount > 0) {
            toastSuccess("Role Updated.");
            refetch();
        }
        else {
            toastError("Already an Admin.")
        }
    }

    const handleMakeVolunteer = async (id) => {
        const userRole = {
            role: "volunteer",
        }
        const { data } = await axiosPublic.patch(`/change-user-role/${id}`, userRole);
        if (data.modifiedCount > 0) {
            toastSuccess("Role Updated.");
            refetch();
        }
        else {
            toastError("Already a volunteer.")
        }
    }

    return (
        <div>
            <WelcomeMessage heading={"All Users"} subheading={""}></WelcomeMessage>
            <div className="my-4 flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-semibold">Total Users - ({filteredUsers.length})</h2>

                <div className="flex flex-col md:flex-row items-center gap-3">
                    <label className="font-medium">Filter by Status:</label>
                    <select
                        className="select select-bordered"
                        value={status}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All</option>
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table table-sm">
                    <thead>
                        <tr className='bg-red-500 text-white'>
                            <th className='py-5'>#</th>
                            <th>User Avatar</th>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>User Role</th>
                            <th>User Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td className='py-10'>
                                    <div className="avatar">
                                        <div className="ring-red-500 ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2">
                                            <img
                                                src={user?.avatar}
                                                alt="User Avatar" />
                                        </div>
                                    </div>
                                </td>
                                <td>{user?.email}</td>
                                <td>{user?.name}</td>
                                <td>{user?.role}</td>
                                <td>{user?.status}</td>
                                <td className="menu menu-horizontal">
                                    <li>
                                        <details>
                                            <summary className='mt-14'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg></summary>
                                            <ul className="bg-base-100 relative right-0 top-20 z-10 rounded-t-none flex gap-2">
                                                {
                                                    (user?.status === "Active") && <li><button onClick={() => handleBlock(user?._id)} className='btn btn-error btn-sm text-white'>Block</button></li>
                                                }
                                                {
                                                    (user?.status === "Blocked") && <li><button onClick={() => handleUnblock(user?._id)} className='btn bg-pink-400 btn-sm text-white'>Unblock</button></li>
                                                }
                                                <li><button onClick={() => handleMakeVolunteer(user?._id)} className='btn bg-blue-400 btn-sm text-white'>Make Volunteer</button></li>
                                                <li><button onClick={() => handleMakeAdmin(user?._id)} className='btn bg-indigo-400 btn-sm text-white'>Make Admin</button></li>
                                            </ul>
                                        </details>
                                    </li>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-4 text-center text-gray-500">No donation requests found for selected filter.</div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;