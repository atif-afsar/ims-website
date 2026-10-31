/*
 * Every table the admin panel can manage. Generic routes in routes/admin.js
 * and routes/public.js use this registry; only fields listed here can be
 * read or written.
 *
 *   fields   name -> type: text | int | bool | date
 *   required fields that must be present on create
 *   order    ORDER BY clause (built from our own column names)
 *   publicWhere  extra filter for the public API, e.g. only active rows
 *   private  never readable through the public API (admin only)
 */

const ACTIVE = "is_active = 1";

const collections = {
  hero_slides: {
    fields: {
      eyebrow: "text", title: "text", highlight: "text", subtitle: "text", image_url: "text", media_key: "text",
      video_url: "text", cta_text: "text", cta_link: "text", cta2_text: "text", cta2_link: "text",
      sort_order: "int", is_active: "bool", starts_on: "date", ends_on: "date",
    },
    required: ["title"],
    order: "sort_order, id",
    publicWhere: ACTIVE,
  },
  site_popups: {
    fields: {
      eyebrow: "text", title: "text", message: "text", image_url: "text", cta_text: "text", cta_link: "text",
      show_on: "text", delay_seconds: "int", is_active: "bool", starts_on: "date", ends_on: "date",
    },
    required: ["title"],
    order: "created_at DESC, id DESC",
    publicWhere: ACTIVE,
  },
  notices: {
    fields: { title: "text", link: "text", date: "date", is_active: "bool" },
    required: ["title"],
    order: "created_at DESC, id DESC",
    publicWhere: ACTIVE,
  },
  testimonials: {
    fields: { name: "text", role: "text", quote: "text", photo_url: "text", sort_order: "int", is_active: "bool" },
    required: ["name", "quote"],
    order: "sort_order, id",
    publicWhere: ACTIVE,
  },
  governance: {
    fields: { name: "text", role: "text", qualification: "text", profession: "text", image_url: "text", sort_order: "int" },
    required: ["name"],
    order: "sort_order, id",
  },
  programs: {
    fields: { name: "text", description: "text", cover_image: "text", sort_order: "int" },
    required: ["name"],
    order: "sort_order, id",
  },
  classes: {
    fields: { name: "text", age_criteria: "text", group_category: "text", sort_order: "int" },
    required: ["name"],
    order: "sort_order, id",
  },
  calendar_events: {
    fields: { title: "text", event_date: "date", description: "text", event_type: "text", color: "text", is_active: "bool" },
    required: ["title", "event_date"],
    order: "event_date, id",
    publicWhere: ACTIVE,
  },
  social_links: {
    fields: { platform: "text", url: "text", icon_class: "text", sort_order: "int" },
    required: ["platform", "url"],
    order: "sort_order, id",
  },
  neet_tracks: {
    fields: { name: "text", subtitle: "text", for_class: "text", description: "text", highlight: "text", track_type: "text", sort_order: "int", is_active: "bool" },
    required: ["name"],
    order: "sort_order, id",
    publicWhere: ACTIVE,
  },
  neet_features: {
    fields: { text: "text", sort_order: "int", is_active: "bool" },
    required: ["text"],
    order: "sort_order, id",
    publicWhere: ACTIVE,
  },
  neet_comparison: {
    fields: { point: "text", integrated: "text", conventional: "text", sort_order: "int", is_active: "bool" },
    required: ["point", "integrated", "conventional"],
    order: "sort_order, id",
    publicWhere: ACTIVE,
  },
  neet_roadmap: {
    fields: { phase: "text", description: "text", sort_order: "int", is_active: "bool" },
    required: ["phase", "description"],
    order: "sort_order, id",
    publicWhere: ACTIVE,
  },
  neet_results: {
    fields: { name: "text", arabic_name: "text", score: "text", exam_year: "text", photo_url: "text", rank: "int", class_group: "text", sort_order: "int", is_active: "bool" },
    required: ["name", "score", "exam_year"],
    order: "sort_order, id",
    publicWhere: ACTIVE,
  },
  neet_faculty: {
    fields: { name: "text", subject: "text", qualification: "text", bio: "text", photo_url: "text", sort_order: "int", is_active: "bool" },
    required: ["name"],
    order: "sort_order, id",
    publicWhere: ACTIVE,
  },
  neet_answer_keys: {
    fields: { title: "text", exam_name: "text", exam_date: "text", pdf_url: "text", sort_order: "int", is_published: "bool" },
    required: ["title", "pdf_url"],
    order: "sort_order, id",
    publicWhere: "is_published = 1",
  },
  gallery_albums: {
    fields: { title: "text", description: "text", event_date: "date", cover_url: "text", sort_order: "int", is_active: "bool" },
    required: ["title"],
    order: "sort_order, event_date DESC, id DESC",
    publicWhere: ACTIVE,
  },
  gallery_photos: {
    fields: { album_id: "int", url: "text", caption: "text", sort_order: "int" },
    required: ["album_id", "url"],
    order: "album_id, sort_order, id",
  },
  enquiries: {
    fields: { name: "text", email: "text", phone: "text", subject: "text", message: "text", page: "text", status: "text", notes: "text" },
    required: ["name", "message"],
    order: "created_at DESC, id DESC",
    private: true,
  },
};

/* Singleton settings (stored as JSON in the settings table) */
export const SETTINGS_KEYS = ["contact_info", "neet_settings", "site"];

const MAX_TEXT = 20000;

/*
 * Keep only known fields and coerce them to their column type.
 * Empty strings become NULL so optional dates and links stay unset.
 */
export function cleanRow(name, input, { partial = false } = {}) {
  const def = collections[name];
  const row = {};
  const errors = [];
  for (const [field, type] of Object.entries(def.fields)) {
    if (!(field in input)) continue;
    let v = input[field];
    if (v === "" || v === undefined) v = null;
    if (v !== null) {
      if (type === "int") {
        v = Number(v);
        if (!Number.isInteger(v)) errors.push(`${field} must be a whole number`);
      } else if (type === "bool") {
        v = v === true || v === 1 || v === "1" || v === "true" ? 1 : 0;
      } else if (type === "date") {
        v = String(v).slice(0, 10);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) errors.push(`${field} must be a date (YYYY-MM-DD)`);
      } else {
        v = String(v);
        if (v.length > MAX_TEXT) errors.push(`${field} is too long`);
      }
    }
    row[field] = v;
  }
  if (!partial) {
    for (const field of def.required || []) {
      if (row[field] === null || row[field] === undefined) errors.push(`${field} is required`);
    }
  }
  return { row, errors };
}

export default collections;
