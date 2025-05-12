import React, { useState } from 'react';
import useUsers from '../../../hooks/useUsers';

const AllUsers = () => {
    const { users = [] } = useUsers();
    const [status, setStatus] = useState('all');

    const handleFilterChange = (e) => {
        setStatus(e.target.value);
    };

    const filteredUsers = status === 'all'
        ? users
        : users.filter(user =>
            user?.status?.toLowerCase() === status.toLowerCase()
        );
    return (
        <div>
            <div>
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Total Users - ({filteredUsers.length})</h2>

                    <div className="flex items-center gap-2">
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
                            <tr>
                                <th>#</th>
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
                                    <td  className='py-10'>
                                        <div className="avatar">
                                            <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2">
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
                                                    <li><button className='btn btn-primary btn-sm'>Block</button></li>
                                                    <li><button className='btn btn-error btn-sm'>Unblock</button></li>
                                                    <li><button className='btn btn-accent btn-sm'>Make Volunteer</button></li>
                                                    <li><button className='btn btn-accent btn-sm'>Make Admin</button></li>
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
        </div>
    );
};

export default AllUsers;