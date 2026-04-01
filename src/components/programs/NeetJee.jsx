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

  <div className="intro-text">
    <p>
      The journey to premier institutions like IITs and AIIMS demands a strong foundation, unwavering discipline, and a strategic approach from an early age.
    </p>
    <p>
      Our Integrated NEET/JEE Schooling Program is a unique educational model that seamlessly blends the rigor of the ICSE curriculum with the intensive preparation required for competitive exams. We don't just teach students; we mentor future innovators and healthcare leaders, ensuring they are exam-ready, confident, and successful in their very first attempt.
    </p>
  </div>

  <h3>Program Structure & Details</h3>

  <div className="program-track">
    <h4><span className="track-number">1.</span> The Foundation Program (4-Year Program from Class IX)</h4>
    <p className="track-subtitle">Build an Unshakable Foundation for Success.</p>
    <p>
      This program is designed for young, determined students who are clear about their career goals in medicine or engineering. Starting from Class IX, we lay a robust foundation in core subjects (Physics, Chemistry, Biology & Mathematics), ensuring conceptual clarity and mastery.
    </p>
  </div>

  <div className="program-track">
    <h4><span className="track-number">2.</span> The Intensive Accelerator Program (2-Year Program from Class XI)</h4>
    <p className="track-subtitle">Fast-Track Your Dream with Focused Intensity.</p>
    <p>
      For students who crystallize their ambition to pursue NEET/JEE after Class X, this program offers a powerful and focused two-year journey. We provide an immersive learning environment that accelerates preparation, covering both board and competitive exam syllabi with precision.
    </p>
  </div>

  <h3>Special Features</h3>
  <ul className="special-features">
    <li>Efficient and committed Faculties</li>
    <li>Daily Practice Test</li>
    <li>Weekly Test</li>
    <li>Regular doubt classes</li>
    <li>Teaching by experienced Faculties during school time</li>
    <li>No requirement of coaching which saves more than a lac per annum and 7-8 hours per day for self-study.</li>
  </ul>

  <h3>Comparison: IMS NEET/JEE Integrated Schooling vs Conventional Schooling</h3>
  <div className="comparison-table">
    <div className="comparison-row header-row">
      <div className="comparison-cell">IMS NEET/JEE Integrated Schooling</div>
      <div className="comparison-cell">Conventional Schooling</div>
    </div>
    <div className="comparison-row">
      <div className="comparison-cell highlight-cell">
        The entire ecosystem is built around a singular goal: cracking JEE/NEET in the first attempt.
      </div>
      <div className="comparison-cell">
        Aims to deliver a general board education only.
      </div>
    </div>
  </div>

</article>

      <p>
        <Link to="/programs">← Back to Programs Overview</Link>
      </p>
    </main>
  );
};

export default NeetJee;
