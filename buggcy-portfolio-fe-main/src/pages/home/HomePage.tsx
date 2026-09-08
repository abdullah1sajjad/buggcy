import SEO, { organizationJsonLd, websiteJsonLd } from "../../components/seo/SEO";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Industries from "./components/Industries";
import Team from "./components/Team";
import TechStack from "./components/TechStack";
import Contact from "../../pages/contact/components/Contact";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Custom Software Development Company | Web, Mobile, AI, Cloud"
        description="Buggcy is a full-service software development company in Oslo, Norway. We build custom web apps, mobile apps, AI solutions, cloud infrastructure, and blockchain products for startups and enterprises."
        keywords="software development company, custom software, web development, mobile app development, AI development, cloud services, blockchain, Oslo Norway, outsourcing"
        canonical="https://buggcy.com"
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />
      <Hero />
      <Services />
      <Industries />
      <Team />
      <TechStack />
      <Contact />
    </>
  );
}
