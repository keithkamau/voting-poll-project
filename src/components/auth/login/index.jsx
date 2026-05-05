import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContexts";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage(""); // clear previous errors
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (err) {
        setErrorMessage(getFriendlyError(err.code));
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage(""); // clear previous errors
      doSignInWithGoogle().catch((err) => {
        setErrorMessage(getFriendlyError(err.code));
        setIsSigningIn(false);
      });
    }
  };

  //Converts Firebase error codes into readable messages
  const getFriendlyError = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-credential":
        return "Invalid email or password.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  if (userLoggedIn) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-950'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Sign In</h2>

        {errorMessage && (
          <p className='text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2'>
            {errorMessage}
          </p>
        )}

        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500'
          />
          <button
            type='submit'
            disabled={isSigningIn}
            className='bg-cyan-500 text-white font-bold py-2 rounded-lg hover:bg-cyan-600 transition disabled:opacity-50'
          >
            {isSigningIn ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <button
          onClick={onGoogleSignIn}
          disabled={isSigningIn}
<<<<<<< HEAD
          className='mt-4 w-full flex items-center flex-row justify-center border border-slate-300 py-2 rounded-lg font-bold hover:bg-slate-50 transition disabled:opacity-50'
        > <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google Icon" className="w-5 h-5 mr-4" />
          Sign in with Google
=======
          className='mt-4 w-full border border-slate-300 py-2 rounded-lg font-bold hover:bg-slate-50 transition disabled:opacity-50'
        >
          <button
  onClick={onGoogleSignIn}
  disabled={isSigningIn}
  className='mt-4 w-full border border-slate-300 py-2 rounded-lg font-bold hover:bg-slate-50 transition disabled:opacity-50 flex items-center justify-center gap-3'
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
  Sign in with Google
</button>
>>>>>>> a7c5db378e5169029aa4ff068bfb3c6c80e2b095
        </button>

        <p className='mt-4 text-sm text-slate-500 text-center'>
          Don't have an account?{" "}
          <Link to='/register' className='text-cyan-500 font-semibold'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
