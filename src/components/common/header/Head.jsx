// src/components/common/header/Head.jsx
import React from "react";
import logo from "../../../assets/images/logo/logo.jpg";
import "./head.css";

const Head = () => {
  return (
    <section className="head">
      <div className="container flexSB">
        <div className="logo d-flex">
          <img
            src={logo}
            alt="IMS Logo"
            className="logo-image"
            width="80"
            height="80"
          />
          <div>
            <span>O MY LORD! ADVANCE ME IN KNOWLEDGE</span>
            <h1>ISLAMIC MISSION SCHOOL</h1>
          </div>
        </div>

        <div className="social">
          <i className="fab fa-facebook-f icon" />
          <i className="fab fa-instagram icon" />
          <i className="fab fa-twitter icon" />
          <i className="fab fa-youtube icon" />
        </div>
      </div>
    </section>
  );
};

export default Head;
