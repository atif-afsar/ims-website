import React from "react";
import { Link } from "react-router-dom";
import "./programs.css";

const EnglishCommunication = () => {
  return (
    <main className="programs-page container">
      <div className="program-hero">
        <div className="program-hero-placeholder">
            <img src="/images/programs/program2.png" alt="English Communication Program" />
        </div>
        <div className="program-hero-text">
          <h1>English Communication Program</h1>
          <p className="lead">Find Your Voice, Shape Your Future.</p>
        </div>
      </div>

      <article className="program-content">

  <p>
    Our dedicated English Communication Program is designed to empower students
    with the skills to articulate their ideas with clarity, confidence, and
    respect. The program nurtures effective communication, critical thinking,
    and expressive abilities essential for academic success and real-world
    interactions.
  </p>

  <h3>Core Communication Skills</h3>
  <ul>
    <li>Clear and confident spoken English</li>
    <li>Active listening and thoughtful responses</li>
    <li>Vocabulary enhancement and sentence structure</li>
    <li>Fluency with correct pronunciation</li>
  </ul>

  <h3>Key Activities</h3>
  <ul>
    <li>Panel Discussions to develop teamwork and analytical thinking</li>
    <li>Speech & Public Speaking for confidence and stage presence</li>
    <li>Debates to build logical reasoning and persuasive skills</li>
    <li>Extempore sessions to encourage spontaneous expression</li>
  </ul>

  <h3>Critical Thinking & Expression</h3>
  <ul>
    <li>Forming and presenting well-structured arguments</li>
    <li>Expressing opinions with respect and clarity</li>
    <li>Responding thoughtfully to questions and counterpoints</li>
  </ul>

  <h3>Real-World Communication</h3>
  <ul>
    <li>Group discussions and collaborative conversations</li>
    <li>Presentation skills for academic and professional settings</li>
    <li>Interview readiness and formal communication etiquette</li>
  </ul>

  <h3>Learning Outcomes</h3>
  <ul>
    <li>Increased confidence in spoken English</li>
    <li>Improved articulation and language fluency</li>
    <li>Stronger leadership and interpersonal skills</li>
    <li>Preparedness for future academic and career opportunities</li>
  </ul>

</article>


      <p>
        <Link to="/programs">← Back to Programs Overview</Link>
      </p>
    </main>
  );
};

export default EnglishCommunication;
