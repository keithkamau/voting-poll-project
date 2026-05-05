import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./About";
import Login from "./components/auth/login";
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
]);

export default router;
