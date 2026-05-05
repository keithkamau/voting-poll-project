import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContexts";

const Register = () => {
  const { userLoggedIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (!isRegistering) {
      setIsRegistering(true);
      setErrorMessage("");
      try {
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (err) {
        setErrorMessage(getFriendlyError(err.code));
        setIsRegistering(false);
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      setErrorMessage("");
      doSignInWithGoogle().catch((err) => {
        setErrorMessage(getFriendlyError(err.code));
        setIsRegistering(false);
      });
    }
  };

  const getFriendlyError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Register</h2>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {errorMessage}
          </p>
        )}
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            disabled={isRegistering}
            className="bg-cyan-500 text-white font-bold py-2 rounded-lg hover:bg-cyan-600 transition disabled:opacity-50"
          >
            {isRegistering ? "Creating account..." : "Register"}
          </button>
        </form>
        <button
          onClick={onGoogleSignIn}
          disabled={isRegistering}
<<<<<<< HEAD
          className="mt-4 w-full flex items-center flex-row justify-center border border-slate-300 py-2 rounded-lg font-bold hover:bg-slate-50 transition disabled:opacity-50"
        > <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google Icon" className="w-5 h-5 mr-4" />
          Sign up with Google
=======
          className="mt-4 w-full border border-slate-300 py-2 rounded-lg font-bold hover:bg-slate-50 transition disabled:opacity-50"
        >
          Register with Google
>>>>>>> a7c5db378e5169029aa4ff068bfb3c6c80e2b095
        </button>
        <p className="mt-4 text-sm text-slate-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-500 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
