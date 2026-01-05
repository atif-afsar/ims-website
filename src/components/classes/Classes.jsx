import React from "react";
import Back from "../common/back/Back";
import Heading from "../common/heading/Heading";
import { classesData, admissionNote } from "../../dummydata";
import ClassGroupsPaginated from "./ClassGroupsPaginated";
import "./classes.css";
import { FaSchool, FaBookOpen, FaHeart, FaUserShield, FaClipboardList, FaPhoneAlt } from "react-icons/fa";

const groups = [
  { key: "pre-primary", title: "Pre‑Primary (Play Group to K.G.)", shortTitle: "Pre‑Primary" },
  { key: "primary", title: "Primary (Class 1 to 5)", shortTitle: "Primary" },
  { key: "middle", title: "Middle (Class 6 to 8)", shortTitle: "Middle" },
  { key: "secondary", title: "Secondary (Class 9)", shortTitle: "Secondary" },
  { key: "senior-secondary", title: "Senior Secondary (Class 11)", shortTitle: "Senior" },
];

const Classes = () => {
  return (
    <>
      <Back title="Classes & Admissions" />

      <section className="classesHero">
        <span className="classesSticker classesStickerLeft" aria-hidden="true">🌙</span>
        <span className="classesSticker classesStickerRight" aria-hidden="true">🎓</span>

        <div className="container classesHeroGrid">
          <div className="classesHeroText" data-aos="fade-right" data-aos-duration="900">
            <h1 className="classesHeroTitle">
              Admissions Open — Build Deen & Dunya together
            </h1>
            <p className="classesHeroSub">
              A nurturing Islamic environment, strong academics, caring teachers, and a clear growth path from
              Pre‑Primary to Senior Secondary.
            </p>

            <div className="classesHeroCtas">
              <a className="primary-btn heroBtn" href="tel:+919800000000">
                <FaPhoneAlt /> Call for Admission
              </a>
              <a className="outline-btn heroBtnOutline" href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
                WhatsApp Now
              </a>
            </div>

            <div className="classesNote" data-aos="fade-up" data-aos-delay="120">
              <i className="fa fa-circle-info" aria-hidden="true"></i>
              <span>{admissionNote}</span>
            </div>
          </div>

          <div className="classesHeroMedia" data-aos="fade-left" data-aos-duration="900">
            {/* Put this image in: public/images/classes/admissions-hero.webp */}
            <div className="heroImageWrap">
              <img
                src="/images/classes/admissions-hero.webp"
                alt="IMS students learning in a caring environment"
                loading="lazy"
              />
              <div className="heroImageOverlay" aria-hidden="true">
                <span className="heroOverlayTitle">Alhamdulillah</span>
                <span className="heroOverlaySub">A journey of adab, knowledge & confidence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="classesHighlights">
        <div className="container">
          <div data-aos="fade-up" data-aos-duration="900">
            <Heading subtitle="WHY IMS" title="A School Parents Trust" />
          </div>

          <div className="highGrid">
            <div className="highCard" data-aos="zoom-in" data-aos-delay="0">
              <div className="highIcon"><FaHeart /></div>
              <h3>Tarbiyah & Akhlaq</h3>
              <p>We prioritize manners, character building, and a nurturing Islamic environment.</p>
            </div>

            <div className="highCard" data-aos="zoom-in" data-aos-delay="100">
              <div className="highIcon"><FaBookOpen /></div>
              <h3>Strong Academics</h3>
              <p>Concept clarity, regular practice, and structured learning from early classes onwards.</p>
            </div>

            <div className="highCard" data-aos="zoom-in" data-aos-delay="200">
              <div className="highIcon"><FaUserShield /></div>
              <h3>Safe & Caring</h3>
              <p>Children flourish when they feel safe, respected, and supported by teachers.</p>
            </div>

            <div className="highCard" data-aos="zoom-in" data-aos-delay="300">
              <div className="highIcon"><FaSchool /></div>
              <h3>Clear Progress Path</h3>
              <p>A smooth, guided journey from Play Group to higher classes with age‑wise milestones.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="classesSteps">
        <div className="container">
          <div data-aos="fade-up" data-aos-duration="900">
            <Heading subtitle="ADMISSION PROCESS" title="How Admission Works" />
          </div>

          <div className="stepsGrid" data-aos="fade-up" data-aos-delay="120">
            <div className="stepCard">
              <div className="stepNum">1</div>
              <h4>Enquiry</h4>
              <p>Call/WhatsApp and share child’s class & age.</p>
            </div>
            <div className="stepCard">
              <div className="stepNum">2</div>
              <h4>Visit / Meet</h4>
              <p>Meet our team, understand environment and expectations.</p>
            </div>
            <div className="stepCard">
              <div className="stepNum">3</div>
              <h4>Assessment</h4>
              <p>Age‑appropriate interaction/assessment (as applicable).</p>
            </div>
            <div className="stepCard">
              <div className="stepNum">4</div>
              <h4>Committee Decision</h4>
              <p>Admission committee decision is final (as per policy).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="classesListSection">
        <div className="container">
          <div data-aos="fade-up" data-aos-duration="900">
            <Heading subtitle="AVAILABLE CLASSES" title="Choose a Group" />
          </div>

          <ClassGroupsPaginated groups={groups} allClasses={classesData} />

          <div className="classesCtaStrip" data-aos="fade-up" data-aos-delay="160">
            <div className="ctaLeft">
              <h3>Need help choosing the right class?</h3>
              <p>Send child’s age + previous class on WhatsApp and get guidance.</p>
            </div>
            <div className="ctaRight">
              <a className="primary-btn" href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
                <FaClipboardList /> WhatsApp Details
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Classes;
