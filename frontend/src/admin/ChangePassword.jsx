import { useState } from "react";
import { api } from "../lib/api";

const field = "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20";

/* Change the admin password (at least 10 characters) */
const ChangePassword = () => {
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("next") !== data.get("confirm")) return setMessage({ type: "error", text: "The new passwords don't match." });
    setBusy(true);
    try {
      await api.post("/auth/password", { current: data.get("current"), next: data.get("next") });
      form.reset();
      setMessage({ type: "ok", text: "Password changed. Use the new one next time you sign in." });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Change Password</h3>
        <p className="text-sm text-gray-600">Use at least 10 characters. A short sentence is easy to remember and hard to guess.</p>
      </div>
      <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-6 shadow">
        <label className="block text-sm font-medium text-gray-700">Current password<input name="current" type="password" required autoComplete="current-password" className={field} /></label>
        <label className="block text-sm font-medium text-gray-700">New password<input name="next" type="password" required minLength={10} autoComplete="new-password" className={field} /></label>
        <label className="block text-sm font-medium text-gray-700">Repeat new password<input name="confirm" type="password" required minLength={10} autoComplete="new-password" className={field} /></label>
        {message && <p className={`rounded-lg px-3 py-2 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`} role="status">{message.text}</p>}
        <button type="submit" disabled={busy} className="w-full rounded-lg bg-emerald-700 py-2.5 font-semibold text-white hover:bg-emerald-600 disabled:opacity-60">{busy ? "Saving…" : "Change password"}</button>
      </form>
    </div>
  );
};

export default ChangePassword;
