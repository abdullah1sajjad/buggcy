import { useParams } from "react-router-dom";
import { useServiceQuery } from "../../services/queries";
import { motion } from "framer-motion";
import { LoadingSpinner, ErrorState, CheckList } from "../../components/shared";

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, isError } = useServiceQuery(id || "");

  if (isLoading) {
    return <LoadingSpinner height="min-h-[60vh]" />;
  }

  if (isError || !service) {
    return <ErrorState title="Service not found" backTo="/services" backLabel="Back to Services" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hero-section relative py-24 sm:py-32 bg-primary/5 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {service.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold">Service Details</h2>
            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
              {service.detailedContent || service.description}
            </div>
          </div>

          <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-lg border border-border/50 h-fit">
            <h3 className="text-2xl font-bold mb-6">Key Features</h3>
            <CheckList items={service.features} />
            <button className="w-full mt-8 bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-xl font-semibold transition-colors">
              Request Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
