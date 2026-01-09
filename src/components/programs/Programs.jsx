import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import "./programs.css";

const Programs = () => {
  const location = useLocation();
  const topRef = useRef(null);

  useEffect(() => {
    // If there's a hash in the URL, try to scroll to that element
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (topRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <main className="programs-page container" ref={topRef}>
      <h1>Programs</h1>

      <section id="co-curricular">
        <h2>Co-Curricular & Extra Curricular</h2>
        <p>Where Passion is Discovered, Character is Built, and Talents Shine.</p>
        <p>
          At IMS, we believe that a child's education extends far beyond the
          classroom walls. Our rich and diverse programme of co-curricular and
          extra-curricular activities is a core part of our holistic
          philosophy. These activities provide a vital platform for students to
          explore their interests, develop essential life skills, build
          confidence, and form lasting friendships, all within our supportive
          and values-led environment.
        </p>

        <h3 id="english-communication">English Communication Program</h3>
        <p>Find Your Voice, Shape Your Future.</p>
        <p>
          Our dedicated English Communication program is designed to empower
          students with the skills to articulate their ideas with clarity,
          conviction, and respect. In today's interconnected world, the
          ability to communicate effectively in English opens doors to global
          opportunities.
        </p>

        <h3 id="arabic-communication">Arabic Communication Program</h3>
        <p>Connect with the Language of Faith.</p>
        <p>
          Arabic is not just a language to be learned, but a key to a deeper
          spiritual understanding. Our specialized Arabic Communication program
          opens the door to the profound beauty of the Quran and the rich
          heritage of Islamic scholarship.
        </p>

        <h3>Project Based Learning</h3>
        <p>Nurturing Problem-Solvers & Change-Makers</p>
        <ol>
          <li>Discover & Question</li>
          <li>Research & Investigate</li>
          <li>Design & Create</li>
          <li>Refine & Present (Science Fair - Sciberation)</li>
        </ol>
      </section>

      <section id="neet-jee">
        <h2>NEET/JEE Program</h2>
        <p>Redefining Schooling for Aspiring Doctors & Engineers</p>
        <p>
          Our Integrated NEET/JEE Schooling Program blends the ICSE curriculum
          with intensive competitive exam preparation so students are ready in
          their first attempt.
        </p>

        <h3>The Foundation Program (4-Year from Class IX)</h3>
        <p>Build an Unshakable Foundation for Success in core subjects.</p>

        <h3>The Intensive Accelerator Program (2-Year from Class XI)</h3>
        <p>
          Fast-track preparation covering board and competitive syllabi with
          daily practice, weekly tests, doubt classes and experienced faculty.
        </p>

        <h4>Special Features</h4>
        <ul>
          <li>Efficient and committed Faculties</li>
          <li>Daily Practice Tests</li>
          <li>Weekly Tests and doubt classes</li>
          <li>No need for external coaching (saves time and money)</li>
        </ul>
      </section>

      <section id="facilities">
        <h2>Facilities</h2>
        <p>
          IMS is set on a spacious 3-acre campus with ventilated classrooms,
          advanced labs, and extensive playing fields — an ecosystem for
          holistic growth.
        </p>
      </section>

      <p className="closing">
        IMS is committed to value-based education, national service, and
        nurturing future leaders — PADHEGA INDIA TABHI TO BADHEGA INDIA.
      </p>
    </main>
  );
};

export default Programs;
