// src/components/common/header/Header.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./head.css";
import "./header.css";
import logo from "../../../assets/images/logo/logo.jpg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);          // desktop dropdown
  const [openMobileMenu, setOpenMobileMenu] = useState(null); // mobile dropdown

  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About Us" },
    { to: "/vision", label: "Vision & Mission" },
    {
      label: "Programs",
      submenu: [
        { to: "/classes", label: "Classes" },
        { to: "/courses", label: "Courses" },
        { to: "/programs", label: "Programs Overview", end: true },

      ],
    },
    // { to: "/why-ims", label: "Why IMS" },
    {
      label: "Infrastructure",
      submenu: [
        { to: "/infrastructure", label: "Overview", end: true },
        { to: "/infrastructure/computer-lab", label: "Computer Lab" },
        { to: "/infrastructure/library", label: "Library" },
        { to: "/infrastructure/laboratories", label: "Laboratories" },
        { to: "/infrastructure/sports-complex", label: "Sports Complex" },
      ],
    },
    // { to: "/team", label: "Our Team" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="header" data-aos="fade-down" data-aos-duration="700">
      <div className="container headerRow">
        <Link
          to="/"
          className="logo"
          onClick={() => {
            setMobileMenuOpen(false);
            setOpenMenu(null);
            setOpenMobileMenu(null);
          }}
        >
          <img
            src={logo}
            alt="Islamic Mission School Logo"
            className="logo-img"
          />
          <div className="logo-text">
            <h1>Islamic Mission School</h1>
            <span>Excellence in Deen &amp; Dunya</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links">
          {navLinks.map((link) => {
            if (link.submenu) {
              const isOpen = openMenu === link.label;

              return (
                <div
                  className="nav-dropdown"
                  key={link.label}
                  onMouseEnter={() => setOpenMenu(link.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    className={`nav-link nav-dropbtn ${
                      isOpen ? "active" : ""
                    }`}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu((current) =>
                        current === link.label ? null : link.label
                      );
                    }}
                  >
                    {link.label}{" "}
                    <i className="fa fa-chevron-down" aria-hidden="true" />
                  </button>

                  <div
                    className={`nav-dropmenu ${isOpen ? "open" : ""}`}
                    role="menu"
                  >
                    {link.submenu.map((s) => (
                      <NavLink
                        key={s.label}
                        to={s.to}
                        end={s.end}
                        className={({ isActive }) =>
                          `nav-dropitem ${isActive ? "active" : ""}`
                        }
                        onClick={() => setOpenMenu(null)}
                        role="menuitem"
                      >
                        {s.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            }

            // normal (non-dropdown) links
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setOpenMenu(null)}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <i
            className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`mobileOverlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => {
          setMobileMenuOpen(false);
          setOpenMobileMenu(null);
          setOpenMenu(null);
        }}
        aria-hidden="true"
      />

      {/* Mobile nav panel */}
      <nav
        className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navLinks.map((l) => {
          if (!l.submenu) {
            return (
              <NavLink
                key={l.to || l.label}
                to={l.to || "/"}
                className="nav-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOpenMobileMenu(null);
                }}
              >
                {l.label}
              </NavLink>
            );
          }

          // Mobile collapsible dropdown (Classes, Infrastructure, etc.)
          const isOpenMobile = openMobileMenu === l.label;

          return (
            <div
              className={`mobile-group ${isOpenMobile ? "open" : ""}`}
              key={l.label}
            >
              <button
                type="button"
                className="nav-link mobile-group-btn"
                onClick={() =>
                  setOpenMobileMenu((current) =>
                    current === l.label ? null : l.label
                  )
                }
                aria-expanded={isOpenMobile}
              >
                {l.label}
                <i
                  className={`fa fa-chevron-${isOpenMobile ? "up" : "down"}`}
                  aria-hidden="true"
                />
              </button>

              <div
                className={`mobile-group-menu ${
                  isOpenMobile ? "open" : ""
                }`}
              >
                {l.submenu.map((s) => (
                  <NavLink
                    key={s.label}
                    to={s.to}
                    end={s.end}
                    className="nav-link mobile-sub-link"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setOpenMobileMenu(null);
                    }}
                  >
                    {s.label}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}

        <a
          href="https://wa.me/919876543210"
          className="whatsapp-mobile"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-whatsapp" aria-hidden="true" /> WhatsApp Us
        </a>

        <div className="mobileMiniSticker" aria-hidden="true">
          🌙📚✨
        </div>
      </nav>
    </header>
  );
};

export default Header;
