import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import OnlineCourses from "../allcourses/OnlineCourses";
import "./programs.css";

const Programs = () => {
  const location = useLocation();
  const topRef = useRef(null);

  useEffect(() => {
    // If there's a hash in the URL, try to scroll to that element
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (topRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <main className="programs-page container" ref={topRef}>
      <h1>Programs</h1>
      
      {/* Dynamic Programs List from Admin */}
      <OnlineCourses />

      <section id="co-curricular">
        <h2>Co-Curricular & Extra Curricular</h2>
        <p>Where Passion is Discovered, Character is Built, and Talents Shine.</p>
        <p>
          At IMS, we believe that a child's education extends far beyond the
          classroom walls. Our rich and diverse programme of co-curricular and
          extra-curricular activities is a core part of our holistic
          philosophy. These activities provide a vital platform for students to
          explore their interests, develop essential life skills, build
          confidence, and form lasting friendships, all within our supportive
          and values-led environment.
        </p>

        <h3 id="english-communication">English Communication Program</h3>
        <p>Find Your Voice, Shape Your Future.</p>
        <p>
          Our dedicated English Communication program is designed to empower
          students with the skills to articulate their ideas with clarity,
          conviction, and respect. In today's interconnected world, the
          ability to communicate effectively in English opens doors to global
          opportunities.
        </p>

        <h3 id="arabic-communication">Arabic Communication Program</h3>
        <p>Connect with the Language of Faith.</p>
        <p>
          Arabic is not just a language to be learned, but a key to a deeper
          spiritual understanding. Our specialized Arabic Communication program
          opens the door to the profound beauty of the Quran and the rich
          heritage of Islamic scholarship.
        </p>

        <h3>Project Based Learning</h3>
        <p>Nurturing Problem-Solvers & Change-Makers</p>
        <ol>
          <li>Discover & Question</li>
          <li>Research & Investigate</li>
          <li>Design & Create</li>
          <li>Refine & Present (Science Fair - Sciberation)</li>
        </ol>
      </section>

      <section id="neet-jee">
        <h2>NEET/JEE Program</h2>
        <p>Redefining Schooling for Aspiring Doctors & Engineers</p>
        <p>
          Our Integrated NEET/JEE Schooling Program blends the ICSE curriculum
          with intensive competitive exam preparation so students are ready in
          their first attempt.
        </p>

        <h3>The Foundation Program (4-Year from Class IX)</h3>
        <p>Build an Unshakable Foundation for Success in core subjects.</p>

        <h3>The Intensive Accelerator Program (2-Year from Class XI)</h3>
        <p>
          Fast-track preparation covering board and competitive syllabi with
          daily practice, weekly tests, doubt classes and experienced faculty.
        </p>

        <h4>Special Features</h4>
        <ul>
          <li>Efficient and committed Faculties</li>
          <li>Daily Practice Tests</li>
          <li>Weekly Tests and doubt classes</li>
          <li>No need for external coaching (saves time and money)</li>
        </ul>
      </section>

      <section id="facilities">
        <h2>Facilities</h2>
        <p>
          IMS is set on a spacious 3-acre campus with ventilated classrooms,
          advanced labs, and extensive playing fields — an ecosystem for
          holistic growth.
        </p>
      </section>

      <section id="assessments">
        <h2>Assessments at IMS</h2>
        
        <h3>1. Summative & Formative Assessments</h3>
        <p>
          Assessment is an integral part of curriculum, as it determines whether or not the goals of education are being met. Assessment inspires us to ask these questions:
        </p>
        <ul>
          <li>"Are we teaching what we think we are teaching?"</li>
          <li>"Are students learning what they are supposed to be learning?"</li>
          <li>"Is there a way to teach the subject better, thereby promoting better learning?"</li>
        </ul>
        <p>
          The best classroom assessments also serve as meaningful sources of information for teachers, helping them identify what they taught well and what they need to work on.
        </p>
        <p>
          <strong>Alhamdulillah</strong>, assessments at IMS are embedded in learning process. It is tightly interconnected with curriculum and instruction. The assessments transform learning and understanding to critical thinking and creating (High Order Thinking Skills - HOTS). IMS has 4 Formative Assessments and 2 Summative Assessments.
        </p>

        <h3>2. Chapter Assessments</h3>
        <p>Regular chapter-wise assessments ensure continuous learning and concept mastery.</p>

        <h3>3. Olympiad Exams</h3>
        <p>
          <strong>Alhamdulillah</strong>, IMS has integrated National Cyber Olympiad (NCO), National Science Olympiad (NSO), International Mathematics Olympiad (IMO) and International English Olympiad (IEO) in its curriculum. The Olympiad books are included in the course. The Olympiad exams and its preparation acclimatize the students to the competitive world.
        </p>
        <p>
          In 2017-18 class VIII students of IMS appeared in AMU IX Entrance and <strong>Alhamdulillah</strong>, out of 15 students of class VIII, 11 students of IMS qualified the written test. 8 students finally got selected after interview. There were two students in the top 10 list. One of the students, Afeera Naseem got highest marks in the AMU IX entrance written test.
        </p>
      </section>

      <section id="ims-for-nation">
        <h2>IMS For Better Future of our Country</h2>
        
        <div className="nation-content">
          <p>
            History shows that the nation which contributes in the field of inventions and discoveries leads. Today, we look towards western world for every invention and discovery. <strong>Alhumdulillah</strong>, IMS is trying to nurture scientific acumen in the students through projects, STEM Education and interaction with the people who are working in the field of science. <strong>InshaAllah</strong> these tiny tots will be the leaders in the scientific world and will take our nation ahead.
          </p>

          <p>
            Today, our country is in dire need of honest and committed professionals. Through value based education IMS is trying to bring in honesty, commitment, excellence in the DNA of these students. These morally engineered students will reform the professional system of our nation.
          </p>

          <p>
            <strong>Alhumdulillah</strong>, staff at IMS is firmly committed to make our students aware of national and social issues and sensitizing them to the plight of deprived classes. These students will give helping hands to the weaker section of our society so that they can also contribute in moving our nation ahead.
          </p>

          <p>
            At IMS, to instill patriotism, the students are trained to respect the nation and the national symbols. The students are taught about the great leaders and their sacrifices and contribution in strengthening our country.
          </p>

          <p>
            India is a land of diversity. At IMS, we teach our students about the different people and their varying cultural heritage. We make them understand to respect and value others and accept the differences which are important for the unity and integrity of the country.
          </p>

          <p className="conclusion-text">
            Hence we feel, the best way to serve our Nation is through Value Based Education.
          </p>
        </div>
      </section>

      <p className="closing">
        <strong>PADHEGA INDIA TABHI TO BADHEGA INDIA</strong>
      </p>
    </main>
  );
};

export default Programs;
