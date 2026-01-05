import React from "react";
import { Link } from "react-router-dom";
import { blog } from "../../../dummydata";
import "./footer.css";

const Footer = () => {

  const quickLinks = [
    { to: "/pricing", label: "Pricing" },
    { to: "/admissions", label: "Admissions" },
    { to: "/contact", label: "Help / Contact" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: "fab fa-facebook-f", label: "Facebook" },
    { href: "https://instagram.com", icon: "fab fa-instagram", label: "Instagram" },
    { href: "https://twitter.com", icon: "fab fa-twitter", label: "Twitter/X" },
    { href: "https://youtube.com", icon: "fab fa-youtube", label: "YouTube" },
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
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="socialBtn"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  <i className={s.icon} aria-hidden="true"></i>
                </a>
              ))}
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
                  href="https://wa.me/919876543210"
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
                      <span><i className="fa fa-calendar-alt" aria-hidden="true"></i> {val.date}</span>
                      <span><i className="fa fa-user" aria-hidden="true"></i> {val.type}</span>
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
                <i className="fa fa-map" aria-hidden="true"></i>
                <span>Aligarh (UP), India</span>
              </li>
              <li>
                <i className="fa fa-phone-alt" aria-hidden="true"></i>
                <a href="tel:+919800000000" className="footerLink">+91 98XX‑XXX‑XXX</a>
              </li>
              <li>
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                <a href="mailto:info@imschool.in" className="footerLink">info@imschool.in</a>
              </li>
            </ul>

            <div className="footerNote">
              <i className="fa fa-heart" aria-hidden="true"></i> Building character before career.
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
