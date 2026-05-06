import Heading from "../common/heading/Heading";
import Awrapper from "./Awrapper";
import "./about.css";
import React from "react";
import aboutImg from "../../assets/images/about/ims-about.png";

const boardMembers = [
  {
    role: "President",
    name: "Prof. Yusuf Ansari",
    qualification: "M.Tech, PhD.",
  },
  {
    role: "Vice-President",
    name: "Dr. Misbah Uddin",
    qualification: "MBBS, MD",
  },
  {
    role: "Secretary",
    name: "Dr. Kaunain Kausar",
    qualification: "MBBS, DMRT",
    profession: "Professionally an Oncologist and Passionately an Educationist",
  },
  {
    role: "Joint Secretary",
    name: "Md. Kamal Uddin",
    qualification: "Social activist",
  },
  {
    role: "Treasurer",
    name: "Dr. Mohd. Suhail Akhter",
    qualification: "PhD",
  },
];

const AboutCard = () => {
  return (
    <>
      <section
        className="aboutHome sectionDecorAbout"
        aria-labelledby="about-heading"
      >
        {/* Decorative Stickers */}
        <img
          className="aboutSticker aboutStickerLeft"
          src="/images/stickers/bird.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <img
          className="aboutSticker aboutStickerRight"
          src="/images/stickers/balloon.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <div className="container flexSB">
          {/* Image Section */}
          <div
            className="left row"
            data-aos="fade-right"
            data-aos-duration="900"
          >
            <div className="aboutImgWrap">
              <img
                src={aboutImg}
                alt="Islamic Mission School campus fostering academic excellence and moral development"
                loading="lazy"
                className="about-img"
              />
            </div>
          </div>

          {/* Text Content */}
          <div
            className="right row"
            data-aos="fade-left"
            data-aos-duration="900"
          >
            <div data-aos="fade-up" data-aos-delay="100">
              <Heading
                subtitle="ABOUT IMS"
                title="Shaping Hearts, Building Minds"
              />
            </div>

            <article className="about-content" id="introduction">
              <h4 className="about-section-subtitle">1. Introduction</h4>
              <p className="about-section-text">
                <strong>Shaping Hearts, Building Minds: The IMS Way</strong>
              </p>
              <p
                className="about-desc"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                Our children are a blessing (naemat) bestowed on us by The Almighty
                God, and also a trust (amaanah) He has made us responsible for. It
                is God's universal law to accompany every blessing with responsibility.
                He then blessed parents by placing tremendous love in their hearts
                for their children, and He made every parent responsible for providing
                his child with the best 'Tarbiyah' in order to ensure their success
                in this world as well as in the world to come.
              </p>

              <p
                className="about-desc"
                data-aos="fade-up"
                data-aos-delay="220"
              >
                At IMS, we believe education is more than academic excellence; it
                is the foundation of character. In a rapidly changing world, we provide
                a learning environment where timeless values and modern innovation
                converge. We nurture compassionate, confident, and critical thinkers
                who are not only prepared for the challenges of tomorrow but are
                also committed to building a more just and peaceful world. We foster
                a culture of respect, responsibility, and kindness, where students
                are encouraged to question, create, and collaborate. Welcome to an
                education that shapes both the intellect and the soul.
              </p>
            </article>
          </div>

          {/* Extended About Sections */}
          <div className="section-extended">
            <section
              id="vision-mission"
              className="about-section-card about-anchor-section"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Heading subtitle="2. VISION & MISSION" title="IMS Vision and Mission" />
              <p className="about-section-text">
                <strong>IMS VISION</strong>
                <br />
                To transform the tiny tots into the most beneficial human beings
                so that they can serve the humanity.
              </p>
              <p className="about-section-text">
                The vision of IMS is inspired by the saying of our beloved Prophet ﷺ
              </p>
              <p className="about-quote" lang="ar">
                أَحَبُّ النَّاسِ إِلَى اللَّهِ أَنْفَعُهُمْ لِلنَّاسِ
              </p>
              <p className="about-section-text">
                "The most beloved people to Allah are those who are most beneficial
                to people."
              </p>
              <p className="about-section-text">
                <strong>IMS MISSION</strong>
                <br />
                The tiny tots of today will be the leaders of tomorrow. The very
                mission of Islamic Mission School is to provide these tiny tots with
                the best material and spiritual means to become most beneficial human
                beings, enabling them to serve the humanity.
              </p>
            </section>

            <section
              id="brief-history"
              className="about-section-card about-anchor-section"
              data-aos="fade-up"
              data-aos-delay="260"
            >
              <Heading subtitle="3. BRIEF HISTORY" title="From Small Seeds, Great Trees Grow" />
              <p className="about-section-text">
                Islamic Mission School was founded in 2008 by a small group of educators
                and parents who believed that modern education was becoming overly focused
                on rote learning and examination results. Their vision was to create a
                learning environment where academic excellence and strong ethical character
                were given equal importance.
              </p>
              <h4 className="about-section-subtitle">The Early Years: Sowing the seeds</h4>
              <p className="about-section-text">
                The school began humbly in a rented building with just 18 students.
                Three classes (pre-nursery, nursery and kindergarten) were started.
                The curriculum was a unique blend of the academic excellence and a bespoke
                "Values in Action" program, which integrated core principles like integrity,
                compassion, respect, and responsibility into every subject and activity.
              </p>
              <h4 className="about-section-subtitle">Early Middle Phase: The Establishing Roots</h4>
              <p className="about-section-text">
                By the Grace of Almighty the school added one class every year. As the
                school's reputation for nurturing well-rounded, confident, and kind-hearted
                children grew, so did its numbers.
              </p>
              <h4 className="about-section-subtitle">Late Middle Phase: Flourishing and Recognition</h4>
              <p className="about-section-text">
                Alhumdulillah, this period marked a transformative era of divine blessing
                and institutional solidification for the school.
              </p>
              <p className="about-section-text">
                <strong>A Permanent Home:</strong> In a milestone achievement, the school
                shifted to its own dedicated campus. Sprawling over two acres of land in
                close proximity to the esteemed Aligarh Muslim University, the new location
                provided an ideal environment for holistic learning, blending academic aspiration
                with a serene, spacious setting.
              </p>
              <p className="about-section-text">
                <strong>Academic Credibility:</strong> A significant leap in academic stature
                was achieved in 2020 when the school received affiliation from the Council
                for the Indian School Certificate Examinations (CISCE), New Delhi. This affiliation
                placed the school within a nationally recognized framework of academic excellence,
                while still allowing the flexibility to enrich the curriculum with its core value-based
                teachings.
              </p>
              <h4 className="about-section-subtitle">A Portrait of Excellence: IMS in 2025</h4>
              <p className="about-section-text">
                Today, IMS has blossomed from a sapling of an idea into a mighty, fruit-bearing
                tree, deeply rooted in its values and branching out towards academic excellence and
                global citizenship. Our campus houses well-equipped, modern laboratories for Physics,
                Chemistry, Biology, Computer Science, Robotics & STEM, fostering a spirit of inquiry
                and innovation.
              </p>
              <p className="about-section-text">
                Beyond the standard curriculum, we offer enhancement classes in English communication,
                Arabic Communication, Financial Literacy, Life Skills Robotics & STEM.
              </p>
              <p className="about-section-text">
                As we write this chapter in 2025, IMS is not merely an educational institution; it is
                a dynamic and beloved madrasat al-hayat-a school for life. We remain steadfast in our
                mission to nurture well-rounded individuals who are prepared to excel in this world with
                knowledge and in the Hereafter with faith and righteous deeds, ready to contribute
                meaningfully to a global society.
              </p>
            </section>

            <section
              id="board-members"
              className="about-section-card about-anchor-section"
              data-aos="fade-up"
              data-aos-delay="320"
            >
              <Heading subtitle="4. BOARD MEMBERS" title="Office Bearers" />
              <p className="governance-intro">
                Islamic Mission School is a private, non-profit institution operated
                under the aegis of the Society for Moral Education and Social Development.
                It is overseen by an independent Board of Trustees tasked with advancing
                the school's mission and safeguarding its future success. The Trustees
                believe in the significant value of IMS education for students, their
                families, and the wider community and nation, and are committed to
                collaborating with faculty, staff, and administration to ensure the school's
                continuous and successful operation.
              </p>

              <p className="about-section-text">
                <strong>The office Bearers include:</strong>
              </p>
              <div className="office-bearers">
                {boardMembers.map((member, index) => (
                  <div className="bearer" key={member.role}>
                    <h4>
                      {index + 1}. {member.role}
                    </h4>
                    <p className="name">
                      {member.name}{" "}
                      {member.qualification && (
                        <span className="qual">({member.qualification})</span>
                      )}
                    </p>
                    {member.profession && <p className="muted">{member.profession}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section
              id="affiliation"
              className="about-section-card about-anchor-section"
              data-aos="fade-up"
              data-aos-delay="380"
            >
              <Heading subtitle="5. AFFILIATION" title="Affiliation" />
              <div className="affiliation">
                <p className="about-section-text">
                  IMS is affiliated to Council for the Indian School Certificate
                  Examinations (CISCE), New Delhi.
                </p>
                <div className="affRow">
                  <div>
                    <strong>Status Of Affiliation</strong>
                  </div>
                  <div>
                    <strong>Affiliation Number</strong>
                  </div>
                </div>
                <div className="affRow muted">
                  <div>Permanent</div>
                  <div>UP407</div>
                </div>
              </div>
            </section>
          </div>

        </div>
      </section>

      <Awrapper />
    </>
  );
};

export default AboutCard;
