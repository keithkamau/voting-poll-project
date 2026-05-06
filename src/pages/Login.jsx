import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContexts/authContext";

function Login() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (userLoggedIn) {
    return <Navigate to='/' replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch {
      setErrorMessage("Could not sign in. Check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await doSignInWithGoogle();
    } catch {
      setErrorMessage("Google sign-in was cancelled or failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-100'>
      <section className='w-full max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-2xl shadow-cyan-950/40'>
        <h1 className='text-3xl font-black text-slate-950'>Sign in</h1>
        <p className='mt-2 text-sm text-slate-500'>
          Sign in to access the protected voting poll.
        </p>

        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
          <div>
            <label htmlFor='email' className='text-sm font-bold text-slate-700'>
              Email
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className='mt-2 min-h-11 w-full rounded-lg border border-slate-300 px-4 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100'
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='text-sm font-bold text-slate-700'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className='mt-2 min-h-11 w-full rounded-lg border border-slate-300 px-4 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100'
            />
          </div>

          {errorMessage ? (
            <p className='text-sm font-semibold text-rose-600'>
              {errorMessage}
            </p>
          ) : null}

          <button
            type='submit'
            disabled={isSubmitting}
            className='min-h-11 w-full rounded-lg bg-indigo-600 px-5 font-bold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-300'
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <button
          type='button'
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className='mt-3 min-h-11 w-full rounded-lg border border-slate-300 px-5 font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100'
        >
          Sign in with Google
        </button>

        <p className='mt-5 text-center text-sm text-slate-500'>
          Need an account?{" "}
          <Link to='/register' className='font-bold text-cyan-700'>
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
