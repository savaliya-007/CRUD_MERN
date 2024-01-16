import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./Components/home/Home";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import AdiminBoard from "./Components/Admin/Board";
import Layout from "./Components/UI/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: localStorage.getItem("auth")
      ? [
          {
            path: "/",
            element: <Home />,
          },

          { path: "/admin", element: <AdiminBoard /> },
          { path: "*", element: <Navigate to="/" /> },
        ]
      : [
          { path: "/auth/login", element: <Login /> },
          {
            path: "/auth/signin",
            element: <SignUp />,
          },
          { path: "*", element: <Navigate to="/auth/login" /> },
        ],
  },
]);
export default router;
