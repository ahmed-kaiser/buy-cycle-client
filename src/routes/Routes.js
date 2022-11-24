import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../layout/Root";
import Category from "../pages/Category/Category";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

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
        }
    ]);
    return (
        <RouterProvider router={router} />
    );
};

export default Routes;