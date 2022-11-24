import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../layout/Root";
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
                }
            ]
        }
    ]);
    return (
        <RouterProvider router={router} />
    );
};

export default Routes;