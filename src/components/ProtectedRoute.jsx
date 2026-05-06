import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContexts/authContext";

function ProtectedRoute({ children }) {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    return <Navigate to='/login' replace />;
  }

  return children;
}

export default ProtectedRoute;
