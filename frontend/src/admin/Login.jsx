import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthStatusScreen, useApiAuth } from "./ApiAuth";

const field =
  "mt-1.5 w-full rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-700/10";

/* The only admin login. After signing in you land on the page you asked for, or the dashboard. */
const Login = () => {
  const { status, login } = useApiAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const target = location.state?.from && location.state.from !== "/admin/login" ? location.state.from : "/admin/dashboard";
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  if (status === "checking" || status === "offline") return <AuthStatusScreen />;
  if (status === "in") return <Navigate to={target} replace />;

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      await login(data.get("email"), data.get("password"));
      navigate(target, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-900 bg-[radial-gradient(circle_at_20%_10%,rgba(228,192,98,.18),transparent_45%)] p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <img src="/images/logo/logo.webp" alt="" width="64" height="64" className="h-16 w-16 rounded-full bg-ivory-50 p-1" />
          <h1 className="mt-4 font-display text-2xl font-bold text-ivory-50">Islamic Mission School</h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-eyebrow text-gold-300">Admin Panel</p>
        </div>

        <form onSubmit={submit} className="rounded-3xl bg-ivory-50 p-7 shadow-lift sm:p-8">
          <h2 className="text-xl font-bold text-emerald-900">Sign in</h2>
          <p className="mt-1 text-sm text-gray-600">Manage the website's content, notices and pages.</p>

          <label className="mt-6 block text-sm font-medium text-gray-800">
            Email
            <input name="email" type="email" required autoFocus autoComplete="username" placeholder="you@example.com" className={field} />
          </label>
          <label className="mt-4 block text-sm font-medium text-gray-800">
            Password
            <span className="relative block">
              <input name="password" type={show ? "text" : "password"} required autoComplete="current-password" className={`${field} pr-16`} />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 mt-[3px] -translate-y-1/2 rounded px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50">
                {show ? "Hide" : "Show"}
              </button>
            </span>
          </label>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}

          <button type="submit" disabled={busy} className="mt-6 w-full rounded-xl bg-emerald-700 py-3 font-semibold text-ivory-50 transition hover:bg-emerald-600 disabled:opacity-60">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ivory-100/70">
          <Link to="/" className="hover:text-gold-300">← Back to the website</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
