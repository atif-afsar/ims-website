import { useState } from "react";
import media from "../../content/media";
import { api } from "../../lib/api";

const library = Object.entries(media);

const preview = (value) => (value?.startsWith("media:") ? media[value.slice(6)]?.src : value);

/*
 * Image field: pick from the school photo library or upload a new photo.
 * Stores "media:<slug>" or the uploaded file URL.
 */
const MediaPicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const upload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const { url } = await api.upload(file, "home");
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const shown = library.filter(([key, m]) => !filter || key.includes(filter.toLowerCase()) || m.alt.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-20 w-28 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-200">
          {preview(value) ? <img src={preview(value)} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-xs text-gray-400">No photo</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setOpen(true)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50">Choose from library</button>
          <label className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50">
            {busy ? "Uploading…" : "Upload new"}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} disabled={busy} className="hidden" />
          </label>
          {value && <button type="button" onClick={() => onChange("")} className="rounded-lg px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">Remove</button>}
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="flex max-h-[85vh] w-full max-w-4xl flex-col rounded-2xl bg-white" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Photo library">
            <div className="flex items-center gap-3 border-b p-4">
              <h4 className="font-semibold">School photo library</h4>
              <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search (e.g. robotics, library)" className="ml-auto w-64 rounded-lg border border-gray-300 px-3 py-1.5 text-sm" />
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100">Close</button>
            </div>
            <div className="grid grid-cols-2 gap-3 overflow-y-auto p-4 sm:grid-cols-4">
              {shown.map(([key, m]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => {
                    onChange(`media:${key}`);
                    setOpen(false);
                  }}
                  className={`overflow-hidden rounded-lg text-left ring-2 transition ${value === `media:${key}` ? "ring-emerald-600" : "ring-transparent hover:ring-gray-300"}`}
                  title={m.alt}
                >
                  <img src={m.srcSet.split(", ")[0].split(" ")[0]} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <span className="block truncate px-2 py-1 text-xs text-gray-600">{key}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPicker;
