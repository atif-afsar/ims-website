import ApiCollection from "./ApiCollection";
import defaultSlides from "../content/heroSlides";

const today = () => new Date().toLocaleDateString("en-CA");

const fields = [
  { name: "image_url", label: "Photo", type: "image", help: "Wide landscape photos work best. Faces near the top-middle stay visible on phones." },
  { name: "eyebrow", label: "Text on this photo: small line above the title (optional)", type: "text" },
  { name: "title", label: "Text on this photo: title (optional)", type: "text", help: "Keep it short, 3 to 6 words. With no text here, the photo shows the main message from Admin → Homepage → Hero." },
  { name: "highlight", label: "Text on this photo: gold second line (optional)", type: "text" },
  { name: "subtitle", label: "Text on this photo: one short sentence (optional)", type: "textarea", rows: 2 },
  { name: "cta_text", label: "Gold button text (optional)", type: "text", help: "With no button here, the photo shows the main message's buttons." },
  { name: "cta_link", label: "Gold button link", type: "link" },
  { name: "cta2_text", label: "Second button text (optional)", type: "text" },
  { name: "cta2_link", label: "Second button link", type: "link" },
  { name: "video_url", label: "Background video (optional, MP4 link)", type: "text", help: "Plays on desktops only; the photo is shown everywhere else." },
  { name: "starts_on", label: "Show from (optional)", type: "date" },
  { name: "ends_on", label: "Hide after (optional)", type: "date" },
  { name: "show_text", label: "Show this text on the photo", type: "checkbox" },
  { name: "is_active", label: "Show on the website", type: "checkbox" },
];

// The built-in photos, ready to load and edit
const starterRows = defaultSlides.map((s) => ({
  ...(s.video_url ? { video_url: s.video_url } : {}),
  image_url: `media:${s.media_key}`,
  is_active: true,
}));

const schedule = (r) => {
  const d = today();
  if (r.starts_on && r.starts_on > d) return `From ${r.starts_on}`;
  if (r.ends_on && r.ends_on < d) return "Ended";
  return null;
};

/* Photos at the top of the homepage */
const ManageHeroSlides = () => (
  <ApiCollection
    collection="hero_slides"
    title="Hero Slides"
    help="The moving photos at the top of the homepage. Use ↑ ↓ to change the order. Add at least two; with fewer, the website uses its built-in photos. A photo can have its own text: fill it in and tick “Show this text on the photo”. Otherwise it shows the main message from Admin → Homepage → Hero."
    fields={fields}
    summary={(r) => (r.show_text && (r.title || r.eyebrow)) || r.image_url?.replace("media:", "") || "Photo"}
    badge={schedule}
    empty="No photos yet — the homepage is showing the built-in photos."
    starter={{ label: "Add the built-in photos", rows: starterRows }}
  />
);

export default ManageHeroSlides;
