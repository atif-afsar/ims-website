import { api } from "./api";

/*
 * Query helper for the pages that were written against Supabase. It keeps the
 * same chain (`db.from("notices").select("*").eq(...).order(...)`) and the
 * same `{ data, error }` result, but every call goes to the Node API:
 *
 *   publicDb  → /api/public/...  read-only, active rows only (website pages)
 *   adminDb   → /api/admin/...   everything, needs the admin login
 *
 * Filtering, ordering and limits run in the browser — the lists are small.
 * contact_info and neet_settings are single settings objects on the server;
 * they are exposed here as a one-row table with id 1, as before.
 */

const SETTINGS = new Set(["contact_info", "neet_settings"]);
const BOOL_COLUMNS = ["is_active", "is_published", "is_visible"];

// MySQL returns TINYINT(1) as 0/1; the pages expect true/false
const normalise = (row) => {
  if (!row || typeof row !== "object") return row;
  const out = { ...row };
  for (const c of BOOL_COLUMNS) if (c in out && out[c] !== null) out[c] = Boolean(out[c]);
  return out;
};

const same = (a, b) => (typeof b === "boolean" ? Boolean(a) === b : String(a) === String(b));

const compare = (a, b) => {
  if (a === b) return 0;
  if (a === null || a === undefined) return 1; // nulls last
  if (b === null || b === undefined) return -1;
  return typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b));
};

class Query {
  constructor(scope, table) {
    this.scope = scope;
    this.table = table;
    this.op = "select";
    this.payload = null;
    this.filters = [];
    this.orders = [];
    this.max = null;
    this.mode = "many";
  }

  select() {
    return this; // column lists are ignored; whole rows come back
  }
  eq(column, value) {
    this.filters.push([column, value]);
    return this;
  }
  order(column, { ascending = true } = {}) {
    this.orders.push([column, ascending]);
    return this;
  }
  limit(n) {
    this.max = n;
    return this;
  }
  single() {
    this.mode = "single";
    return this;
  }
  maybeSingle() {
    this.mode = "maybe";
    return this;
  }
  insert(rows) {
    this.op = "insert";
    this.payload = rows;
    return this;
  }
  update(values) {
    this.op = "update";
    this.payload = values;
    return this;
  }
  upsert(values) {
    this.op = "upsert";
    this.payload = values;
    return this;
  }
  delete() {
    this.op = "delete";
    return this;
  }

  // Awaiting the chain runs it
  then(resolve, reject) {
    return this.run().then(resolve, reject);
  }

  async run() {
    try {
      let rows = await (SETTINGS.has(this.table) ? this.runSetting() : this.runTable());
      rows = (Array.isArray(rows) ? rows : [rows]).filter(Boolean).map(normalise);
      if (this.mode === "many") return { data: rows, error: null };
      if (this.mode === "single" && rows.length !== 1) return { data: null, error: new Error("No matching row") };
      return { data: rows[0] ?? null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  idFilter() {
    const f = this.filters.find(([c]) => c === "id");
    if (!f) throw new Error(`${this.table}: updates and deletes need .eq("id", …)`);
    return f[1];
  }

  async runTable() {
    const base = `/${this.scope}/${this.table}`;
    switch (this.op) {
      case "select": {
        let rows = (await api.get(base)).map(normalise);
        rows = rows.filter((r) => this.filters.every(([c, v]) => same(r[c], v)));
        if (this.orders.length) {
          rows.sort((a, b) => {
            for (const [c, asc] of this.orders) {
              const d = compare(a[c], b[c]);
              if (d) return asc ? d : -d;
            }
            return 0;
          });
        }
        return this.max ? rows.slice(0, this.max) : rows;
      }
      case "insert":
        return api.post(base, this.payload);
      case "update":
        return api.put(`${base}/${this.idFilter()}`, this.payload);
      case "upsert":
        return this.payload.id ? api.put(`${base}/${this.payload.id}`, this.payload) : api.post(base, this.payload);
      case "delete":
        await api.del(`${base}/${this.idFilter()}`);
        return [];
      default:
        throw new Error(`Unsupported operation: ${this.op}`);
    }
  }

  async runSetting() {
    const path = `/${this.scope}/settings/${this.table}`;
    if (this.op === "select") {
      const value = await api.get(path);
      return value ? { id: 1, ...value } : null;
    }
    if (this.op === "delete") throw new Error("Settings cannot be deleted");
    // insert / update / upsert all merge into the one settings object
    const current = (await api.get(path).catch(() => null)) || {};
    const incoming = Array.isArray(this.payload) ? this.payload[0] : this.payload;
    const values = { ...current, ...incoming };
    for (const k of ["id", "created_at", "updated_at"]) delete values[k];
    await api.put(path, values);
    return { id: 1, ...values };
  }
}

const client = (scope) => ({ from: (table) => new Query(scope, table) });

export const publicDb = client("public");
export const adminDb = client("admin");
