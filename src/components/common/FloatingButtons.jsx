import React from "react";
import "./floating-buttons.css";

const FloatingButtons = () => {
  return (
    <>
      {/* WhatsApp – bottom right */}
      <a
        href="https://wa.me/919876543210"
        className="float-btn float-whatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp" aria-hidden="true"></i>
      </a>

      {/* Call – bottom left */}
      <a
        href="tel:+919876543210"
        className="float-btn float-call"
        aria-label="Call Islamic Mission School"
      >
        <i className="fa fa-phone" aria-hidden="true"></i>
      </a>
    </>
  );
};

export default FloatingButtons;
