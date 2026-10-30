/*
 * Content for the Campus overview (merged Facilities + Infrastructure pages)
 * and the four facility pages.
 */
import media from "./media";

/* Every library photo in the given groups (old-site albums included) */
const fromGroups = (...groups) => Object.keys(media).filter((k) => groups.includes(media[k].group));
// 423px "stamp" crops of shots the old site had at higher resolution
const lowRes = (k) => /^(computer-lab-old-\d|library-\d|science-lab-\d|sports-ground-\d|assembly-flag)$/.test(k);

export const overview = {
  intro:
    "A child’s learning environment is a cornerstone of their development. Our campus near Aligarh Muslim University blends modern education with open, natural space — sun-lit classrooms, advanced laboratories and extensive playing fields form an ecosystem of holistic growth.",
  building:
    "Our academic block is designed for learning. Every classroom is spacious, well-ventilated and flooded with natural light, creating an alert and positive atmosphere.",
  labsIntro:
    "True understanding comes from doing. We have invested in distinct, specialised laboratories for Physics, Chemistry, Biology, Robotics & STEM and Computer Science, so every experiment and project receives the focused space and resources it deserves.",
  labs: [
    { icon: "atom", title: "The Physics Lab", tagline: "Unravelling the Laws of the Universe", text: "Advanced apparatus for mechanics, optics, electricity and thermodynamics. Students don’t just read about Newton’s laws; they validate them through experiments.", image: "physics-lab-img-2691" },
    { icon: "flask", title: "The Chemistry Lab", tagline: "A Realm of Molecular Discovery", text: "With fire detection and protection, sinks and eye-wash stations, students learn to handle compounds responsibly while performing titrations, studying reactions and discovering the properties of matter.", image: "chemistry-lab-img-2670" },
    { icon: "plant", title: "The Biology Lab", tagline: "Exploring the Web of Life", text: "From microscopes revealing the structure of a cell to models of anatomy and ecosystems — dissection, slide preparation and DNA extraction cultivate wonder for the life sciences.", image: "science-exhibition-7" },
    { icon: "code", title: "The Computer Science Lab", tagline: "Coding the Digital World", text: "High-performance computers and industry-relevant software, where students master programming, develop apps and explore cybersecurity, AI and data science.", image: "computer-lab-1" },
    { icon: "robot", title: "Robotics & STEM Lab", tagline: "Building the Future", text: "Eduvate robotics kits, sensor arrays and a collaborative innovation zone where students design, build and programme intelligent machines.", image: "robotics-lab-2", to: "/curriculum#curriculum-robotics-ai" },
  ],
  additional: [
    { icon: "books", title: "Library", text: "A peaceful reading zone with Islamic books, reference material and age-wise story books." },
    { icon: "present", title: "Conference Hall", text: "Modern facilities for seminars, workshops and special events, with audio-visual capabilities." },
    { icon: "users", title: "Separate Sections", text: "Dedicated sections for boys and girls, ensuring a comfortable and focused learning environment." },
    { icon: "teacher", title: "Audio-Visual System", text: "Smart boards and audio-visual systems in classrooms for interactive, engaging multimedia learning." },
    { icon: "care", title: "Medical Room", text: "An on-campus medical room where students receive care and health check-ups." },
    { icon: "bed", title: "Hostel Facilities", text: "Boarding facilities for students, as announced for the 2027–28 session." },
  ],
};

/* The four facility pages share one template; slug = URL segment */
export const facilities = {
  "computer-lab": {
    title: "Computer Lab",
    eyebrow: "Campus · Technology",
    lede: "A modern, supervised lab where technology becomes a tool for problem-solving, research and creativity.",
    heroImage: "computer-lab-1",
    featuresTitle: "What makes our lab special",
    features: [
      { icon: "cpu", title: "Modern systems & software", text: "Updated computers with educational software for programming, design, presentations and research." },
      { icon: "code", title: "Coding from early grades", text: "Age-appropriate coding and logical-thinking activities, so students become creators of technology." },
      { icon: "puzzle", title: "Hands-on projects", text: "Projects that connect computer skills with maths, science and languages." },
      { icon: "present", title: "Multimedia & presentations", text: "Creating slides, posters and multimedia stories builds confidence and creativity." },
      { icon: "shield", title: "Safe, guided usage", text: "Teacher supervision and regular reminders about Islamic values and online etiquette." },
      { icon: "globe", title: "Internet-equipped terminals", text: "Connected workstations for research and collaborative projects." },
    ],
    galleryTitle: "Inside our Computer Lab",
    galleryText: "Clean, well-lit and supervised spaces where students explore technology with focus and joy.",
    gallery: fromGroups("computer-lab").filter((k) => !lowRes(k)),
  },
  library: {
    title: "Library",
    eyebrow: "Campus · Reading",
    lede: "A quiet, welcoming space filled with Islamic literature, reference books and story books that nurture a love for reading.",
    heroImage: "library-2",
    heroPosition: "35% 40%",
    featuresTitle: "A home for readers",
    features: [
      { icon: "books", title: "Diverse collection", text: "Islamic studies, tafsir, seerah, reference books and graded readers for all age groups." },
      { icon: "heart", title: "Child-friendly corners", text: "Comfortable reading corners that encourage children to pick up books independently." },
      { icon: "search", title: "Research support", text: "Resources for projects, competitions and self-study beyond the textbook." },
      { icon: "calendar", title: "Reading culture", text: "Regular library periods, book talks and recommendations to build strong reading habits." },
    ],
    galleryTitle: "Inside our Library",
    galleryText: "Shelves of books, a peaceful ambience and dedicated time to read, reflect and grow.",
    // The large lead tile needs one of the 800px originals
    gallery: ["library-img-2760", ...fromGroups("library").filter((k) => !lowRes(k) && k !== "library-img-2760")],
  },
  laboratories: {
    title: "Science Laboratories",
    eyebrow: "Campus · Science",
    lede: "Well-equipped physics, chemistry and biology labs where concepts come alive through safe, guided experiments.",
    heroImage: "chemistry-lab-img-2670",
    featuresTitle: "Learning by doing",
    features: [
      { icon: "flask", title: "Separate subject labs", text: "Dedicated labs for physics, chemistry and biology with age-appropriate apparatus and models." },
      { icon: "idea", title: "Concept clarity", text: "Experiments that help students practically understand what they learn in textbooks." },
      { icon: "shield", title: "Safety first", text: "Lab rules, supervision and safety gear so students work with confidence and care." },
      { icon: "clipboard", title: "Observation & recording", text: "Careful observation, noting results and drawing correct inferences." },
    ],
    galleryTitle: "Inside our Laboratories",
    galleryText: "Bright, ventilated labs designed to encourage curiosity, careful handling and appreciation of Allah’s creation.",
    gallery: [...fromGroups("chemistry-lab"), ...fromGroups("physics-lab")],
  },
  "sports-complex": {
    title: "Sports Complex",
    eyebrow: "Campus · Sport",
    lede: "Spacious play areas that promote fitness, teamwork and discipline in a fun, encouraging environment.",
    heroImage: "sports-volleyball",
    featuresTitle: "Play, grow and compete",
    features: [
      { icon: "flag", title: "Outdoor courts & fields", text: "A 120-metre track, basketball, badminton and volleyball courts, and handball and kho-kho playfields." },
      { icon: "sun", title: "Indoor games", text: "Carrom, chess and table tennis for every season." },
      { icon: "star", title: "Swimming pool", text: "Listed among the school’s sports facilities." },
      { icon: "users", title: "Regular sports periods", text: "Timetabled sport that builds teamwork and fitness." },
      { icon: "trophy", title: "Annual sports events", text: "The Annual Sports Day showcases talent and sportsmanship." },
    ],
    galleryTitle: "On the field with IMS",
    galleryText: "From warm-up drills to exciting matches, students enjoy staying healthy and active together.",
    gallery: ["sports-volleyball", ...fromGroups("sports").filter((k) => k !== "sports-volleyball" && !lowRes(k)), ...Object.keys(media).filter((k) => k.startsWith("summer-camp-2025-archery"))],
  },
};

export const facilityOrder = ["laboratories", "computer-lab", "library", "sports-complex"];
