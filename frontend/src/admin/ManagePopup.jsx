import ApiCollection from "./ApiCollection";

const today = () => new Date().toLocaleDateString("en-CA");

const fields = [
  { name: "eyebrow", label: "Small line above the title (optional)", type: "text", help: "e.g. Admission Open 2027–28" },
  { name: "title", label: "Title", type: "text" },
  { name: "message", label: "Message (optional)", type: "textarea", rows: 4 },
  { name: "image_url", label: "Poster or photo (optional)", type: "image" },
  { name: "cta_text", label: "Button text (optional)", type: "text" },
  { name: "cta_link", label: "Button link", type: "link" },
  { name: "starts_on", label: "Show from (optional)", type: "date" },
  { name: "ends_on", label: "Hide after (optional)", type: "date" },
  { name: "is_active", label: "Show on the website", type: "checkbox" },
];

const schedule = (r) => {
  const d = today();
  if (r.starts_on && r.starts_on > d) return `From ${r.starts_on}`;
  if (r.ends_on && r.ends_on < d) return "Ended";
  return null;
};

/* Announcements shown at the top of the News & Events panel (the bell on the left of every page) */
const ManagePopup = () => (
  <ApiCollection
    collection="site_popups"
    title="Announcements"
    help="Shown at the top of the “News & Events” panel that opens from the bell on the left edge of every page. A gold dot on the bell tells visitors there is something new."
    fields={fields}
    summary={(r) => r.title}
    badge={schedule}
    empty="No announcements. The panel still lists your notices and upcoming events."
  />
);

export default ManagePopup;
