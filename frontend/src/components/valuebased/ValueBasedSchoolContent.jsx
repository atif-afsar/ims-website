import React from "react";

/**
 * Main body for IMS, A Value Based School (used on standalone page).
 * Anchor ids align with navbar hash links (#vb-need, etc.).
 */
const ValueBasedSchoolContent = () => {
  return (
    <>
      <p className="vb-lead" data-aos="fade-up">
        At Islamic Mission School, value-based education is not an add-on—it is woven
        into how we teach, how we lead, and how students grow together. Explore why it
        matters, how it shapes our curriculum, and how it differs from education without
        values.
      </p>

      <nav className="vb-jump-nav" aria-label="On this page" data-aos="fade-up">
        <a className="vb-jump-link" href="#vb-need">
          1. Need
        </a>
        <a className="vb-jump-link" href="#vb-curriculum">
          2. Curriculum
        </a>
        <a className="vb-jump-link" href="#vb-vs-education">
          3. Comparison
        </a>
      </nav>

      <section
        id="vb-need"
        className="about-section-card about-anchor-section"
        data-aos="fade-up"
      >
        <h2 className="about-section-subtitle vb-section-title">
          1. The Need For Value Based Schools
        </h2>
        <p className="about-section-text">
          The concept of Value Based Schools has been developed as an alternative to
          the one-track approach and is based on combining the best of both—values and
          academic learning—into an integrated model. Values-based education is an
          approach to teaching that works with values. It creates a strong learning
          environment that enhances academic achievement and develops students&apos;
          social and relationship skills that last throughout their lives.
        </p>
        <p className="about-section-text">
          In India, value-based education is the real need of the hour, as we observe
          societal decline in values day by day and the deterioration of our
          youth&apos;s character and morals, particularly over the last few decades.
        </p>
        <p className="about-section-text">
          It is necessary to develop programs to inculcate moral values in society.
          Educational institutions must take the initiative to impart value-based
          education to the new generation. Imbibing qualities of good conduct,
          self-confidence, and high values will help students secure a significant place
          in society.
        </p>
        <p className="about-section-text">
          Students should realize that character building is as important as career
          building. Moreover, unlike other schools, value-based schools do not
          propagate the idea of &quot;survival of the fittest,&quot; which instructs a
          child to attain success by climbing over the shoulders of his fellow
          brothers; instead, they extol the teaching of &quot;cooperation for
          co-existence,&quot; the spirit of our beloved Sahabah. Islamic Mission School
          is an endeavour to make the benefits of this model of schooling available to
          the people of India.
        </p>
      </section>

      <section
        id="vb-curriculum"
        className="about-section-card about-anchor-section"
        data-aos="fade-up"
        data-aos-delay="80"
      >
        <h2 className="about-section-subtitle vb-section-title">
          2. Values in the curriculum
        </h2>
        <p className="about-section-text">
          The first ten years of a child are very crucial and important in his life as
          whatever he is exposed to during this period has a serious and lasting effect
          on him in the future.
        </p>
        <p className="about-section-text">
          Learning in childhood is likened to an engraved mark on rock, which it is
          difficult to rub off.
        </p>
        <p className="about-section-text muted about-vb-quote-intro">
          Rightly said;
        </p>
        <blockquote className="about-vb-blockquote">
          Knowledge at young age is like engraving on a stone
        </blockquote>
        <p className="about-section-text">
          This is high time to sow the seeds of moral values in the hearts of children.
          Education without values is like tea without sugar, or a body without soul.
        </p>
        <p className="about-section-text">
          Values in an educational institution are the need of the hour. The severe
          deterioration in the conduct of India&apos;s youth is a matter of concern.
          The paradigm shift in the perception of education and the role of schools is
          a major factor negatively impacting the conduct and behaviour of Indian youth.
          Today we can see:
        </p>
        <ul className="about-vb-bullet-list">
          <li>
            The quantity of education has considerably increased, but the quality has
            decreased.
          </li>
          <li>
            The number of educated people has reached a high level, yet murder, hatred,
            and selfishness have spread everywhere.
          </li>
          <li>
            Many institutions have opened, but only a few civilized people are produced.
          </li>
          <li>Degrees are available for all, but dignity has gone down.</li>
          <li>
            Trained people are produced by many institutions, but sincere people are very
            few.
          </li>
          <li>
            Technologically we have become advanced, but humanity is threatened.
          </li>
        </ul>
        <p className="about-section-text">
          <strong>Alhamdulillah</strong>, IMS has taken the initiative to impart
          value-based education to this new generation. Imbibing the qualities of good
          conduct, self-confidence, and high moral values will help students earn a
          respected place in society.
        </p>
        <p className="about-section-text">
          Value-based education is most effective when every staff member engages with
          it. So at IMS, <strong>Alhamdulillah</strong>, we apply a whole-school approach,
          training our staff to be instruments in imparting values. There is a marked
          difference in the focus and outcomes of simple education and value-based
          education.
        </p>
      </section>

      <section
        id="vb-vs-education"
        className="about-section-card about-anchor-section"
        data-aos="fade-up"
        data-aos-delay="120"
      >
        <h2 className="about-section-subtitle vb-section-title">
          3. Education Vs Value Based Education
        </h2>
        <div className="about-vb-table-wrap">
          <table className="about-vb-compare-table">
            <thead>
              <tr>
                <th scope="col">Education</th>
                <th scope="col">Value Based Education</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>It opens our mind.</td>
                <td>It gives us purity of heart too.</td>
              </tr>
              <tr>
                <td>It extends our relationship with the world</td>
                <td>It links us with our own family members too.</td>
              </tr>
              <tr>
                <td>It develops sympathy.</td>
                <td>It develops empathy.</td>
              </tr>
              <tr>
                <td>It provides us with skills.</td>
                <td>It provides us sincerity too.</td>
              </tr>
              <tr>
                <td>It makes our living better.</td>
                <td>It makes our life better too.</td>
              </tr>
              <tr>
                <td>It makes us a good professional.</td>
                <td>It makes us a whole human too.</td>
              </tr>
              <tr>
                <td>It teaches us &apos;Survival of the fittest&apos;.</td>
                <td>It teaches us &apos;Cooperation for co-existence&apos;.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ValueBasedSchoolContent;
