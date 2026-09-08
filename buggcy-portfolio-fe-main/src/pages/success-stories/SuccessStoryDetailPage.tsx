import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Award } from "lucide-react";
import SEO, { articleJsonLd } from "../../components/seo/SEO";
import { useSuccessStoryBySlugQuery } from "../../services/queries";
import { useRef, useEffect } from "react";
import { CtaSection } from "../../components/shared";

function BrowserContent({ liveUrl }: { liveUrl?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const node = el;

    let pos = 0;
    const speed = 1;
    let raf: number;

    function animate() {
      pos += speed;

      if (pos >= node.scrollHeight - node.clientHeight) {
        pos = 0;
      }

      node.scrollTop = pos;
      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const iframeSrc = liveUrl || "https://www.buggcy.com/";

  return (
    <div className="relative bg-black aspect-[16/7] md:aspect-[2.35/1] overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden pointer-events-none"
      >
        <iframe
          src={iframeSrc}
          title="Live Preview"
          className="w-full border-0 pointer-events-none"
          style={{ height: "500vh" }}
          loading="eager"
        />
      </div>
      <div className="absolute top-4 left-4 md:top-5 md:left-5 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-white text-xs font-medium">Live Preview</span>
        </div>
      </div>
    </div>
  );
}

export default function SuccessStoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = useSuccessStoryBySlugQuery(slug || "");

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="section-container pt-32 pb-16">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-48" />
            <div className="h-12 bg-muted rounded w-3/4" />
            <div className="aspect-[16/9] bg-muted rounded-2xl" />
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">Project not found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/success-stories" className="btn-primary">
            Back to Success Stories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen text-foreground">
      <SEO
        title={project.title}
        description={project.description || `${project.title} - A success story by Buggcy. See how we delivered results.`}
        keywords={`${project.title}, ${project.category}, software development case study`}
        canonical={`https://buggcy.com/success-stories/${project.slug}`}
        image={project.imageUrl}
        type="article"
        jsonLd={articleJsonLd({
          title: project.title,
          description: project.description || project.title,
          image: project.imageUrl,
          datePublished: new Date().toISOString(),
        })}
      />
      {/* Hero */}
      <section className="hero-section relative w-full pt-28 md:pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="label-pill mb-4 block w-fit">{project.category}</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image - Browser Window Frame */}
      <section className="relative w-full px-4 md:px-8 pb-8 md:pb-16 pt-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative group"
          >
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
            
            {/* Browser Window */}
            <div className="relative bg-[#1a1a2e] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              
              {/* Title Bar */}
              <div className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 bg-[#16162a] border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-3 md:mx-6">
                  <div className="flex items-center gap-2 bg-[#0d0d1a] rounded-lg px-3 py-1.5 border border-white/5 max-w-lg mx-auto">
                    <svg className="w-3 h-3 text-[#28c840] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                    </svg>
                    <span className="text-white/40 text-[10px] md:text-xs truncate">buggcy.com/{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-1">
                  <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/5">
                    <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </div>
                  <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/5">
                    <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeWidth={2} d="M8 4l8 8-8 8" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Tab Bar */}
              <div className="flex items-center gap-1 px-3 md:px-4 pt-1.5 bg-[#12122a]">
                <div className="flex items-center gap-2 bg-[#1a1a2e] rounded-t-lg px-3 py-1.5 border border-b-0 border-white/5">
                  <div className="w-3.5 h-3.5 bg-primary/40 rounded flex items-center justify-center">
                    <span className="text-[7px] font-bold text-primary">B</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-white/60 max-w-[100px] truncate">{project.title}</span>
                  <svg className="w-2.5 h-2.5 text-white/20 hover:text-white/50 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              
              {/* Browser Content - Auto Scrolling Website */}
              <BrowserContent liveUrl={project.liveUrl} />
              
              {/* Status Bar */}
              <div className="flex items-center justify-between px-3 md:px-4 py-1.5 md:py-2 bg-[#16162a] border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[#28c840] rounded-full" />
                  <span className="text-[9px] md:text-[10px] text-white/30">Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] md:text-[10px] text-white/30">Responsive</span>
                  <div className="flex items-center gap-0.5">
                    <div className="w-0.5 h-1 bg-white/20 rounded-full" />
                    <div className="w-0.5 h-1.5 bg-white/20 rounded-full" />
                    <div className="w-0.5 h-2 bg-primary/40 rounded-full" />
                    <div className="w-0.5 h-2.5 bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Info Bar */}
      <section className="relative w-full py-6 md:py-8 border-y border-border">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">Client</span>
              <span className="font-bold">{project.client}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">Category</span>
              <span className="font-bold">{project.category}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">Technologies</span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies?.slice(0, 4).map((tech) => (
                  <span key={tech} className="text-[10px] font-medium uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">Results</span>
              <div className="flex flex-wrap gap-3">
                {(project.results ?? []).slice(0, 2).map((r) => (
                  <span key={r.label} className="text-sm font-bold text-primary">
                    {r.value} <span className="text-muted-foreground font-normal">{r.label}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenge + Solution */}
      <section className="relative w-full py-12 md:py-16">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-muted/50 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="text-primary" size={20} />
                </div>
                <h3 className="text-xl font-bold">The Challenge</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-muted/50 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="text-primary" size={20} />
                </div>
                <h3 className="text-xl font-bold">The Solution</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery - Device Frames */}
      <section className="relative w-full py-8 md:py-16 overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Laptop Frame */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="lg:col-span-8 relative group device-laptop"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Laptop body */}
                <div className="relative mx-auto w-full max-w-2xl">
                  {/* Screen bezel */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl md:rounded-t-3xl p-2 md:p-3 pt-3 md:pt-4 shadow-2xl">
                    {/* Camera dot */}
                    <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-700 rounded-full border border-gray-600">
                      <div className="absolute inset-0.5 bg-gray-600 rounded-full" />
                    </div>
                    
                    {/* Screen */}
                    <div className="relative aspect-[16/10] rounded-lg md:rounded-xl overflow-hidden bg-black screen-shine">
                      <img
                        src={project.laptopImageUrl || project.imageUrl}
                        alt={`${project.title} - Laptop View`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-2 left-2 md:top-4 md:left-4">
                        <span className="px-2 py-1 md:px-3 md:py-1.5 bg-black/50 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold rounded-md">
                          01 · Desktop View
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Laptop base/keyboard */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 h-4 md:h-6 rounded-b-xl md:rounded-b-2xl">
                    {/* Trackpad indicator */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-gray-700 rounded-full" />
                    {/* Hinge */}
                    <div className="absolute -top-0.5 left-4 right-4 h-0.5 bg-gray-700 rounded-full" />
                  </div>
                  
                  {/* Keyboard base */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-700 h-3 md:h-4 rounded-b-2xl md:rounded-b-3xl mx-6 md:mx-12 shadow-lg">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 md:w-12 h-0.5 bg-gray-600 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile & Tablet Frames */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-4 flex flex-col gap-6"
            >
              {/* Mobile Frame */}
              <div className="relative group mx-auto w-40 md:w-48 device-mobile">
                <div className="absolute -inset-3 bg-gradient-to-b from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  {/* Phone body */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-1.5 md:p-2 shadow-2xl">
                    {/* Side buttons */}
                    <div className="absolute top-16 -right-0.5 w-0.5 h-8 bg-gray-700 rounded-r-full" />
                    <div className="absolute top-24 -right-0.5 w-0.5 h-12 bg-gray-700 rounded-r-full" />
                    <div className="absolute top-20 -left-0.5 w-0.5 h-10 bg-gray-700 rounded-l-full" />
                    
                    {/* Notch / Dynamic Island */}
                    <div className="absolute top-2.5 md:top-3 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-black rounded-full px-3 py-1 md:px-4 md:py-1.5">
                        <div className="w-1.5 h-1.5 bg-gray-800 rounded-full ml-1" />
                      </div>
                    </div>
                    
                    {/* Screen */}
                    <div className="relative aspect-[9/19.5] rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden bg-black screen-shine">
                      <img
                        src={project.mobileImageUrl || project.imageUrl}
                        alt={`${project.title} - Mobile View`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Mobile UI overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 md:p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 md:w-6 md:h-6 bg-primary/30 rounded-md" />
                            <div className="h-1.5 w-16 bg-white/20 rounded-full" />
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-1 w-full bg-white/10 rounded-full" />
                            <div className="h-1 w-3/4 bg-white/10 rounded-full" />
                            <div className="h-1 w-1/2 bg-white/10 rounded-full" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Status bar */}
                      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-5 md:px-6 pt-1">
                        <span className="text-[9px] md:text-[10px] text-white font-semibold">9:41</span>
                        <div className="flex items-center gap-0.5">
                          <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                          </svg>
                          <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Label */}
                      <div className="absolute top-10 left-1/2 -translate-x-1/2">
                        <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-[9px] md:text-[10px] font-semibold rounded-md">
                          02 · Mobile
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablet Frame */}
              <div className="relative group mx-auto w-52 md:w-60 device-tablet">
                <div className="absolute -inset-3 bg-gradient-to-b from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  {/* Tablet body */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl md:rounded-2xl p-1.5 md:p-2 shadow-2xl">
                    {/* Camera */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-700 rounded-full z-10" />
                    
                    {/* Screen */}
                    <div className="relative aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden bg-black screen-shine">
                      <img
                        src={project.tabletImageUrl || project.imageUrl}
                        alt={`${project.title} - Tablet View`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      
                      {/* Tablet UI */}
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 right-3 md:right-4">
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-primary/30 rounded-md" />
                          <div className="h-1.5 md:h-2 w-20 md:w-24 bg-white/20 rounded-full" />
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-square bg-white/10 rounded-lg backdrop-blur-sm" />
                          ))}
                        </div>
                      </div>
                      
                      {/* Label */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                        <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-[9px] md:text-[10px] font-semibold rounded-md">
                          03 · Tablet
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="relative w-full py-12 md:py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="label-pill mb-4 block w-fit mx-auto">Results</span>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Proven <span className="gradient-text">Impact</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {(project.results ?? []).map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
                  {result.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {result.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Image - Desktop Monitor */}
      <section className="relative w-full py-8 md:py-16 overflow-hidden">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative group max-w-4xl mx-auto device-monitor"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Monitor frame */}
            <div className="relative">
              {/* Top bezel with camera */}
              <div className="relative bg-gradient-to-b from-gray-700 to-gray-800 h-8 md:h-10 rounded-t-3xl flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-600 rounded-full border border-gray-500" />
              </div>
              
              {/* Screen */}
              <div className="relative bg-black aspect-[16/9] overflow-hidden screen-shine">
                  <img
                    src={project.desktopImageUrl || project.imageUrl}
                    alt={`${project.title} - Full Desktop View`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Browser-like top bar */}
                <div className="absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-sm px-4 py-2 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-md px-3 py-1">
                    <span className="text-white/50 text-xs">{project.title.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-white/20 rounded" />
                    <div className="w-3 h-3 bg-white/20 rounded" />
                  </div>
                </div>
                
                {/* Label */}
                <div className="absolute top-12 left-4 md:left-6">
                  <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
                    04 · Full Desktop View
                  </span>
                </div>
                
                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white/70 uppercase tracking-wider block mb-2">Final Result</span>
                      <span className="text-xl md:text-3xl font-bold text-white">{project.title}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                      <span className="text-white text-sm font-medium">View Live</span>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom bezel */}
              <div className="relative bg-gradient-to-b from-gray-800 to-gray-700 h-6 md:h-8 rounded-b-3xl flex items-center justify-center">
                <div className="w-16 md:w-24 h-1 bg-gray-600 rounded-full" />
              </div>
              
              {/* Stand neck */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 md:w-16 h-6 md:h-8 bg-gradient-to-b from-gray-700 to-gray-600 rounded-b-lg" />
              
              {/* Stand base */}
              <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-24 md:w-32 h-2 md:h-3 bg-gradient-to-b from-gray-600 to-gray-500 rounded-full shadow-lg" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        badge="Let's Collaborate"
        title="Ready to Build Something"
        highlightText="Great?"
        description="Tell us about your project and we'll get back with a clear roadmap."
        buttons={[
          { label: "Get in Touch", to: "/contact" },
          { label: "View Our Work", to: "/success-stories", variant: "outline" },
        ]}
      />
    </main>
  );
}
