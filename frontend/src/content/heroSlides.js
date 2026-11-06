/*
 * Built-in hero photos. Shown until the admin sets at least two slides in
 * Admin → Hero Slides, and as a fallback if the database is unreachable.
 * These show the main message from Admin → Homepage → Hero.
 * `position` optionally sets which part of the photo stays in view when cropped.
 */
const heroSlides = [
  { id: "default-campus", media_key: "campus-aerial", video_url: "/media/video/campus-hero.mp4" },
  { id: "default-science", media_key: "science-exhibition-1", position: "center 8%" },
  { id: "default-robotics", media_key: "robotics-lab-2" },
  { id: "default-sports", media_key: "sports-volleyball" },
  { id: "default-classroom", media_key: "smart-class-2" },
  { id: "default-chemistry", media_key: "chemistry-lab-img-2664" },
];

export default heroSlides;
