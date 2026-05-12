import React, { useEffect, useState, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import FloatingButtons from "./components/common/FloatingButtons";
import Loader from "./components/common/loader/Loader";

import { AuthProvider } from "./context/AuthContext";
import Login from "./admin/Login";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ManageNotices from "./admin/ManageNotices";
import ManageGovernance from "./admin/ManageGovernance";
import ManageFooter from "./admin/ManageFooter";
import ManagePrograms from "./admin/ManagePrograms";
import ManageClasses from "./admin/ManageClasses";
import ManageCalendar from "./admin/ManageCalendar";
import ProtectedRoute from "./admin/ProtectedRoute";

// Lazy load pages for code splitting
const Home = lazy(() => import("./components/home/Home"));
const About = lazy(() => import("./components/about/About"));
const ValueBasedSchool = lazy(() =>
  import("./components/valuebased/ValueBasedSchool")
);
const CurriculumPage = lazy(() => import("./components/curriculum/Curriculum"));
const CoCurricularExtraPage = lazy(() =>
  import("./components/cocurricular/CoCurricularExtraPage")
);
const FacilitiesPage = lazy(() => import("./components/facilities/FacilitiesPage"));
const Assessments = lazy(() => import("./components/assessments/Assessments"));
const CourseHome = lazy(() => import("./components/allcourses/CourseHome"));
const Classes = lazy(() => import("./components/classes/Classes"));
const Programs = lazy(() => import("./components/programs/Programs"));
const CoCurricular = lazy(() => import("./components/programs/CoCurricular"));
const EnglishCommunication = lazy(() => import("./components/programs/EnglishCommunication"));
const ArabicCommunication = lazy(() => import("./components/programs/ArabicCommunication"));
const RoboticsAI = lazy(() => import("./components/programs/RoboticsAI"));
const NeetJee = lazy(() => import("./components/programs/NeetJee"));
const Team = lazy(() => import("./components/team/Team"));
const Pricing = lazy(() => import("./components/pricing/Pricing"));
const Blog = lazy(() => import("./components/blog/Blog"));
const Contact = lazy(() => import("./components/contact/Contact"));
const Carousel = lazy(() => import("./components/carousel/Carousel"));
const Calendar = lazy(() => import("./components/calendar/Calendar"));
const Gallery = lazy(() => import("./components/gallery/Gallery"));

// Infrastructure
const Infrastructure = lazy(() => import("./components/infrastructure/Infrastructure"));
const ComputerLab = lazy(() => import("./components/infrastructure/ComputerLab"));
const Library = lazy(() => import("./components/infrastructure/Library"));
const Laboratories = lazy(() => import("./components/infrastructure/Laboratories"));
const SportsComplex = lazy(() => import("./components/infrastructure/SportsComplex"));

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
  const [loading, setLoading] = useState(true);

  // Initial load only - loader shows only on page refresh
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <HelmetProvider>
        <Router>
          {loading && <Loader />}

          <ScrollHandler />

          <Routes>
            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <FloatingButtons />
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
                      <Route path="/courses" element={<CourseHome />} />
                      <Route path="/programs" element={<Programs />} />
                      <Route path="/programs/co-curricular" element={<CoCurricular />} />
                      <Route path="/programs/english-communication" element={<EnglishCommunication />} />
                      <Route path="/programs/arabic-communication" element={<ArabicCommunication />} />
                      <Route path="/programs/robotics-ai" element={<RoboticsAI />} />
                      <Route path="/programs/neet-jee" element={<NeetJee />} />
                      <Route
                        path="/vision"
                        element={<Navigate to="/about#vision-mission" replace />}
                      />
                      <Route path="/team" element={<Team />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/journal" element={<Blog />} />
                      <Route path="/brochure" element={<Carousel />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/contact" element={<Contact />} />

                      <Route path="/infrastructure" element={<Infrastructure />} />
                      <Route path="/infrastructure/computer-lab" element={<ComputerLab />} />
                      <Route path="/infrastructure/library" element={<Library />} />
                      <Route path="/infrastructure/laboratories" element={<Laboratories />} />
                      <Route path="/infrastructure/sports-complex" element={<SportsComplex />} />
                      
                      <Route path="*" element={<Home />} />
                    </Routes>
                  </Suspense>
                  <Footer />
                </>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="notices" element={<ManageNotices />} />
              <Route path="governance" element={<ManageGovernance />} />
              <Route path="footer" element={<ManageFooter />} />
              <Route path="programs" element={<ManagePrograms />} />
              <Route path="classes" element={<ManageClasses />} />
              <Route path="calendar" element={<ManageCalendar />} />
              {/* We will add other admin routes here */}
              <Route path="*" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
