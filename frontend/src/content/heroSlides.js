/*
 * Built-in hero photos: the campus and school life, from the photos the school
 * supplied in November 2026. Shown until the admin sets at least two slides in
 * Admin → Hero Slides, and as a fallback if the database is unreachable.
 * Each photo's focal point (for phone crops) is set in scripts/media.config.js.
 */
const heroSlides = [
  { id: "default-campus", media_key: "campus-aerial-new" },
  { id: "default-assembly", media_key: "assembly-ground" },
  { id: "default-robotics", media_key: "robotics-girls-build" },
  { id: "default-dna-workshop", media_key: "dna-workshop" },
  { id: "default-computer-lab", media_key: "computer-lab-girl" },
  { id: "default-taekwondo", media_key: "taekwondo-aerial" },
  { id: "default-annual-function", media_key: "gems-of-ims" },
];

export default heroSlides;
