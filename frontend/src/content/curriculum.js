/* Content for the Curriculum page, from the school's existing curriculum text */

export const overview =
  "A truly transformative education harmonises intellectual excellence with spiritual and moral growth. Our curriculum empowers students with the knowledge and skills to thrive in the modern world, firmly grounded in an ethical and spiritual framework — preparing confident, contributing citizens of India and the global community.";

export const academic = {
  intro:
    "We follow the ICSE & ISC curriculum, known for its strong foundation in core subjects and its national recognition, ensuring a smooth pathway to higher education anywhere in India and abroad.",
  subjects: [
    { title: "Languages", icon: "language", tags: ["English", "Hindi", "Urdu", "Arabic", "Sanskrit"] },
    { title: "Sciences", icon: "atom", tags: ["Mathematics", "Physics", "Chemistry", "Biology"] },
    { title: "Humanities & Social Sciences", icon: "globe", tags: ["History", "Geography", "Civics", "Economics", "Financial Literacy"] },
    { title: "Technology & Arts", icon: "palette", tags: ["Computer Science", "Information Technology", "Art", "Physical Education"] },
  ],
  islamic:
    "For minority students, IMS also provides Nazira and Hifz. Islamic Studies, Seerah and the Life of the Prophets are instrumental in developing morals.",
  pedagogy: [
    { icon: "search", title: "Inquiry-Based Learning", text: "Encouraging students to ask questions and discover knowledge." },
    { icon: "puzzle", title: "Critical Thinking & Problem Solving", text: "Applying classroom concepts to real-world challenges." },
    { icon: "users", title: "Collaborative Projects", text: "Fostering teamwork and communication skills." },
  ],
};

export const skills = {
  intro:
    "In a world of constant change, knowledge alone is not enough — skills are the bridge between potential and achievement. Every student learns not just what to think, but how to think, adapt and lead, so they can thrive in their careers, contribute to their communities and navigate the modern world with confidence.",
  pathways: [
    { title: "Cognitive & Analytical Skills", tagline: "Mastering how to think", tags: ["Critical Thinking & Problem Solving", "Digital Literacy & Computational Thinking"] },
    { title: "Personal & Intrapersonal Skills", tagline: "Mastering how to be", tags: ["Resilience & Adaptability", "Self-Management & Metacognition", "Curiosity & Lifelong Learning"] },
    { title: "Social & Interpersonal Skills", tagline: "Mastering how to work with others", tags: ["Communication & Collaboration", "Leadership & Influence", "Cross-Cultural Competency", "Conflict Resolution & Negotiation"] },
    { title: "Creative & Practical Skills", tagline: "Mastering how to create and execute", tags: ["Creativity & Innovation", "Design Thinking", "Project Management", "Public Speaking & Presentation"] },
  ],
  methods: [
    { icon: "puzzle", title: "Project-Based Learning (PBL)" },
    { icon: "teacher", title: "Dedicated Workshops & Masterclasses" },
    { icon: "heart", title: "Life Skills curriculum from Grade 1" },
    { icon: "flag", title: "Leadership Roles & Student Houses" },
    { icon: "compass", title: "Educational Excursions" },
  ],
};

export const stem = {
  tagline: "Where Innovation Meets Insight, and Discovery Deepens Faith",
  intro:
    "STEM is more than an acronym for Science, Technology, Engineering and Maths. It is an educational philosophy that integrates the four disciplines into one learning paradigm built on real-world applications — developing innovators, problem-solvers and ethical leaders with both technical expertise and Islamic moral integrity.",
  partner:
    "We have integrated the globally recognised STEM curriculum from Evan Moor, a leading USA-based educational publisher, from Grade 1 — a rigorous, research-backed and engaging approach to Science, Technology, Engineering and Mathematics, right here in India.",
  why: [
    { icon: "checklist", title: "Proven, research-backed methodology", text: "Developed by educational experts and used in thousands of schools across the United States and other countries." },
    { icon: "wrench", title: "Hands-on, inquiry-based learning", text: "Puts the “E” of Engineering first through practical, project-based activities that challenge students to think creatively." },
    { icon: "books", title: "Systematic, scaffolded design", text: "Each unit builds skills progressively, so students develop deep conceptual understanding and confidence." },
    { icon: "idea", title: "Engaging, accessible content", text: "Makes complex STEM concepts exciting for every age group, fostering a lasting love of discovery." },
  ],
  advantage: [
    { title: "Real-world problem solving", text: "Students apply what they learn — designing a simple machine, running a scientific investigation, or modelling a solution to an environmental challenge." },
    { title: "21st-century skills", text: "Every project naturally builds collaboration, communication, creativity and critical thinking." },
    { title: "Structured creativity", text: "A clear engineering design process — ask, imagine, plan, create, improve — empowers students to innovate systematically." },
  ],
  unit: {
    title: "Design a Sunshade",
    text: "A typical unit in the younger grades challenges students to design a sunshade to understand the effects of sunlight:",
    parts: [
      { subject: "Science", text: "Learn about the sun and shade." },
      { subject: "Technology & Engineering", text: "Design, build and test a model sunshade." },
      { subject: "Maths", text: "Measure and compare temperature and area covered." },
    ],
  },
};

export const robotics = {
  tagline: "Building the Future, Guided by Wisdom",
  paragraphs: [
    "Welcome to the IMS Robotics & AI Lab, where students don’t just use technology — they create it. Young minds learn to understand, design and programme intelligent machines, preparing for the careers of tomorrow with a strong ethical compass, so that technology serves all of humanity with justice and compassion.",
    "We partner with Eduvate, a leader in innovative educational solutions, to deliver a structured Robotics and Artificial Intelligence curriculum from Grade 1 — hands-on technical skills together with the ethical framework needed to become responsible pioneers.",
  ],
  why: [
    { icon: "checklist", title: "Structured, progressive pathway", text: "Expertly scaffolded from fundamental concepts to advanced applications." },
    { icon: "wrench", title: "Integrated hands-on learning", text: "Every concept is reinforced with practical projects on modern hardware and software." },
    { icon: "target", title: "Real-world application", text: "Projects tackle tangible problems in fields like healthcare, environmental science and automation." },
    { icon: "teacher", title: "Comprehensive teacher support", text: "Robust training and resources empower our educators to guide students through complex topics." },
  ],
  lab: [
    { icon: "robot", title: "Eduvate Robotics Kits", text: "From simple construction sets for juniors to advanced modular systems for seniors." },
    { icon: "circuit", title: "Sensor & Component Arrays", text: "Ultrasonic, light, touch and other sensors and components for limitless innovation." },
    { icon: "cpu", title: "High-Performance Computing", text: "Workstations with specialised software for coding, simulation and AI model training." },
    { icon: "users", title: "Collaborative Innovation Zone", text: "A space for teamwork, prototyping and showcasing student projects." },
  ],
};
