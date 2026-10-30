import IconBadge, { iconNames } from "../../ui/IconBadge";
import MediaPicker from "./MediaPicker";

const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20";

const emptyItem = (fields) => Object.fromEntries(fields.map((f) => [f.name, f.type === "select" ? f.options[0] : ""]));

const Field = ({ field, value, onChange }) => {
  switch (field.type) {
    case "textarea":
      return <textarea rows={field.rows || 3} value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={input} />;
    case "select":
      return (
        <select value={value ?? field.options[0]} onChange={(e) => onChange(e.target.value)} className={input}>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    case "icon":
      return (
        <div className="flex items-center gap-3">
          <IconBadge icon={value} />
          <select value={value || ""} onChange={(e) => onChange(e.target.value)} className={input}>
            {iconNames.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      );
    case "image":
      return <MediaPicker value={value} onChange={onChange} />;
    case "link":
      return <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="/classes or https://…" className={input} />;
    case "list":
      return <ListField field={field} value={value || []} onChange={onChange} />;
    default:
      return <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={input} />;
  }
};

/* Repeatable group of fields with add / remove / move up / move down */
const ListField = ({ field, value, onChange }) => {
  const update = (i, item) => onChange(value.map((v, j) => (j === i ? item : v)));
  const move = (i, step) => {
    const next = [...value];
    [next[i], next[i + step]] = [next[i + step], next[i]];
    onChange(next);
  };
  const canAdd = !field.max || value.length < field.max;
  const titleOf = (item, i) => item.title || item.label || item.name || item.q || item.eyebrow || `Item ${i + 1}`;

  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <details key={i} className="group rounded-xl border border-gray-200 bg-gray-50 open:bg-white">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3">
            <span className="text-xs font-semibold text-gray-400">{i + 1}</span>
            <span className="flex-1 truncate text-sm font-medium text-gray-800">{titleOf(item, i)}</span>
            <button type="button" onClick={(e) => { e.preventDefault(); move(i, -1); }} disabled={i === 0} className="rounded px-2 py-1 text-gray-500 hover:bg-gray-200 disabled:opacity-30" aria-label="Move up">↑</button>
            <button type="button" onClick={(e) => { e.preventDefault(); move(i, 1); }} disabled={i === value.length - 1} className="rounded px-2 py-1 text-gray-500 hover:bg-gray-200 disabled:opacity-30" aria-label="Move down">↓</button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm("Remove this item?")) onChange(value.filter((_, j) => j !== i));
              }}
              className="rounded px-2 py-1 text-red-500 hover:bg-red-50"
              aria-label="Remove"
            >
              ✕
            </button>
          </summary>
          <div className="space-y-4 border-t border-gray-200 p-4">
            <SchemaForm fields={field.fields} value={item} onChange={(next) => update(i, next)} />
          </div>
        </details>
      ))}
      {canAdd && (
        <button type="button" onClick={() => onChange([...value, emptyItem(field.fields)])} className="rounded-lg border border-dashed border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
          + Add {field.label.toLowerCase().replace(/s$/, "")}
        </button>
      )}
      {field.max && <p className="text-xs text-gray-500">Up to {field.max}.</p>}
    </div>
  );
};

/* Renders a form for a section's field schema (see content/homeSections.js) */
const SchemaForm = ({ fields, value, onChange }) => (
  <div className="space-y-5">
    {fields.map((f) => (
      <div key={f.name}>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">{f.label}</label>
        <Field field={f} value={value[f.name]} onChange={(v) => onChange({ ...value, [f.name]: v })} />
      </div>
    ))}
  </div>
);

export default SchemaForm;
