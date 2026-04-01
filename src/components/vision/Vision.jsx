import React from "react";
import Heading from "../common/heading/Heading";
import "./vision.css";

const Vision = () => {
  const heroBg = (process.env.PUBLIC_URL || '') + '/images/visionBanner.jpg';
  return (
    <>
      <section
        className="vision-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(250,250,250,0.25) 50%, rgba(245,247,246,0.15) 100%), url("${heroBg}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      >
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
            {/* CORE VALUES */}
      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <p className="section-intro">
            At Islamic Mission School, our values form the moral compass that
            guides every child’s journey of learning and growth.
          </p>

          <div className="values-grid">
            <div className="value-card">
              <h4>Faith & Integrity</h4>
              <p>
                We nurture strong faith, honesty, and moral responsibility,
                ensuring that students grow with a clear sense of right and
                wrong.
              </p>
            </div>

            <div className="value-card">
              <h4>Respect & Compassion</h4>
              <p>
                Every child is taught to respect others, appreciate diversity,
                and develop empathy for all of humanity.
              </p>
            </div>

            <div className="value-card">
              <h4>Excellence in Learning</h4>
              <p>
                We encourage curiosity, critical thinking, and a love for
                knowledge that extends beyond classrooms and textbooks.
              </p>
            </div>

            <div className="value-card">
              <h4>Responsibility & Leadership</h4>
              <p>
                Students are empowered to take responsibility for their actions
                and develop leadership qualities from an early age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL PHILOSOPHY */}
      <section className="philosophy-section">
        <div className="container">
          <h2>Our Educational Philosophy</h2>
          <p>
            IMS follows a child-centered educational approach that balances
            academic rigor with emotional, social, and spiritual development.
            Learning is designed to be engaging, meaningful, and connected to
            real life.
          </p>

          <p>
            Our teaching methodology emphasizes conceptual clarity, practical
            application, and continuous assessment. Teachers act not only as
            instructors but also as mentors who guide students to discover
            their strengths and purpose.
          </p>
        </div>
      </section>

      {/* DISTINCTIVENESS */}
      <section className="distinct-section">
        <div className="container">
          <h2>What Makes IMS Unique</h2>

          <ul className="distinct-list">
            <li>Balanced integration of modern education with Islamic values</li>
            <li>Focus on character-building alongside academics</li>
            <li>Small class sizes for personalized attention</li>
            <li>Well-equipped labs and technology-enabled classrooms</li>
            <li>Strong emphasis on life skills and communication</li>
          </ul>
        </div>
      </section>

      {/* FUTURE OUTLOOK */}
      <section className="future-section">
        <div className="container">
          <h2>Looking Ahead</h2>
          <p>
            As IMS moves forward, our vision is to expand educational horizons
            while remaining deeply rooted in our values. We aspire to prepare
            students not only for academic success but also for meaningful
            roles in society as ethical professionals, thoughtful leaders, and
            responsible global citizens.
          </p>
        </div>
      </section>

      {/* STEM EDUCATION */}
      <section className="stem-section">
        <div className="container">
          <h2>STEM Education</h2>
          <p className="stem-tagline">
            Where Innovation Meets Insight, and Discovery Deepens Faith.
          </p>

          <div className="stem-intro">
            <p>
              STEM is more than an acronym for Science, Technology, Engineering, and Math. It's a transformative educational philosophy that integrates these four disciplines into a cohesive learning paradigm based on real-world applications. We empower students to become the next generation of innovators, problem-solvers, and ethical leaders, equipped to tackle global challenges with both technical expertise and Islamic moral integrity.
            </p>
          </div>

          <article className="stem-partner">
            <h3>Our STEM Partner: A World-Class Curriculum from Evan Moor</h3>
            <p className="partner-subtitle">Bringing Global Standards of STEM Excellence to Our Classrooms.</p>
            
            <p>
              At IMS, we are committed to providing an education that meets the highest international benchmarks. That's why we have proudly integrated the globally recognized STEM curriculum from <strong>Evan Moor</strong>, a leading USA-based educational publisher, into our learning framework from Grade 1. This partnership ensures that our students benefit from a rigorous, research-backed, and engaging approach to Science, Technology, Engineering, and Mathematics, right here in India.
            </p>

            <h4>Why We Chose Evan Moor</h4>
            <p>We selected Evan Moor after a thorough review of international STEM resources. It stood out for its unique ability to align with our educational goals:</p>

            <div className="evan-moor-features">
              <div className="feature-box">
                <h5>Proven, Research-Backed Methodology</h5>
                <p>Evan Moor's materials are developed by educational experts and are used in thousands of schools across the United States and other countries, ensuring our students receive a world-class foundation.</p>
              </div>

              <div className="feature-box">
                <h5>Focus on Hands-On, Inquiry-Based Learning</h5>
                <p>This curriculum moves beyond theory. It emphasizes the "E" in STEM (Engineering) through practical, project-based activities that challenge students to think creatively and solve problems—a perfect match for our pedagogical philosophy.</p>
              </div>

              <div className="feature-box">
                <h5>Systematic and Scaffolded Design</h5>
                <p>The curriculum is carefully structured to build skills progressively. Each unit scaffolds knowledge, ensuring students develop deep conceptual understanding and confidence as they advance.</p>
              </div>

              <div className="feature-box">
                <h5>Engaging and Accessible Content</h5>
                <p>Evan Moor's resources are designed to make complex STEM concepts accessible and exciting for all age groups, fostering a genuine and lasting love for discovery.</p>
              </div>
            </div>

            <h4>The Evan Moor Advantage in Our Classrooms</h4>
            <p>By incorporating Evan Moor, we enhance our STEM program with:</p>

            <div className="advantage-list">
              <div className="advantage-item">
                <span className="advantage-number">(i)</span>
                <div>
                  <h5>Real-World Problem Solving</h5>
                  <p>Students don't just learn facts; they apply them. They might design a simple machine, conduct a detailed scientific investigation, or create a model to solve an environmental challenge, just like real engineers and scientists.</p>
                </div>
              </div>

              <div className="advantage-item">
                <span className="advantage-number">(ii)</span>
                <div>
                  <h5>Development of Critical 21st-Century Skills</h5>
                  <p>Each project is designed to naturally cultivate collaboration, communication, creativity, and critical thinking—the essential skills for success in higher education and future careers.</p>
                </div>
              </div>

              <div className="advantage-item">
                <span className="advantage-number">(iii)</span>
                <div>
                  <h5>Structured Creativity</h5>
                  <p>The curriculum provides a clear framework that guides students through the engineering design process—asking, imagining, planning, creating, and improving—which empowers them to innovate systematically.</p>
                </div>
              </div>
            </div>

            <div className="stem-example">
              <h4>A Glimpse into Learning: What an Evan Moor Unit Looks Like</h4>
              <p>A typical unit in our younger grades might challenge students to <strong>"Design a Sunshade"</strong> to understand the effects of sunlight. Through this Evan Moor activity, they will:</p>
              
              <ul className="example-steps">
                <li><strong>(Science)</strong> Learn about the sun and shade.</li>
                <li><strong>(Technology/Engineering)</strong> Design, build, and test a model sunshade.</li>
                <li><strong>(Math)</strong> Measure and compare the temperature and area covered.</li>
              </ul>

              <p className="example-conclusion">This hands-on, integrated approach makes learning memorable and profoundly effective.</p>
            </div>
          </article>
        </div>
      </section>

    </>
  );
};

export default Vision;
