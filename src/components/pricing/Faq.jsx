import React, { useState } from "react";
import { faq } from "../../dummydata";
import Heading from "../common/heading/Heading";
import "./price.css";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faqSection">
      <div className="container">
        <div data-aos="fade-up" data-aos-duration="900">
          <Heading subtitle="FAQS" title="Frequently Asked Questions" />
        </div>

        <div className="faqWrap" data-aos="fade-up" data-aos-delay="120" data-aos-duration="900">
          {faq.map((val, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const btnId = `faq-btn-${index}`;

            return (
              <div className="faqBox" key={index}>
                <button
                  id={btnId}
                  className={`faqAccordion ${isOpen ? "open" : ""}`}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  type="button"
                >
                  <span className="faqQ">
                    <i className="fa fa-circle-question" aria-hidden="true"></i>
                    {val.title}
                  </span>

                  <span className="faqIcon" aria-hidden="true">
                    <i className={isOpen ? "fa fa-chevron-up" : "fa fa-chevron-down"}></i>
                  </span>
                </button>

                <div
                  id={panelId}
                  className={`faqPanel ${isOpen ? "open" : ""}`}
                  role="region"
                  aria-labelledby={btnId}
                >
                  <p>{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faqSticker" aria-hidden="true">📘✨</div>
      </div>
    </section>
  );
};

export default Faq;
