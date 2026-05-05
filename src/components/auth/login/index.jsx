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
          className='mt-4 w-full border border-slate-300 py-2 rounded-lg font-bold hover:bg-slate-50 transition disabled:opacity-50'
        >
          <button
  onClick={onGoogleSignIn}
  disabled={isSigningIn}
  className='mt-4 w-full border border-slate-300 py-2 rounded-lg font-bold hover:bg-slate-50 transition disabled:opacity-50 flex items-center justify-center gap-3'
>
  <img
    src='https://www.svgrepo.com/show/303108/google-icon-logo.svg'
    alt='Google Icon'
    className='w-5 h-5'
  />
  Sign in with Google
</button>
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
