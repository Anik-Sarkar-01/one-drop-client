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
                            <option value="Block">Block</option>
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
                                <th>#</th>
                                <th>#</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user?.email}</td>
                                    <td>{user?.name}</td>
                                    <td>{user?.role}</td>
                                    <td>{user?.status}</td>
                                    <td><button className='btn btn-primary btn-sm'>Block</button></td>
                                    <td><button className='btn btn-error btn-sm'>Unblock</button></td>
                                    <td><button className='btn btn-accent btn-sm'>Make Volunteer</button></td>
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