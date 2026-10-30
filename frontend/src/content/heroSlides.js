/*
 * Default hero slides. Shown until the admin adds slides in
 * Admin → Hero Slides, and as a fallback if the database is unreachable.
 * Field names match the hero_slides table.
 */
const heroSlides = [
  {
    id: "default-campus",
    eyebrow: "Affiliated to CISCE, New Delhi · Est. 2008",
    title: "Shaping Hearts,",
    highlight: "Building Minds",
    subtitle: "Established in Aligarh in 2008, IMS integrates academic excellence with moral values to ensure holistic development.",
    media_key: "campus-aerial",
    video_url: "/media/video/campus-hero.mp4",
    cta_text: "Apply for 2027–28",
    cta_link: "/classes",
    cta2_text: "Discover IMS",
    cta2_link: "/about",
  },
  {
    id: "default-admissions",
    eyebrow: "Admission Open 2027–28",
    title: "Playgroup to Class IX",
    highlight: "& Class XI",
    subtitle: "Class XI streams: PCM, PCB, Commerce and Humanities. Visit the campus or talk to our admissions team today.",
    media_key: "pre-primary-1",
    cta_text: "Apply Now",
    cta_link: "/classes",
    cta2_text: "Call 07417914164",
    cta2_link: "tel:+917417914164",
  },
  {
    id: "default-robotics",
    eyebrow: "Robotics & AI Lab",
    title: "Builders of Tomorrow,",
    highlight: "from Grade 1",
    subtitle: "Students learn to understand, design and programme intelligent machines — guided by ethics and purpose.",
    media_key: "robotics-lab-2",
    cta_text: "Explore Academics",
    cta_link: "/curriculum#curriculum-robotics-ai",
  },
  {
    id: "default-results",
    eyebrow: "ICSE & ISC Results 2026",
    title: "Proud of Our",
    highlight: "District Toppers",
    subtitle: "Ibrahim Faisal topped Class X with 95% and Ahmad Misbah topped Class XII with 94% — both District Rank 1.",
    media_key: "quiz-13-jpeg",
    cta_text: "Meet Our Achievers",
    cta_link: "/programs/neet-jee",
  },
  {
    id: "default-neet",
    eyebrow: "Integrated NEET / JEE Program",
    title: "One Campus.",
    highlight: "One Goal.",
    subtitle: "ICSE schooling synchronised with NEET/JEE preparation from Class IX — with no external coaching required.",
    media_key: "chemistry-lab-img-2664",
    cta_text: "Explore the Program",
    cta_link: "/programs/neet-jee",
  },
];

export default heroSlides;
