import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../lib/api";
import { compressImage } from "../utils/compressImage";

const btn = "rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50";
const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20";
const MAX_MB = 8;

const fmtDate = (d) => (d ? new Date(`${String(d).slice(0, 10)}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "");

const Message = ({ message }) =>
  message ? <div className={`rounded-lg px-4 py-3 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`} role="status">{message.text}</div> : null;

/* ── One album: details + photos ─────────────────────────────── */

const AlbumEditor = ({ album, photos: initialPhotos, onBack, onChanged }) => {
  const [form, setForm] = useState({
    title: album.title || "",
    description: album.description || "",
    event_date: album.event_date ? String(album.event_date).slice(0, 10) : "",
    is_active: album.is_active !== 0 && album.is_active !== false,
  });
  const [photos, setPhotos] = useState(initialPhotos);
  const [cover, setCover] = useState(album.cover_url || "");
  const [progress, setProgress] = useState(null); // { done, total }
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  const saveDetails = async () => {
    if (!form.title.trim()) return setMessage({ type: "error", text: "Please give the album a title." });
    setBusy(true);
    try {
      await api.put(`/admin/gallery_albums/${album.id}`, { ...form, cover_url: cover || photos[0]?.url || "" });
      setMessage({ type: "ok", text: "Album saved. The Gallery page is updated." });
      onChanged();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  // Upload several photos one after another, showing progress
  const addFiles = async (fileList) => {
    const files = [...fileList].filter((f) => /^image\/(jpeg|png|webp|gif)$/.test(f.type));
    if (!files.length) return setMessage({ type: "error", text: "Please choose JPG, PNG or WebP photos." });
    setMessage(null);
    setProgress({ done: 0, total: files.length });
    const added = [];
    const failed = [];
    for (const [i, file] of files.entries()) {
      try {
        const small = await compressImage(file);
        if (small.size > MAX_MB * 1024 * 1024) throw new Error(`larger than ${MAX_MB} MB`);
        const { url } = await api.upload(small, "gallery");
        added.push({ album_id: album.id, url, caption: "", sort_order: photos.length + added.length });
      } catch (err) {
        failed.push(`${file.name} (${err.message})`);
      }
      setProgress({ done: i + 1, total: files.length });
    }
    if (added.length) {
      try {
        const created = await api.post("/admin/gallery_photos", added);
        const next = [...photos, ...created];
        setPhotos(next);
        if (!cover && next[0]) {
          setCover(next[0].url);
          await api.put(`/admin/gallery_albums/${album.id}`, { cover_url: next[0].url });
        }
        onChanged();
      } catch (err) {
        failed.push(err.message);
      }
    }
    setProgress(null);
    setMessage(
      failed.length
        ? { type: "error", text: `${added.length} added. Could not add: ${failed.join(", ")}` }
        : { type: "ok", text: `${added.length} photo${added.length === 1 ? "" : "s"} added.` }
    );
  };

  const updateCaption = async (photo, caption) => {
    if ((photo.caption || "") === caption) return;
    setPhotos((list) => list.map((p) => (p.id === photo.id ? { ...p, caption } : p)));
    await api.put(`/admin/gallery_photos/${photo.id}`, { caption }).catch((err) => setMessage({ type: "error", text: err.message }));
  };

  const move = async (i, step) => {
    const next = [...photos];
    [next[i], next[i + step]] = [next[i + step], next[i]];
    setPhotos(next);
    await api.put("/admin/gallery_photos/order", { ids: next.map((p) => p.id) }).catch((err) => setMessage({ type: "error", text: err.message }));
  };

  const remove = async (photo) => {
    if (!window.confirm("Delete this photo? This cannot be undone.")) return;
    try {
      await api.del(`/admin/gallery_photos/${photo.id}`);
      const next = photos.filter((p) => p.id !== photo.id);
      setPhotos(next);
      if (cover === photo.url) {
        setCover(next[0]?.url || "");
        await api.put(`/admin/gallery_albums/${album.id}`, { cover_url: next[0]?.url || "" });
      }
      onChanged();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const makeCover = async (photo) => {
    setCover(photo.url);
    await api.put(`/admin/gallery_albums/${album.id}`, { cover_url: photo.url }).catch((err) => setMessage({ type: "error", text: err.message }));
    onChanged();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={onBack} className={`${btn} border border-gray-300 bg-white hover:bg-gray-50`}>← All albums</button>
        <h3 className="text-2xl font-bold text-gray-900">{form.title || "Untitled album"}</h3>
      </div>
      <Message message={message} />

      <div className="grid gap-6 xl:grid-cols-[22rem_1fr]">
        {/* Details */}
        <div className="space-y-4 self-start rounded-2xl bg-white p-6 shadow">
          <h4 className="font-bold text-gray-900">Album details</h4>
          <label className="block text-sm font-semibold text-gray-700">Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={`mt-1 ${input}`} placeholder="e.g. Annual Sports Day 2026" /></label>
          <label className="block text-sm font-semibold text-gray-700">Date of the event (optional)<input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className={`mt-1 ${input}`} /></label>
          <label className="block text-sm font-semibold text-gray-700">Short description (optional)<textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`mt-1 ${input}`} /></label>
          <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="h-4 w-4 accent-emerald-700" /> Show on the website</label>
          <button onClick={saveDetails} disabled={busy} className={`${btn} w-full bg-emerald-700 text-white hover:bg-emerald-600`}>{busy ? "Saving…" : "Save album details"}</button>
          <p className="text-xs text-gray-500">Albums appear on the Gallery page once they have at least one photo.</p>
        </div>

        {/* Photos */}
        <div className="space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              if (!progress) addFiles(e.dataTransfer.files);
            }}
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${dragging ? "border-emerald-600 bg-emerald-50" : "border-gray-300 bg-white"}`}
          >
            {progress ? (
              <div className="w-full max-w-sm">
                <p className="text-sm font-semibold text-gray-800">Uploading {progress.done} of {progress.total}…</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200"><div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${(progress.done / progress.total) * 100}%` }} /></div>
              </div>
            ) : (
              <>
                <p className="font-semibold text-gray-800">Drag photos here, or</p>
                <button onClick={() => fileRef.current?.click()} className={`${btn} mt-3 bg-emerald-700 text-white hover:bg-emerald-600`}>Choose photos</button>
                <p className="mt-3 text-xs text-gray-500">You can select many at once. Large phone photos are resized automatically.</p>
              </>
            )}
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          </div>

          {photos.length === 0 ? (
            <p className="rounded-2xl bg-white p-6 text-sm text-gray-600 shadow">No photos yet.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:grid-cols-4">
              {photos.map((p, i) => (
                <li key={p.id} className="overflow-hidden rounded-xl bg-white shadow">
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <img src={p.url} alt="" loading="lazy" className="h-full w-full object-cover" />
                    {cover === p.url && <span className="absolute left-2 top-2 rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-gray-900">Cover</span>}
                  </div>
                  <div className="space-y-2 p-2">
                    <input defaultValue={p.caption || ""} onBlur={(e) => updateCaption(p, e.target.value)} placeholder="Caption (optional)" className="w-full rounded-md border border-gray-200 px-2 py-1 text-xs focus:border-emerald-700 focus:outline-none" />
                    <div className="flex items-center gap-1 text-xs">
                      <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30" aria-label="Move earlier">←</button>
                      <button onClick={() => move(i, 1)} disabled={i === photos.length - 1} className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30" aria-label="Move later">→</button>
                      {cover !== p.url && <button onClick={() => makeCover(p)} className="rounded px-2 py-1 text-emerald-700 hover:bg-emerald-50">Set cover</button>}
                      <button onClick={() => remove(p)} className="ml-auto rounded px-2 py-1 text-red-500 hover:bg-red-50" aria-label="Delete photo">✕</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Album list ───────────────────────────────────────────────── */

const ManageGallery = () => {
  const [albums, setAlbums] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [message, setMessage] = useState(null);

  const load = useCallback(async () => {
    try {
      const [a, p] = await Promise.all([api.get("/admin/gallery_albums"), api.get("/admin/gallery_photos")]);
      setAlbums(a);
      setPhotos(p);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = async () => {
    const title = window.prompt("Album title (e.g. Annual Sports Day 2026)");
    if (!title?.trim()) return;
    try {
      const album = await api.post("/admin/gallery_albums", { title: title.trim(), is_active: true, sort_order: 0 });
      await load();
      setOpenId(album.id);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const remove = async (album, count) => {
    if (!window.confirm(`Delete “${album.title}” and its ${count} photo${count === 1 ? "" : "s"}? This cannot be undone.`)) return;
    await api.del(`/admin/gallery_albums/${album.id}`).catch((err) => setMessage({ type: "error", text: err.message }));
    load();
  };

  const toggle = async (album) => {
    await api.put(`/admin/gallery_albums/${album.id}`, { is_active: !album.is_active }).catch((err) => setMessage({ type: "error", text: err.message }));
    load();
  };

  const move = async (i, step) => {
    const next = [...albums];
    [next[i], next[i + step]] = [next[i + step], next[i]];
    setAlbums(next);
    await api.put("/admin/gallery_albums/order", { ids: next.map((a) => a.id) }).catch((err) => setMessage({ type: "error", text: err.message }));
  };

  const open = albums?.find((a) => a.id === openId);
  if (open) {
    return <AlbumEditor key={open.id} album={open} photos={photos.filter((p) => p.album_id === open.id)} onBack={() => setOpenId(null)} onChanged={load} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Gallery</h3>
          <p className="text-sm text-gray-600">Create an album for each event and add its photos. Albums show on the Gallery page above the school’s photo library.</p>
        </div>
        <button onClick={create} className={`${btn} ml-auto bg-emerald-700 text-white hover:bg-emerald-600`}>+ New album</button>
      </div>
      <Message message={message} />

      {!albums ? (
        <p className="text-gray-600">Loading…</p>
      ) : albums.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow">
          <p className="text-gray-700">No albums yet.</p>
          <button onClick={create} className={`${btn} mt-4 bg-emerald-700 text-white hover:bg-emerald-600`}>Create the first album</button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {albums.map((a, i) => {
            const count = photos.filter((p) => p.album_id === a.id).length;
            return (
              <li key={a.id} className={`overflow-hidden rounded-2xl bg-white shadow ${a.is_active ? "" : "opacity-60"}`}>
                <button onClick={() => setOpenId(a.id)} className="block aspect-[16/9] w-full bg-gray-100">
                  {a.cover_url ? <img src={a.cover_url} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-sm text-gray-400">No photos yet</span>}
                </button>
                <div className="p-4">
                  <p className="font-semibold text-gray-900">{a.title}</p>
                  <p className="text-xs text-gray-500">{[fmtDate(a.event_date), `${count} photo${count === 1 ? "" : "s"}`, a.is_active ? null : "Hidden"].filter(Boolean).join(" · ")}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-1">
                    <button onClick={() => setOpenId(a.id)} className={`${btn} border border-gray-300 hover:bg-gray-50`}>Open</button>
                    <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30" aria-label="Move up">↑</button>
                    <button onClick={() => move(i, 1)} disabled={i === albums.length - 1} className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30" aria-label="Move down">↓</button>
                    <button onClick={() => toggle(a)} className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">{a.is_active ? "Hide" : "Show"}</button>
                    <button onClick={() => remove(a, count)} className="ml-auto rounded px-2 py-1 text-red-500 hover:bg-red-50" aria-label={`Delete ${a.title}`}>✕</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ManageGallery;
