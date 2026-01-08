import React from "react";
import Heading from "../common/heading/Heading";
import "./vision.css";

const Vision = () => {
  return (
    <>
      <section className="vision-hero">
        <div className="container hero-inner">
          <Heading title="Vision & Mission" subtitle="Our Purpose and Story" />
          <p className="hero-lead">
            Nurturing hearts and minds — combining academic excellence with
            timeless values.
          </p>
        </div>
      </section>

      <section className="vm-section">
        <div className="container">
          <div className="vm-grid">
            <article className="vm-card" aria-labelledby="vision-heading">
              <h2 id="vision-heading">IMS VISION</h2>
              <div className="arabic">أَحَبُّ النَّاسِ إِلَى اللَّهِ أَنْفَعُهُمْ لِلنَّاسِ</div>
              <p>
                To transform the tiny tots into the most beneficial human beings
                so that they can serve the humanity.
              </p>
              <blockquote className="hadith">
                “The most beloved people to Allah are those who are most
                beneficial to people.”
              </blockquote>
            </article>

            <article className="vm-card" aria-labelledby="mission-heading">
              <h2 id="mission-heading">IMS MISSION</h2>
              <p>
                The tiny tots of today will be the leaders of tomorrow. The very
                mission of Islamic Mission School is to provide these tiny tots
                with the best material and spiritual means to become most
                beneficial human beings, enabling them to serve the humanity.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="history-section">
        <div className="container">
          <h2>Brief History</h2>
          <h3 className="history-tagline">From Small Seeds, Great Trees Grow</h3>

          <div className="history-content">
            <p>
              Islamic Mission School was founded in 2008 by a small group of
              educators and parents who believed that modern education was
              becoming overly focused on rote learning and examination results.
              Their vision was to create a learning environment where academic
              excellence and strong ethical character were given equal
              importance.
            </p>

            <h4>The Early Years: Sowing the seeds</h4>
            <p>
              The school began humbly in a rented building with just 18
              students. Three classes (pre-nursery, nursery and kindergarten)
              were started. The curriculum was a unique blend of the academic
              excellence and a bespoke "Values in Action" program, which
              integrated core principles like integrity, compassion, respect,
              and responsibility into every subject and activity.
            </p>

            <h4>Early Middle Phase: The Establishing Roots</h4>
            <p>
              By the Grace of Almighty the school added one class every year.
              As the school's reputation for nurturing well-rounded,
              confident, and kind-hearted children grew, so did its numbers.
            </p>

            <h4>Late Middle Phase: Flourishing and Recognition</h4>
            <p>
              Alhumdulillah, this period marked a transformative era of divine
              blessing and institutional solidification for the school.
            </p>

            <h4>A Permanent Home</h4>
            <p>
              In a milestone achievement, the school shifted to its own
              dedicated campus. Sprawling over two acres of land in close
              proximity to the esteemed Aligarh Muslim University, the new
              location provided an ideal environment for holistic learning,
              blending academic aspiration with a serene, spacious setting.
            </p>

            <h4>Academic Credibility</h4>
            <p>
              A significant leap in academic stature was achieved in 2020 when
              the school received affiliation from the Council for the Indian
              School Certificate Examinations (CISCE), New Delhi. This
              affiliation placed the school within a nationally recognized
              framework of academic excellence, while still allowing the
              flexibility to enrich the curriculum with its core
              value-based teachings.
            </p>

            <h4>A Portrait of Excellence: IMS in 2025</h4>
            <p>
              Today, IMS has blossomed from a sapling of an idea into a mighty,
              fruit-bearing tree, deeply rooted in its values and branching out
              towards academic excellence and global citizenship. Our campus
              houses well-equipped, modern laboratories for Physics, Chemistry,
              Biology, Computer Science, Robotics &amp; STEM, fostering a spirit
              of inquiry and innovation.
            </p>

            <p>
              Beyond the standard curriculum, we offer enhancement classes in
              English communication, Arabic Communication, Financial Literacy,
              Life Skills, Robotics &amp; STEM.
            </p>

            <p>
              As we write this chapter in 2025, IMS is not merely an
              educational institution; it is a dynamic and beloved madrasat
              al-hayat—a school for life. We remain steadfast in our mission
              to nurture well-rounded individuals who are prepared to excel in
              this world with knowledge and in the Hereafter with faith and
              righteous deeds, ready to contribute meaningfully to a global
              society.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Vision;
