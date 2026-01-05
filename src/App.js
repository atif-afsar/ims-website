import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import FloatingButtons from "./components/common/FloatingButtons";


// Pages
import Home from "./components/home/Home";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Classes from "./components/classes/Classes";
import WhyIMS from "./components/whychoose/WhyIMS";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";

// infrastructure

import Infrastructure from "./components/infrastructure/Infrastructure";
import ComputerLab from "./components/infrastructure/ComputerLab";
import Library from "./components/infrastructure/Library";
import Laboratories from "./components/infrastructure/Laboratories";
import SportsComplex from "./components/infrastructure/SportsComplex";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Header />
        {/* Floating WhatsApp + Call buttons */}
        <FloatingButtons />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/courses" element={<CourseHome />} />
          <Route path="/why-ims" element={<WhyIMS />} />
          <Route path="/team" element={<Team />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/journal" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />

          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/infrastructure/computer-lab" element={<ComputerLab />} />
          <Route path="/infrastructure/library" element={<Library />} />
          <Route path="/infrastructure/laboratories" element={<Laboratories />} />
          <Route path="/infrastructure/sports-complex" element={<SportsComplex />} />
        </Routes>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
