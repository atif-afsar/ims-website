import ApiCollection from "./ApiCollection";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "role", label: "Who they are (e.g. Parent of a Class 7 student)", type: "text" },
  { name: "quote", label: "Quote", type: "textarea", rows: 4 },
  { name: "photo_url", label: "Photo (optional)", type: "image" },
  { name: "is_active", label: "Show on website", type: "checkbox" },
];

/* Quotes for the homepage's "Words From Our Community" section */
const ManageTestimonials = () => (
  <ApiCollection
    collection="testimonials"
    title="Testimonials"
    help="Real quotes from parents, students and alumni. Please add only quotes you have permission to publish."
    fields={fields}
    summary={(r) => `${r.name} — “${(r.quote || "").slice(0, 80)}${(r.quote || "").length > 80 ? "…" : ""}”`}
    empty="No testimonials yet. The homepage section stays hidden until you add one."
  />
);

export default ManageTestimonials;
