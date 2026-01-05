import React from "react";
import Back from "../common/back/Back";
import "./contact.css";

const Contact = () => {
  // IMPORTANT: put only the URL here (not the whole iframe HTML)
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp";

  return (
    <>
      <Back title="Contact Us" />

      <section className="contactSection">
        {/* decorative stickers */}
        <span className="contactSticker contactStickerLeft" aria-hidden="true">📍</span>
        <span className="contactSticker contactStickerRight" aria-hidden="true">✨</span>

        <div className="container contactCard shadow" data-aos="fade-up" data-aos-duration="900">
          {/* Map */}
          <div className="contactMap" data-aos="fade-right" data-aos-duration="900">
            <iframe
              title="Islamic Mission School Location Map"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Content */}
          <div className="contactInfo" data-aos="fade-left" data-aos-duration="900">
            <div className="contactHeader">
              <h1>Contact us</h1>
              <p>We’re open for suggestions, admissions queries, and collaborations.</p>
            </div>

            <div className="contactInfoGrid" data-aos="fade-up" data-aos-delay="120">
              <div className="infoBox">
                <h4>
                  <i className="fa fa-map" aria-hidden="true"></i> Address
                </h4>
                <p>Islamic Mission School, Aligarh (UP), India</p>
              </div>

              <div className="infoBox">
                <h4>
                  <i className="fa fa-paper-plane" aria-hidden="true"></i> Email
                </h4>
                <p>
                  <a href="mailto:info@imschool.in">info@imschool.in</a>
                </p>
              </div>

              <div className="infoBox">
                <h4>
                  <i className="fa fa-phone-alt" aria-hidden="true"></i> Phone
                </h4>
                <p>
                  <a href="tel:+919800000000">+91 98XX‑XXX‑XXX</a>
                </p>
              </div>

              <div className="infoBox">
                <h4>
                  <i className="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp
                </h4>
                <p>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
                    Chat on WhatsApp
                  </a>
                </p>
              </div>
            </div>

            <form className="contactForm" onSubmit={(e) => e.preventDefault()} data-aos="fade-up" data-aos-delay="200">
              <div className="contactRow">
                <input type="text" placeholder="Name" aria-label="Name" />
                <input type="email" placeholder="Email" aria-label="Email" />
              </div>

              <input type="text" placeholder="Subject" aria-label="Subject" />

              <textarea
                rows="7"
                placeholder="Create a message here..."
                aria-label="Message"
              />

              <button className="primary-btn contactBtn" type="submit">
                SEND MESSAGE <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </button>
            </form>

            <div className="contactSocial" data-aos="fade-up" data-aos-delay="260">
              <h3>Follow us</h3>
              <div className="contactSocialRow">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                  <i className="fab fa-youtube" aria-hidden="true"></i>
                </a>
              </div>

              <div className="contactDua" aria-hidden="true">جزاكم الله خيراً</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
