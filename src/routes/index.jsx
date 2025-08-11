import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import PageNotFound from "../pages/page-not-found";
import PathConstants from "./pathConstants";
import PrivateRoutesComponent from "./PrivateRoutesComponent";
import PrivateRoutes from "./PrivateRoutes";
import RegisterPage from "../pages/auth/register";
import VerifyPage from "../pages/auth/verify-account";
import LoginPage from "../pages/auth/login";
import Unauthorized from "../pages/unauthorized";

const Home = lazy(() => import("../pages/home"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      { element: <PrivateRoutesComponent />, children: PrivateRoutes },
      {
        path: PathConstants.Home,
        element: <Home />,
      },
      { element: <RegisterPage />, path: PathConstants.Register },
      { element: <LoginPage />, path: PathConstants.Login },
      { element: <VerifyPage />, path: PathConstants.Verify },
      { element: <Unauthorized />, path: PathConstants.Unauthorized },
    ],
  },
]);

export default router;
