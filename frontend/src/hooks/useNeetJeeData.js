import { useState, useEffect } from "react";
import { publicDb as db } from "../lib/db";
import { neetProgram } from "../dummydata";

const DEFAULT_SETTINGS = {
  hero_badge: "Integrated Academy",
  hero_title: neetProgram.title,
  hero_subtitle: neetProgram.subtitle,
  hero_image_url: "/images/programs/program4.png",
  banner_title: "NEET / JEE Program",
  banner_subtitle: "Redefining Schooling for Aspiring Doctors & Engineers",
  intro_paragraph_1:
    "The journey to premier institutions like IITs and AIIMS demands a strong foundation, unwavering discipline, and a strategic approach from an early age.",
  intro_paragraph_2:
    "Our Integrated NEET/JEE Schooling Program is a unique educational model that seamlessly blends the rigor of the ICSE curriculum with the intensive preparation required for competitive exams.",
  vision_title: neetProgram.visionTitle,
  vision_description: neetProgram.visionDescription,
  features_image_url: "",
  features_title: "Our Proven Strategy",
  comparison_title: "IMS NEET/JEE Integrated Schooling vs Conventional Schooling",
  results_title: "Our Proud Achievers",
  faculty_title: "Our Expert Faculty",
  answer_keys_title: "Answer Keys & Resources",
  cta_title: "Give Your Child the Best Chance to Become a Doctor or Engineer",
  cta_button_text: "Enroll in NEET/JEE Program Now",
  cta_button_link: "/contact",
  secondary_button_text: "Download Brochure",
  secondary_button_link: "/brochure",
  bottom_cta_title: "Secure Your Seat in the Next Batch",
  bottom_cta_subtitle:
    "Limited seats available for serious aspirants. Take the first step towards IIT/AIIMS.",
  bottom_cta_primary_text: "Apply Now",
  bottom_cta_primary_link: "/contact",
  bottom_cta_secondary_text: "Talk to Counselor",
  bottom_cta_secondary_link: "/contact",
};

const DEFAULT_TRACKS = [
  {
    name: neetProgram.foundation.name,
    subtitle: "Build an Unshakable Foundation for Success.",
    for_class: neetProgram.foundation.for,
    description: neetProgram.foundation.desc,
    highlight: neetProgram.foundation.highlight,
    track_type: "foundation",
    sort_order: 0,
  },
  {
    name: neetProgram.target.name,
    subtitle: "Fast-Track Your Dream with Focused Intensity.",
    for_class: neetProgram.target.for,
    description: neetProgram.target.desc,
    highlight: neetProgram.target.highlight,
    track_type: "accelerator",
    sort_order: 1,
  },
];

const DEFAULT_ROADMAP = [
  { phase: "Phase 1", description: "Foundation Building & Concept Mastery", sort_order: 0 },
  { phase: "Phase 2", description: "Subject Strengthening & Topic Integration", sort_order: 1 },
  { phase: "Phase 3", description: "Exam-Oriented Drills, Speed & Accuracy", sort_order: 2 },
  { phase: "Final phase", description: "Full-Length Tests, Revision & Strategy", sort_order: 3 },
];

const DEFAULT_FEATURES = neetProgram.features.map((text, i) => ({
  text,
  sort_order: i,
}));

const DEFAULT_COMPARISON = neetProgram.comparison.map((row, i) => ({
  ...row,
  sort_order: i,
}));

const DEFAULT_RESULTS = neetProgram.results.map((r, i) => ({
  name: r.name,
  arabic_name: r.arabicName || "",
  score: r.score,
  exam_year: r.year,
  photo_url: r.photo || "",
  sort_order: i,
  rank: r.rank || (i + 1),
  class_group: r.classGroup || "Board Toppers",
}));

const DEFAULT_FACULTY = neetProgram.faculty ? neetProgram.faculty.map((f, i) => ({
  name: f.name,
  subject: f.subject,
  qualification: f.qualification,
  bio: f.bio,
  photo_url: f.photo_url || "",
  sort_order: i,
})) : [];

export function useNeetJeeData() {
  const [data, setData] = useState({
    settings: DEFAULT_SETTINGS,
    tracks: DEFAULT_TRACKS,
    features: DEFAULT_FEATURES,
    comparison: DEFAULT_COMPARISON,
    roadmap: DEFAULT_ROADMAP,
    results: DEFAULT_RESULTS,
    faculty: DEFAULT_FACULTY,
    answerKeys: [],
  });
  const [loading, setLoading] = useState(true);
  const [fromDb, setFromDb] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        const [
          settingsRes,
          tracksRes,
          featuresRes,
          comparisonRes,
          roadmapRes,
          resultsRes,
          facultyRes,
          answerKeysRes,
        ] = await Promise.all([
          db.from("neet_settings").select("*").eq("id", 1).maybeSingle(),
          db.from("neet_tracks").select("*").eq("is_active", true).order("sort_order"),
          db.from("neet_features").select("*").eq("is_active", true).order("sort_order"),
          db.from("neet_comparison").select("*").eq("is_active", true).order("sort_order"),
          db.from("neet_roadmap").select("*").eq("is_active", true).order("sort_order"),
          db.from("neet_results").select("*").eq("is_active", true).order("sort_order"),
          db.from("neet_faculty").select("*").eq("is_active", true).order("sort_order"),
          db.from("neet_answer_keys").select("*").eq("is_published", true).order("sort_order"),
        ]);

        if (cancelled) return;

        const hasDb =
          settingsRes.data ||
          (tracksRes.data && tracksRes.data.length > 0) ||
          (featuresRes.data && featuresRes.data.length > 0);

        setFromDb(!!hasDb);
        setData({
          // Blank admin fields must not wipe out the default text
          settings: settingsRes.data
            ? { ...DEFAULT_SETTINGS, ...Object.fromEntries(Object.entries(settingsRes.data).filter(([, v]) => v !== null && v !== "")) }
            : DEFAULT_SETTINGS,
          tracks: tracksRes.data?.length ? tracksRes.data : DEFAULT_TRACKS,
          features: featuresRes.data?.length ? featuresRes.data : DEFAULT_FEATURES,
          comparison: comparisonRes.data?.length ? comparisonRes.data : DEFAULT_COMPARISON,
          roadmap: roadmapRes.data?.length ? roadmapRes.data : DEFAULT_ROADMAP,
          results: resultsRes.data?.length ? resultsRes.data : DEFAULT_RESULTS,
          faculty: facultyRes.data?.length ? facultyRes.data : DEFAULT_FACULTY,
          answerKeys: answerKeysRes.data || [],
        });
      } catch (err) {
        console.error("Error loading NEET/JEE data:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...data, loading, fromDb };
}

export { DEFAULT_SETTINGS, DEFAULT_TRACKS, DEFAULT_FEATURES, DEFAULT_COMPARISON, DEFAULT_ROADMAP, DEFAULT_RESULTS, DEFAULT_FACULTY };
