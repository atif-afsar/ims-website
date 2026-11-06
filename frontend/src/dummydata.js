// Fallback content for the NEET/JEE page (until the admin adds its own) and the admission note.

export const neetProgram = {
  // Text as supplied by the school (IMS Website content, Nov 2026)
  title: "NEET/JEE Program",
  subtitle: "Redefining Schooling for Aspiring Doctors & Engineers",
  visionTitle: "Redefining Schooling for Aspiring Doctors & Engineers",
  visionDescription: "",

  foundation: {
    name: "The Foundation Program",
    for: "4-Year Program from Class IX",
    duration: "4 Years",
    subtitle: "Build an Unshakable Foundation for Success.",
    desc: "This program is designed for young, determined students who are clear about their career goals in medicine or engineering. Starting from Class IX, we lay a robust foundation in core subjects (Physics, Chemistry, Biology & Mathematics), ensuring conceptual clarity and mastery.",
    highlight: ""
  },

  target: {
    name: "The Intensive Accelerator Program",
    for: "2-Year Program from Class XI",
    duration: "2 Years",
    subtitle: "Fast-Track Your Dream with Focused Intensity.",
    desc: "For students who crystallize their ambition to pursue NEET/JEE after Class X, this program offers a powerful and focused two-year journey. We provide an immersive learning environment that accelerates preparation, covering both board and competitive exam syllabi with precision.",
    highlight: ""
  },

  features: [
    "Efficient and committed Faculties",
    "Daily Practice Test",
    "Weekly Test",
    "Regular doubt classes",
    "Teaching by experienced Faculties during school time",
    "No requirement of coaching which saves more than a lac per annum and 7-8 hours per day for self-study.",
  ],
  comparison: [
    {
      point: "",
      integrated: "The entire ecosystem is built around a singular goal: cracking JEE/NEET in the first attempt.",
      conventional: "Aims to deliver a general board education only.",
    },
    {
      point: "",
      integrated: "The ICSE board syllabus is perfectly synchronized with the JEE/NEET syllabus.",
      conventional: "Schooling and coaching operate separately.",
    },
    {
      point: "",
      integrated: "No need for attending coaching after school. Saves time as well as money.",
      conventional: "Generally coaching is required after the school.",
    },
    {
      point: "",
      integrated: "6-7 hours more time for self-study.",
      conventional: "Less time for self-study.",
    },
  ],

  results: [
    {
      name: "Ibrahim Faisal",
      rank: 1,
      score: "95%",
      year: "District Rank - 1",
      classGroup: "Class X",
      photo: "/images/results/ibrahim_faisal.png"
    },
    {
      name: "Abdul Rehman",
      rank: 2,
      score: "94.8%",
      year: "District Rank - 2",
      classGroup: "Class X",
      photo: "/images/results/abdul_rehman.png"
    },
    {
      name: "Nehdiya Qudsi",
      rank: 3,
      score: "94.6%",
      year: "District Rank - 3",
      classGroup: "Class X",
      photo: "/images/results/nehdiya_qudsi.png"
    },
    {
      name: "Ahmad Misbah",
      rank: 1,
      score: "94%",
      year: "District Rank - 1",
      classGroup: "Class XII",
      photo: "/images/results/ahmad_misbah.png"
    },
    {
      name: "Shaikh Fidyan Shayan",
      rank: 3,
      score: "93%",
      year: "District Rank - 3",
      classGroup: "Class XII",
      photo: "/images/results/shaikh_fidyan_shayan.png"
    }
  ],

  faculty: [
    {
      name: "Dr. Kaunain Kausar",
      subject: "Biology",
      qualification: "",
      bio: "Founder and Director, Islamic Mission School"
    },
    {
      name: "Mr. Shakir Sir",
      subject: "Physics",
      qualification: "M.Phil., M.Sc. Gold Medalist",
      bio: "Founder & Director, Shakir Sir Classes, Aligarh"
    },
    {
      name: "Dr. R Malik Sir",
      subject: "Chemistry",
      qualification: "Ph.D. Chemistry",
      bio: "Ex-Faculty FIIT JEE, Ex-Faculty Shakir Sir Classes"
    },
    {
      name: "Mr. Malik Azeem",
      subject: "Biology",
      qualification: "B.Sc.(Zoo.), M.Sc.(Zoo.), Triple Gold Medalist, M.Ed.(STEM), OSU, USA",
      bio: ""
    },
    {
      name: "Mr. Yasir Mumtaz",
      subject: "Chemistry",
      qualification: "B.Sc., M.Sc. (Chem), JMI",
      bio: "Ex-Faculty Allen, Noida"
    },
    {
      name: "Er. Saquib Hayat",
      subject: "Physics",
      qualification: "B.Tech., M.Tech., AMU",
      bio: "Ex-Faculty Aakash, Ex-Faculty GCI, Sikar"
    },
    {
      name: "Er. Kush Varshney",
      subject: "Mathematics",
      qualification: "B.Tech., M.Tech. (AMU)",
      bio: "Director Kush Classes"
    },
    {
      name: "Er. Syed Aley Haider",
      subject: "Physics",
      qualification: "B.Tech., M.Tech., AMU",
      bio: "Ex-Faculty PW Lucknow"
    },
    {
      name: "Er. Malik Faheem",
      subject: "Mathematics",
      qualification: "B.Tech., M.Tech., AMU",
      bio: "Ex-Faculty Duty Society"
    }
  ]
}

// ---------classes----------

export const admissionNote =
  "For admission, the decision of the admission committee will be final.";
