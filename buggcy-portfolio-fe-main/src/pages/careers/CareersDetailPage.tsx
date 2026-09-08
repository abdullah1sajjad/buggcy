import { useParams, Link, useSearchParams } from "react-router-dom";
import { useCareerQuery } from "../../services/queries";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, MapPin, Briefcase,
  Building, Banknote, Calendar, CheckCircle2, ListChecks,
} from "lucide-react";
import SEO, { jobJsonLd } from "../../components/seo/SEO";

export default function CareerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: career, isLoading, isError } = useCareerQuery(id || "");
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "1";

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="section-container pt-32 pb-16">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-48" />
            <div className="h-12 bg-muted rounded w-3/4" />
            <div className="h-64 bg-muted rounded-2xl" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !career) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">Position Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The position you're looking for doesn't exist.
          </p>
          <Link to="/careers" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Careers
          </Link>
        </div>
      </main>
    );
  }

  const responsibilities = career.responsibilities
    ? career.responsibilities.split("\n").filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO
        title={`${career.title} - ${career.department || "Engineering"}`}
        description={career.description || `Apply for ${career.title} at Buggcy. ${career.location || "Oslo, Norway"}. ${career.type || "Full-time"} position.`}
        keywords={`${career.title}, ${career.department}, ${career.location}, software jobs, tech careers`}
        canonical={`https://buggcy.com/careers/${career.id}`}
        jsonLd={jobJsonLd({ title: career.title, description: career.description || career.title, location: career.location, type: career.type })}
      />
      {/* Hero */}
      <section className="hero-section relative overflow-hidden pt-32 md:pt-40 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Careers
            </Link>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <span className="label-pill mb-4 block w-fit">
                  {career.department || "Engineering"}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                  {career.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{career.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{career.type}</span>
                  </div>
                  {career.department && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span>{career.department}</span>
                    </div>
                  )}
                  {career.salaryRange && (
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      <span>{career.salaryCurrency ? `${career.salaryCurrency} ` : ""}{career.salaryRange}</span>
                    </div>
                  )}
                  {career.deadline && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Apply by {career.deadline}</span>
                    </div>
                  )}
                </div>
              </div>
              <Link
                to={`/careers/${career.id}/apply`}
                state={{ career }}
                className="btn-primary shrink-0 inline-flex items-center gap-2"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 border-t border-border">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-extrabold mb-4">About the Role</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {career.description}
                </p>
              </motion.div>

              {/* Responsibilities */}
              {responsibilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
                    <ListChecks className="h-6 w-6 text-primary" />
                    Responsibilities
                  </h2>
                  <ul className="space-y-4">
                    {responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Requirements */}
              {career.requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-extrabold mb-6">Requirements</h2>
                  <ul className="space-y-4">
                    {career.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-border bg-muted/30 sticky top-32"
              >
                <h3 className="text-lg font-extrabold mb-6">Job Overview</h3>
                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Location</div>
                      <div className="font-medium">{career.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Job Type</div>
                      <div className="font-medium">{career.type}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Department</div>
                      <div className="font-medium">{career.department || "Engineering"}</div>
                    </div>
                  </div>

                  {career.salaryRange && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Banknote className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Salary Range</div>
                        <div className="font-medium">{career.salaryCurrency ? `${career.salaryCurrency} ` : ""}{career.salaryRange}</div>
                      </div>
                    </div>
                  )}

                  {career.deadline && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Deadline</div>
                        <div className="font-medium">{career.deadline}</div>
                      </div>
                    </div>
                  )}

                  {career.status && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Status</div>
                        <div className={`font-medium capitalize ${career.status === "open" ? "text-green-500" : "text-muted-foreground"}`}>
                          {career.status}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <Link
                  to={`/careers/${career.id}/apply`}
                  state={{ career }}
                  className="btn-primary w-full mt-8 inline-flex items-center justify-center gap-2"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      {!isPreview && (
        <section className="py-16 md:py-24 border-t border-border">
          <div className="section-container">
            <div className="bg-primary rounded-3xl px-8 py-16 md:px-20 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">
                  Don't See Your Role?
                </h2>
                <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
                  We're always looking for talented people. Send us your resume and we'll keep you in mind for future openings.
                </p>
                <div className="mt-8">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 rounded-full font-semibold hover:bg-background/90 transition-all"
                  >
                    Get in Touch <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}