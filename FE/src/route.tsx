import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./Components/home/Home";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import AdiminBoard from "./Components/Admin/Board";
import Layout from "./Components/UI/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [],
      },
      { path: "/auth/login", element: <Login /> },
      {
        path: "/auth/signin",
        element: <SignUp />,
      },
      { path: "/admin", element: <AdiminBoard /> },
      { path: "*", element: <CheckAuth /> },
    ],
  },
]);
export default router;

function CheckAuth() {
  const token = localStorage.getItem("token");
  return <Navigate to={token ? "/" : "/auth/login"} replace={true} />;
}
