import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import NotFound from "../Components/NotFound";

export const router = createBrowserRouter([
    PublicRoutes,
    PrivateRoutes,
    AuthRoutes,
    { path: '*', element: <NotFound /> }
]);