import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { boardFallback } from "../content/about";

const ORDER = ["President", "Vice-President", "Secretary", "Joint Secretary", "Treasurer"];

// Admin entries store qualifications as "(MBBS, MD)"; the card adds its own styling
const stripParens = (s) => (s || "").trim().replace(/^\((.*)\)$/, "$1");

// Uploads are saved as "<timestamp>-<original name>", so the original name identifies the file
const uploadName = (url) => url?.split("/").pop().split("-").slice(1).join("-");

const rank = (role) => (ORDER.includes(role) ? ORDER.indexOf(role) : ORDER.length);

/*
 * Board members from Admin → Governance. A photo uploaded for several
 * members is treated as a placeholder avatar and ignored, so the card shows
 * initials until a real portrait is added. Blank professions fall back to
 * the text the site already showed.
 */
export function useBoardMembers() {
  const [members, setMembers] = useState(boardFallback);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("governance")
      .select("*")
      .order("sort_order")
      .order("id")
      .then(({ data, error }) => {
        if (cancelled || error || !data?.length) return;
        const uses = {};
        data.forEach((m) => {
          const key = uploadName(m.image_url);
          if (key) uses[key] = (uses[key] || 0) + 1;
        });
        const mapped = data.map((m) => {
          const name = m.name?.trim();
          const fallback = boardFallback.find((f) => f.name === name);
          return {
            role: m.role?.trim(),
            name,
            qualification: stripParens(m.qualification),
            profession: m.profession?.trim() || fallback?.profession,
            photo: m.image_url && uses[uploadName(m.image_url)] === 1 ? m.image_url : null,
          };
        });
        setMembers(mapped.sort((a, b) => rank(a.role) - rank(b.role)));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return members;
}
