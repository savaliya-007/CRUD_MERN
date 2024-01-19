import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../Components/Pages/Home";
import AdiminBoard from "../Components/Admin/Board";
import Layout from "../Components/UI/Layout";
import Profile from "../Components/Pages/Profile";

export const mainUserRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

const mainAdminRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },

      { path: "/admin", element: <AdiminBoard /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);
export default mainAdminRouter;
