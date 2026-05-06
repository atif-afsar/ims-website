// src/components/common/header/Header.jsx
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./head.css";
import "./header.css";
import logo from "../../../assets/images/logo/logo.jpg";
import Notices from "../Notices";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);          // desktop dropdown
  const [openMobileMenu, setOpenMobileMenu] = useState(null); // mobile dropdown
  const currentPathWithHash = `${location.pathname}${location.hash}`;

  const navLinks = [
    { to: "/", label: "Home", end: true },
    {
      label: "About",
      submenu: [
        { to: "/about#introduction", label: "1. Introduction" },
        { to: "/about#vision-mission", label: "2. Vision & Mission" },
        { to: "/about#brief-history", label: "3. Brief History" },
        { to: "/about#board-members", label: "4. Board Members" },
        { to: "/about#affiliation", label: "5. Affiliation" },
      ],
    },
    {
      label: "Value Based School",
      to: "/ims-value-based-school",
      submenu: [
        { to: "/ims-value-based-school", label: "Overview", end: true },
        {
          to: "/ims-value-based-school#vb-need",
          label: "1. The Need For Value Based Schools",
        },
        {
          to: "/ims-value-based-school#vb-curriculum",
          label: "2. Values in the curriculum",
        },
        {
          to: "/ims-value-based-school#vb-vs-education",
          label: "3. Education Vs Value Based Education",
        },
      ],
    },
    {
      label: "Curriculum",
      to: "/curriculum",
      submenu: [
        { to: "/curriculum", label: "Overview", end: true },
        {
          to: "/curriculum#curriculum-academic",
          label: "1. Academic Excellence: The National Framework",
        },
        {
          to: "/curriculum#curriculum-21-skills",
          label: "2. 21st Century Skills",
        },
        {
          to: "/curriculum#curriculum-stem",
          label: "3. STEM Education",
        },
        {
          to: "/curriculum#curriculum-robotics-ai",
          label: "4. Robotics & Artificial Intelligence",
        },
      ],
    },
    // { to: "/why-ims", label: "Why IMS" },
    {
      label: "Co-Curricular & Extra Curricular",
      to: "/co-curricular-extracurricular",
      submenu: [
        {
          to: "/co-curricular-extracurricular",
          label: "Overview",
          end: true,
        },
        {
          to: "/co-curricular-extracurricular#cc-english",
          label: "1. English Communication Program",
        },
        {
          to: "/co-curricular-extracurricular#cc-arabic",
          label: "2. Arabic Communication Program",
        },
        {
          to: "/co-curricular-extracurricular#cc-pbl",
          label: "3. Project Based Learning",
        },
        {
          to: "/co-curricular-extracurricular#cc-taekwondo",
          label: "4. Taekwondo",
        },
        {
          to: "/co-curricular-extracurricular#cc-sports-day",
          label: "5. Annual Sports Day",
        },
        {
          to: "/co-curricular-extracurricular#cc-annual-function",
          label: "6. Annual Function",
        },
        {
          to: "/co-curricular-extracurricular#cc-misc",
          label: "7. Miscellaneous",
        },
      ],
    },
    {
      label: "Facilities",
      to: "/facilities",
      submenu: [
        { to: "/facilities", label: "Overview", end: true },
        { to: "/facilities#fac-land-building", label: "1. Land & Building" },
        { to: "/facilities#fac-labs", label: "2. Labs" },
        { to: "/facilities#fac-biology", label: "3. The Biology Lab" },
        { to: "/facilities#fac-computer", label: "4. The Computer Science Lab" },
        { to: "/facilities#fac-other", label: "Additional Facilities" },
      ],
    },
    {
      label: "Assessments at IMS",
      to: "/assessments",
      submenu: [
        { to: "/assessments", label: "Overview", end: true },
        {
          to: "/assessments#asm-summative-formative",
          label: "1. Summative & Formative Assessments",
        },
        {
          to: "/assessments#asm-chapter",
          label: "2. Chapter Assessments",
        },
        {
          to: "/assessments#asm-olympiad",
          label: "3. Olympiad Exams",
        },
        {
          to: "/assessments#asm-future",
          label: "IMS For a Better Future",
        },
      ],
    },
    { to: "/programs/neet-jee", label: "NEET/JEE" },
    // { to: "/team", label: "Our Team" },
    { to: "/brochure", label: "Brochure" },
    { to: "/calendar", label: "Calendar" },
    { to: "/contact", label: "Contact" },
  ];

  const isSubmenuLinkActive = (to) => {
    if (!to) return false;
    if (to.includes("#")) return currentPathWithHash === to;
    return location.pathname === to && location.hash === "";
  };

  const isSubmenuGroupActive = (link) => {
    const submenu = link.submenu || [];
    if (submenu.some((item) => isSubmenuLinkActive(item.to))) return true;
    if (link.to) {
      const base = link.to.split("#")[0];
      if (location.pathname === base) return true;
    }
    return false;
  };

  return (
    <>
    <Notices />
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
            <span>Shaping Hearts, Building Minds</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links">
          {navLinks.map((link) => {
            if (link.submenu) {
              const isOpen = openMenu === link.label;
              const isGroupActive = isSubmenuGroupActive(link);

              return (
                <div
                  className="nav-dropdown"
                  key={link.label}
                  onMouseEnter={() => setOpenMenu(link.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    className={`nav-link nav-dropbtn ${
                      isOpen || isGroupActive ? "active" : ""
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
                        className={() =>
                          `nav-dropitem ${isSubmenuLinkActive(s.to) ? "active" : ""}`
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
        <button
          type="button"
          className="mobile-nav-back"
          onClick={() => {
            setMobileMenuOpen(false);
            setOpenMobileMenu(null);
          }}
          aria-label="Close mobile navigation"
        >
          <i className="fa fa-arrow-left" aria-hidden="true" />
          Back
        </button>

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
          const isMobileGroupActive = isSubmenuGroupActive(l);

          return (
            <div
              className={`mobile-group ${isOpenMobile ? "open" : ""}`}
              key={l.label}
            >
              <button
                type="button"
                className={`nav-link mobile-group-btn ${
                  isMobileGroupActive ? "active" : ""
                }`}
                onClick={() =>
                  setOpenMobileMenu((current) =>
                    current === l.label ? null : l.label
                  )
                }
                aria-expanded={isOpenMobile}
                aria-controls={`mobile-submenu-${l.label.replace(
                  /[^a-zA-Z0-9]+/g,
                  "-"
                )}`}
                aria-label={
                  isOpenMobile
                    ? `Collapse ${l.label} links`
                    : `Expand ${l.label} links`
                }
              >
                <span>{l.label}</span>
                <i
                  className={`fa fa-chevron-${isOpenMobile ? "up" : "down"}`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={`mobile-submenu-${l.label.replace(/[^a-zA-Z0-9]+/g, "-")}`}
                className={`mobile-group-menu ${
                  isOpenMobile ? "open" : ""
                }`}
              >
                {l.submenu.map((s) => (
                  <NavLink
                    key={s.label}
                    to={s.to}
                    end={s.end}
                    className={() =>
                      `nav-link mobile-sub-link ${
                        isSubmenuLinkActive(s.to) ? "active" : ""
                      }`
                    }
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

        <div className="mobileMiniSticker" aria-hidden="true">
          🌙📚✨
        </div>
      </nav>
    </header>
    </>
  );
};

export default Header;
