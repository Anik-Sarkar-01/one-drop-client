import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import Profile from '../pages/Profile/Profile';
import DashboardHome from '../pages/DashboardHome/DashboardHome';
import CreateDonationRequest from '../pages/CreateDonationRequest/CreateDonationRequest';
import AllUsers from '../pages/AdminDashboard/AllUsers/AllUsers';
import AllDonationRequests from '../pages/AdminDashboard/AllDonationRequests/AllDonationRequests';
import ContentManagement from '../pages/AdminDashboard/ContentManagement/ContentManagement';
import AddBlog from '../pages/AdminDashboard/AddBlog/AddBlog';
import SearchDonor from '../pages/SearchDonor/SearchDonor';
import PendingDonationRequest from '../pages/PendingDonationRequest/PendingDonationRequest';
import DonationRequestDetails from '../pages/DonationRequestDetails/DonationRequestDetails';
import Blog from '../pages/Blog/Blog';
import BlogDetails from '../pages/BlogDetails/BlogDetails';
import EditDonationRequest from '../pages/EditDonationRequest/EditDonationRequest';
import MyDonationRequests from '../pages/MyDonationRequests/MyDonationRequests';
import Home from '../pages/Home/Home/Home';
import PrivateRoute from './PrivateRoute';

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <p className='text-red-lg'>Error Occurred.</p>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/search-donor",
        element: <SearchDonor></SearchDonor>
      },
      {
        path: "/donation-requests",
        element: <PendingDonationRequest></PendingDonationRequest>
      },
      {
        path: "/blog",
        element: <Blog></Blog>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: "donation-request-details/:id",
        element: <PrivateRoute>
          <DonationRequestDetails></DonationRequestDetails>
        </PrivateRoute>
      },
      {
        path: "blog-details/:id",
        element: <PrivateRoute>
          <BlogDetails></BlogDetails>
        </PrivateRoute>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>
      },
      {
        path: "profile",
        element: <Profile></Profile>
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>
      },
      {
        path: "edit-donation-request/:id",
        element: <EditDonationRequest></EditDonationRequest>
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>
      },
      {
        path: "all-blood-donation-requests",
        element: <AllDonationRequests></AllDonationRequests>
      },
      {
        path: "content-management",
        element: <ContentManagement></ContentManagement>
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog></AddBlog>
      },
    ]
  }
]);

export default Route;