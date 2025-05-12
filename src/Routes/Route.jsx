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
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
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
    ]
  }
]);

export default Route;