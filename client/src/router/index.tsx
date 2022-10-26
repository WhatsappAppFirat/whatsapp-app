import { createBrowserRouter, Navigate } from "react-router-dom";
import { Auth } from "src/pages/Auth";
import { Login } from "src/pages/Auth/Login";
import { Register } from "src/pages/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
