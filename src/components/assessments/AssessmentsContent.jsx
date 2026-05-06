import React from "react";

const AssessmentsContent = () => {
  return (
    <>
      <nav className="cur-jump-nav" aria-label="On this page">
        <a className="cur-jump-link" href="#asm-summative-formative">
          1. Summative &amp; Formative
        </a>
        <a className="cur-jump-link" href="#asm-chapter">
          2. Chapter Assessments
        </a>
        <a className="cur-jump-link" href="#asm-olympiad">
          3. Olympiad Exams
        </a>
        <a className="cur-jump-link" href="#asm-future">
          IMS for a Better Future
        </a>
      </nav>

      <section className="cur-section" id="asm-overview">
        <p className="cur-p">
          Assessment is an integral part of curriculum, as it determines whether or
          not the goals of education are being met. Assessment inspires us to ask
          these questions:
        </p>
        <ul className="cur-list">
          <li>“Are we teaching what we think we are teaching?”</li>
          <li>“Are students learning what they are supposed to be learning?”</li>
          <li>
            “Is there a way to teach the subject better, thereby promoting better
            learning?”
          </li>
        </ul>
        <p className="cur-p">
          The best classroom assessments also serve as meaningful sources of
          information for teachers, helping them identify what they taught well and
          what they need to work on.
        </p>
      </section>

      <section
        className="cur-section cur-anchor-section"
        id="asm-summative-formative"
        data-aos="fade-up"
      >
        <h2 className="cur-section-title">
          1. Summative &amp; Formative Assessments
        </h2>
        <p className="cur-p">
          Alhamdulillah, assessments at IMS are embedded in the learning process. It
          is tightly interconnected with curriculum and instruction. The assessments
          transform learning and understanding into critical thinking and creating
          (Higher Order Thinking Skills - HOTS).
        </p>
        <p className="cur-p">
          IMS conducts <strong>4 Formative Assessments</strong> and{" "}
          <strong>2 Summative Assessments</strong> across the academic year, ensuring
          a balanced evaluation of progress and mastery.
        </p>
      </section>

      <section
        className="cur-section cur-anchor-section"
        id="asm-chapter"
        data-aos="fade-up"
        data-aos-delay="60"
      >
        <h2 className="cur-section-title">2. Chapter Assessments</h2>
        <p className="cur-p">
          Regular chapter-level assessments help students consolidate their learning,
          revisit weaker concepts, and build a strong foundation before moving on.
          They also give teachers timely insights into each child&apos;s progress, so
          support can be tailored where needed.
        </p>
      </section>

      <section
        className="cur-section cur-anchor-section"
        id="asm-olympiad"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h2 className="cur-section-title">3. Olympiad Exams</h2>
        <p className="cur-p">
          Alhamdulillah, IMS has integrated the following Olympiads into its
          curriculum, with Olympiad books included in the course:
        </p>
        <ul className="cur-list">
          <li>National Cyber Olympiad (NCO)</li>
          <li>National Science Olympiad (NSO)</li>
          <li>International Mathematics Olympiad (IMO)</li>
          <li>International English Olympiad (IEO)</li>
        </ul>
        <p className="cur-p">
          The Olympiad exams and their preparation acclimatize students to the
          competitive world.
        </p>
        <p className="cur-p">
          In <strong>2017–18</strong>, students of Class VIII appeared in the AMU IX
          Entrance and, Alhamdulillah, out of <strong>15</strong> Class VIII students
          of IMS, <strong>11 qualified</strong> the written test. <strong>8 students</strong> were
          finally selected after the interview. Two students featured in the top 10
          list, with <strong>Afeera Naseem</strong> securing the highest marks in the
          AMU IX Entrance written test.
        </p>
      </section>

      <section
        className="cur-section cur-anchor-section"
        id="asm-future"
        data-aos="fade-up"
        data-aos-delay="120"
      >
        <h2 className="cur-section-title">IMS For a Better Future of Our Country</h2>
        <p className="cur-p">
          History shows that the nation which contributes in the field of inventions
          and discoveries leads. Today, we look towards the western world for every
          invention and discovery. Alhamdulillah, IMS is trying to nurture scientific
          acumen in students through projects, STEM education, and interaction with
          people working in the field of science. InshaAllah these tiny tots will be
          the leaders in the scientific world and will take our nation ahead.
        </p>
        <p className="cur-p">
          Today, our country is in dire need of honest and committed professionals.
          Through value-based education, IMS strives to instill honesty, commitment,
          and excellence in the DNA of our students. These morally-engineered students
          will reform the professional system of our nation.
        </p>
        <p className="cur-p">
          Alhamdulillah, the staff at IMS is firmly committed to making students aware
          of national and social issues, sensitizing them to the plight of deprived
          classes. These students will lend a helping hand to the weaker sections of
          society so that they can also contribute to moving our nation ahead.
        </p>
        <p className="cur-p">
          At IMS, to instill patriotism, students are trained to respect the nation
          and the national symbols. They are taught about great leaders, their
          sacrifices, and their contribution in strengthening our country.
        </p>
        <p className="cur-p">
          India is a land of diversity. At IMS, we teach our students about different
          people and their varying cultural heritage. We make them understand the
          importance of respecting others and accepting differences—essential for the
          unity and integrity of the country.
        </p>
        <p className="cur-p">
          Hence, we feel the best way to serve our nation is through{" "}
          <strong>Value-Based Education</strong>.
        </p>

        <div className="asm-slogan" aria-label="Slogan">
          PADHEGA INDIA, TABHI TO BADHEGA INDIA
        </div>
      </section>
    </>
  );
};

export default AssessmentsContent;
