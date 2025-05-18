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
        element: <PrivateRoute>
          <DashboardHome></DashboardHome>
        </PrivateRoute>
      },
      {
        path: "profile",
        element: <PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>
      },
      {
        path: "my-donation-requests",
        element: <PrivateRoute>
          <MyDonationRequests></MyDonationRequests>
        </PrivateRoute>
      },
      {
        path: "create-donation-request",
        element: <PrivateRoute>
          <CreateDonationRequest></CreateDonationRequest>
        </PrivateRoute>
      },
      {
        path: "edit-donation-request/:id",
        element: <PrivateRoute>
          <EditDonationRequest></EditDonationRequest>
        </PrivateRoute>
      },
      {
        path: "all-users",
        element: <PrivateRoute>
          <AllUsers></AllUsers>
        </PrivateRoute>,
      },
      {
        path: "all-donation-requests",
        element: <PrivateRoute>
          <AllDonationRequests></AllDonationRequests>
        </PrivateRoute>
      },
      {
        path: "content-management",
        element: <PrivateRoute>
          <ContentManagement></ContentManagement>
        </PrivateRoute>,
      },
      {
        path: "content-management/add-blog",
        element: <PrivateRoute>
          <AddBlog></AddBlog>
        </PrivateRoute>
      },
    ]
  }
]);

export default Route;