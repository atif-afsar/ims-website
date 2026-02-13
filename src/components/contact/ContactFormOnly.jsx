import React, { useState } from "react";
import "./contact.css";

const ContactFormOnly = () => {
    const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.038684456793!2d78.0552577!3d27.9314593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a5a5186542b7%3A0x23cf8c5f2a591d8c!2sIslamic%20Mission%20School!5e0!3m2!1sen!2sin!4v1707830000000";
    
    const [result, setResult] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted!");
        setIsLoading(true);
        setResult("Sending....");
        setShowPopup(true);
        
        const formData = new FormData(event.target);
        formData.append("access_key", "55a7d4ae-4830-4d4e-b4c5-654918d61b87");
        formData.append("from_name", "IMS Contact Form");
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            
            const data = await response.json();
            console.log("Web3Forms Response:", data);
            
            if (data.success) {
                setResult("✓ Form Submitted Successfully!");
                event.target.reset();
                setTimeout(() => setShowPopup(false), 4000);
            } else {
                setResult("✕ Error: " + (data.message || "Please try again"));
                setTimeout(() => setShowPopup(false), 4000);
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setResult("✕ Network Error: " + error.message);
            setTimeout(() => setShowPopup(false), 4000);
        } finally {
            setIsLoading(false);
        }
    };

  return (
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
                  <a href="tel:+917417914164">+91 7417914164</a>
                </p>
              </div>

              <div className="infoBox">
                <h4>
                  <i className="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp
                </h4>
                <p>
                  <a href="https://wa.me/919219401623" target="_blank" rel="noreferrer">
                    Chat on WhatsApp
                  </a>
                </p>
              </div>
            </div>

            <form className="contactForm" onSubmit={onSubmit} data-aos="fade-up" data-aos-delay="200">
              <div className="contactRow">
                <input type="text" name="name" placeholder="Name" aria-label="Name" required />
                <input type="email" name="email" placeholder="Email" aria-label="Email" required />
              </div>

              <input type="text" name="subject" placeholder="Subject" aria-label="Subject" required />

              <textarea
                name="message"
                rows="7"
                placeholder="Create a message here..."
                aria-label="Message"
                required
              />

              <button className="primary-btn contactBtn" type="submit" disabled={isLoading}>
                {isLoading ? "SENDING..." : "SEND MESSAGE"} <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </button>
            </form>

            {showPopup && (
              <div className="submissionPopup" role="alert">
                <div className="popupContent">
                  <div className="popupIcon">
                    {result.includes("✓") ? "✓" : "✕"}
                  </div>
                  <p>{result}</p>
                </div>
              </div>
            )}

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
  );
};

export default ContactFormOnly;
