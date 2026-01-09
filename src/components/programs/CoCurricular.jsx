import React from "react";
import { Link } from "react-router-dom";
import "./programs.css";

const CoCurricular = () => {
  return (
    <main className="programs-page container">
      <div className="program-hero">
        <div className="program-hero-placeholder">
            <img src="/images/programs/program1.png" alt="Co-Curricular & Extra Curricular" />
        </div>
        <div className="program-hero-text">
          <h1>Co-Curricular & Extra Curricular</h1>
          <p className="lead">Where Passion is Discovered, Character is Built, and Talents Shine.</p>
        </div>
      </div>

     <article className="program-content">

  <p>
    At IMS, we believe that a child's education extends far beyond the classroom
    walls. Our rich and diverse programme of co-curricular and extra-curricular
    activities is a core part of our holistic philosophy. These activities
    provide a vital platform for students to explore their interests, develop
    essential life skills, build confidence, and form lasting friendships, all
    within our supportive and values-led environment.
  </p>

  <h3>Project Based Learning (PBL)</h3>
  <p><strong>Nurturing Problem-Solvers & Change-Makers</strong></p>
  <ol>
    <li>Discover & Question real-world problems</li>
    <li>Research & Investigate through guided inquiry</li>
    <li>Design & Create innovative solutions</li>
    <li>Refine & Present ideas (Science Fair – Sciberation)</li>
  </ol>
  <p>
    Through hands-on projects, students learn collaboration, creativity,
    critical thinking, and communication — skills essential for lifelong
    success.
  </p>

  <h3>Taekwondo & Sports</h3>
  <p>
    Our structured Taekwondo programme and wide range of sports activities help
    students develop physical fitness, self-discipline, resilience, and
    sportsmanship.
  </p>
  <ul>
    <li>Professional Taekwondo training</li>
    <li>Annual Sports Day and inter-house competitions</li>
    <li>Team sports that promote leadership and cooperation</li>
  </ul>

  <h3>Creative & Performing Arts</h3>
  <p>
    Creative expression is encouraged through a variety of artistic platforms
    that allow students to discover and nurture their talents.
  </p>
  <ul>
    <li>Art, craft, and creative design activities</li>
    <li>Drama, storytelling, and stage performances</li>
    <li>Music, nasheeds, and cultural presentations</li>
  </ul>

  <h3>Leadership & Life Skills</h3>
  <p>
    Students are guided to become confident, responsible, and empathetic
    individuals through leadership-focused activities.
  </p>
  <ul>
    <li>Student councils and classroom responsibilities</li>
    <li>Public speaking and presentation opportunities</li>
    <li>Team-building and confidence-building exercises</li>
  </ul>

  <h3>Values, Community & Well-Being</h3>
  <p>
    Our co-curricular programme is rooted in strong moral values and social
    responsibility.
  </p>
  <ul>
    <li>Community service and awareness activities</li>
    <li>Character building through ethical learning</li>
    <li>Activities that promote emotional well-being</li>
  </ul>

</article>


      <p>
        <Link to="/programs">← Back to Programs Overview</Link>
      </p>
    </main>
  );
};

export default CoCurricular;
