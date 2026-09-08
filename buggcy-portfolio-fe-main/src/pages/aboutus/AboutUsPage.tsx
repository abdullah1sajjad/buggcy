import SEO, { organizationJsonLd } from "../../components/seo/SEO";
import About from "./components/About";

export default function AboutUsPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Buggcy — a team of 22+ engineers based in Oslo, Norway, building custom software for startups and enterprises across 6+ industries worldwide."
        keywords="about buggcy, software company oslo, engineering team, about us, custom software development team"
        canonical="https://buggcy.com/about"
        jsonLd={organizationJsonLd}
      />
      <About />
    </>
  );
}
