import React from "react";

const FacilitiesContent = () => {
  return (
    <>
      <nav className="fac-jump-nav" aria-label="On this page">
        <a className="fac-jump-link" href="#fac-land-building">
          1. Land & Building
        </a>
        <a className="fac-jump-link" href="#fac-labs">
          2. Labs
        </a>
        <a className="fac-jump-link" href="#fac-biology">
          3. Biology Lab
        </a>
        <a className="fac-jump-link" href="#fac-computer">
          4. Computer Science Lab
        </a>
        <a className="fac-jump-link" href="#fac-other">
          Other Facilities
        </a>
      </nav>

      <section className="fac-section" id="fac-overview">
        <h2 className="fac-section-title">Facilities</h2>
        <p className="fac-p">
          IMS is a premier educational institution set within a sprawling 3-acre
          campus designed to inspire young minds. We believe that a child's
          learning environment is a cornerstone of their development, and our
          state-of-the-art infrastructure provides the perfect blend of modern
          education and expansive, natural space.
        </p>
      </section>

      <section className="fac-section fac-anchor-section" id="fac-land-building">
        <h2 className="fac-section-title">1. Land & Building</h2>
        <p className="fac-p">
          Our vast campus, with its ventilated, sun-lit classrooms, advanced
          labs, and extensive playing fields, is an ecosystem of holistic growth.
          Our academic block is designed for learning. Every classroom is
          spacious, well-ventilated, and flooded with natural light, creating an
          alert and positive atmosphere.
        </p>
      </section>

      <section className="fac-section fac-anchor-section" id="fac-labs">
        <h2 className="fac-section-title">2. Labs</h2>
        <p className="fac-tagline">Where Theory Meets Experiment</p>
        <p className="fac-p">
          The true understanding of subjects comes from doing. That's why we have
          invested in distinct, specialized laboratories, designed to provide an
          immersive, hands-on learning environment for Physics, Chemistry,
          Biology, Robotics & STEM, and Computer Science. This dedicated approach
          ensures that every experiment and project receives the focused space and
          resources it deserves.
        </p>

        <h3 className="fac-h3">
          (i) The Physics Lab: Unraveling the Laws of the Universe
        </h3>
        <p className="fac-p">
          Step into a space where energy, motion, and forces come to life. Our
          Physics Lab is equipped with advanced apparatus for mechanics, optics,
          electricity, and thermodynamics. Here, students don't just read about
          Newton's laws; they validate them through experiments, fostering a
          deep, intuitive understanding of the physical world.
        </p>

        <h3 className="fac-h3">
          (ii) The Chemistry Lab: A Realm of Molecular Discovery
        </h3>
        <p className="fac-p">
          Equipped with modern safety systems students learn to handle compounds
          responsibly while performing titrations, studying reactions, and
          discovering the fascinating properties of matter, transforming complex
          equations into tangible results.
        </p>
      </section>

      <section className="fac-section fac-anchor-section" id="fac-biology">
        <h2 className="fac-section-title">3. The Biology Lab: Exploring the Web of Life</h2>
        <p className="fac-p">
          From microscopes revealing the intricate structure of a cell to models
          of human anatomy and ecosystems, our Biology Lab brings the living
          world into sharp focus. Students engage in dissection, slide
          preparation, and DNA extraction, cultivating a sense of wonder for the
          complexity and beauty of life sciences.
        </p>
      </section>

      <section className="fac-section fac-anchor-section" id="fac-computer">
        <h2 className="fac-section-title">
          4. The Computer Science Lab: Coding the Digital World
        </h2>
        <p className="fac-p">
          Go beyond basic computer literacy. Our cutting-edge Computer Science Lab
          features high-performance computers and industry-relevant software.
          Here, students master programming languages, develop apps, understand
          cybersecurity, and delve into fields like artificial intelligence and
          data science, preparing them to be the architects of our digital future.
        </p>
      </section>

      <section className="fac-section fac-anchor-section" id="fac-other">
        <h2 className="fac-section-title">Additional Facilities</h2>
        <ul className="fac-list">
          <li>Library</li>
          <li>Conference Hall</li>
          <li>Separate sections for boys and girls</li>
          <li>Audio-visual system</li>
        </ul>
      </section>
    </>
  );
};

export default FacilitiesContent;
