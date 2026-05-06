import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContexts/authContext";

function Register() {
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
      await doCreateUserWithEmailAndPassword(email, password);
    } catch {
      setErrorMessage("Could not create your account. Try another email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-100'>
      <section className='w-full max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-2xl shadow-cyan-950/40'>
        <h1 className='text-3xl font-black text-slate-950'>Create account</h1>
        <p className='mt-2 text-sm text-slate-500'>
          Register with Firebase email and password authentication.
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
              minLength={6}
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
            className='min-h-11 w-full rounded-lg bg-cyan-600 px-5 font-bold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-300'
          >
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className='mt-5 text-center text-sm text-slate-500'>
          Already have an account?{" "}
          <Link to='/login' className='font-bold text-cyan-700'>
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
