import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./About";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <App /> },
      { path: "/about", element: <About /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
