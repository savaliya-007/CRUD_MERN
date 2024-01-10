import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
type AppRoutes = {
  name: string;
  path: string;
  component: React.FC;
  auth?: boolean;
  exact?: boolean;
  role?: string;
}[];
const APP_ROUTE: AppRoutes = [
  {
    name: "home",
    path: "/home",
    component: React.lazy(() => import("./Components/home/Home.tsx")),
    exact: true,
  },
  {
    name: "create-form",
    path: "/user/create",
    component: React.lazy(() => import("./Components/form/FormComponent.tsx")),
    exact: true,
  },
  {
    name: "update-form",
    path: "/user/update",
    component: React.lazy(() => import("./Components/form/FormComponent.tsx")),
    exact: true,
  },
];
function App() {
  return (
    <Routes>
      {APP_ROUTE.map((route) => {
        return <Route {...route} />;
      })}
    </Routes>
  );
}

export default App;
