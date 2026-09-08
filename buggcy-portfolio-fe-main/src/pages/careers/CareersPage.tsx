import { useState } from "react";
import { Link } from "react-router-dom";
import SEO, { jobJsonLd } from "../../components/seo/SEO";
import { useCareersQuery } from "../../services/queries";
import {
  MapPin,
  Briefcase,
  ArrowRight,
  Trophy,
  Rocket,
  Heart,
  
} from "lucide-react";
import { motion } from "framer-motion";
import {  StatsGrid, FilterPills, CheckList } from "../../components/shared";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const whyJoin = [
  {
    title: "Rewards",
    desc: "We offer competitive compensation, performance-based increments, and bonuses that recognize your impact and hard work.",
    icon: Trophy,
  },
  {
    title: "Empowerment",
    desc: "We trust our people. You're encouraged to make decisions, take ownership, and bring bold ideas to life.",
    icon: Rocket,
  },
  {
    title: "Growth",
    desc: "We create opportunities that accelerate your career — helping you learn faster, take on bigger challenges, and grow with the company.",
    icon: Heart,
  },
];

const perks = [
  "Competitive salary with performance-based bonuses",
  "Health insurance for you and your family",
  "Provident fund and leave encashment",
  "Subsidized lunch and flexible work hours",
  "Team retreats, sports, and wellness activities",
  "Learning budget for courses and certifications",
];

const categories = ["All", "Engineering", "Design", "Business"];

export default function CareersPage() {
  const { data: careers = [], isLoading, isError } = useCareersQuery();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCareers =
    activeCategory === "All"
      ? careers
      : careers.filter((c) => c.department === activeCategory);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="section-pad text-center text-destructive">
        Failed to load careers.
      </div>
    );
  }

  return (
    <section className="bg-background section-pad relative overflow-hidden pt-24 md:pt-32">
      <SEO
        title="Careers"
        description="Join Buggcy — we're hiring software engineers, designers, and business professionals. Build your career at a top software development company in Oslo, Norway."
        keywords="buggcy careers, software engineer jobs, developer jobs oslo, tech jobs, hiring, join our team"
        canonical="https://buggcy.com/careers"
        jsonLd={careers.length > 0 ? careers.slice(0, 10).map((c) =>
          jobJsonLd({ title: c.title, description: c.description || c.title, location: c.location, type: c.type })
        ) : undefined}
      />
      {/* Ambient glows */}
      <div className="hero-glow glow-violet w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2 opacity-20" />
      <div className="hero-glow glow-cyan w-[400px] h-[400px] bottom-0 right-0 opacity-20" />

      <div className="section-container relative z-10">
        {/* ==================== HERO ==================== */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 md:mb-24"
        >
          {/* Left - Text */}
          <div className="space-y-6">
            <motion.span variants={fadeUp} className="label-pill">
              We're Hiring
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Build Your Career At <span className="gradient-text">buggcy</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground max-w-xl"
            >
              Growth is a shared journey. We build meaningful technology, solve
              real problems, and create an environment where talented people
              learn, collaborate, and grow together.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="#positions"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:scale-105 transition-all"
              >
                View Open Positions
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right - Multi Layer Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[350px] md:h-[420px]"
          >
            {/* Back image */}
            <div className="absolute top-0 right-0 w-[70%] h-[80%] rounded-2xl overflow-hidden border border-border/50 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Front image - offset */}
            <div className="absolute bottom-0 left-0 w-[55%] h-[65%] rounded-2xl overflow-hidden border border-border/50 shadow-2xl z-10">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
                alt="Office culture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            {/* Glass badge 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute top-6 left-0 z-20 bg-card/80 backdrop-blur-md border border-border/50 rounded-xl px-4 py-3 shadow-lg"
            >
              <div
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                22+
              </div>
              <div className="text-xs text-muted-foreground">Team Members</div>
            </motion.div>

            {/* Glass badge 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-12 right-4 z-20 bg-card/80 backdrop-blur-md border border-border/50 rounded-xl px-4 py-3 shadow-lg"
            >
              <div
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                50+
              </div>
              <div className="text-xs text-muted-foreground">
                Projects Delivered
              </div>
            </motion.div>

            {/* Glass badge 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-1/2 left-[45%] z-30 bg-primary rounded-full p-3 shadow-lg shadow-primary/30"
            >
              <Rocket className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ==================== WHY JOIN ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="label-pill mx-auto">Why Join Us</span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Join <span className="gradient-text">buggcy</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyJoin.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-base p-6 md:p-10 text-center hover:border-primary/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-primary" size={28} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ==================== OPEN POSITIONS ==================== */}
        <div id="positions" className="mb-24 scroll-mt-24">
          <div className="text-center mb-8">
            <span className="label-pill mx-auto">Open Positions</span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              All Open <span className="gradient-text">Positions</span>
            </h2>
          </div>

          {/* Category Filter */}
          <FilterPills
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
            showAllLabel="All Vacancies"
          />

          {/* Job Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCareers.map((career, idx) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  to={`/careers/${career.id}`}
                  className="card-base p-6 hover:border-primary/50 transition-all group block cursor-pointer h-full"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {career.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 mb-4">
                        {career.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 flex-shrink-0"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-lg border border-border">
                      <MapPin size={13} />
                      <span>{career.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-lg border border-border">
                      <Briefcase size={13} />
                      <span>{career.type}</span>
                    </div>
                    {career.department && (
                      <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-lg border border-primary/20">
                        <span>{career.department}</span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredCareers.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No positions found in this category.
            </div>
          )}
        </div>

        {/* ==================== PERKS & BENEFITS ==================== */}
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
                <span className="label-pill">Perks & Benefits</span>
                <h2
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Why You'll <span className="gradient-text">Love It Here</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We believe great work comes from happy, supported people.
                  That's why we invest in your well-being, growth, and comfort.
                </p>
                <CheckList items={perks} />
              </div>

              <div className="rounded-2xl overflow-hidden min-h-[200px] md:min-h-[300px]">
                <img
                  src="https://picsum.photos/seed/careers-perks/800/600"
                  alt="Perks and Benefits"
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
          className="mb-24"
        >
          <StatsGrid
            stats={[
              { value: "22+", label: "Team Members" },
              { value: "50+", label: "Projects Delivered" },
              { value: "100%", label: "Client Focused" },
              { value: "24/7", label: "Support Available" },
            ]}
          />
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
              <span className="label-pill mx-auto">Ready to Start?</span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-black mt-8 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Don't See Your{" "}
                <span className="gradient-text">Perfect Role?</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
                We're always looking for talented people. Send us your resume
                and we'll keep you in mind for future opportunities.
              </p>
              <div className="mt-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full font-semibold hover:scale-105 transition-all"
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
