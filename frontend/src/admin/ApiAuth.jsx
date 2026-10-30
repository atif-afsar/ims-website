import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

/*
 * Session with the Node backend (cookie-based). Admin pages that use the
 * new API are wrapped in <ApiAuthGate>, which shows a login form when needed.
 */
const ApiAuthContext = createContext(null);

export const ApiAuthProvider = ({ children }) => {
  const [state, setState] = useState({ status: "checking", user: null, error: null });

  const check = useCallback(() => {
    api
      .get("/auth/me")
      .then(({ user }) => setState({ status: "in", user, error: null }))
      .catch((err) => setState({ status: err.status === 401 ? "out" : "offline", user: null, error: err.message }));
  }, []);

  useEffect(check, [check]);

  const login = async (email, password) => {
    const { user } = await api.post("/auth/login", { email, password });
    setState({ status: "in", user, error: null });
  };
  const logout = async () => {
    await api.post("/auth/logout").catch(() => {});
    setState({ status: "out", user: null, error: null });
  };

  return <ApiAuthContext.Provider value={{ ...state, login, logout, retry: check }}>{children}</ApiAuthContext.Provider>;
};

export const useApiAuth = () => useContext(ApiAuthContext);

const field = "w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20";

const LoginForm = () => {
  const { login } = useApiAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      await login(data.get("email"), data.get("password"));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-6 max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow">
      <h4 className="text-lg font-semibold text-gray-900">Log in to the website server</h4>
      <p className="text-sm text-gray-600">Use the admin account created with <code>npm run create-admin</code>.</p>
      <label className="block text-sm font-medium text-gray-700">Email<input name="email" type="email" required autoComplete="username" className={`mt-1 ${field}`} /></label>
      <label className="block text-sm font-medium text-gray-700">Password<input name="password" type="password" required autoComplete="current-password" className={`mt-1 ${field}`} /></label>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
      <button type="submit" disabled={busy} className="w-full rounded-lg bg-emerald-700 py-2.5 font-semibold text-white hover:bg-emerald-600 disabled:opacity-60">{busy ? "Logging in…" : "Log in"}</button>
    </form>
  );
};

export const ApiAuthGate = ({ children }) => {
  const auth = useApiAuth();
  if (auth.status === "checking") return <p className="p-6 text-gray-600">Connecting to the website server…</p>;
  if (auth.status === "offline") {
    return (
      <div className="m-6 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
        <p className="font-semibold">The website server is not reachable.</p>
        <p className="mt-1 text-sm">{auth.error}. Start it with <code>npm run dev</code> in the <code>backend</code> folder, then try again.</p>
        <button onClick={auth.retry} className="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white">Try again</button>
      </div>
    );
  }
  if (auth.status === "out") return <LoginForm />;
  return children;
};
