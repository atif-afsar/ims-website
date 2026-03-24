import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPhone, FaPaperPlane, FaHeart } from "react-icons/fa";
import { blog } from "../../../dummydata";
import "./footer.css";
import { supabase } from "../../../supabaseClient";

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({
    address: 'Aligarh (UP), India',
    phone: '+91 7417914164',
    email: 'info@imschool.in'
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      const { data: contact } = await supabase.from('contact_info').select('*').single();
      if (contact) setContactInfo(contact);
    };
    fetchFooterData();
  }, []);

  const quickLinks = [
    { to: "/admissions", label: "Admissions" },
    { to: "/brochure", label: "Digital Brochure" },
    { to: "/contact", label: "Help / Contact" },
  ];



  return (
    <>
      {/* Newsletter */}
      <section className="newsletter" aria-label="Newsletter subscription">
        <div className="container newsletterInner">
          <div className="newsletterLeft" data-aos="fade-right" data-aos-duration="900">
            <h2>
              Newsletter <span className="nlDot" aria-hidden="true">✦</span> Stay updated
            </h2>
            <p>Admissions updates, events, and school news—direct to your inbox.</p>
          </div>

          <form
            className="newsletterRight"
            data-aos="fade-left"
            data-aos-duration="900"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="srOnly" htmlFor="nlEmail">Email</label>
            <input id="nlEmail" type="email" placeholder="Enter email address" />
            <button type="submit" className="nlBtn" aria-label="Subscribe">
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="siteFooter" aria-label="Website footer">
        <div className="container footerGrid">
          {/* Brand */}
          <div className="footerBox footerBrand" data-aos="fade-up" data-aos-duration="900">
            <h3 className="footerTitle">Islamic Mission School</h3>
            <p className="footerSubtitle">Excellence in Deen & Dunya</p>

            <p className="footerText">
              A values-based school nurturing strong character, academic excellence, and love for Qur’an.
            </p>

            <div className="footerSocial">
              <a
                href="https://www.facebook.com/islamicmissionschool"
                className="socialBtn"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/islamicmissionschoolaligarh"
                className="socialBtn"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@islamicmissionschool"
                className="socialBtn"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>

            <div className="footerSticker" aria-hidden="true">🌙📚✨</div>
          </div>

          {/* Quick Links */}
          <div className="footerBox" data-aos="fade-up" data-aos-delay="140" data-aos-duration="900">
            <h3 className="footerHeading">Quick Links</h3>
            <ul className="footerList">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="footerLink">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  className="footerLink"
                  href="https://wa.me/919219401623"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Admissions
                </a>
              </li>
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="footerBox footerPosts" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
            <h3 className="footerHeading">Recent Posts</h3>

            <div className="footerPostList">
              {blog.slice(0, 3).map((val) => (
                <div className="footerPost" key={val.id}>
                  <div className="footerPostImg">
                    <img src={val.cover} alt={val.title} loading="lazy" />
                  </div>

                  <div className="footerPostText">
                    <div className="footerMeta">
                      <span><FaCalendarAlt /> {val.date}</span>
                      <span><FaUser /> {val.type}</span>
                    </div>
                    <div className="footerPostTitle">{val.title.slice(0, 44)}…</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="footerBox footerContact" data-aos="fade-up" data-aos-delay="260" data-aos-duration="900">
            <h3 className="footerHeading">Contact</h3>

            <ul className="footerContactList">
              <li>
                <FaMapMarkerAlt />
                <span>{contactInfo.address}</span>
              </li>
              <li>
                <FaPhone />
                <a href={`tel:${contactInfo.phone}`} className="footerLink">{contactInfo.phone}</a>
              </li>
              <li>
                <FaPaperPlane />
                <a href={`mailto:${contactInfo.email}`} className="footerLink">{contactInfo.email}</a>
              </li>
            </ul>

            <div className="footerNote">
              <FaHeart /> Building character before career.
            </div>
          </div>
        </div>
      </footer>

      <div className="legal">
        <p>
          © {new Date().getFullYear()} Islamic Mission School. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
