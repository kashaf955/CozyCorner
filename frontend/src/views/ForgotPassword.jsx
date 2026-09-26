import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../components/layout/metadata.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import { forgotPassword, clearErrors } from "../actions/userAction.js";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, message, error } = useSelector((state) => state.forgotPassword);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [error, message, alert, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0f1714] px-6 pt-24 pb-16">
      <Metadata title="Forgot Password" />
      <div className="w-full max-w-md rounded-lg bg-[#15201c] p-8">
        <h1 className="font-display text-3xl text-mist">Forgot Password</h1>
        <p className="mt-2 text-mist-70">
          Enter your email and we&apos;ll send a reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-mist-70">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none focus:border-[#3d6b54]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63] disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-mist-70">
          <Link to="/login" className="text-mist underline underline-offset-4">
            Back to Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
