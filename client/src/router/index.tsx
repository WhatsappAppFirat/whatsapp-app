import { createBrowserRouter, Navigate } from "react-router-dom";
import { Auth } from "src/pages/Auth";
import { Login } from "src/pages/Auth/Login";
import { Register } from "src/pages/Auth/Register";
import { Layout } from "src/components/Layout";
import { Home } from "src/pages/Home";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <Layout>
            <Home />
          </Layout>
        ),
      },
      {
        path: "/login",
        element: (
          <Auth>
            <Login />
          </Auth>
        ),
      },
      {
        path: "/register",
        element: (
          <Auth>
            <Register />
          </Auth>
        ),
      },
    ],
  },
]);
