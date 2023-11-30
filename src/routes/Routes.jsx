import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Checkout from "../pages/Checkout/Checkout";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/checkout/:id",
                element: <PrivateRoutes><Checkout /></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://car-doctors-server-pink.vercel.app/services/${params.id}`)
            },
            {
                path: "/bookings",
                element: <PrivateRoutes><Bookings /></PrivateRoutes>
            }
        ]
    },
]);