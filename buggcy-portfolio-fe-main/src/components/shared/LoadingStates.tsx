import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  height?: string;
}

export function LoadingSpinner({ height = "min-h-[70vh]" }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

interface SkeletonBlockProps {
  className?: string;
}

export function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  return <div className={`bg-muted rounded ${className}`} />;
}

interface PageSkeletonProps {
  lines?: Array<{ width: string; height?: string; mt?: string }>;
}

export function PageSkeleton({ lines }: PageSkeletonProps) {
  const defaultLines = [
    { width: "w-28", height: "h-5" },
    { width: "w-2/3", height: "h-12", mt: "mt-4" },
    { width: "w-full max-w-2xl", height: "h-4", mt: "mt-4" },
    { width: "w-full", height: "h-80", mt: "mt-6" },
  ];

  const items = lines || defaultLines;

  return (
    <main className="min-h-screen bg-background">
      <div className="section-container pt-32 pb-16">
        <div className="animate-pulse space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-muted rounded ${item.height} ${item.width} ${item.mt || ""}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  backTo: string;
  backLabel?: string;
}

export function ErrorState({
  title = "Not Found",
  message,
  backTo,
  backLabel,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h2 className="text-2xl font-bold text-destructive">{title}</h2>
      {message && (
        <p className="text-muted-foreground text-center max-w-md">{message}</p>
      )}
      <Link
        to={backTo}
        className="text-primary hover:underline flex items-center gap-2"
      >
        <ArrowLeft size={16} /> {backLabel || `Back to ${backTo.replace("/", "")}`}
      </Link>
    </div>
  );
}

interface NotFoundHeroProps {
  title?: string;
  message?: string;
  backTo: string;
  backLabel?: string;
}

export function NotFoundHero({
  title = "Not Found",
  message,
  backTo,
  backLabel,
}: NotFoundHeroProps) {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
        {message && (
          <p className="text-muted-foreground mb-8">{message}</p>
        )}
        <Link
          to={backTo}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> {backLabel || "Go Back"}
        </Link>
      </div>
    </main>
  );
}

interface Page404Props {
  title?: string;
  message?: string;
}

export function Page404({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
}: Page404Props) {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="section-container text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[10rem] md:text-[14rem] font-bold leading-none text-primary/10">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="-mt-16 md:-mt-20 relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <Home className="h-4 w-4" /> Go Home
            </Link>
            <Link
              to="/"
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Go Back
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
