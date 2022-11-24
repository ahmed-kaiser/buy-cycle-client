import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";

const Routes = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: '/',
                    element: <Home />
                }
            ]
        }
    ]);
    return (
        <RouterProvider router={router} />
    );
};

export default Routes;