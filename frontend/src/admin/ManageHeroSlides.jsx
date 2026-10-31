import ApiCollection from "./ApiCollection";
import defaultSlides from "../content/heroSlides";

const today = () => new Date().toLocaleDateString("en-CA");

const fields = [
  { name: "image_url", label: "Photo", type: "image", help: "Wide landscape photos work best. Faces near the top-middle stay visible on phones." },
  { name: "eyebrow", label: "Small line above the title (optional)", type: "text" },
  { name: "title", label: "Title", type: "text", help: "Keep it short — 3 to 6 words." },
  { name: "highlight", label: "Gold words after the title (optional)", type: "text" },
  { name: "subtitle", label: "One or two sentences (optional)", type: "textarea", rows: 2 },
  { name: "cta_text", label: "Gold button text (optional)", type: "text" },
  { name: "cta_link", label: "Gold button link", type: "link" },
  { name: "cta2_text", label: "Second button text (optional)", type: "text" },
  { name: "cta2_link", label: "Second button link", type: "link" },
  { name: "video_url", label: "Background video (optional, MP4 link)", type: "text", help: "Plays on desktops only; the photo is shown everywhere else." },
  { name: "starts_on", label: "Show from (optional)", type: "date" },
  { name: "ends_on", label: "Hide after (optional)", type: "date" },
  { name: "is_active", label: "Show on the website", type: "checkbox" },
];

// The built-in slides, ready to load and edit
const STARTER_FIELDS = ["eyebrow", "title", "highlight", "subtitle", "video_url", "cta_text", "cta_link", "cta2_text", "cta2_link"];
const starterRows = defaultSlides.map((s) => ({
  ...Object.fromEntries(STARTER_FIELDS.filter((f) => s[f]).map((f) => [f, s[f]])),
  image_url: s.media_key ? `media:${s.media_key}` : s.image_url,
  is_active: true,
}));

const schedule = (r) => {
  const d = today();
  if (r.starts_on && r.starts_on > d) return `From ${r.starts_on}`;
  if (r.ends_on && r.ends_on < d) return "Ended";
  return null;
};

/* Slides at the top of the homepage */
const ManageHeroSlides = () => (
  <ApiCollection
    collection="hero_slides"
    title="Hero Slides"
    help="The big photos and headlines at the top of the homepage. Use ↑ ↓ to change the order. While no slide is shown, the website uses its built-in slides."
    fields={fields}
    summary={(r) => [r.title, r.highlight].filter(Boolean).join(" ")}
    badge={schedule}
    empty="No slides yet — the homepage is showing the built-in slides."
    starter={{ label: "Add the built-in slides", rows: starterRows }}
  />
);

export default ManageHeroSlides;
