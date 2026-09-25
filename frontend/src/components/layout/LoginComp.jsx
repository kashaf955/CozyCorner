import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userAction.js";
const LoginComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, isAuthenticated, message } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  useEffect(() => {
    if (message) {
      alert.error(message);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      if (loginSubmitted) {
        alert.success("Login successful.");
      }
      navigate("/");
    }
  }, [message, isAuthenticated, loginSubmitted, alert, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginSubmitted(true);
    dispatch(login(email, password));
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0f1714] px-6 pt-24 pb-16">
      <div className="w-full max-w-md rounded-lg bg-[#15201c] p-8">
        <h1 className="font-display text-3xl text-mist md:text-4xl">Welcome back</h1>
        <p className="mt-2 text-mist-70">Sign in to continue to Cozy Corner.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-mist-70">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none placeholder:text-white/35 focus:border-[#3d6b54]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-mist-70">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none placeholder:text-white/35 focus:border-[#3d6b54]"
            />
          </div>

          {message && (
            <p className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-mist-70">
          No account?{" "}
          <Link to="/register" className="text-mist underline underline-offset-4">
            Register
          </Link>
          {" · "}
          <Link to="/password/forgot" className="text-mist underline underline-offset-4">
            Forgot Password?
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginComp;