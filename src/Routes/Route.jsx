import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Banner from '../pages/Home/Banner/Banner';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import Profile from '../pages/Profile/Profile';
import DashboardWelcome from '../pages/DashboardWelcome/DashboardWelcome';
import CreateDonationRequest from '../pages/CreateDonationRequest/CreateDonationRequest';
import MyDonationRequest from '../pages/MyDonationRequest/MyDonationRequest';
import AllUsers from '../pages/AdminDashboard/AllUsers/AllUsers';
import AllDonationRequests from '../pages/AdminDashboard/AllDonationRequests/AllDonationRequests';
import ContentManagement from '../pages/AdminDashboard/ContentManagement/ContentManagement';
import AddBlog from '../pages/AdminDashboard/AddBlog/AddBlog';
import SearchDonor from '../pages/SearchDonor/SearchDonor';
import PendingDonationRequest from '../pages/PendingDonationRequest/PendingDonationRequest';
import DonationRequestDetails from '../pages/DonationRequestDetails/DonationRequestDetails';
import Blog from '../pages/Blog/Blog';
import BlogDetails from '../pages/BlogDetails/BlogDetails';

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Banner></Banner>
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
        element: <DonationRequestDetails></DonationRequestDetails>
      },
      {
        path: "blog-details/:id",
        element: <BlogDetails></BlogDetails>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardWelcome></DashboardWelcome>
      },
      {
        path: "profile",
        element: <Profile></Profile>
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequest></MyDonationRequest>
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "all-donation-requests",
        element: <AllDonationRequests></AllDonationRequests>
      },
      {
        path: "content-management",
        element: <ContentManagement></ContentManagement>,
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog></AddBlog>
      }

    ]
  }
]);

export default Route;