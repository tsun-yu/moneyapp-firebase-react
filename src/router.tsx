import { element } from "prop-types";
import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "src/App";
import Login from "src/pages/Login";
import ErrorPage from "src/pages/ErrorPage";

const route: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //     path: "/books",
  //     element: <Books />,
  // },
];

const router = createBrowserRouter(route);

export default router;
