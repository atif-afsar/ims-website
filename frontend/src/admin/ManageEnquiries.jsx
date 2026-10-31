import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";

const btn = "rounded-lg px-3 py-1.5 text-sm font-semibold transition disabled:opacity-50";

const FILTERS = [
  { key: "new", label: "New" },
  { key: "replied", label: "Replied" },
  { key: "all", label: "All" },
];

const when = (ts) => {
  if (!ts) return "";
  const d = new Date(String(ts).replace(" ", "T") + "Z");
  return Number.isNaN(d.getTime()) ? ts : d.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
};

// Digits only, with India's country code, for a WhatsApp link
const waNumber = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "").replace(/^0+/, "");
  return digits.length === 10 ? `91${digits}` : digits;
};

/* Messages sent through the website's contact form */
const ManageEnquiries = () => {
  const [rows, setRows] = useState(null);
  const [filter, setFilter] = useState("new");
  const [openId, setOpenId] = useState(null);
  const [message, setMessage] = useState(null);

  const load = useCallback(() => api.get("/admin/enquiries").then(setRows).catch((err) => setMessage({ type: "error", text: err.message })), []);
  useEffect(() => {
    load();
  }, [load]);

  const update = async (row, changes) => {
    setRows((list) => list.map((r) => (r.id === row.id ? { ...r, ...changes } : r)));
    await api.put(`/admin/enquiries/${row.id}`, changes).catch((err) => setMessage({ type: "error", text: err.message }));
    window.dispatchEvent(new Event("ims-enquiries-changed"));
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete the message from ${row.name}? This cannot be undone.`)) return;
    await api.del(`/admin/enquiries/${row.id}`).catch((err) => setMessage({ type: "error", text: err.message }));
    window.dispatchEvent(new Event("ims-enquiries-changed"));
    load();
  };

  const counts = { new: rows?.filter((r) => r.status === "new").length || 0, replied: rows?.filter((r) => r.status === "replied").length || 0, all: rows?.length || 0 };
  const shown = (rows || []).filter((r) => filter === "all" || r.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Enquiries</h3>
        <p className="text-sm text-gray-600">Messages from the website’s contact form. They are also emailed to the school. Mark each one “Replied” once someone has answered.</p>
      </div>
      {message && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{message.text}</div>}

      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} className={`${btn} ${filter === f.key ? "bg-emerald-700 text-white" : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}>
            {f.label} <span className="opacity-70">({counts[f.key]})</span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white shadow">
        {!rows ? (
          <p className="p-6 text-gray-600">Loading…</p>
        ) : shown.length === 0 ? (
          <p className="p-6 text-gray-600">{filter === "new" ? "No new enquiries. 🎉" : "Nothing here."}</p>
        ) : (
          <ul>
            {shown.map((r) => {
              const open = openId === r.id;
              return (
                <li key={r.id} className="border-b last:border-0">
                  <button onClick={() => setOpenId(open ? null : r.id)} className="flex w-full flex-wrap items-center gap-3 px-6 py-4 text-left hover:bg-gray-50" aria-expanded={open}>
                    {r.status === "new" && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" aria-label="New" />}
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-gray-900 ${r.status === "new" ? "font-bold" : "font-medium"}`}>{r.name}{r.subject ? ` — ${r.subject}` : ""}</span>
                      <span className="block truncate text-sm text-gray-500">{r.message}</span>
                    </span>
                    <span className="shrink-0 text-xs text-gray-500">{when(r.created_at)}</span>
                  </button>
                  {open && (
                    <div className="space-y-4 bg-gray-50 px-6 py-5">
                      <dl className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                        {r.phone && <div><dt className="text-gray-500">Phone</dt><dd><a href={`tel:${r.phone}`} className="font-medium text-emerald-700 hover:underline">{r.phone}</a> · <a href={`https://wa.me/${waNumber(r.phone)}`} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">WhatsApp</a></dd></div>}
                        {r.email && <div><dt className="text-gray-500">Email</dt><dd><a href={`mailto:${r.email}?subject=${encodeURIComponent(`Re: ${r.subject || "Your enquiry"} — Islamic Mission School`)}`} className="font-medium text-emerald-700 hover:underline">{r.email}</a></dd></div>}
                        {r.subject && <div><dt className="text-gray-500">Subject</dt><dd className="font-medium text-gray-800">{r.subject}</dd></div>}
                        {r.page && <div><dt className="text-gray-500">Sent from page</dt><dd className="text-gray-800">{r.page}</dd></div>}
                      </dl>
                      <p className="whitespace-pre-line rounded-xl bg-white p-4 text-gray-800 ring-1 ring-gray-200">{r.message}</p>
                      <label className="block text-sm font-semibold text-gray-700">
                        Notes for the team (only visible here)
                        <textarea rows={2} defaultValue={r.notes || ""} onBlur={(e) => e.target.value !== (r.notes || "") && update(r, { notes: e.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal focus:border-emerald-700 focus:outline-none" placeholder="e.g. Called on 2 Nov, visiting Saturday" />
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {r.status === "new" ? (
                          <button onClick={() => update(r, { status: "replied" })} className={`${btn} bg-emerald-700 text-white hover:bg-emerald-600`}>Mark as replied</button>
                        ) : (
                          <button onClick={() => update(r, { status: "new" })} className={`${btn} border border-gray-300 bg-white hover:bg-gray-50`}>Mark as new</button>
                        )}
                        <button onClick={() => remove(r)} className={`${btn} ml-auto text-red-600 hover:bg-red-50`}>Delete</button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageEnquiries;
