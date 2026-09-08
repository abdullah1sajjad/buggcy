import SEO from "../../components/seo/SEO";
import Contact from "./components/Contact";

export default function ContactPage() {
  return (
    <div>
      <SEO
        title="Contact Us"
        description="Get in touch with Buggcy. Request a free consultation for custom software development, web apps, mobile apps, AI, cloud, or blockchain projects."
        keywords="contact buggcy, software development consultation, get in touch, free consultation, project inquiry"
        canonical="https://buggcy.com/contact"
      />
      <Contact />
    </div>
  );
}
