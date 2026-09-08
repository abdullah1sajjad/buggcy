import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Upload,
  MapPin,
  Briefcase,
  Building,
} from "lucide-react";

import SEO from "../../components/seo/SEO";
import { useCareerQuery } from "../../services/queries";
import { applyToCareer } from "../../services/api";
import { NotFoundHero } from "../../components/shared";
import DynamicApplicationFields from "../../components/shared/DynamicApplicationFields";
import type { DynamicFieldValues, DynamicFieldFiles } from "../../components/shared/DynamicApplicationFields";
import type { Career } from "../../types";

export default function CareerApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const stateCareer = location.state?.career as Career | undefined;
  const { data: queriedCareer } = useCareerQuery(id || "");
  const career = stateCareer || queriedCareer;

  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    coverLetter: "",
    declaration: false,
  });

  const [customFieldValues, setCustomFieldValues] = useState<DynamicFieldValues>({});
  const [customFieldFiles, setCustomFieldFiles] = useState<DynamicFieldFiles>({});

  const updateCustomFieldValue = (fieldId: string, value: string | boolean) => {
    setCustomFieldValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const updateCustomFieldFile = (fieldId: string, file: File | null) => {
    setCustomFieldFiles((prev) => ({ ...prev, [fieldId]: file }));
  };

  const updateField = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC and DOCX files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5MB.");
      return;
    }

    setResume(file);
  };

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (
      !career ||
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !resume ||
      !form.declaration
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const customFields = career.applicationFormSchema || [];
    for (const field of customFields) {
      if (!field.required) continue;
      if (field.fieldType === "file") {
        if (!customFieldFiles[field.id]) {
          alert(`Please provide "${field.label}".`);
          return;
        }
      } else if (field.fieldType === "checkbox") {
        if (!customFieldValues[field.id]) {
          alert(`Please confirm "${field.label}".`);
          return;
        }
      } else {
        const val = customFieldValues[field.id];
        if (!val || (typeof val === "string" && !val.trim())) {
          alert(`Please provide "${field.label}".`);
          return;
        }
      }
    }

    if (!career?.id) return;

    setSubmitting(true);
    try {
      const result = await applyToCareer(
        career.id,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phoneNumber: form.phone,
          dateOfBirth: "",
          gender: "",
          nationality: "",
          country: form.country,
          state: "",
          city: form.city,
          postalCode: "",
          address: "",
          education: [],
          experience: [],
          skills: {
            programmingLanguages: [],
            frameworks: [],
            databases: [],
            cloudPlatforms: [],
            toolsAndTechnologies: [],
          },
          links: { linkedin: "", github: "", portfolio: "", otherLink: "" },
          resume,
          coverLetter: form.coverLetter,
          additionalQuestions: {
            currentSalary: "",
            expectedSalary: "",
            noticePeriod: "",
            willingToRelocate: "",
            workAuthorizationStatus: "",
          },
          declaration: form.declaration,
        },
      );
      setReferenceNumber(result?.id ? `APP-${result.id.slice(0, 8).toUpperCase()}` : "APP-SUBMITTED");
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!career) {
    return (
      <NotFoundHero
        title="Position Not Found"
        backTo="/careers"
        backLabel="View Careers"
      />
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <section className="hero-section relative overflow-hidden pt-32 md:pt-40 pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          <div className="section-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Application <span className="gradient-text">Submitted</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Thank you for applying. We'll review your application and get back to you within 3-5 business days.
              </p>

              <div className="p-6 rounded-2xl border border-border bg-muted/30 text-left mb-8">
                <h3 className="font-extrabold mb-4">Application Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Position</span>
                    <p className="font-medium">{career.title}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Applicant</span>
                    <p className="font-medium">{form.firstName} {form.lastName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email</span>
                    <p className="font-medium">{form.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reference</span>
                    <p className="font-medium font-mono">{referenceNumber}</p>
                  </div>
                </div>
              </div>

              <Link
                to="/careers"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
              >
                Back to Careers <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  const inputClass =
    "w-full bg-transparent border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO
        title={`Apply - ${career?.title || "Career"}`}
        description={`Apply for ${career?.title || "this position"} at Buggcy. Submit your application now.`}
        keywords={`apply ${career?.title}, ${career?.title} application, buggcy jobs`}
        canonical={`https://buggcy.com/careers/${id}/apply`}
      />
      {/* Compact Hero */}
      <section className="hero-section relative overflow-hidden pt-28 md:pt-32 pb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <span className="label-pill mb-2 block w-fit">Job Application</span>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                Apply for <span className="gradient-text">{career.title}</span>
              </h1>
            </div>
            <div className="flex flex-wrap gap-3 text-muted-foreground text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border">
                <MapPin className="h-3 w-3" /> {career.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border">
                <Briefcase className="h-3 w-3" /> {career.type}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border">
                <Building className="h-3 w-3" /> {career.department || "Engineering"}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compact Form */}
      <section className="py-8 md:py-10 border-t border-border">
        <div className="section-container max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info + Contact in one row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-primary text-sm font-bold">01</span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">First Name *</label>
                  <input
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="John"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Last Name *</label>
                  <input
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Doe"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="john@example.com"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Phone *</label>
                  <input
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Country</label>
                  <input
                    value={form.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    placeholder="United States"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">City</label>
                  <input
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="San Francisco"
                    className={inputClass}
                  />
                </div>
              </div>
            </motion.div>

            {/* Resume Upload */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-primary text-sm font-bold">02</span>
                Resume Upload
              </h2>
              <label className="cursor-pointer block">
                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${resume ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <Upload className={`h-8 w-8 mx-auto mb-3 ${resume ? "text-primary" : "text-muted-foreground"}`} />
                  {resume ? (
                    <div>
                      <p className="font-medium text-primary text-sm">{resume.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">Click to replace</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium text-sm">Click to upload resume</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC or DOCX (Max 5MB)</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                />
              </label>
            </motion.div>

            {/* Cover Letter */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-primary text-sm font-bold">03</span>
                Cover Letter
              </h2>
              <textarea
                rows={4}
                value={form.coverLetter}
                onChange={(e) => updateField("coverLetter", e.target.value)}
                placeholder="Tell us why you're a great fit for this role..."
                className={inputClass + " resize-none"}
              />
            </motion.div>

            {/* Job-specific custom fields from the Application Form Builder */}
            {career.applicationFormSchema && career.applicationFormSchema.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-primary text-sm font-bold">04</span>
                  Additional Information
                </h2>
                <DynamicApplicationFields
                  fields={career.applicationFormSchema}
                  values={customFieldValues}
                  files={customFieldFiles}
                  onValueChange={updateCustomFieldValue}
                  onFileChange={updateCustomFieldFile}
                  inputClass={inputClass}
                />
              </motion.div>
            )}

            {/* Declaration + Submit */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                <input
                  type="checkbox"
                  checked={form.declaration}
                  onChange={(e) => updateField("declaration", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  required
                />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I confirm that the information provided is accurate and complete. I understand that any false information may result in disqualification.
                </span>
              </label>

              {submitError && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {submitError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Our recruitment team typically responds within 3-5 business days.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-primary/25"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </form>
        </div>
      </section>
    </main>
  );
}
