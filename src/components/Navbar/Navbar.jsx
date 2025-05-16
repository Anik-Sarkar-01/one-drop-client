import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/logo.png'
import Loading from '../Loading/Loading';
import userPhoto from '../../assets/user.png'

const Navbar = () => {
    const { user, logout, loading, toastSuccess } = useAuth();

    console.log(user);

    if (loading) {
        return <Loading></Loading>
    }

    const handleLogout = () => {
        logout()
            .then(() => {
                toastSuccess("Logout Successful.")
            })
    }


    return (
        <div className="navbar h-24 bg-base-100 border-b-4 border-b-[#EB2C29]">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg font-semibold">
                        <li><Link to={"/donation-requests"}>DONATION REQUESTS</Link></li>
                        <li><Link to={"/blog"}>BLOG</Link></li>
                    </ul>

                </div>
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={logo} className='w-16' alt="" />
                    <p className='text-sm md:text-xl font-semibold'>ONE <span className='text-[#EB2C29]'>DROP</span></p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg font-semibold">
                    <li><Link to={"/donation-requests"}>DONATION REQUESTS</Link></li>
                    <li><Link to={"/blog"}>BLOG</Link></li>
                </ul>
            </div>
            <div className='navbar-end'>
                {user ? <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost w-12 btn-circle avatar">
                            <div className="ring-[#EB2C29] ring-offset-base-100  rounded-full ring-2 ring-offset-2">
                                {user?.photoURL ? <img src={user?.photoURL} /> : <img src={userPhoto}></img>}
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg font-semibold">
                            <li><Link to={"/dashboard"}>DASHBOARD</Link></li>
                            <li><button onClick={handleLogout}>LOGOUT</button></li>
                        </ul>
                    </div>
                </div> : <> <Link to={"/login"} className='btn btn-ghost bg-red-500 text-white'>LOGIN</Link> </>}
            </div>


        </div>
    );
};

export default Navbar;