import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProduct from "../dashboardPages/AddProduct";
import Dashboard from "../dashboardPages/Dashboard";
import MyProducts from "../dashboardPages/MyProducts";
import DashboardRoot from "../layout/DashboardRoot";
import Root from "../layout/Root";
import Category from "../pages/Category/Category";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import RequiredAuth from "../privateRoute/RequiredAuth";

const Routes = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
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
                    path: '/category/:id',
                    element: <Category />
                }
            ]
        },
        {
            path: '/dashboard',
            element: <RequiredAuth><DashboardRoot /></RequiredAuth>,
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />
                },
                {
                    path: '/dashboard/add-product',
                    element: <AddProduct />
                },
                {
                    path: '/dashboard/products',
                    element: <MyProducts />
                }
            ]
        }
    ]);
    return (
        <RouterProvider router={router} />
    );
};

export default Routes;