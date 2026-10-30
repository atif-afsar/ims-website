/*
 * Source list for the image pipeline (scripts/build-media.mjs).
 *
 * Each entry turns one original photo into responsive WebP files under
 * public/media/<group>/ plus an entry in src/content/media.js.
 *
 *   slug    unique id used by components:  media["robotics-lab-1"]
 *   src     original file, relative to the repo root (ims-website/)
 *   alt     factual description of what the photo shows
 *   crop    optional [left, top, width, height] in source pixels
 *   grade   optional colour grade preset (see build-media.mjs)
 *   widths  optional override of output widths
 */

import { readFileSync } from "node:fs";

const NEW = "Images"; // originals supplied by the school (git-ignored)
const GALLERY = "Images/source-gallery"; // professional event photos (originals)
const INFRA = "frontend/src/assets/images/infra";
const RESULTS = "frontend/public/images/results";
const FRAMES = "frontend/scripts/.frames"; // stills extracted from the drone video

// Old infrastructure photos have a white postage-stamp border baked in
const stamp = [36, 36, 423, 534];

const HERO_WIDTHS = [960, 1600, 2400];

export default [
  // ── Campus (4K drone video stills) ─────────────────────────────
  { slug: "campus-aerial", group: "campus", src: `${FRAMES}/aerial-05.png`, grade: "drone", widths: HERO_WIDTHS, alt: "Aerial view of the Islamic Mission School campus in Aligarh with students assembled in the courtyard" },
  { slug: "campus-aerial-front", group: "campus", src: `${FRAMES}/aerial-17.png`, grade: "drone", widths: HERO_WIDTHS, alt: "Aerial view of the IMS main gate and school buildings" },
  { slug: "campus-aerial-wide", group: "campus", src: `${FRAMES}/aerial-13.png`, grade: "drone", widths: HERO_WIDTHS, alt: "Wide aerial view of the IMS campus and surrounding green fields" },
  { slug: "campus-corridor", group: "campus", src: `${GALLERY}/DSC_3255.jpg`, alt: "School corridor decorated with student displays" },
  { slug: "assembly-flag", group: "campus", src: `${INFRA}/play-4.jpg`, crop: stamp, alt: "Students at morning assembly beside the national flag" },
  { slug: "conference-hall", group: "campus", src: `${GALLERY}/IMG_8651.jpg`, alt: "The IMS conference hall" },
  { slug: "medical-room", group: "campus", src: `${NEW}/IMG_4198.JPG.jpeg`, alt: "School physician checking a student in the IMS medical room" },

  // ── Academics ──────────────────────────────────────────────────
  { slug: "smart-class-1", group: "academics", src: `${NEW}/IMG_4166.JPG.jpeg`, alt: "Teacher leading a lesson on a smart board in an IMS classroom" },
  { slug: "smart-class-2", group: "academics", src: `${NEW}/IMG_4168.JPG.jpeg`, alt: "Students following a digital lesson in a smart classroom" },
  { slug: "smart-class-3", group: "academics", src: `${NEW}/IMG_4170.JPG.jpeg`, alt: "Teacher and students in a smart classroom" },
  { slug: "pre-primary-1", group: "academics", src: `${NEW}/IMG_4175.JPG.jpeg`, alt: "Pre-primary children learning with an interactive screen" },
  { slug: "pre-primary-2", group: "academics", src: `${NEW}/IMG_4174.JPG.jpeg`, alt: "Teachers with pre-primary children in a colourful classroom" },
  { slug: "stem-activity", group: "academics", src: `${NEW}/IMG_4184.JPG.jpeg`, alt: "Students building a model during a hands-on STEM activity" },

  // ── Robotics & AI lab ──────────────────────────────────────────
  { slug: "robotics-lab-1", group: "robotics", src: `${NEW}/IMG_4186.JPG.jpeg`, alt: "Students assembling a robot car in the IMS Robotics lab" },
  { slug: "robotics-lab-2", group: "robotics", src: `${NEW}/IMG_4191.JPG.jpeg`, alt: "Robotics instructors guiding students in the IMS Robotics lab" },
  { slug: "robotics-lab-3", group: "robotics", src: `${NEW}/IMG_4193.JPG.jpeg`, alt: "Instructor helping students programme a robot" },
  { slug: "robotics-lab-4", group: "robotics", src: `${NEW}/IMG_4188.JPG.jpeg`, alt: "Students working with a robot kit and manual" },
  { slug: "robotics-lab-5", group: "robotics", src: `${NEW}/IMG_4194.JPG.jpeg`, alt: "Robotics class in progress at IMS" },

  // ── Computer lab ───────────────────────────────────────────────
  { slug: "computer-lab-1", group: "computer-lab", src: `${NEW}/IMG_4177.JPG.jpeg`, alt: "Students working in the IMS computer lab" },
  { slug: "computer-lab-2", group: "computer-lab", src: `${NEW}/IMG_4178.JPG.jpeg`, alt: "Teacher supervising students in the computer lab" },
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ slug: `computer-lab-old-${n}`, group: "computer-lab", src: `${INFRA}/computer-${n}.jpg`, crop: stamp, alt: "Students practising on computers in the computer lab" })),

  // ── Science laboratories ───────────────────────────────────────
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ slug: `science-lab-${n}`, group: "science-lab", src: `${INFRA}/lab-${n}.jpg`, crop: stamp, alt: "Students conducting an experiment in the science laboratory" })),

  // ── Library ────────────────────────────────────────────────────
  ...[1, 2, 3, 4, 5].map((n) => ({ slug: `library-${n}`, group: "library", src: `${INFRA}/lib-${n}.jpg`, crop: stamp, alt: "Students reading in the IMS library" })),

  // ── Sports ─────────────────────────────────────────────────────
  { slug: "sports-volleyball", group: "sports", src: `${NEW}/IMG_4181.JPG.jpeg`, alt: "Students playing volleyball on the school ground" },
  { slug: "sports-ground-1", group: "sports", src: `${INFRA}/play-2.jpg`, crop: stamp, alt: "Students on the school playground" },
  { slug: "sports-ground-2", group: "sports", src: `${INFRA}/play-3.jpg`, crop: stamp, alt: "Students taking part in an outdoor sports activity" },
  { slug: "sports-ground-3", group: "sports", src: `${INFRA}/play-5.jpg`, crop: stamp, alt: "School ground and buildings" },

  // ── Events (professional photos) ───────────────────────────────
  ...["DSC09049", "DSC09096", "DSC09128", "DSC09136"].map((f, i) => ({ slug: `cyber-awareness-${i + 1}`, group: "events", src: `${GALLERY}/${f}.jpg`, alt: "Cyber Crime Awareness programme at Islamic Mission School" })),
  ...["DSC_1542 - Copy", "DSC_1547 - Copy", "DSC_2972", "DSC_3001", "DSC_3015", "DSC_3032", "DSC_3197", "DSC_3235", "DSC_4037", "DSC_4047", "DSC_4052", "DSC_4108", "DSC_4117"].map((f, i) => ({ slug: `science-exhibition-${i + 1}`, group: "events", src: `${GALLERY}/${f}.jpg`, alt: "Students presenting projects at the IMS science exhibition" })),
  { slug: "student-speech-1", group: "events", src: `${GALLERY}/DSC_3100.jpg`, alt: "Students addressing the audience from the IMS podium" },
  { slug: "student-speech-2", group: "events", src: `${GALLERY}/DSC_4132.jpg`, alt: "A student speaking at a school event" },
  { slug: "award-ceremony", group: "events", src: `${GALLERY}/DSC_4180.jpg`, alt: "Award presented to a guest at a school function" },
  { slug: "guest-address", group: "events", src: `${GALLERY}/DSC_4187.jpg`, alt: "Guest speaker addressing a school function" },
  { slug: "guests-group", group: "events", src: `${GALLERY}/DSC_4211.jpg`, alt: "Guests and faculty at a school function" },
  ...["IMG_8864", "IMG_8887", "IMG_9021"].map((f, i) => ({ slug: `zakat-conference-${i + 1}`, group: "events", src: `${GALLERY}/${f}.jpg`, alt: "International Zakat Conference 2026 held at IMS" })),

  // ── Board toppers 2026 (cropped from the official result posters) ──
  { slug: "topper-ibrahim-faisal", group: "toppers", src: `${RESULTS}/class_x_poster.png`, crop: [92, 275, 146, 146], widths: [160], alt: "Ibrahim Faisal" },
  { slug: "topper-abdul-rehman", group: "toppers", src: `${RESULTS}/class_x_poster.png`, crop: [314, 275, 146, 146], widths: [160], alt: "Abdul Rehman" },
  { slug: "topper-ahmad-misbah", group: "toppers", src: `${RESULTS}/class_xii_poster.png`, crop: [130, 280, 166, 166], widths: [160], alt: "Ahmad Misbah" },
  { slug: "topper-shaikh-fidyan-shayan", group: "toppers", src: `${RESULTS}/class_xii_poster.png`, crop: [420, 270, 166, 166], widths: [160], alt: "Shaikh Fidyan Shayan" },

  ...oldSite(),
];

/*
 * Photos rescued from the previous website (islamicmissionschool.com),
 * downloaded to Images/old-site/<folder>/ and de-duplicated into
 * scripts/old-site.json by dedupe-old-site.py.
 */
function oldSite() {
  const OLD = "Images/old-site";
  const kept = JSON.parse(readFileSync(new URL("./old-site.json", import.meta.url), "utf8"));

  // Same shots already in the library as higher-resolution originals
  const alreadyHave = new Set(["DSC_3255", "DSC_4117", "DSC_4211", "DSC_2972", "DSC_3001", "DSC_3015", "DSC_3032", "DSC_3197", "DSC_3235", "DSC_4037", "DSC_4047", "DSC_4052", "DSC_4108", "DSC_3100", "DSC_4132", "DSC_4180", "DSC_4187"]);

  // folder -> { group (album), alt }
  const folders = {
    "science-fair-jan-2023": { group: "science-fair-2023-jan", alt: "Sciberation 2023 science fair at IMS (January 2023)" },
    "science-fair-nov-2023": { group: "science-fair-2023-nov", alt: "Students presenting projects at the IMS science fair, November 2023" },
    "summer-camp-2025": { group: "summer-camp-2025", alt: "IMS Summer Camp 2025" },
    "creative-writing-2025": { group: "competitions", alt: "Extempore and Creative Writing Competition 2025–26 at IMS" },
    "public-speaking": { group: "public-speaking", alt: "IMS student speaking at a school event" },
    "quiz": { group: "competitions", alt: "Quiz competition and prize-giving at IMS" },
    "science-activities": { group: "science-activities", alt: "Hands-on science demonstration with IMS students" },
    "sports": { group: "sports", alt: "Students on the IMS sports ground" },
    "playground": { group: "sports", alt: "Students on the IMS playground" },
    "classroom": { group: "classroom", alt: "Students learning in an IMS classroom" },
    "library": { group: "library", alt: "Students reading in the IMS library" },
    "computer-lab": { group: "computer-lab", alt: "Students working in the IMS computer lab" },
    "physics-lab": { group: "physics-lab", alt: "Students performing experiments in the IMS physics lab" },
    "chemistry-lab": { group: "chemistry-lab", alt: "Students performing experiments in the IMS chemistry lab" },
  };

  // The old homepage slider: NAEST 2025 at IIT Kanpur and an AMU educational visit
  const slider = {
    "3.jpg": "naest-2025", "5.jpg": "naest-2025", "9.jpg": "naest-2025", "10.jpg": "naest-2025", "11.jpg": "naest-2025",
    "12.jpg": "naest-2025", "15.jpg": "naest-2025", "16.jpg": "naest-2025", "17.jpg": "naest-2025",
  };
  const sliderAlt = {
    "naest-2025": "IMS at the National Anveshika Experimental Skill Test (NAEST) 2025, Kanpur",
    "amu-visit-2025": "IMS students on an educational visit to Aligarh Muslim University",
  };

  // ".jpeg" copies of the same filename exist on the old site, so keep that apart
  const slugOf = (folder, file) =>
    `${folder}-${file.replace(/\.jpg$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`;
  const entries = [];

  for (const [folder, files] of Object.entries(kept)) {
    for (const file of files) {
      if (alreadyHave.has(file.replace(/\.[a-z]+$/i, ""))) continue;
      if (folder === "home-slider") {
        const group = slider[file] || "amu-visit-2025";
        entries.push({ slug: slugOf(group, file), group, src: `${OLD}/${folder}/${file}`, alt: sliderAlt[group] });
        continue;
      }
      const f = folders[folder];
      if (f) entries.push({ slug: slugOf(folder, file), group: f.group, src: `${OLD}/${folder}/${file}`, alt: f.alt });
    }
  }

  // NEET achievers: the circular portrait cropped from each result card
  const neet = [
    ["ayesha-zafar", "AYESHA-ZAFAR-2024.jpg", [17, 12, 127, 127], "Ayesha Zafar"],
    ["farah-khan", "Farha-Khan.jpg", [19, 11, 129, 129], "Farah Khan"],
    ["arbaz-ayaz", "arbaz-ayaz.jpg", [41, 15, 121, 121], "Arbaz Ayaz"],
    ["ayan-akhtar", "ayan-Akhtar.jpg", [20, 16, 127, 127], "Ayan Akhtar"],
    ["rooshan-aslam", "rooshan-aslam.jpg", [40, 22, 121, 121], "Rooshan Aslam"],
    ["talha-noman", "talha-noman.jpg", [30, 18, 125, 125], "Talha Noman"],
  ];
  for (const [slug, file, crop, alt] of neet) {
    entries.push({ slug: `neet-${slug}`, group: "toppers", src: `${OLD}/neet-achievers/${file}`, crop, widths: [160], alt });
  }

  // Newspaper coverage of the inter-school science fair
  entries.push({ slug: "news-coverage-1", group: "in-the-news", src: `${OLD}/newsletter/News-Letter-1.jpg`, alt: "Newspaper coverage of the IMS inter-school science fair" });
  entries.push({ slug: "news-coverage-2", group: "in-the-news", src: `${OLD}/newsletter/News-Letter-3.jpg`, alt: "Online newspaper coverage of an IMS event" });
  entries.push({ slug: "guests-campus-gate", group: "events", src: `${OLD}/campus-misc/DSC_3216.jpg`, alt: "Guests and staff at the IMS main gate" });

  return entries;
}
