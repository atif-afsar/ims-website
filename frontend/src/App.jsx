import React, { useEffect, useState, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router";
import { AnimatePresence } from "framer-motion";

import SiteHeader from "./layout/SiteHeader";
import SiteFooter from "./layout/SiteFooter";
import QuickActions from "./layout/QuickActions";
import NewsPanel from "./layout/NewsPanel";
import Loader from "./components/common/loader/Loader";
import { HERO_READY } from "./pages/home/heroReady";

import ProtectedRoute from "./admin/ProtectedRoute";
import { ApiAuthProvider } from "./admin/ApiAuth";

// Admin pages are lazy loaded so public visitors never download them
const Login = lazy(() => import("./admin/Login"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const ManageNotices = lazy(() => import("./admin/ManageNotices"));
const ManageHeroSlides = lazy(() => import("./admin/ManageHeroSlides"));
const ManageHomepage = lazy(() => import("./admin/ManageHomepage"));
const ManageTestimonials = lazy(() => import("./admin/ManageTestimonials"));
const ManagePopup = lazy(() => import("./admin/ManagePopup"));
const ManageGovernance = lazy(() => import("./admin/ManageGovernance"));
const ManageFooter = lazy(() => import("./admin/ManageFooter"));
const ManagePrograms = lazy(() => import("./admin/ManagePrograms"));
const ManageClasses = lazy(() => import("./admin/ManageClasses"));
const ManageCalendar = lazy(() => import("./admin/ManageCalendar"));
const ManageNeetJee = lazy(() => import("./admin/ManageNeetJee"));
const ChangePassword = lazy(() => import("./admin/ChangePassword"));
const ManageGallery = lazy(() => import("./admin/ManageGallery"));
const ManageEnquiries = lazy(() => import("./admin/ManageEnquiries"));
const PreviewFrame = lazy(() => import("./admin/home/PreviewFrame"));

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/home/HomePage"));
const About = lazy(() => import("./pages/about/AboutPage"));
const ValueBasedSchool = lazy(() => import("./pages/about/ValueBasedPage"));
const CurriculumPage = lazy(() => import("./pages/academics/CurriculumPage"));
const CoCurricularExtraPage = lazy(() => import("./pages/studentLife/StudentLifePage"));
const FacilitiesPage = lazy(() => import("./pages/campus/CampusPage"));
const Assessments = lazy(() => import("./pages/academics/AssessmentsPage"));
const Classes = lazy(() => import("./pages/academics/ClassesPage"));
const NeetJee = lazy(() => import("./pages/academics/NeetJeePage"));
const Contact = lazy(() => import("./pages/contact/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));
const Carousel = lazy(() => import("./pages/brochure/BrochurePage"));
const Calendar = lazy(() => import("./pages/calendar/CalendarPage"));
const Gallery = lazy(() => import("./pages/gallery/GalleryPage"));

// Infrastructure
const ComputerLab = lazy(() => import("./pages/campus/FacilityPage").then((m) => ({ default: m.ComputerLabPage })));
const Library = lazy(() => import("./pages/campus/FacilityPage").then((m) => ({ default: m.LibraryPage })));
const Laboratories = lazy(() => import("./pages/campus/FacilityPage").then((m) => ({ default: m.LaboratoriesPage })));
const SportsComplex = lazy(() => import("./pages/campus/FacilityPage").then((m) => ({ default: m.SportsComplexPage })));

// Loading fallback component
const PageLoader = () => <Loader />;

/* Scroll handler - only scroll on route change, no loader */
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const scrollToHashTarget = (attempt = 0) => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        if (attempt < 8) {
          setTimeout(() => scrollToHashTarget(attempt + 1), 120);
        }
      };

      scrollToHashTarget();
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};


function App() {
  // The admin panel and its preview skip the splash screen
  const [loading, setLoading] = useState(() => !window.location.pathname.startsWith("/admin"));

  // First visit only. On the homepage, stay until the first hero photo has
  // loaded (so the slider never appears half-drawn), capped at 4 seconds.
  useEffect(() => {
    const started = Date.now();
    const MIN_MS = 700;
    let timer;
    const done = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setLoading(false), Math.max(0, MIN_MS - (Date.now() - started)));
    };
    const waitForHero = window.location.pathname === "/";
    if (waitForHero) window.addEventListener(HERO_READY, done, { once: true });
    const cap = setTimeout(done, waitForHero ? 4000 : MIN_MS);
    return () => {
      clearTimeout(timer);
      clearTimeout(cap);
      window.removeEventListener(HERO_READY, done);
    };
  }, []);

  return (
    <Router>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <ScrollHandler />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <>
              <SiteHeader />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/ims-value-based-school"
                    element={<ValueBasedSchool />}
                  />
                  <Route path="/curriculum" element={<CurriculumPage />} />
                  <Route
                    path="/co-curricular-extracurricular"
                    element={<CoCurricularExtraPage />}
                  />
                  <Route path="/facilities" element={<FacilitiesPage />} />
                  <Route path="/assessments" element={<Assessments />} />
                  <Route path="/classes" element={<Classes />} />
                  <Route path="/courses" element={<Navigate to="/programs" replace />} />
                  <Route path="/programs" element={<Navigate to="/co-curricular-extracurricular" replace />} />
                  <Route path="/programs/co-curricular" element={<Navigate to="/co-curricular-extracurricular" replace />} />
                  <Route path="/programs/english-communication" element={<Navigate to="/co-curricular-extracurricular#cc-english" replace />} />
                  <Route path="/programs/arabic-communication" element={<Navigate to="/co-curricular-extracurricular#cc-arabic" replace />} />
                  <Route path="/programs/robotics-ai" element={<Navigate to="/curriculum#curriculum-robotics-ai" replace />} />
                  <Route path="/programs/neet-jee" element={<NeetJee />} />
                  <Route
                    path="/vision"
                    element={<Navigate to="/about#vision-mission" replace />}
                  />
                  <Route path="/team" element={<Navigate to="/about#board-members" replace />} />
                  <Route path="/pricing" element={<Navigate to="/" replace />} />
                  <Route path="/journal" element={<Navigate to="/" replace />} />
                  <Route path="/brochure" element={<Carousel />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />

                  <Route path="/infrastructure" element={<Navigate to="/facilities" replace />} />
                  <Route path="/infrastructure/computer-lab" element={<ComputerLab />} />
                  <Route path="/infrastructure/library" element={<Library />} />
                  <Route path="/infrastructure/laboratories" element={<Laboratories />} />
                  <Route path="/infrastructure/sports-complex" element={<SportsComplex />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <SiteFooter />
              <QuickActions />
              <NewsPanel />
            </>
          }
        />

        {/* Admin Routes: only these need the login session */}
        <Route
          element={
            <ApiAuthProvider>
              <Outlet />
            </ApiAuthProvider>
          }
        >
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/admin/preview"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <PreviewFrame />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <AdminLayout />
                </Suspense>
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="homepage" element={<ManageHomepage />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="hero-slides" element={<ManageHeroSlides />} />
              <Route path="popup" element={<ManagePopup />} />
              <Route path="notices" element={<ManageNotices />} />
            <Route path="governance" element={<ManageGovernance />} />
            <Route path="footer" element={<ManageFooter />} />
            <Route path="programs" element={<ManagePrograms />} />
            <Route path="classes" element={<ManageClasses />} />
            <Route path="calendar" element={<ManageCalendar />} />
            <Route path="neet-jee" element={<ManageNeetJee />} />
            <Route path="account" element={<ChangePassword />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="enquiries" element={<ManageEnquiries />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
