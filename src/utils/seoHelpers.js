// SEO Helper Functions

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Islamic Mission School",
  "alternateName": "IMS",
  "url": "https://islamicmissionschool.org",
  "logo": "https://islamicmissionschool.org/images/logo/logo.webp",
  "description": "Islamic Mission School (IMS) is a CISCE-affiliated, value-based educational institution in Aligarh, India, dedicated to academic excellence and character development.",
  "foundingDate": "2008",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Aligarh",
    "addressLocality": "Aligarh",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "202001",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+91-XXXXXXXXXX",
    "email": "info@islamicmissionschool.org"
  },
  "sameAs": [
    "https://www.facebook.com/islamicmissionschool",
    "https://www.instagram.com/islamicmissionschoolaligarh",
    "https://www.youtube.com/islamicmissionschool"
  ],
  "areaServed": "IN",
  "educationalCredentialAwarded": "CISCE",
  "knowsAbout": [
    "Academic Excellence",
    "Character Development",
    "Islamic Values",
    "STEM Education",
    "Co-curricular Activities"
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Islamic Mission School",
  "image": "https://islamicmissionschool.org/images/logo/logo.webp",
  "description": "Best school in Aligarh for value-based education and academic excellence",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Aligarh",
    "addressLocality": "Aligarh",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "202001",
    "addressCountry": "IN"
  },
  "telephone": "+91-XXXXXXXXXX",
  "url": "https://islamicmissionschool.org",
  "priceRange": "₹₹",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150"
  }
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const courseSchema = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": "Islamic Mission School",
    "url": "https://www.imschool.in"
  },
  "image": course.image,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": course.rating || "4.5",
    "reviewCount": course.reviewCount || "50"
  }
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
