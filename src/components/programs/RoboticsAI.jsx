import React from "react";
import { Link } from "react-router-dom";
import "./programs.css";

const RoboticsAI = () => {
  return (
    <main className="programs-page container">
      <div className="program-hero">
        <div className="program-hero-placeholder">
          <img src="/images/programs/program5.png" alt="Robotics & Artificial Intelligence Program" />
        </div>
        <div className="program-hero-text">
          <h1>Robotics & Artificial Intelligence</h1>
          <p className="lead">Building the Future, Guided by Wisdom.</p>
        </div>
      </div>

      <article className="program-content">
        <p className="intro-text">
          Welcome to the frontier of learning at IMS Robotics & AI Lab. Here, students don't just use technology—they create it. Our comprehensive program empowers young minds to understand, design, and program intelligent machines, preparing them for the careers of tomorrow. We believe that the builders of the future must be equipped not only with technical skill but also with a strong ethical compass, rooted in moral values, to ensure technology serves all of humanity with justice and compassion.
        </p>

        <div className="partner-section">
          <h3>Our Partner: Eduvate</h3>
          <p>
            At IMS, we are committed to providing a future-focused education that prepares students for the world of tomorrow. We are proud to partner with <strong>Eduvate</strong>, a leader in innovative educational solutions, to deliver a cutting-edge Robotics and Artificial Intelligence curriculum from Grade 1. This structured program equips our students with hands-on technical skills and the critical ethical framework needed to become responsible pioneers in a rapidly evolving technological landscape.
          </p>
        </div>

        <h3>Why We Partnered with Eduvate</h3>
        <p>
          We selected Eduvate's Robotics & AI curriculum after a meticulous search for a program that aligns with our core educational values. Eduvate stood out for its:
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h4>Structured, Progressive Learning Pathway</h4>
            <p>The curriculum is expertly scaffolded, taking students from fundamental concepts to advanced applications, ensuring solid understanding at every stage.</p>
          </div>

          <div className="feature-card">
            <h4>Integrated Hands-On Learning</h4>
            <p>Eduvate believes in "learning by doing." Every theoretical concept is reinforced with practical, engaging projects using state-of-the-art hardware and software.</p>
          </div>

          <div className="feature-card">
            <h4>Focus on Real-World Application</h4>
            <p>The curriculum is designed around solving tangible problems, helping students see the direct impact of their skills in fields like healthcare, environmental science, and automation.</p>
          </div>

          <div className="feature-card">
            <h4>Comprehensive Teacher Support</h4>
            <p>Eduvate provides robust training and resources for our educators, ensuring they are empowered to guide students effectively through complex topics.</p>
          </div>
        </div>

        <h3>Our State-of-the-Art Eduvate Lab</h3>
        <p>
          To bring this curriculum to life, we have established a dedicated lab equipped with the full suite of Eduvate-recommended technology, including:
        </p>

        <ul className="lab-equipment">
          <li>
            <strong>Eduvate Robotics Kits:</strong> From simple construction sets for juniors to advanced modular systems for seniors.
          </li>
          <li>
            <strong>Sensor & Component Arrays:</strong> A wide range of sensors (ultrasonic, light, touch, etc.) and components for limitless innovation.
          </li>
          <li>
            <strong>High-Performance Computing:</strong> Workstations configured with specialized software for coding, simulation, and AI model training.
          </li>
          <li>
            <strong>Collaborative Innovation Zone:</strong> A space designed for teamwork, prototyping, and showcasing student projects.
          </li>
        </ul>
      </article>

      <p>
        <Link to="/programs">← Back to Programs Overview</Link>
      </p>
    </main>
  );
};

export default RoboticsAI;
