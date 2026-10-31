/*
 * Homepage builder registry.
 *
 * Each section has:
 *   key, label, help        shown in Admin → Homepage
 *   visible                 default visibility
 *   defaults                built-in content (used until the admin saves changes)
 *   fields                  what the admin can edit (rendered by SchemaForm)
 *
 * Field types: text, textarea, image, icon, link, select, list (with `fields`).
 * Image values are either "media:<slug>" (school photo library) or an uploaded
 * file URL ("/uploads/...").
 */
import { admissions } from "./site";

const ICON_FIELD = { name: "icon", label: "Icon", type: "icon" };

export const homeSections = [
  {
    key: "hero",
    label: "Hero slider",
    help: "The slides themselves are managed in Admin → Hero Slides. Here you can edit the three tiles beside the slider.",
    visible: true,
    locked: true, // always first, always shown
    defaults: {
      tiles: [
        { eyebrow: "Admission Open", title: `Session ${admissions.session}`, link: "/classes", tone: "gold" },
        { eyebrow: "Explore IMS", title: "Digital Brochure", link: "/brochure", tone: "emerald" },
        { eyebrow: "Stay Updated", title: "School Calendar", link: "/calendar", tone: "navy" },
      ],
    },
    fields: [
      {
        name: "tiles", label: "Tiles beside the slider", type: "list", max: 3,
        fields: [
          { name: "eyebrow", label: "Small line", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "link", label: "Link", type: "link" },
          { name: "tone", label: "Colour", type: "select", options: ["gold", "emerald", "navy"] },
        ],
      },
    ],
  },
  {
    key: "intro",
    label: "Introduction",
    help: "Big rotating line, then the opening statement. In the statement, wrap words in *stars* to colour them; {mosque}, {book} and {cap} insert round icons.",
    visible: true,
    defaults: {
      cycleLead: "Every child",
      cycleWords: "Nurtured, Challenged, Inspired, Successful",
      text: "Islamic Mission School is a CISCE-affiliated school in Aligarh {mosque} where a rigorous *ICSE education* {book} meets *Qur’anic values*, nurturing every child from Play Group to Class XII {cap} to lead with knowledge, faith and character.",
      tagline: "A School for Life — Madrasat al-Hayat",
    },
    fields: [
      { name: "cycleLead", label: "Big line at the top (e.g. Every child)", type: "text" },
      { name: "cycleWords", label: "Words that change underneath it, separated by commas", type: "text" },
      { name: "text", label: "Statement", type: "textarea", rows: 4 },
      { name: "tagline", label: "Gold line underneath", type: "text" },
    ],
  },
  {
    key: "values",
    label: "What makes IMS different",
    help: "Value-based education with the six pillars.",
    visible: true,
    defaults: {
      eyebrow: "Value-Based Education",
      title: "What Makes IMS Truly Different",
      lede: "Character before career. Cooperation, not competition. Empathy over ego. At IMS, the national curriculum and Islamic values are woven into one education.",
      image: "media:student-speech-1",
      pillars: [
        { icon: "brain", title: "ICSE + Islamic Excellence", text: "National curriculum enriched with Arabic, Seerah, Fiqh & Akhlaq" },
        { icon: "robot", title: "World-Class STEM & Robotics", text: "Evan Moor (USA) + Eduvate Robotics & AI Lab from Grade 1" },
        { icon: "chat", title: "21st Century + Islamic Skills", text: "Public speaking, critical thinking, leadership — rooted in adab and ihsan" },
        { icon: "quran", title: "Quranic Foundation", text: "Daily Nazra, Hifz, Tajweed & Tarbiyah integrated into school life" },
        { icon: "mosque", title: "Value-Based Education", text: "Character before career. Cooperation, not competition. Empathy over ego." },
        { icon: "heart", title: "A School for Life", text: "We don’t just prepare for exams. We prepare for Jannah and meaningful contribution" },
      ],
      linkText: "Our value-based approach",
      link: "/ims-value-based-school",
    },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "lede", label: "Introduction", type: "textarea" },
      { name: "image", label: "Photo (arch frame)", type: "image" },
      { name: "pillars", label: "Pillars", type: "list", fields: [ICON_FIELD, { name: "title", label: "Title", type: "text" }, { name: "text", label: "Text", type: "textarea", rows: 2 }] },
      { name: "linkText", label: "Link text", type: "text" },
      { name: "link", label: "Link", type: "link" },
    ],
  },
  {
    key: "special_features",
    label: "Special features",
    help: "The ‘Special Features’ panel from the admission poster.",
    visible: true,
    defaults: {
      title: "Special Features",
      intro: "Everything a child needs to excel — in the classroom, in life, and in faith — on one campus.",
      items: [
        { icon: "stethoscope", title: "NEET–JEE Integrated Batches", detail: "From Class IX" },
        { icon: "chat", title: "English & Arabic Communication", detail: "Dedicated classes" },
        { icon: "flask", title: "STEM Curriculum", detail: "Evan Moor, USA" },
        { icon: "coins", title: "Financial Literacy", detail: "Evan Moor, USA" },
        { icon: "chart", title: "Data Literacy", detail: "From UK" },
        { icon: "brain", title: "Problem Solving & Reasoning", detail: "From UK" },
        { icon: "robot", title: "Robotics & AI", detail: "From Grade 1" },
        { icon: "heart", title: "Social-Emotional Learning", detail: "From Grade 1" },
        { icon: "mosque", title: "Islamic Studies & Arabic", detail: "Integrated in school life" },
        { icon: "quran", title: "Hifz", detail: "Qur'an memorisation" },
        { icon: "bed", title: "Hostel Facilities", detail: "For boarding students" },
      ],
    },
    fields: [
      { name: "title", label: "Ribbon title", type: "text" },
      { name: "intro", label: "Introduction", type: "textarea", rows: 2 },
      { name: "items", label: "Features", type: "list", fields: [ICON_FIELD, { name: "title", label: "Feature", type: "text" }, { name: "detail", label: "Detail", type: "text" }] },
    ],
  },
  {
    key: "journey",
    label: "Learning journey",
    help: "Stage cards from Play Group to Class XII. Each opens that stage on the Classes page.",
    visible: true,
    defaults: {
      eyebrow: "From Play Group to Class XII",
      title: "Our Learning Journey",
      stages: [
        { title: "Pre-Primary", grades: "Play Group – K.G.", image: "media:pre-primary-2", group: "pre-primary" },
        { title: "Primary", grades: "Class 1 – 5", image: "media:summer-camp-2025-img-20250610-wa0016", group: "primary" },
        { title: "Middle", grades: "Class 6 – 8", image: "media:science-exhibition-9", group: "middle" },
        { title: "Secondary", grades: "Class 9 – 10", image: "media:robotics-lab-3", group: "secondary" },
        { title: "Senior Secondary", grades: "Class 11 – 12 · PCM · PCB · Commerce · Humanities", image: "media:chemistry-lab-img-2659", group: "senior-secondary" },
      ],
      buttonText: "Classes & Admissions",
    },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "title", label: "Title", type: "text" },
      {
        name: "stages", label: "Stages", type: "list", max: 6,
        fields: [
          { name: "title", label: "Stage", type: "text" },
          { name: "grades", label: "Classes", type: "text" },
          { name: "image", label: "Photo", type: "image" },
          { name: "group", label: "Classes page group", type: "select", options: ["pre-primary", "primary", "middle", "secondary", "senior-secondary"] },
        ],
      },
      { name: "buttonText", label: "Button text", type: "text" },
    ],
  },
  {
    key: "highlights",
    label: "Programme highlights",
    help: "Tabbed programmes (NEET/JEE, Robotics, STEM…).",
    visible: true,
    defaults: {
      eyebrow: "Programme Highlights",
      title: "Discover & Experience",
      programmes: [
        { label: "NEET / JEE", icon: "stethoscope", kicker: "One Campus. One Strategy. One Goal.", title: "Integrated NEET / JEE Program", text: "ICSE schooling synchronised with competitive-exam preparation from Class IX — daily practice tests, weekly analysis and doubt-clearing classes during school hours, with no external coaching required.", image: "media:science-exhibition-7", link: "/programs/neet-jee" },
        { label: "Robotics & AI", icon: "robot", kicker: "Building the Future, Guided by Wisdom", title: "Robotics & AI Lab", text: "From Grade 1, students don’t just use technology — they create it. They learn to understand, design and programme intelligent machines, guided by ethics and purpose.", image: "media:robotics-lab-2", link: "/curriculum#curriculum-robotics-ai" },
        { label: "STEM", icon: "flask", kicker: "Where Innovation Meets Insight", title: "STEM Education", text: "Science, Technology, Engineering and Maths taught as one connected discipline through real-world applications, with the Evan Moor (USA) curriculum from Grade 1.", image: "media:science-exhibition-6", link: "/curriculum#curriculum-stem" },
        { label: "Languages", icon: "chat", kicker: "Find Your Voice · Connect with the Language of Faith", title: "English & Arabic Communication", text: "Dedicated programmes build confident, respectful English communication for global opportunities — and active Arabic that opens the beauty of the Qur’an.", image: "media:student-speech-2", link: "/co-curricular-extracurricular#cc-english" },
        { label: "Projects", icon: "brain", kicker: "Nurturing Problem-Solvers & Change-Makers", title: "Project-Based Learning", text: "Interdisciplinary projects challenge students to find real-world problems, research deeply and create innovative solutions — showcased at our annual science exhibition.", image: "media:science-exhibition-4", link: "/co-curricular-extracurricular#cc-pbl" },
        { label: "Sports", icon: "star", kicker: "Strong Mind, Strong Body", title: "Sports & Taekwondo", text: "Taekwondo classes for boys and girls build discipline, focus and self-defence, while team games and the Annual Sports Day celebrate healthy competition.", image: "media:sports-volleyball", link: "/co-curricular-extracurricular#cc-taekwondo" },
      ],
    },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "title", label: "Title", type: "text" },
      {
        name: "programmes", label: "Programmes", type: "list", max: 8,
        fields: [
          { name: "label", label: "Tab label", type: "text" },
          ICON_FIELD,
          { name: "title", label: "Title", type: "text" },
          { name: "kicker", label: "Tagline", type: "text" },
          { name: "text", label: "Description", type: "textarea", rows: 3 },
          { name: "image", label: "Photo", type: "image" },
          { name: "link", label: "Learn-more link", type: "link" },
        ],
      },
    ],
  },
  {
    key: "results",
    label: "Results & stats",
    help: "Key numbers and board toppers.",
    visible: true,
    defaults: {
      eyebrow: "IMS at a Glance",
      title: "Results That Make Us Proud",
      lede: "Our students topped the district in the 2026 ICSE and ISC board examinations.",
      stats: [
        { value: "2008", label: "Founded in Aligarh" },
        { value: "UP407", label: "CISCE Affiliation No." },
        { value: "PG–XII", label: "Play Group to Class XII" },
        { value: "5", label: "District rank holders in 2026" },
      ],
      toppers: [
        { name: "Ibrahim Faisal", score: "95%", detail: "Class X · District Rank 1", photo: "media:topper-ibrahim-faisal" },
        { name: "Abdul Rehman", score: "94.8%", detail: "Class X · District Rank 2", photo: "media:topper-abdul-rehman" },
        { name: "Nehdiya Qudsi", score: "94.6%", detail: "Class X · District Rank 3", photo: "" },
        { name: "Ahmad Misbah", score: "94%", detail: "Class XII · District Rank 1", photo: "media:topper-ahmad-misbah" },
        { name: "Shaikh Fidyan Shayan", score: "93%", detail: "Class XII · District Rank 3", photo: "media:topper-shaikh-fidyan-shayan" },
      ],
      linkText: "Meet our achievers",
      link: "/programs/neet-jee",
    },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "lede", label: "Introduction", type: "textarea", rows: 2 },
      { name: "stats", label: "Key numbers", type: "list", max: 4, fields: [{ name: "value", label: "Number", type: "text" }, { name: "label", label: "Label", type: "text" }] },
      { name: "toppers", label: "Toppers", type: "list", max: 10, fields: [{ name: "name", label: "Name", type: "text" }, { name: "score", label: "Score", type: "text" }, { name: "detail", label: "Class & rank", type: "text" }, { name: "photo", label: "Photo", type: "image" }] },
      { name: "linkText", label: "Link text", type: "text" },
      { name: "link", label: "Link", type: "link" },
    ],
  },
  {
    key: "achievements",
    label: "Student achievements",
    help: "Headline achievements with a photo each. Add new ones as students win.",
    visible: true,
    defaults: {
      eyebrow: "Making Us Proud",
      title: "Student Achievements",
      items: [
        {
          tag: "NAEST 2025 · Physics",
          title: "National Finalist at NAEST 2025",
          text: "Areeba Fatima (Class XI-B1) placed 2nd at her zonal centre, reached the Kanpur semi-finals with 40 students from across India, and was named among the 10 finalists of the National Anveshika Experimental Skill Test, led by Prof. H.C. Verma.",
          image: "media:naest-2025-16",
          link: "/gallery",
        },
        {
          tag: "NEET 2024",
          title: "690 in NEET on the First Attempt",
          text: "Ayesha Zafar scored 690, Fatma Khan 661 and Aqsa Raihan 654 in their first attempt. IMS alumni now study MBBS at JNMCH, AMU and government medical colleges.",
          image: "media:chemistry-lab-img-2670",
          link: "/programs/neet-jee",
        },
        {
          tag: "Sciberation",
          title: "Hosting Aligarh’s Young Scientists",
          text: "Our inter-school science fair, Sciberation, brings young innovators from schools across the region to present their research — and has been covered in the local press.",
          image: "media:science-fair-jan-2023-dsc-4183",
          link: "/gallery",
        },
      ],
    },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "title", label: "Title", type: "text" },
      {
        name: "items", label: "Achievements", type: "list", max: 6,
        fields: [
          { name: "tag", label: "Label (e.g. NEET 2024)", type: "text" },
          { name: "title", label: "Headline", type: "text" },
          { name: "text", label: "Description", type: "textarea", rows: 3 },
          { name: "image", label: "Photo", type: "image" },
          { name: "link", label: "Link (optional)", type: "link" },
        ],
      },
    ],
  },
  {
    key: "principal_message",
    label: "Message from the leadership",
    help: "Hidden until you add the real message, name and photo.",
    visible: false,
    defaults: {
      eyebrow: "From the Director’s Desk",
      message: "",
      name: "",
      role: "",
      photo: "",
    },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "message", label: "Message", type: "textarea", rows: 6 },
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "photo", label: "Portrait", type: "image" },
    ],
  },
  {
    key: "news_events",
    label: "News & upcoming events",
    help: "Filled automatically from Admin → Notices and Admin → Calendar.",
    visible: true,
    defaults: { eyebrow: "What’s Happening", title: "News & Upcoming Events" },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "title", label: "Title", type: "text" },
    ],
  },
  {
    key: "testimonials",
    label: "Parent & student voices",
    help: "Quotes come from Admin → Testimonials. The section stays hidden until at least one is added.",
    visible: true,
    defaults: { eyebrow: "Alhamdulillah", title: "Words From Our Community" },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "title", label: "Title", type: "text" },
    ],
  },
  {
    key: "admission",
    label: "Admissions call-to-action",
    help: "Admission process and contact buttons.",
    visible: true,
    defaults: {
      eyebrow: `Admission Open ${admissions.session}`,
      title: "Begin Your Child’s Journey at IMS",
      text: `${admissions.classes} and ${admissions.seniorClasses} (${admissions.streams.join(", ")}). Our admissions team will guide you at every step.`,
      steps: [
        { title: "Enquiry", text: "Call or WhatsApp us with your child’s class and age." },
        { title: "Visit / Meet", text: "Meet our team and see the campus." },
        { title: "Assessment", text: "An age-appropriate interaction, as applicable." },
        { title: "Decision", text: "The admission committee’s decision is final." },
      ],
      primaryText: "Apply Now",
      primaryLink: "/classes",
    },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "text", label: "Text", type: "textarea", rows: 2 },
      { name: "steps", label: "Steps", type: "list", max: 5, fields: [{ name: "title", label: "Step", type: "text" }, { name: "text", label: "Detail", type: "text" }] },
      { name: "primaryText", label: "Main button text", type: "text" },
      { name: "primaryLink", label: "Main button link", type: "link" },
    ],
  },
  {
    key: "faq",
    label: "Frequently asked questions",
    help: "Answers parents look for before they call.",
    visible: true,
    defaults: {
      eyebrow: "Questions Parents Ask",
      title: "Frequently Asked Questions",
      items: [
        { q: "Which board is IMS affiliated to?", a: "IMS is affiliated to the Council for the Indian School Certificate Examinations (CISCE), New Delhi — affiliation number UP407 — and follows the ICSE and ISC curriculum." },
        { q: "Which classes are open for admission?", a: `Admissions for ${admissions.session} are open from ${admissions.classes}, and for ${admissions.seniorClasses} with ${admissions.streams.join(", ")} streams.` },
        { q: "Do students need outside coaching for NEET or JEE?", a: "No. The Integrated NEET/JEE Program, starting from Class IX, synchronises the ICSE syllabus with competitive-exam preparation during school hours, with daily practice tests and weekly analysis." },
        { q: "Are Qur’an, Hifz and Arabic taught?", a: "Yes. Nazira and Hifz are offered, Islamic Studies and Seerah are part of the curriculum, and dedicated periods are given to Arabic Communication." },
        { q: "Is hostel accommodation available?", a: "Yes, hostel facilities are available. Please contact the admissions team for details." },
        { q: "How do I start the admission process?", a: "Call or WhatsApp us on 07417914164 or 09219401623 with your child’s age and current class, then visit the campus to meet our team." },
      ],
    },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "items", label: "Questions", type: "list", max: 12, fields: [{ name: "q", label: "Question", type: "text" }, { name: "a", label: "Answer", type: "textarea", rows: 3 }] },
    ],
  },
  {
    key: "life",
    label: "Life at IMS (photo mosaic)",
    help: "Photo tiles linking to the gallery.",
    visible: true,
    defaults: {
      eyebrow: "Life at IMS",
      title: "Moments From Our Campus",
      tiles: [
        { image: "media:science-exhibition-8", label: "Science Exhibition" },
        { image: "media:naest-2025-16", label: "NAEST 2025, Kanpur" },
        { image: "media:summer-camp-2025-archery-photoes4", label: "Summer Camp 2025" },
        { image: "media:robotics-lab-1", label: "Robotics Lab" },
        { image: "media:public-speaking-public-speaking-4-jpeg", label: "Annual Event" },
        { image: "media:amu-visit-2025-visit-at-amu2", label: "Educational Visit to AMU" },
        { image: "media:chemistry-lab-img-2670", label: "Chemistry Lab" },
        { image: "media:zakat-conference-1", label: "International Zakat Conference 2026" },
      ],
    },
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "tiles", label: "Photos (the first is shown large)", type: "list", max: 8, fields: [{ name: "image", label: "Photo", type: "image" }, { name: "label", label: "Caption", type: "text" }] },
    ],
  },
];

export const sectionByKey = Object.fromEntries(homeSections.map((s) => [s.key, s]));

/*
 * Combine the registry with what the admin saved: saved order and visibility
 * win, saved content is merged over the defaults field by field. Sections
 * added to the registry later (never saved by the admin) are appended at the end.
 */
export function resolveHomeSections(saved = []) {
  const savedByKey = Object.fromEntries(saved.map((s) => [s.section_key, s]));
  const known = homeSections.map((def, i) => {
    const s = savedByKey[def.key];
    return {
      key: def.key,
      order: def.locked ? -1 : s ? s.sort_order : 1000 + i,
      visible: def.locked ? true : s ? s.is_visible : def.visible,
      content: { ...def.defaults, ...(s?.content || {}) },
    };
  });
  return known.sort((a, b) => a.order - b.order);
}
