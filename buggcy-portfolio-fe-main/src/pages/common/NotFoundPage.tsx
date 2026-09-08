import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import SEO from "../../components/seo/SEO";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
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
