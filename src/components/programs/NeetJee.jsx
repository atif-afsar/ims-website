import React from "react";
import { Link } from "react-router-dom";
import "./programs.css";

const NeetJee = () => {
  return (
    <main className="programs-page container">
      <div className="program-hero">
        <div className="program-hero-placeholder">
            <img src="/images/programs/program4.png" alt="NEET / JEE Program" />
        </div>
        <div className="program-hero-text">
          <h1>NEET / JEE Program</h1>
          <p className="lead">Redefining Schooling for Aspiring Doctors & Engineers</p>
        </div>
      </div>

     <article className="program-content">

  <p>
    Our Integrated NEET / JEE Schooling Program is designed for students who
    aspire to become successful doctors and engineers. The program seamlessly
    blends the ICSE school curriculum with focused competitive exam preparation,
    ensuring students are fully prepared to succeed in their first attempt.
  </p>

  <h3>Program Highlights</h3>
  <ul>
    <li>Integrated ICSE + NEET / JEE preparation</li>
    <li>Concept-based teaching with strong fundamentals</li>
    <li>Regular assessments and performance tracking</li>
    <li>Experienced faculty for Physics, Chemistry & Mathematics / Biology</li>
  </ul>

  <h3>The Foundation Program (4-Year | From Class IX)</h3>
  <p><strong>Build an Unshakable Academic & Conceptual Base</strong></p>
  <ul>
    <li>Early exposure to NEET / JEE concepts</li>
    <li>Strong focus on fundamentals of Physics, Chemistry, Maths & Biology</li>
    <li>Gradual increase in difficulty aligned with student growth</li>
    <li>Balanced preparation for school exams and competitive tests</li>
  </ul>

  <h3>The Intensive Accelerator Program (2-Year | From Class XI)</h3>
  <p><strong>Fast-Track Preparation for Top Medical & Engineering Colleges</strong></p>
  <ul>
    <li>In-depth coverage of board and competitive syllabi</li>
    <li>Daily practice problems and assignment sheets</li>
    <li>Weekly mock tests and full-length examinations</li>
    <li>Dedicated doubt-clearing and revision sessions</li>
  </ul>

  <h3>Teaching Methodology</h3>
  <ul>
    <li>Concept-first approach with real-life applications</li>
    <li>Problem-solving focused classroom sessions</li>
    <li>Regular revision cycles and exam-oriented strategies</li>
    <li>Personalized mentoring and academic guidance</li>
  </ul>

  <h3>Student Support & Mentorship</h3>
  <ul>
    <li>One-on-one mentoring and performance counseling</li>
    <li>Stress management and exam readiness support</li>
    <li>Parent-teacher academic progress discussions</li>
  </ul>

  <h3>Learning Outcomes</h3>
  <ul>
    <li>Strong command over core science subjects</li>
    <li>Confidence to handle high-pressure competitive exams</li>
    <li>Improved accuracy, speed, and exam temperament</li>
    <li>Readiness for NEET / JEE and board examinations</li>
  </ul>

</article>

      <p>
        <Link to="/programs">← Back to Programs Overview</Link>
      </p>
    </main>
  );
};

export default NeetJee;
