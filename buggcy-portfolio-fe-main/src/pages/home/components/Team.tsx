import { motion } from "framer-motion";
import { Users, Target, TrendingUp, Award, Activity, Shield, Users2 } from "lucide-react";

const pillars = [
  { title: "Client Connection", desc: "Our relationship with clients sets us apart. We don't just build — we become a partner in your growth.", stat: "01", icon: Users },
  { title: "Cross-functional Teams", desc: "Collaboration across departments defines our strategy. Developers, engineers, and product minds working as one unit.", stat: "02", icon: Target },
  { title: "Ongoing Development", desc: "Agile execution with structured delivery. We ship continuously using systems we've refined across real projects.", stat: "03", icon: TrendingUp },
  { title: "Enterprise Experience", desc: "Leadership with Fortune 500 background brings scalable engineering practices to every product we build.", stat: "04", icon: Award },
];

export default function Team() {
  return (
    <section id="team" className="bg-surface section-pad relative overflow-hidden">
      <div className="hero-glow glow-cyan w-[500px] h-[500px] bottom-0 left-0 opacity-20" />
      <div className="section-container relative z-10">
        <div className="space-y-16">

          {/* Intro
          <div className="max-w-4xl mx-auto text-center">
            <span className="label-pill mx-auto">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Professional Outsourcing Software Developers
            </h2>
            <h3 className="text-xl text-muted-foreground mt-4">
              Turning your digital dreams into reality.
            </h3>
            <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed max-w-3xl mx-auto text-left">
              <p>
                Based in Oslo, Norway we at <strong>buggcy</strong> aim to grab the leading position as an outsourcing software development company. We develop innovative software solutions for enterprises located all across the globe, helping them grow their business by increasing their online presence. Our focus lies in, but we are not restricted to, designing, software engineering, and development solutions.
              </p>
              <p>
                For several years, we have been building software products using a team of designers and business people. The combined efforts of this team create a tech-savvy environment with an acute business sense. At <strong>buggcy</strong>, we work to be at the front of web-based business initiatives. Thereby, we offer one-stop-shop for all your web business needs.
              </p>
              <p>
                Our unmatched services give us the confidence to meet your objectives in solving technical challenges. This is how <strong>buggcy</strong> built its reputation as well; by providing innovative software solutions and second-to-none engineering and support services. We encourage you to refer to our clients if you wish to find out more about us.
              </p>
            </div>
          </div> */}

          {/* Core Beliefs / Pillars */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Our Core Beliefs</h3>
              <p className="text-muted-foreground mt-2">The Four Pillars of <strong>buggcy</strong></p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={p.title}
                    className="card-base p-6 flex gap-6 items-start group hover:border-primary/50 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0 shadow-md">
                      <Icon className="text-primary" size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{p.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Team & Values */}
          <div className="max-w-5xl mx-auto mt-20">
            <div className="grid md:grid-cols-3 gap-8">

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="col-span-1 card-base p-8 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Users2 className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-bold">Our Team</h3>
                <p className="text-muted-foreground leading-relaxed">Our work-Intensive team craves success and achievement, which defines our positive mindset towards any sort of challenge, whether in outsourcing or software development as a whole.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-1 card-base p-8 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Activity className="text-primary" size={24} />
                </div>
                <h4 className="text-2xl font-bold">Agility</h4>
                <p className="text-muted-foreground leading-relaxed">Our work methodology works like a spearhead towards challenges, enabling us to complete our duties flawlessly, without any delays.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="col-span-1 space-y-6"
              >
                <div className="card-base p-6 space-y-3">
                  <div className="flex items-center gap-4 mb-2">
                    <Award className="text-primary" size={24} />
                    <h4 className="text-xl font-bold">Leadership</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Leaders lead by example and so do ours who have achieved their rightful place through years’ of experience and in-depth know-how of today’s outsourcing software development trends.</p>
                </div>
                <div className="card-base p-6 space-y-3">
                  <div className="flex items-center gap-4 mb-2">
                    <Shield className="text-primary" size={24} />
                    <h4 className="text-xl font-bold">Culture</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">We embrace the idea of meeting people with different knowledge and background because we are a pool that promotes innovation by leveraging emerging tools and technology.</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
