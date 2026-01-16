import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import FloatingButtons from "./components/common/FloatingButtons";
import Loader from "./components/common/loader/Loader";

// Pages
import Home from "./components/home/Home";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Classes from "./components/classes/Classes";
import Programs from "./components/programs/Programs";
import CoCurricular from "./components/programs/CoCurricular";
import EnglishCommunication from "./components/programs/EnglishCommunication";
import ArabicCommunication from "./components/programs/ArabicCommunication";
import NeetJee from "./components/programs/NeetJee";
import Vision from "./components/vision/Vision";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";

// Infrastructure
import Infrastructure from "./components/infrastructure/Infrastructure";
import ComputerLab from "./components/infrastructure/ComputerLab";
import Library from "./components/infrastructure/Library";
import Laboratories from "./components/infrastructure/Laboratories";
import SportsComplex from "./components/infrastructure/SportsComplex";

/* Scroll + Loader handler */
const ScrollAndLoader = ({ setLoading }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // loader duration

    return () => clearTimeout(timer);
  }, [pathname, setLoading]);

  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        {loading && <Loader />}

        <ScrollAndLoader setLoading={setLoading} />

        {!loading && (
          <>
            <Header />
            <FloatingButtons />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/courses" element={<CourseHome />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/co-curricular" element={<CoCurricular />} />
              <Route path="/programs/english-communication" element={<EnglishCommunication />} />
              <Route path="/programs/arabic-communication" element={<ArabicCommunication />} />
              <Route path="/programs/neet-jee" element={<NeetJee />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/team" element={<Team />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/journal" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/infrastructure/computer-lab" element={<ComputerLab />} />
              <Route path="/infrastructure/library" element={<Library />} />
              <Route path="/infrastructure/laboratories" element={<Laboratories />} />
              <Route path="/infrastructure/sports-complex" element={<SportsComplex />} />

              <Route path="*" element={<Home />} />
            </Routes>

            <Footer />
          </>
        )}
      </Router>
    </HelmetProvider>
  );
}

export default App;
