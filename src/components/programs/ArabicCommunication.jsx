import React from "react";
import { Link } from "react-router-dom";
import "./programs.css";

const ArabicCommunication = () => {
  return (
    <main className="programs-page container">
      <div className="program-hero">
        <div className="program-hero-placeholder">
            <img src="/images/programs/program3.png" alt="Arabic Communication Program" />
        </div>
        <div className="program-hero-text">
          <h1>Arabic Communication Program</h1>
          <p className="lead">Connect with the Language of Faith.</p>
        </div>
      </div>

      <article className="program-content">

  <section className="program-section">
    <h2>Program Overview</h2>
    <ul>
      <li>Arabic taught as both a communication skill and a spiritual language</li>
      <li>Focus on real-life usage and classroom interaction</li>
      <li>Designed for gradual and confident language development</li>
    </ul>
  </section>

  <section className="program-section">
    <h2>Key Focus Areas</h2>
    <ul>
      <li>Speaking and listening for everyday communication</li>
      <li>Correct pronunciation (Makharij) and clarity</li>
      <li>Vocabulary building and sentence formation</li>
      <li>Basic reading and writing skills</li>
    </ul>
  </section>

  <section className="program-section">
    <h2>Teaching Methodology</h2>
    <ul>
      <li>Interactive classroom conversations</li>
      <li>Role plays and group discussions</li>
      <li>Audio-visual learning aids</li>
      <li>Storytelling and guided speaking exercises</li>
    </ul>
  </section>

  <section className="program-section">
    <h2>Spiritual Integration</h2>
    <ul>
      <li>Introduction to Quranic and classical Arabic</li>
      <li>Understanding commonly recited duas and verses</li>
      <li>Learning Islamic terms and expressions</li>
    </ul>
  </section>

  <section className="program-section">
    <h2>Learning Outcomes</h2>
    <ul>
      <li>Confidence in basic Arabic communication</li>
      <li>Improved pronunciation and comprehension</li>
      <li>Stronger connection with the language of faith</li>
      <li>Foundation for advanced Arabic studies</li>
    </ul>
  </section>

</article>



      <p>
        <Link to="/programs">← Back to Programs Overview</Link>
      </p>
    </main>
  );
};

export default ArabicCommunication;
