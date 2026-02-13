import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import "./floating-buttons.css";

const FloatingButtons = () => {
  return (
    <>
      {/* WhatsApp – bottom right */}
      <a
        href="https://wa.me/919219401623"
        className="float-btn float-whatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Call – bottom left */}
      <a
        href="tel:+917417914164"
        className="float-btn float-call"
        aria-label="Call Islamic Mission School"
        title="Call us"
      >
        <FaPhone />
      </a>
    </>
  );
};

export default FloatingButtons;
