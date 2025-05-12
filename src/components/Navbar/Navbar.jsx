import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout()
        .then(() => {
            console.log("Logout Successful");
        })
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">OneDrop</a>
            </div>
            <div className="flex-none">
                <ul className="menu items-center menu-horizontal px-1">
                    <li><a>Donation Requests</a></li>
                    <li><a>Blog</a></li>
                </ul>
            </div>
            {user ? <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link to={"/dashboard"}>Dashboard</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div> : <> <Link to={"/login"} className='btn btn-ghost'>Login</Link> </>}

        </div>
    );
};

export default Navbar;