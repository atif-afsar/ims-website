/*
 * Site-wide content: navigation, contact details, admissions and features.
 * Kept in one place so the admin panel can edit it later.
 */

export const school = {
  name: "Islamic Mission School",
  short: "IMS",
  motto: "O My Lord! Advance Me In Knowledge",
  mottoArabic: "رَّبِّ زِدْنِي عِلْمًا",
  tagline: "Shaping Hearts, Building Minds",
  summary:
    "Established in Aligarh in 2008, IMS integrates academic excellence with moral values to ensure holistic development.",
  affiliation: "Affiliated to CISCE, New Delhi",
  affiliationNo: "UP407",
  established: 2008,
};

export const contact = {
  address: "Near AMU Fort, Aligarh, Uttar Pradesh",
  addressFull: "Fort Green City, AMU Fort, Aligarh, Uttar Pradesh 202001",
  phones: [
    { label: "07417914164", href: "tel:+917417914164" },
    { label: "09219401623", href: "tel:+919219401623" },
  ],
  whatsapp: "https://wa.me/919219401623",
  email: "info.imsaligarh@gmail.com",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Islamic+Mission+School+Aligarh",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.038684456793!2d78.0552577!3d27.9314593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a5a5186542b7%3A0x23cf8c5f2a591d8c!2sIslamic%20Mission%20School!5e0!3m2!1sen!2sin!4v1707830000000",
};

export const socials = [
  { name: "Facebook", href: "https://www.facebook.com/islamicmissionschool", icon: "facebook" },
  { name: "Instagram", href: "https://www.instagram.com/islamicmissionschoolaligarh", icon: "instagram" },
  { name: "YouTube", href: "https://www.youtube.com/@islamicmissionschool", icon: "youtube" },
];

export const admissions = {
  session: "2027–28",
  open: true,
  classes: "Playgroup to Class IX",
  seniorClasses: "Class XI",
  streams: ["PCM", "PCB", "Commerce", "Humanities"],
};

/*
 * Main navigation: five menus, each a mega-menu panel.
 * `blurb` and `image` feed the feature card inside the panel.
 */
export const navigation = [
  {
    label: "About",
    to: "/about",
    blurb: "A school for life since 2008 — faith, knowledge and character growing together.",
    image: "campus-aerial-front",
    links: [
      { label: "Introduction", to: "/about#introduction" },
      { label: "Vision & Mission", to: "/about#vision-mission" },
      { label: "Our History", to: "/about#brief-history" },
      { label: "Board Members", to: "/about#board-members" },
      { label: "Affiliation", to: "/about#affiliation" },
      { label: "Value-Based Education", to: "/ims-value-based-school" },
    ],
  },
  {
    label: "Academics",
    to: "/curriculum",
    blurb: "ICSE excellence with world-class STEM, Robotics & AI and integrated NEET/JEE preparation.",
    image: "smart-class-1",
    links: [
      { label: "Curriculum (ICSE)", to: "/curriculum#curriculum-academic" },
      { label: "21st Century Skills", to: "/curriculum#curriculum-21-skills" },
      { label: "STEM Education", to: "/curriculum#curriculum-stem" },
      { label: "Robotics & AI", to: "/curriculum#curriculum-robotics-ai" },
      { label: "Assessments & Olympiads", to: "/assessments" },
      { label: "NEET / JEE Program", to: "/programs/neet-jee" },
    ],
  },
  {
    label: "Student Life",
    to: "/co-curricular-extracurricular",
    blurb: "Where passion is discovered, character is built and talents shine.",
    image: "science-exhibition-8",
    links: [
      { label: "English Communication", to: "/co-curricular-extracurricular#cc-english" },
      { label: "Arabic Communication", to: "/co-curricular-extracurricular#cc-arabic" },
      { label: "Project-Based Learning", to: "/co-curricular-extracurricular#cc-pbl" },
      { label: "Taekwondo", to: "/co-curricular-extracurricular#cc-taekwondo" },
      { label: "Sports Day & Annual Function", to: "/co-curricular-extracurricular#cc-sports-day" },
      { label: "Gallery", to: "/gallery" },
    ],
  },
  {
    label: "Campus",
    to: "/facilities",
    blurb: "Smart classrooms, modern laboratories, a Robotics lab, library and sports grounds.",
    image: "robotics-lab-2",
    links: [
      { label: "Campus Overview", to: "/facilities" },
      { label: "Science Laboratories", to: "/infrastructure/laboratories" },
      { label: "Computer Lab", to: "/infrastructure/computer-lab" },
      { label: "Library", to: "/infrastructure/library" },
      { label: "Sports Complex", to: "/infrastructure/sports-complex" },
    ],
  },
  {
    label: "Admissions",
    to: "/classes",
    blurb: "Admission open for 2027–28 — Playgroup to Class IX and Class XI.",
    image: "pre-primary-1",
    links: [
      { label: "Classes & Admission Process", to: "/classes" },
      { label: "Digital Brochure", to: "/brochure" },
      { label: "School Calendar", to: "/calendar" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

/* "Special Features" exactly as listed on the 2027-28 admission poster */
export const specialFeatures = [
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
];
