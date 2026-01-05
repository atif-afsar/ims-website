import React from "react";
import { Link } from "react-router-dom";
import Back from "../common/back/Back";
import "./infrastructure.css";
import ContactFormOnly from "../contact/ContactFormOnly";


const Infrastructure = () => {
     const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp";

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
        </div>
      </section>
      <section data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
            <ContactFormOnly />
        </section>
    </>
  );
};

export default Infrastructure;
