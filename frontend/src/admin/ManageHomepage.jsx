import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { homeSections, sectionByKey, resolveHomeSections } from "../content/homeSections";
import SchemaForm from "./home/SchemaForm";
import SectionPreview from "./home/SectionPreview";

const btn = "rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50";

/*
 * Homepage builder: reorder sections, show/hide them, and edit each
 * section's text, photos and lists. Content is merged over the defaults in
 * content/homeSections.js, so nothing breaks if a field is left empty.
 */
const Builder = () => {
    const [sections, setSections] = useState(null); // [{ key, visible, content }]
  const [savedOrder, setSavedOrder] = useState("");
  const [editing, setEditing] = useState(null); // section key
  const [draft, setDraft] = useState(null);
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const saved = await api.get("/admin/home/sections");
    const resolved = resolveHomeSections(saved);
    setSections(resolved);
    setSavedOrder(JSON.stringify(resolved.map((s) => [s.key, s.visible])));
  };

  useEffect(() => {
    load().catch((err) => setMessage({ type: "error", text: err.message }));
  }, []);

  const orderDirty = useMemo(() => sections && JSON.stringify(sections.map((s) => [s.key, s.visible])) !== savedOrder, [sections, savedOrder]);

  const flash = (text, type = "ok") => {
    setMessage({ type, text });
    if (type === "ok") setTimeout(() => setMessage(null), 4000);
  };

  const move = (i, step) => {
    const next = [...sections];
    [next[i], next[i + step]] = [next[i + step], next[i]];
    setSections(next);
  };
  const toggle = (key) => setSections(sections.map((s) => (s.key === key ? { ...s, visible: !s.visible } : s)));

  const saveOrder = async () => {
    setBusy(true);
    try {
      await api.put("/admin/home/order", { sections: sections.map((s) => ({ section_key: s.key, is_visible: s.visible })) });
      setSavedOrder(JSON.stringify(sections.map((s) => [s.key, s.visible])));
      flash("Section order and visibility saved. The homepage is updated.");
    } catch (err) {
      flash(err.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (key) => {
    setEditing(key);
    setDraft(structuredClone(sections.find((s) => s.key === key).content));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveContent = async () => {
    setBusy(true);
    try {
      await api.put(`/admin/home/sections/${editing}`, { content: draft });
      setSections(sections.map((s) => (s.key === editing ? { ...s, content: draft } : s)));
      flash(`“${sectionByKey[editing].label}” saved. The homepage is updated.`);
      setEditing(null);
    } catch (err) {
      flash(err.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const resetContent = async () => {
    if (!window.confirm("Restore this section’s original text and photos? Your changes to it will be lost.")) return;
    setBusy(true);
    try {
      await api.del(`/admin/home/sections/${editing}`);
      const defaults = structuredClone(sectionByKey[editing].defaults);
      setSections(sections.map((s) => (s.key === editing ? { ...s, content: defaults } : s)));
      setDraft(defaults);
      flash("Section restored to the original content.");
    } catch (err) {
      flash(err.message, "error");
    } finally {
      setBusy(false);
    }
  };

  if (!sections) return <p className="p-6 text-gray-600">{message?.text || "Loading homepage…"}</p>;

  const def = editing && sectionByKey[editing];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Homepage</h3>
          <p className="text-sm text-gray-600">Choose which sections appear, their order, and what they say. Press <b>Edit</b> on a section to change its text and photos — a live preview shows the result before you save.</p>
        </div>
        <div className="ml-auto flex gap-2">
          <a href="/" target="_blank" rel="noreferrer" className={`${btn} border border-gray-300 bg-white hover:bg-gray-50`}>View homepage ↗</a>
        </div>
      </div>

      {message && (
        <div className={`rounded-lg px-4 py-3 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`} role="status">{message.text}</div>
      )}

      {editing ? (
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="mb-6 flex flex-wrap items-start gap-3 border-b pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Editing section</p>
              <h4 className="text-xl font-bold text-gray-900">{def.label}</h4>
              <p className="mt-1 max-w-2xl text-sm text-gray-600">{def.help}</p>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              <button onClick={resetContent} disabled={busy} className={`${btn} text-gray-600 hover:bg-gray-100`}>Restore original</button>
              <button onClick={() => setEditing(null)} disabled={busy} className={`${btn} border border-gray-300 hover:bg-gray-50`}>Cancel</button>
              <button onClick={saveContent} disabled={busy} className={`${btn} bg-emerald-700 text-white hover:bg-emerald-600`}>{busy ? "Saving…" : "Save section"}</button>
            </div>
          </div>
          <div className="grid gap-8 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div>
              <SchemaForm fields={def.fields} value={draft} onChange={setDraft} />
              <div className="mt-8 flex justify-end gap-2 border-t pt-4">
                <button onClick={() => setEditing(null)} disabled={busy} className={`${btn} border border-gray-300 hover:bg-gray-50`}>Cancel</button>
                <button onClick={saveContent} disabled={busy} className={`${btn} bg-emerald-700 text-white hover:bg-emerald-600`}>{busy ? "Saving…" : "Save section"}</button>
              </div>
            </div>
            <div className="xl:sticky xl:top-4 xl:self-start">
              <SectionPreview sectionKey={editing} content={draft} />
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-white shadow">
          <div className="flex items-center justify-between gap-3 border-b px-6 py-4">
            <p className="text-sm text-gray-600">Sections appear on the homepage from top to bottom.</p>
            <button onClick={saveOrder} disabled={!orderDirty || busy} className={`${btn} bg-emerald-700 text-white hover:bg-emerald-600`}>
              {orderDirty ? "Save order & visibility" : "Order saved"}
            </button>
          </div>
          <ol>
            {sections.map((s, i) => {
              const d = sectionByKey[s.key];
              return (
                <li key={s.key} className={`flex flex-wrap items-center gap-3 border-b px-6 py-4 last:border-0 ${s.visible ? "" : "bg-gray-50"}`}>
                  <span className="w-6 text-center text-sm font-bold text-amber-700">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`font-semibold ${s.visible ? "text-gray-900" : "text-gray-400 line-through"}`}>{d.label}</p>
                    <p className="truncate text-xs text-gray-500">{d.help}</p>
                  </div>
                  {!d.locked && (
                    <>
                      <button onClick={() => move(i, -1)} disabled={i <= 1} className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30" aria-label={`Move ${d.label} up`}>↑</button>
                      <button onClick={() => move(i, 1)} disabled={i === sections.length - 1} className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30" aria-label={`Move ${d.label} down`}>↓</button>
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={s.visible} onChange={() => toggle(s.key)} className="h-4 w-4 accent-emerald-700" />
                        Show
                      </label>
                    </>
                  )}
                  {d.locked && <span className="text-xs text-gray-400">Always first</span>}
                  <button onClick={() => startEdit(s.key)} className={`${btn} border border-gray-300 hover:bg-gray-50`}>Edit</button>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <p className="text-xs text-gray-500">{homeSections.length} sections available. Hero slides, notices, calendar events and testimonials are edited on their own pages.</p>
    </div>
  );
};

const ManageHomepage = Builder;

export default ManageHomepage;
