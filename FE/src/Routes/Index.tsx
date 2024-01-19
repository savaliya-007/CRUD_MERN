import React from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { RootState } from "../Store/store";
import authRouter from "./authRoutes";
import mainAdminRouter, { mainUserRouter } from "./mainRoutes";

const IndexRoutes: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth.role);
  let router = authRouter;

  if (auth) {
    router = auth === "admin" ? mainAdminRouter : mainUserRouter;
  }

  console.log("auth, router", auth, router);
  return <RouterProvider router={router} />;
};

export default IndexRoutes;
