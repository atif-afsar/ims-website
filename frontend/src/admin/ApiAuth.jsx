import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

/*
 * Admin session with the Node backend (httpOnly cookie). One login covers
 * the whole admin panel: <ProtectedRoute> sends visitors without a session
 * to /admin/login, and every admin page can assume it is logged in.
 *
 *   status: "checking" | "in" | "out" | "offline"
 */
const ApiAuthContext = createContext(null);

export const ApiAuthProvider = ({ children }) => {
  const [state, setState] = useState({ status: "checking", user: null, error: null });

  const check = useCallback(() => {
    setState((s) => ({ ...s, status: "checking" }));
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

/* Shown while the session is checked, or when the server can't be reached */
export const AuthStatusScreen = () => {
  const auth = useApiAuth();
  if (auth.status === "offline") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory-50 p-6">
        <div className="max-w-md rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
          <p className="font-semibold">The website server is not reachable.</p>
          <p className="mt-1 text-sm">{auth.error}. Make sure the backend is running, then try again.</p>
          <button onClick={auth.retry} className="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500">Try again</button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-50 text-sm text-emerald-800" role="status">
      <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-emerald-700 border-t-transparent" aria-hidden="true" />
      Checking your session…
    </div>
  );
};
