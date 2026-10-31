import { useEffect, useRef, useState } from "react";

const DEVICES = {
  desktop: { label: "Computer", width: 1280 },
  phone: { label: "Phone", width: 390 },
};

/*
 * Live preview of one homepage section while it is being edited. The section
 * renders in an iframe at real screen width (so the layout matches the
 * website) and is scaled down to fit the panel.
 */
const SectionPreview = ({ sectionKey, content }) => {
  const frameRef = useRef(null);
  const boxRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [device, setDevice] = useState("desktop");
  const [height, setHeight] = useState(600);
  const [boxWidth, setBoxWidth] = useState(600);
  const width = DEVICES[device].width;
  const scale = Math.min(1, boxWidth / width);

  // Messages from the iframe: "ready" and its content height
  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== window.location.origin || e.source !== frameRef.current?.contentWindow) return;
      if (e.data?.type === "ims-preview-ready") setReady(true);
      if (e.data?.type === "ims-preview-height") setHeight(Math.max(200, e.data.height));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Send the draft (lightly debounced while typing)
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => frameRef.current?.contentWindow?.postMessage({ type: "ims-preview", key: sectionKey, content }, window.location.origin), 150);
    return () => clearTimeout(t);
  }, [ready, sectionKey, content]);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setBoxWidth(entry.contentRect.width));
    if (boxRef.current) observer.observe(boxRef.current);
    return () => observer.disconnect();
  }, []);

  // The hero is a full screen tall; show it at a typical screen height
  const frameHeight = sectionKey === "hero" ? (device === "phone" ? 1100 : 800) : height;

  return (
    <div className="rounded-2xl bg-white p-4 shadow">
      <div className="mb-3 flex items-center gap-2">
        <p className="text-sm font-semibold text-gray-800">Live preview</p>
        <span className="text-xs text-gray-500">updates as you type — not saved yet</span>
        <div className="ml-auto flex rounded-lg bg-gray-100 p-1">
          {Object.entries(DEVICES).map(([key, d]) => (
            <button key={key} type="button" onClick={() => setDevice(key)} className={`rounded-md px-3 py-1 text-xs font-semibold ${device === key ? "bg-white text-emerald-800 shadow" : "text-gray-600"}`}>
              {d.label}
            </button>
          ))}
        </div>
      </div>
      <div ref={boxRef} className="overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200" style={{ height: frameHeight * scale }}>
        <iframe
          ref={frameRef}
          src="/admin/preview"
          title="Section preview"
          style={{ width, height: frameHeight, transform: `scale(${scale})`, transformOrigin: "top left", border: 0, display: "block", margin: device === "phone" ? "0 auto" : undefined }}
        />
      </div>
    </div>
  );
};

export default SectionPreview;
