import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import RegisterPage from "./pages/Register";
import CreatorPage from "./pages/Creator";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import CRUDPage from "./pages/CRUD";
import { UserProvider } from "./context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/creator",
    element: <CreatorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/crud",
    element: <CRUDPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
