import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContexts";

export default function ProtectedRoute() {
  const { loading, userLoggedIn } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-100 text-xl font-semibold animate-pulse">
          Loading...
        </div>
      </main>
    );
  }

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
