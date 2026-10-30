import {
  PiStethoscope, PiChatsCircle, PiFlask, PiCoins, PiChartLineUp, PiBrain, PiRobot,
  PiHeart, PiMosque, PiBookOpenText, PiBed, PiStar, PiHandsPraying, PiPlant, PiGraduationCap,
  PiBooks, PiUsersThree, PiTarget, PiShieldCheck, PiCpu, PiLightbulb, PiCalendarCheck, PiTrophy,
  PiFlag, PiGlobeHemisphereEast, PiPuzzlePiece, PiWrench, PiMagnifyingGlass, PiPresentationChart,
  PiChalkboardTeacher, PiClipboardText, PiExam, PiHandHeart, PiCompass, PiPalette, PiCalculator,
  PiTranslate, PiAtom, PiCode, PiCircuitry, PiStudent, PiSun, PiListChecks, PiClock,
} from "react-icons/pi";

const icons = {
  stethoscope: PiStethoscope, chat: PiChatsCircle, flask: PiFlask, coins: PiCoins,
  chart: PiChartLineUp, brain: PiBrain, robot: PiRobot, heart: PiHeart, mosque: PiMosque,
  quran: PiBookOpenText, bed: PiBed, star: PiStar, hands: PiHandsPraying, plant: PiPlant,
  graduation: PiGraduationCap, books: PiBooks, users: PiUsersThree, target: PiTarget,
  shield: PiShieldCheck, cpu: PiCpu, idea: PiLightbulb, calendar: PiCalendarCheck, trophy: PiTrophy,
  flag: PiFlag, globe: PiGlobeHemisphereEast, puzzle: PiPuzzlePiece, wrench: PiWrench,
  search: PiMagnifyingGlass, present: PiPresentationChart, teacher: PiChalkboardTeacher,
  clipboard: PiClipboardText, exam: PiExam, care: PiHandHeart, compass: PiCompass, palette: PiPalette,
  calculator: PiCalculator, language: PiTranslate, atom: PiAtom, code: PiCode, circuit: PiCircuitry,
  student: PiStudent, sun: PiSun, checklist: PiListChecks, clock: PiClock,
};

export const iconNames = Object.keys(icons);

/* Round emerald badge with a white line icon, as on the admission poster */
const IconBadge = ({ icon, size = "md", className = "" }) => {
  const Icon = icons[icon] || PiStar;
  const dims = size === "lg" ? "h-16 w-16 text-3xl" : "h-12 w-12 text-2xl";
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-emerald-700 text-ivory-50 ring-2 ring-gold-500/60 ring-offset-2 ring-offset-transparent ${dims} ${className}`}>
      <Icon aria-hidden="true" />
    </span>
  );
};

export default IconBadge;
