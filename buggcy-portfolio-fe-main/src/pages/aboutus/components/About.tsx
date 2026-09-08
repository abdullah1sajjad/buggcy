import { motion } from "framer-motion";
import {
  CheckCircle2,
  Rocket,
  Code,
  Globe2,
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  Handshake,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicSettingsQuery } from "../../../services/queries";

const pillars = [
  {
    title: "Our Team",
    desc: "Our work-intensive team craves success and achievement, which defines our positive mindset towards any sort of challenge, whether in outsourcing or software development as a whole.",
    icon: Users,
  },
  {
    title: "Agility",
    desc: "Our work methodology works like a spearhead towards challenges, enabling us to complete our duties flawlessly, without any delays.",
    icon: Rocket,
  },
  {
    title: "Leadership",
    desc: "Leaders lead by example and so do ours who have achieved their rightful place through years of experience and in-depth know-how of today's outsourcing software development trends.",
    icon: Target,
  },
  {
    title: "Culture",
    desc: "We embrace the idea of meeting people with different knowledge and background because we are a pool that promotes innovation by leveraging emerging tools and technology.",
    icon: Lightbulb,
  },
];

const values = [
  {
    title: "Client-First Approach",
    desc: "We don't take a brief and disappear. From the first discovery session through to post-launch, your team and ours work as one with full transparency.",
    icon: Handshake,
  },
  {
    title: "Quality Engineering",
    desc: "Clean architecture, maintainable code, and engineering excellence. We build software that scales and stands the test of time.",
    icon: Code,
  },
  {
    title: "Global Delivery",
    desc: "With teams in Norway and Pakistan, we provide 24/7 delivery capabilities and local market intelligence across time zones.",
    icon: Globe2,
  },
  {
    title: "Innovation Mindset",
    desc: "We stay at the front of web-based business initiatives, leveraging emerging technologies to give your business a competitive edge.",
    icon: Lightbulb,
  },
];

const timeline = [
  {
    year: "2020",
    title: "Founded",
    desc: "Started in Lahore, Pakistan with a clear mission — build software that actually works in production. No consultancy layer, no account managers. Engineers talking directly to founders.",
  },
  {
    year: "2021",
    title: "First Enterprise Clients",
    desc: "Delivered our first enterprise-grade applications. Built reputation for reliable outsourcing with a focus on quality and speed.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    desc: "Expanded operations to Oslo, Norway. Started serving clients across Europe and North America. Grew the team to 20+ engineers.",
  },
  {
    year: "2023",
    title: "Blockchain & Cloud",
    desc: "Added blockchain development and cloud services to our portfolio. Became a full-service software development partner for startups and enterprises.",
  },
  {
    year: "Today",
    title: "Full-Stack Excellence",
    desc: "22+ team members, 50+ projects delivered, serving clients across the globe. From web and mobile to AI, IoT, and blockchain — we build it all.",
  },
];

const industries = [
  {
    name: "Healthcare",
    slug: "healthcare",
    image: "photo-1576091160399-112ba8d25d1d",
  },
  {
    name: "E-Commerce",
    slug: "e-commerce",
    image: "photo-1556742049-0cfed4f6a45d",
  },
  {
    name: "Travel & Tourism",
    slug: "travel-tourism",
    image: "photo-1507525428034-b723cf961d3e",
  },
  { name: "Finance", slug: "finance", image: "photo-1554224155-6726b3ff858f" },
  {
    name: "Education",
    slug: "education",
    image: "photo-1503676260728-1c00da094a0b",
  },
  {
    name: "On-Demand Services",
    slug: "on-demand-services",
    image: "photo-1556742502-ec7c0e9f34b1",
  },
  {
    name: "Food & Groceries",
    slug: "food-groceries",
    image: "photo-1542838132-92c53300491e",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "22+", label: "Team Members" },
  { value: "100%", label: "Client Focused" },
  { value: "24/7", label: "Technical Support" },
];

export default function About() {
  const { data: settings } = usePublicSettingsQuery();

  const cityCountry = [settings?.city, settings?.country]
    .filter(Boolean)
    .join(", ");
  const officeTwoCityCountry = [
    settings?.officeTwoCity,
    settings?.officeTwoCountry,
  ]
    .filter(Boolean)
    .join(", ");

  const offices = [
    {
      city: cityCountry || "Lahore, Pakistan",
      address:
        settings?.address ||
        "3rd floor, 90 Commercial, Tulip Block Parkview City, Lahore",
      phone: settings?.phone || "+92-335-3655557",
    },
    ...(settings?.officeTwoCity || settings?.officeTwoAddress
      ? [
          {
            city: officeTwoCityCountry || settings?.officeTwoCity || "",
            address: settings?.officeTwoAddress || "",
            phone: settings?.officeTwoPhone || "",
          },
        ]
      : [
          {
            city: "Oslo, Norway",
            address: "Beryllvegen 98, 9022 Oslo, Norway",
            phone: "+47-93-923-306",
          },
        ]),
  ];

  return (
    <section className="bg-background relative overflow-hidden">
      {/* ==================== HERO — SERVICE DETAIL STYLE ==================== */}
      <section className="hero-section relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="label-pill"
              >
                About Us
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              >
                We Build <span className="gradient-text">Software</span> That
                Works
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-muted-foreground leading-relaxed"
              >
                Based in Oslo, Norway, we partner with ambitious companies
                worldwide to engineer high-performance digital products.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 sm:px-7 sm:py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all active:scale-95 shadow-[0_0_25px_rgba(1,133,177,0.35)]"
                >
                  Get a Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/success-stories"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 sm:px-7 sm:py-3 font-semibold text-sm hover:bg-muted transition-all"
                >
                  View Our Work
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-border">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                    alt="Our Team"
                    className="w-full h-56 lg:h-72 object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-24 rounded-xl overflow-hidden border border-border shadow-lg hidden md:block">
                  <img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80"
                    alt="Team collaboration in office"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-container relative z-10">
        {/* ==================== WHAT WE DO ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-6">
              <span className="label-pill">Who We Are</span>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Engineering Growth with{" "}
                <span className="gradient-text">Strategic Precision</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  We at <strong>buggcy</strong> aim to grab the leading position
                  as an outsourcing software development company. We develop
                  innovative software solutions for enterprises located all
                  across the globe, helping them grow their business by
                  increasing their online presence.
                </p>
                <p>
                  Our focus lies in, but we are not restricted to, designing,
                  software engineering, and development solutions. For several
                  years, we have been building software products using a team of
                  designers and business people.
                </p>
                <p>
                  The combined efforts of this team create a tech-savvy
                  environment with an acute business sense. At{" "}
                  <strong>buggcy</strong>, we work to be at the front of
                  web-based business initiatives. Thereby, we offer a
                  one-stop-shop for all your web business needs.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="card-base p-6 space-y-4 hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {v.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ==================== VISION & MISSION ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="label-pill mx-auto">Why We Exist</span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Where We're <span className="gradient-text">Going</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-base overflow-hidden hover:border-primary/30 transition-colors group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="Our Vision"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="text-primary" size={28} />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  A world where every ambitious company — startup or enterprise
                  — has access to the engineering capability that used to be
                  reserved for the largest technology firms.
                </p>
              </div>
            </div>

            <div className="card-base overflow-hidden hover:border-primary/30 transition-colors group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                  alt="Our Mission"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Rocket className="text-primary" size={28} />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To engineer the software systems that give founders and
                  enterprises a technical advantage — faster, more reliably, and
                  with less risk than building alone.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==================== FOUR PILLARS ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="label-pill mx-auto">Core Beliefs</span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Four Pillars of <span className="gradient-text">buggcy</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-base overflow-hidden hover:border-primary/30 transition-colors group"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${idx === 0 ? "photo-1522071820081-009f0129c71c" : idx === 1 ? "photo-1552664730-d307ca884978" : idx === 2 ? "photo-1560472354-b33ff0c44a43" : "photo-1521737711867-e3b97375f902"}?w=400&q=80`}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 -mt-10 relative z-10 border-4 border-background">
                      <Icon className="text-primary" size={22} />
                    </div>
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ==================== ENGINEERING APPROACH ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="card-base p-6 md:p-10 lg:p-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                <span className="label-pill">Our Approach</span>
                <h2
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Engineering Partners,{" "}
                  <span className="gradient-text">Not Order Takers</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We do not take a brief and disappear for three months. From
                  the first discovery session through to post-launch, your team
                  and ours work as one.
                </p>
                <ul className="space-y-4">
                  {[
                    "Discovery before development — we understand the problem before writing code",
                    "Full sprint visibility with weekly progress reviews and shared roadmaps",
                    "Architecture decisions documented and explained, not hidden in a black box",
                    "Post-launch support built into every engagement, not sold as an extra",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl overflow-hidden min-h-[200px] md:min-h-[300px]">
                <img
                  src="https://picsum.photos/seed/about-engineering/800/600"
                  alt="Engineering Approach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==================== STATS ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative bg-card border border-border rounded-2xl p-6 md:p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3
                  className="text-4xl md:text-5xl font-black text-primary relative z-10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mt-2 font-medium relative z-10">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ==================== OUR JOURNEY ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="label-pill mx-auto">Our Journey</span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How We <span className="gradient-text">Got Here</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              buggcy was built to solve a problem we kept seeing: ambitious
              companies with the right idea and the wrong engineering partner.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`md:grid md:grid-cols-2 md:gap-12 items-center ${
                    idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div
                    className={`${
                      idx % 2 === 0 ? "md:text-right" : ""
                    } mb-4 md:mb-0`}
                  >
                    <span className="text-primary font-bold text-lg">
                      {item.year}
                    </span>
                    <h3
                      className="text-2xl font-bold mt-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={`https://images.unsplash.com/${idx === 0 ? "photo-1519389950473-47ba0277781c" : idx === 1 ? "photo-1553877522-43269d4ea984" : idx === 2 ? "photo-1451187580459-43490279c0fa" : idx === 3 ? "photo-1454165804606-c3d57bc86b40" : "photo-1551434678-e076c223a692"}?w=600&q=80`}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ==================== INDUSTRIES ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="label-pill mx-auto">Industries</span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Industries We <span className="gradient-text">Serve</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((industry, idx) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  to={`/industries/${industry.slug}`}
                  className="block relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/3]"
                >
                  <img
                    src={`https://images.unsplash.com/${industry.image}?w=400&q=80`}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white font-semibold text-sm md:text-base">
                      {industry.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==================== GLOBAL PRESENCE ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="label-pill mx-auto">Global Presence</span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We Are <span className="gradient-text">Everywhere</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {offices.map((office, idx) => (
              <div
                key={office.city}
                className="card-base overflow-hidden hover:border-primary/30 transition-colors group"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${idx === 0 ? "photo-1507003211169-0a1dd7228f2d?w=600&q=80" : "photo-1574334294985-a2bc462281af?w=600&q=80"}`}
                    alt={office.city}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="text-primary" size={20} />
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {office.city}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {office.address}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone size={14} />
                    <span>{office.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href={`mailto:${settings?.email || "info@buggcy.com"}`}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <Mail size={16} />
              {settings?.email || "info@buggcy.com"}
            </a>
          </div>
        </motion.div>

        {/* ==================== CTA ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden bg-card border border-border rounded-[2rem] px-6 py-14 md:px-16 md:py-20 text-center">
            <div className="absolute inset-0 opacity-30">
              <div className="hero-glow glow-violet w-96 h-96 top-0 left-0" />
              <div className="hero-glow glow-cyan w-96 h-96 bottom-0 right-0" />
            </div>

            <div className="relative z-10">
              <span className="label-pill mx-auto">Start Your Project</span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-black mt-8 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Let's Build{" "}
                <span className="gradient-text">Something Great</span>
                <br />
                Together
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
                Whether you're launching a startup, modernizing an enterprise
                platform, or scaling an existing digital product, our team is
                ready to help you move faster and build with confidence.
              </p>
              <div className="mt-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 md:px-10 md:py-5 rounded-full font-semibold hover:scale-105 transition-all"
                >
                  Contact Us
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
