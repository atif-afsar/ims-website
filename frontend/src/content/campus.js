/*
 * Content for the Campus overview (merged Facilities + Infrastructure pages)
 * and the four facility pages.
 */
import media from "./media";

/* Every library photo in the given groups (old-site albums included) */
const fromGroups = (...groups) => Object.keys(media).filter((k) => groups.includes(media[k].group));
// 423px "stamp" crops of shots the old site had at higher resolution
const lowRes = (k) => /^(computer-lab-old-\d|library-\d|science-lab-\d|sports-ground-\d|assembly-flag)$/.test(k);

/* Campus overview text, as supplied by the school (IMS Website content, Nov 2026) */
export const overview = {
  intro:
    "IMS is a premier institution set within a sprawling 3-acre campus designed to inspire young minds, offering the perfect blend of modern education and expansive natural space.",
  building:
    "Our academic block features spacious, well-ventilated, sun-lit classrooms alongside advanced labs and extensive playing fields, creating an ecosystem of holistic growth.",
  labsIntro:
    "True understanding comes from doing, which is why we have invested in distinct, specialized laboratories for Physics, Chemistry, Biology, Robotics & STEM, and Computer Science. This dedicated approach provides an immersive, hands-on learning environment, ensuring every experiment and project receives the focused space and resources it deserves.",
  labs: [
    { icon: "atom", title: "The Physics Lab", tagline: "Unraveling the Laws of the Universe", image: "lab-student-focus" },
    { icon: "flask", title: "The Chemistry Lab", tagline: "A Realm of Molecular Discovery", image: "chemistry-lab-img-2670" },
    { icon: "plant", title: "The Biology Lab", tagline: "Exploring the Web of Life", image: "biology-model" },
    { icon: "code", title: "The Computer Science Lab", tagline: "Coding the Digital World", image: "comp-lab-wide" },
  ],
  additional: [
    { icon: "books", title: "Library" },
    { icon: "present", title: "Conference Hall" },
    { icon: "users", title: "Separate sections of Boys and Girls" },
    { icon: "teacher", title: "Audio-visual system" },
  ],
};

/* The four facility pages share one template; slug = URL segment. Text only as in the school's document. */
export const facilities = {
  "computer-lab": {
    title: "The Computer Science Lab",
    lede: "Coding the Digital World",
    heroImage: "computer-lab-1",
    gallery: fromGroups("computer-lab").filter((k) => !lowRes(k)),
  },
  library: {
    title: "Library",
    heroImage: "library-2",
    heroPosition: "35% 40%",
    // The large lead tile needs one of the 800px originals
    gallery: ["library-img-2760", ...fromGroups("library").filter((k) => !lowRes(k) && k !== "library-img-2760")],
  },
  laboratories: {
    title: "Labs",
    lede: "Where Theory Meets Experiment",
    heroImage: "dna-lab-wide",
    gallery: [...fromGroups("chemistry-lab"), ...fromGroups("physics-lab")],
  },
  "sports-complex": {
    title: "Playing Fields",
    heroImage: "assembly-aerial-top",
    gallery: ["sports-volleyball", ...fromGroups("sports").filter((k) => k !== "sports-volleyball" && !lowRes(k)), ...Object.keys(media).filter((k) => k.startsWith("summer-camp-2025-archery"))],
  },
};

export const facilityOrder = ["laboratories", "computer-lab", "library", "sports-complex"];
