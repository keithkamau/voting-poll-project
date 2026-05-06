import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/authContexts";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./index.css";

const App = lazy(() => import("./App.jsx"));
const About = lazy(() => import("./About.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <main className='flex min-h-screen items-center justify-center bg-slate-950 text-slate-100'>
              Loading...
            </main>
          }
        >
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
