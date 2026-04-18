import React from "react";
import { Link } from "react-router-dom";
import Back from "../common/back/Back";
import "./infrastructure.css";
import ContactFormOnly from "../contact/ContactFormOnly";


const Infrastructure = () => {
  return (
    <>
      <Back title="Infrastructure" />

      <section className="infraPage">
        <div className="container">
          <header className="infraTop">
            <h1>Campus Infrastructure</h1>
            <p>
              Islamic Mission School provides modern facilities including a
              well‑equipped computer lab, rich library, science laboratories
              and a dedicated sports complex to support holistic development.
            </p>
          </header>

          {/* Land & Building Section */}
          <article className="infra-section" data-aos="fade-up">
            <div className="infra-section-header">
              <div className="infra-section-number">1</div>
              <h2>Land & Building</h2>
            </div>
            <p className="infra-section-intro">
              IMS is a premier educational institution set within a sprawling 3-acre campus designed to inspire young minds. We believe that a child's learning environment is a cornerstone of their development, and our state-of-the-art infrastructure provides the perfect blend of modern education and expansive, natural space.
            </p>
            <p className="infra-section-text">
              Our vast campus, with its ventilated, sun-lit classrooms, advanced labs, and extensive playing fields, is an ecosystem of holistic growth. Our academic block is designed for learning. Every classroom is spacious, well-ventilated, and flooded with natural light, creating an alert and positive atmosphere.
            </p>
          </article>

          {/* Labs Section */}
          <article className="infra-section" data-aos="fade-up" data-aos-delay="100">
            <div className="infra-section-header">
              <div className="infra-section-number">2</div>
              <h2>Laboratories</h2>
            </div>
            <h3 className="infra-section-subtitle">Where Theory Meets Experiment</h3>
            <p className="infra-section-intro">
              The true understanding of subjects comes from doing. That's why we have invested in distinct, specialized laboratories, designed to provide an immersive, hands-on learning environment for Physics, Chemistry, Biology, Robotics & STEM, and Computer Science. This dedicated approach ensures that every experiment and project receives the focused space and resources it deserves.
            </p>

            <div className="lab-cards-grid">
              <div className="lab-card" data-aos="zoom-in" data-aos-delay="150">
                <div className="lab-card-icon">
                  <i className="fas fa-atom" aria-hidden="true"></i>
                </div>
                <h4>The Physics Lab</h4>
                <p className="lab-card-subtitle">Unraveling the Laws of the Universe</p>
                <p>
                  Step into a space where energy, motion, and forces come to life. Our Physics Lab is equipped with advanced apparatus for mechanics, optics, electricity, and thermodynamics. Here, students don't just read about Newton's laws; they validate them through experiments, fostering a deep, intuitive understanding of the physical world.
                </p>
              </div>

              <div className="lab-card" data-aos="zoom-in" data-aos-delay="200">
                <div className="lab-card-icon">
                  <i className="fas fa-flask" aria-hidden="true"></i>
                </div>
                <h4>The Chemistry Lab</h4>
                <p className="lab-card-subtitle">A Realm of Molecular Discovery</p>
                <p>
                  Equipped with modern safety systems, students learn to handle compounds responsibly while performing titrations, studying reactions, and discovering the fascinating properties of matter, transforming complex equations into tangible results.
                </p>
              </div>

              <div className="lab-card" data-aos="zoom-in" data-aos-delay="250">
                <div className="lab-card-icon">
                  <i className="fas fa-microscope" aria-hidden="true"></i>
                </div>
                <h4>The Biology Lab</h4>
                <p className="lab-card-subtitle">Exploring the Web of Life</p>
                <p>
                  From microscopes revealing the intricate structure of a cell to models of human anatomy and ecosystems, our Biology Lab brings the living world into sharp focus. Students engage in dissection, slide preparation, and DNA extraction, cultivating a sense of wonder for the complexity and beauty of life sciences.
                </p>
              </div>

              <div className="lab-card" data-aos="zoom-in" data-aos-delay="300">
                <div className="lab-card-icon">
                  <i className="fas fa-laptop-code" aria-hidden="true"></i>
                </div>
                <h4>The Computer Science Lab</h4>
                <p className="lab-card-subtitle">Coding the Digital World</p>
                <p>
                  Go beyond basic computer literacy. Our cutting-edge Computer Science Lab features high-performance computers and industry-relevant software. Here, students master programming languages, develop apps, understand cybersecurity, and delve into fields like artificial intelligence and data science, preparing them to be the architects of our digital future.
                </p>
              </div>
            </div>
          </article>

          {/* Additional Facilities */}
          <article className="infra-section" data-aos="fade-up" data-aos-delay="350">
            <div className="infra-section-header">
              <div className="infra-section-number">3</div>
              <h2>Additional Facilities</h2>
            </div>
            <div className="facilities-grid">
              <div className="facility-item" data-aos="fade-right" data-aos-delay="400">
                <div className="facility-icon">
                  <i className="fas fa-book-reader" aria-hidden="true"></i>
                </div>
                <div>
                  <h4>Library</h4>
                  <p>A peaceful reading zone with Islamic books, reference material and age-wise story books for comprehensive learning.</p>
                </div>
              </div>

              <div className="facility-item" data-aos="fade-right" data-aos-delay="450">
                <div className="facility-icon">
                  <i className="fas fa-users" aria-hidden="true"></i>
                </div>
                <div>
                  <h4>Conference Hall</h4>
                  <p>Modern conference facilities for seminars, workshops, and special events with audio-visual capabilities.</p>
                </div>
              </div>

              <div className="facility-item" data-aos="fade-right" data-aos-delay="500">
                <div className="facility-icon">
                  <i className="fas fa-user-friends" aria-hidden="true"></i>
                </div>
                <div>
                  <h4>Separate Sections</h4>
                  <p>Dedicated separate sections for boys and girls ensuring a comfortable and focused learning environment.</p>
                </div>
              </div>

              <div className="facility-item" data-aos="fade-right" data-aos-delay="550">
                <div className="facility-icon">
                  <i className="fas fa-video" aria-hidden="true"></i>
                </div>
                <div>
                  <h4>Audio-Visual System</h4>
                  <p>State-of-the-art audio-visual systems in classrooms for interactive and engaging multimedia learning experiences.</p>
                </div>
              </div>
            </div>
          </article>

          {/* Explore More Section */}
          <article className="infra-section explore-more-section" data-aos="fade-up" data-aos-delay="600">
            <div className="infra-section-header">
              <h2>Explore Our Facilities</h2>
            </div>
            <p className="explore-subtitle">Visit our specialized facility pages for detailed information</p>
            
            <div className="infra-overview-grid">
              {/* Computer Lab */}
              <article className="infra-card">
                <div className="infra-card-icon">
                  <i className="fa fa-desktop" aria-hidden="true" />
                </div>
                <h3>Computer Lab</h3>
                <p>
                  Modern systems, coding activities and guided projects that build
                  strong digital skills.
                </p>
                <ul className="infra-card-list">
                  <li>Updated computers & software</li>
                  <li>Structured coding exposure</li>
                </ul>
                <Link
                  to="/infrastructure/computer-lab"
                  className="infra-card-link"
                >
                  Visit Computer Lab <i className="fa fa-arrow-right" />
                </Link>
              </article>

              {/* Library */}
              <article className="infra-card">
                <div className="infra-card-icon">
                  <i className="fa fa-book" aria-hidden="true" />
                </div>
                <h3>Library</h3>
                <p>
                  A peaceful reading zone with Islamic books, reference material
                  and age‑wise story books.
                </p>
                <ul className="infra-card-list">
                  <li>Islamic & academic resources</li>
                  <li>Regular library periods</li>
                </ul>
                <Link to="/infrastructure/library" className="infra-card-link">
                  Visit Library <i className="fa fa-arrow-right" />
                </Link>
              </article>

              {/* Science Laboratories */}
              <article className="infra-card">
                <div className="infra-card-icon">
                  <i className="fa fa-flask" aria-hidden="true" />
                </div>
                <h3>Science Laboratories</h3>
                <p>
                  Well‑equipped physics, chemistry and biology labs for safe,
                  hands‑on experiments.
                </p>
                <ul className="infra-card-list">
                  <li>Practical concept clarity</li>
                  <li>Supervised lab sessions</li>
                </ul>
                <Link
                  to="/infrastructure/laboratories"
                  className="infra-card-link"
                >
                  Visit Laboratories <i className="fa fa-arrow-right" />
                </Link>
              </article>

              {/* Sports Complex */}
              <article className="infra-card">
                <div className="infra-card-icon">
                  <i className="fa fa-futbol" aria-hidden="true" />
                </div>
                <h3>Sports Complex</h3>
                <p>
                  Indoor and outdoor sports areas that promote health, teamwork
                  and discipline.
                </p>
                <ul className="infra-card-list">
                  <li>Outdoor games & drills</li>
                  <li>Annual sports events</li>
                </ul>
                <Link
                  to="/infrastructure/sports-complex"
                  className="infra-card-link"
                >
                  Visit Sports Complex <i className="fa fa-arrow-right" />
                </Link>
              </article>
            </div>
          </article>
        </div>
      </section>
      <section data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
            <ContactFormOnly />
        </section>
    </>
  );
};

export default Infrastructure;
