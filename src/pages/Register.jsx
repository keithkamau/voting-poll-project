import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContexts/authContext";

function Register() {
  const { userLoggedIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (userLoggedIn) {
    return <Navigate to='/' replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
      
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await doCreateUserWithEmailAndPassword(email, password);
    } catch {
      setErrorMessage("Could not create your account. Try another email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    setErrorMessage("Google sign-in is not available yet.");
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-950'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Register</h2>
        {errorMessage && (
          <p className='text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2'>
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500'
          />
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
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500'
          />
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-cyan-500 text-white font-bold py-2 rounded-lg hover:bg-cyan-600 transition disabled:opacity-50'
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className='mt-4 w-full flex items-center justify-center border border-slate-300 py-2 rounded-lg font-bold hover:bg-slate-50 transition disabled:opacity-50 gap-3'
        >
          <svg className='w-5 h-5' viewBox='0 0 48 48'>
            <path
              fill='#EA4335'
              d='M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.07-6.07C34.46 3.1 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.05 5.48C12.4 13.61 17.73 9.5 24 9.5z'
            />
            <path
              fill='#4285F4'
              d='M46.52 24.5c0-1.64-.15-3.22-.42-4.74H24v8.98h12.7c-.55 2.96-2.2 5.47-4.68 7.16l7.18 5.58C43.36 37.26 46.52 31.36 46.52 24.5z'
            />
            <path
              fill='#FBBC05'
              d='M10.69 28.3A14.6 14.6 0 0 1 9.5 24c0-1.49.26-2.93.69-4.3L3.14 14.22A23.94 23.94 0 0 0 0 24c0 3.86.92 7.5 2.56 10.72l8.13-6.42z'
            />
            <path
              fill='#34A853'
              d='M24 47c5.5 0 10.12-1.82 13.5-4.94l-7.18-5.58c-1.82 1.22-4.15 1.95-6.32 1.95-6.27 0-11.6-4.11-13.31-9.7l-7.05 5.48C7.07 41.52 14.82 47 24 47z'
            />
          </svg>
          Sign up with Google
        </button>
        <p className='mt-4 text-sm text-slate-500 text-center'>
          Already have an account?{" "}
          <Link to='/login' className='text-cyan-500 font-semibold'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
