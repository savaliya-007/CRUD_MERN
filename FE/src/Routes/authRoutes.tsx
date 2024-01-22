import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../Components/auth/Login";
import SignUp from "../Components/auth/SignUp";
import Layout from "../Components/UI/Layout/Layout";

const authRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/auth/login", element: <Login /> },
      {
        path: "/auth/signin",
        element: <SignUp />,
      },
      { path: "*", element: <Navigate to="/auth/login" /> },
    ],
  },
]);
export default authRouter;
