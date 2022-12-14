import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProduct from "../dashboardPages/AddProduct";
import AllBuyer from "../dashboardPages/AllBuyer";
import AllSeller from "../dashboardPages/AllSeller";
import Dashboard from "../dashboardPages/Dashboard";
import MyBooking from "../dashboardPages/MyBooking";
import MyBuyers from "../dashboardPages/MyBuyers";
import MyProducts from "../dashboardPages/MyProducts";
import MyWishlist from "../dashboardPages/MyWishlist";
import Payment from "../dashboardPages/Payment/Payment";
import ReportedItem from "../dashboardPages/ReportedItem";
import DashboardRoot from "../layout/DashboardRoot";
import Root from "../layout/Root";
import Blog from "../pages/Blog/Blog";
import Category from "../pages/Category/Category";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import RequireAdmin from "../privateRoute/RequireAdmin";
import RequiredAuth from "../privateRoute/RequiredAuth";
import RequiredSellerAccount from "../privateRoute/RequiredSellerAccount";

const Routes = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            errorElement: <Error />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/sign-in',
                    element: <SignIn />
                },
                {
                    path: '/sign-up',
                    element: <SignUp />
                },
                {
                    path: '/blog',
                    element: <Blog />
                },
                {
                    path: '/category/:id',
                    element: <RequiredAuth><Category /></RequiredAuth>,
                }
            ]
        },
        {
            path: '/dashboard',
            element: <RequiredAuth><DashboardRoot /></RequiredAuth>,
            errorElement: <Error />,
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />
                },
                {
                    path: '/dashboard/my-booking',
                    element: <MyBooking />
                },
                {
                    path: '/dashboard/my-wishlist',
                    element: <MyWishlist />
                },
                {
                    path: '/dashboard/payment/:id',
                    element: <Payment />
                },
                {
                    path: '/dashboard/add-product',
                    element: <RequiredSellerAccount><AddProduct /></RequiredSellerAccount>
                },
                {
                    path: '/dashboard/products',
                    element: <RequiredSellerAccount><MyProducts /></RequiredSellerAccount>
                },
                {
                    path: '/dashboard/my-buyers',
                    element: <RequiredSellerAccount><MyBuyers /></RequiredSellerAccount>
                },
                {
                    path: '/dashboard/all-seller',
                    element: <RequireAdmin><AllSeller /></RequireAdmin>
                },
                {
                    path: '/dashboard/all-buyer',
                    element: <RequireAdmin><AllBuyer /></RequireAdmin>
                },
                {
                    path: '/dashboard/reported-item',
                    element: <RequireAdmin><ReportedItem /></RequireAdmin>
                }
            ]
        }
    ]);
    return (
        <RouterProvider router={router} />
    );
};

export default Routes;