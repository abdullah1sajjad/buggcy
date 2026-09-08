import { Helmet } from "react-helmet-async";

const SITE_NAME = "Buggcy";
const SITE_URL = "https://buggcy.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article" | "product" | "profile";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  image,
  type = "website",
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Custom Software Development`;
  const ogImage = image || DEFAULT_IMAGE;
  const ogUrl = canonical || SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={ogUrl} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

/* ============================================================
   JSON-LD Generators
   ============================================================ */

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Buggcy",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Buggcy is a full-service software development company based in Oslo, Norway, specializing in web development, mobile apps, AI, cloud, and blockchain solutions.",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Beryllvegen 98",
    addressLocality: "Oslo",
    postalCode: "9022",
    addressCountry: "NO",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+47-93-923-306",
    contactType: "customer service",
    email: "contact@buggcy.com",
  },
  sameAs: [
    "https://www.linkedin.com/company/buggcy",
    "https://twitter.com/buggcy",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Buggcy",
  url: SITE_URL,
  description:
    "Custom software development company delivering web, mobile, AI, and cloud solutions for startups and enterprises worldwide.",
  publisher: {
    "@type": "Organization",
    name: "Buggcy",
  },
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Buggcy",
  image: DEFAULT_IMAGE,
  url: SITE_URL,
  telephone: "+47-93-923-306",
  email: "contact@buggcy.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Beryllvegen 98",
    addressLocality: "Oslo",
    addressRegion: "Oslo",
    postalCode: "9022",
    addressCountry: "NO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.9139,
    longitude: 10.7522,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.linkedin.com/company/buggcy",
    "https://twitter.com/buggcy",
  ],
};

export function serviceJsonLd(service: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: "Buggcy",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image || DEFAULT_IMAGE,
    datePublished: article.datePublished,
    author: {
      "@type": "Organization",
      name: article.author || "Buggcy",
    },
    publisher: {
      "@type": "Organization",
      name: "Buggcy",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

export function jobJsonLd(job: {
  title: string;
  description: string;
  location?: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: new Date().toISOString(),
    employmentType: job.type?.toUpperCase().replace(/\s+/g, "_") || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Buggcy",
      sameAs: SITE_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "Oslo",
        addressCountry: "NO",
      },
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
