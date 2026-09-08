import { useState } from "react";
import {
  MailIcon,
  GlobeIcon,
  ZapIcon,
  CheckIcon,
} from "../../../components/ui/Icon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useContactMutation,
  usePublicSettingsQuery,
} from "../../../services/queries";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(150, "Email must be under 150 characters"),
  service: z.string().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must be under 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1">{message}</p>;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-primary/50 transition-all duration-200";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { data: settings } = usePublicSettingsQuery();
  const contactEmail = settings?.email || "contact@buggcy.com";

  const infoItems = [
    { icon: <MailIcon size={20} />, text: contactEmail },
    {
      icon: <GlobeIcon size={20} />,
      text: "Global clients · Based in Pakistan",
    },
    { icon: <ZapIcon size={20} />, text: "React · Node · Cloud · Mobile" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", service: "", message: "" },
  });

  const { mutateAsync, isPending } = useContactMutation();

  async function onSubmit(data: ContactFormData) {
    try {
      await mutateAsync(data);
      setSent(true);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  }

  return (
    <section
      id="contact"
      className="bg-surface section-pad relative overflow-hidden"
    >
      {/* Ambient */}
      <div className="hero-glow glow-cyan w-[500px] h-[500px] bottom-0 right-0 opacity-30" />

      <div className="section-container relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="label-pill mx-auto">Get In Touch</span>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let's build something{" "}
            <span className="gradient-text">impactful</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Whether it's a product idea or a full-scale system, we respond fast
            and focus on real engineering solutions — not sales talk.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            target="_blank"
            className="inline-flex mt-2 border border-border px-6 py-2.5
            rounded-full text-sm font-medium text-muted-foreground
            hover:text-foreground hover:border-primary/50 transition-all
            duration-200">
            {contactEmail}
          </a>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left info */}
          <div className="space-y-6">
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Start a conversation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Share your idea, challenge, or product vision. We usually respond
              within 24 hours with clear next steps.
            </p>
            <div className="space-y-3">
              {infoItems.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="p-8 rounded-[2rem] text-center space-y-4 border bg-surface/50 border-primary/20 backdrop-blur-md">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckIcon size={32} className="text-primary" />
                </div>
                <p
                  className="text-2xl font-bold flex items-center justify-center gap-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Message sent
                </p>
                <p className="text-muted-foreground">
                  We'll respond within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register("name")}
                      placeholder="Your name"
                      className={`${inputClass} ${errors.name ? "border-destructive" : ""}`}
                    />
                    <FieldError message={errors.name?.message} />
                  </div>
                  <div>
                    <input
                      {...register("email")}
                      placeholder="Email address"
                      className={`${inputClass} ${errors.email ? "border-destructive" : ""}`}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>
                </div>

                <div>
                  <select
                    {...register("service")}
                    className={`${inputClass} ${errors.service ? "border-destructive" : ""}`}
                  >
                    <option value="">Select service</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="cloud">Cloud / DevOps</option>
                    <option value="saas">SaaS Product</option>
                    <option value="other">Other</option>
                  </select>
                  <FieldError message={errors.service?.message} />
                </div>

                <div>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your project..."
                    className={`${inputClass} resize-none ${errors.message ? "border-destructive" : ""}`}
                  />
                  <FieldError message={errors.message?.message} />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-60 active:scale-[0.98] shadow-[0_0_20px_var(--color-primary)]"
                >
                  {isPending ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
