# Quick SEO Implementation Template

Copy and paste this template for each remaining page. Just update the values.

## Template for Vision.jsx

```javascript
import SEOHelmet from "../common/SEO/SEOHelmet";

const Vision = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Vision & Mission - Islamic Mission School",
    "description": "Discover IMS's vision, mission, and core values. Our commitment to value-based education and character development.",
    "url": "https://www.imschool.in/vision"
  };

  return (
    <>
      <SEOHelmet
        title="Vision & Mission | Islamic Mission School Aligarh"
        description="Explore IMS's vision for value-based education, our mission to nurture leaders, and core values guiding our institution."
        keywords="school vision, school mission, value-based education, Islamic education, character development"
        canonical="https://www.imschool.in/vision"
        ogTitle="Vision & Mission - Islamic Mission School"
        ogDescription="Our vision is to nurture compassionate, confident, and responsible leaders through value-based education."
        ogUrl="https://www.imschool.in/vision"
        structuredData={structuredData}
      />
      {/* Rest of component */}
    </>
  );
};

export default Vision;
```

## Template for Team.jsx

```javascript
import SEOHelmet from "../common/SEO/SEOHelmet";

const Team = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Our Team - Islamic Mission School",
    "description": "Meet the dedicated team of educators and administrators at IMS committed to your child's success.",
    "url": "https://www.imschool.in/team"
  };

  return (
    <>
      <SEOHelmet
        title="Our Team | Islamic Mission School Aligarh"
        description="Meet our experienced educators, administrators, and support staff dedicated to providing quality education and care."
        keywords="school teachers, school staff, educators, school administration, experienced teachers"
        canonical="https://www.imschool.in/team"
        ogTitle="Our Team - Islamic Mission School"
        ogDescription="Our team of dedicated educators is committed to your child's academic and personal growth."
        ogUrl="https://www.imschool.in/team"
        structuredData={structuredData}
      />
      {/* Rest of component */}
    </>
  );
};

export default Team;
```

## Template for Pricing.jsx

```javascript
import SEOHelmet from "../common/SEO/SEOHelmet";

const Pricing = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Fee Structure - Islamic Mission School",
    "description": "Transparent fee structure for all classes at IMS. Affordable quality education.",
    "url": "https://www.imschool.in/pricing"
  };

  return (
    <>
      <SEOHelmet
        title="Fee Structure | Islamic Mission School Aligarh"
        description="Transparent and affordable fee structure for Pre-Primary to Senior Secondary classes. Quality education at reasonable rates."
        keywords="school fees, fee structure, school pricing, affordable education, admission fees"
        canonical="https://www.imschool.in/pricing"
        ogTitle="Fee Structure - Islamic Mission School"
        ogDescription="Affordable quality education. Check our transparent fee structure for all classes."
        ogUrl="https://www.imschool.in/pricing"
        structuredData={structuredData}
      />
      {/* Rest of component */}
    </>
  );
};

export default Pricing;
```

## Template for Blog.jsx

```javascript
import SEOHelmet from "../common/SEO/SEOHelmet";

const Blog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "IMS Journal - Islamic Mission School Blog",
    "description": "Read articles about education, parenting, Islamic values, and school updates.",
    "url": "https://www.imschool.in/journal"
  };

  return (
    <>
      <SEOHelmet
        title="Journal | Islamic Mission School Blog & Articles"
        description="Read insightful articles about education, parenting tips, Islamic values, and updates from Islamic Mission School."
        keywords="education blog, parenting tips, Islamic education, school news, educational articles"
        canonical="https://www.imschool.in/journal"
        ogTitle="IMS Journal - Blog & Articles"
        ogDescription="Explore our blog for educational insights, parenting tips, and school updates."
        ogUrl="https://www.imschool.in/journal"
        structuredData={structuredData}
      />
      {/* Rest of component */}
    </>
  );
};

export default Blog;
```

## Template for CourseHome.jsx (Courses)

```javascript
import SEOHelmet from "../common/SEO/SEOHelmet";

const CourseHome = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Online Courses - Islamic Mission School",
    "description": "Explore our online courses and programs designed for skill development and academic excellence.",
    "url": "https://www.imschool.in/courses"
  };

  return (
    <>
      <SEOHelmet
        title="Online Courses | Islamic Mission School"
        description="Discover our comprehensive online courses and programs for academic excellence and skill development."
        keywords="online courses, online education, skill development, academic programs, distance learning"
        canonical="https://www.imschool.in/courses"
        ogTitle="Online Courses - Islamic Mission School"
        ogDescription="Quality online education programs designed for your success."
        ogUrl="https://www.imschool.in/courses"
        structuredData={structuredData}
      />
      {/* Rest of component */}
    </>
  );
};

export default CourseHome;
```

## Template for Programs.jsx

```javascript
import SEOHelmet from "../common/SEO/SEOHelmet";

const Programs = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Programs - Islamic Mission School",
    "description": "Explore our specialized programs including NEET/JEE, co-curricular activities, and language programs.",
    "url": "https://www.imschool.in/programs"
  };

  return (
    <>
      <SEOHelmet
        title="Programs | Islamic Mission School Aligarh"
        description="Explore our specialized programs: NEET/JEE coaching, co-curricular activities, English & Arabic communication programs."
        keywords="NEET coaching, JEE coaching, co-curricular programs, language programs, specialized education"
        canonical="https://www.imschool.in/programs"
        ogTitle="Programs - Islamic Mission School"
        ogDescription="Specialized programs for academic excellence and holistic development."
        ogUrl="https://www.imschool.in/programs"
        structuredData={structuredData}
      />
      {/* Rest of component */}
    </>
  );
};

export default Programs;
```

## Template for Infrastructure.jsx

```javascript
import SEOHelmet from "../common/SEO/SEOHelmet";

const Infrastructure = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Infrastructure - Islamic Mission School",
    "description": "State-of-the-art facilities including computer labs, library, laboratories, and sports complex.",
    "url": "https://www.imschool.in/infrastructure"
  };

  return (
    <>
      <SEOHelmet
        title="Infrastructure & Facilities | Islamic Mission School"
        description="Explore our state-of-the-art facilities: computer labs, library, science laboratories, and sports complex."
        keywords="school infrastructure, computer lab, library, science lab, sports facilities, school facilities"
        canonical="https://www.imschool.in/infrastructure"
        ogTitle="Infrastructure & Facilities - Islamic Mission School"
        ogDescription="Modern facilities designed for comprehensive learning and development."
        ogUrl="https://www.imschool.in/infrastructure"
        structuredData={structuredData}
      />
      {/* Rest of component */}
    </>
  );
};

export default Infrastructure;
```

---

## Steps to Apply:

1. Open each component file
2. Add the import at the top: `import SEOHelmet from "../common/SEO/SEOHelmet";`
3. Add the structuredData object before the return statement
4. Wrap the return with `<SEOHelmet ... />` component
5. Save and test

That's it! Each page will now have proper SEO meta tags and structured data.
