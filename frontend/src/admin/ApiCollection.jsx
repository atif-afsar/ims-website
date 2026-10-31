import { useEffect, useState } from "react";
import { api } from "../lib/api";
import SchemaForm from "./home/SchemaForm";
import media from "../content/media";

const thumb = (v) => (typeof v === "string" && v ? (v.startsWith("media:") ? media[v.slice(6)]?.src : v) : null);

const btn = "rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50";

/*
 * Generic list manager for a backend collection (see backend/src/collections.js).
 *   fields    SchemaForm fields; image fields store "media:<slug>" or uploaded URLs
 *   summary   (row) => text shown in the list
 *   starter   optional { label, rows } — ready-made items the admin can load in one click
 *   badge     optional (row) => short status text (e.g. "Scheduled")
 */
const Manager = ({ collection, title, help, fields, summary, empty, starter, badge }) => {
  const blank = () => Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? true : f.default ?? ""]));
  const imageField = fields.find((f) => f.type === "image")?.name;
  const [rows, setRows] = useState(null);
  const [draft, setDraft] = useState(null); // row being added/edited
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = () => api.get(`/admin/${collection}`).then(setRows).catch((err) => setMessage({ type: "error", text: err.message }));
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  const save = async () => {
    setBusy(true);
    try {
      const { id, ...body } = draft;
      if (id) await api.put(`/admin/${collection}/${id}`, body);
      else await api.post(`/admin/${collection}`, { ...body, sort_order: rows.length });
      setDraft(null);
      setMessage({ type: "ok", text: "Saved. The website is updated." });
      load();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row) => {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    await api.del(`/admin/${collection}/${row.id}`).catch((err) => setMessage({ type: "error", text: err.message }));
    load();
  };

  const toggle = async (row) => {
    await api.put(`/admin/${collection}/${row.id}`, { is_active: !row.is_active }).catch((err) => setMessage({ type: "error", text: err.message }));
    load();
  };

  const edit = (r) => {
    const next = { ...blank(), ...Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v ?? ""])) };
    // Older hero slides keep their library photo in media_key; show it in the photo picker instead
    if (imageField && !next[imageField] && r.media_key) Object.assign(next, { [imageField]: `media:${r.media_key}`, media_key: "" });
    setDraft(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadStarter = async () => {
    if (!window.confirm(`${starter.label}? You can edit or delete each one afterwards.`)) return;
    setBusy(true);
    try {
      await api.post(`/admin/${collection}`, starter.rows.map((r, i) => ({ ...r, sort_order: (rows?.length || 0) + i })));
      setMessage({ type: "ok", text: "Added. Edit them below." });
      load();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const move = async (i, step) => {
    const next = [...rows];
    [next[i], next[i + step]] = [next[i + step], next[i]];
    setRows(next);
    await api.put(`/admin/${collection}/order`, { ids: next.map((r) => r.id) }).catch((err) => setMessage({ type: "error", text: err.message }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          {help && <p className="text-sm text-gray-600">{help}</p>}
        </div>
        {!draft && (
          <div className="ml-auto flex flex-wrap gap-2">
            {starter && rows?.length > 0 && <button onClick={loadStarter} disabled={busy} className={`${btn} border border-gray-300 bg-white hover:bg-gray-50`}>{starter.label}</button>}
            <button onClick={() => setDraft(blank())} className={`${btn} bg-emerald-700 text-white hover:bg-emerald-600`}>+ Add new</button>
          </div>
        )}
      </div>
      {message && <div className={`rounded-lg px-4 py-3 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`} role="status">{message.text}</div>}

      {draft && (
        <div className="rounded-2xl bg-white p-6 shadow">
          <h4 className="mb-5 text-lg font-bold">{draft.id ? "Edit" : "Add new"}</h4>
          <SchemaForm fields={fields.filter((f) => f.type !== "checkbox")} value={draft} onChange={setDraft} />
          {fields.some((f) => f.type === "checkbox") && (
            <div className="mt-5 space-y-2">
              {fields.filter((f) => f.type === "checkbox").map((f) => (
                <label key={f.name} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={Boolean(draft[f.name])} onChange={(e) => setDraft({ ...draft, [f.name]: e.target.checked })} className="h-4 w-4 accent-emerald-700" />
                  {f.label}
                </label>
              ))}
            </div>
          )}
          <div className="mt-6 flex justify-end gap-2 border-t pt-4">
            <button onClick={() => setDraft(null)} disabled={busy} className={`${btn} border border-gray-300 hover:bg-gray-50`}>Cancel</button>
            <button onClick={save} disabled={busy} className={`${btn} bg-emerald-700 text-white hover:bg-emerald-600`}>{busy ? "Saving…" : "Save"}</button>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white shadow">
        {!rows ? (
          <p className="p-6 text-gray-600">Loading…</p>
        ) : rows.length === 0 ? (
          <div className="p-6 text-gray-600">
            <p>{empty || "Nothing here yet."}</p>
            {starter && <button onClick={loadStarter} disabled={busy} className={`${btn} mt-4 border border-emerald-700 text-emerald-800 hover:bg-emerald-50`}>{starter.label}</button>}
          </div>
        ) : (
          <ol>
            {rows.map((r, i) => (
              <li key={r.id} className={`flex flex-wrap items-center gap-3 border-b px-6 py-4 last:border-0 ${r.is_active === 0 ? "opacity-50" : ""}`}>
                <span className="w-6 text-center text-sm font-bold text-amber-700">{i + 1}</span>
                {imageField && (
                  <span className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100 ring-1 ring-gray-200">
                    {thumb(r[imageField] || (r.media_key ? `media:${r.media_key}` : "")) && <img src={thumb(r[imageField] || `media:${r.media_key}`)} alt="" className="h-full w-full object-cover" />}
                  </span>
                )}
                <p className="min-w-0 flex-1 truncate text-sm text-gray-800">{summary(r)}</p>
                {badge?.(r) && <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">{badge(r)}</span>}
                {"sort_order" in r && (
                  <>
                    <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30" aria-label="Move up">↑</button>
                <button onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30" aria-label="Move down">↓</button>
                  </>
                )}
                {"is_active" in r && <button onClick={() => toggle(r)} className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">{r.is_active ? "Hide" : "Show"}</button>}
                <button onClick={() => edit(r)} className={`${btn} border border-gray-300 hover:bg-gray-50`}>Edit</button>
                <button onClick={() => remove(r)} className="rounded px-2 py-1 text-red-500 hover:bg-red-50" aria-label="Delete">✕</button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

const ApiCollection = Manager;

export default ApiCollection;
