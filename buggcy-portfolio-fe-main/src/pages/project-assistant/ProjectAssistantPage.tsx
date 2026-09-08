import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { leadFormSchema, type LeadFormValues } from '../../schemas/lead.schema';
import { httpClient } from '../../services/httpClient';
import { EstimationProcess } from './components/EstimationProcess';
import { EstimationForm } from './components/EstimationForm';
import { useToastStore, ToastTypeEnum } from '../../store/toastStore';

export default function ProjectAssistantPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [proposalData, setProposalData] = useState<any>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
  });

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await httpClient.post('/project-assistant/estimate', data, { _noToast: true } as any);
      if (res.data && res.data.proposal) {
        setProposalData(res.data.proposal);
      }
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      useToastStore.getState().addToast(ToastTypeEnum.ERROR, 'There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="w-full min-h-screen bg-background flex flex-col pt-32 pb-16">
        <div className="section-container flex-grow flex items-center justify-center">
          <div className="bg-transparent border border-[#E2E8F0] p-10 rounded-xl max-w-2xl w-full text-center">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Proposal Generated</h2>
            <p className="text-muted-foreground mb-8">
              Your customized project proposal has been created and sent to your email.
            </p>

            {proposalData && (
              <div className="bg-transparent p-6 rounded-lg text-left mb-8 border border-[#E2E8F0]">
                <h3 className="text-lg font-semibold text-primary mb-4 border-b border-[#E2E8F0] pb-2" style={{ fontFamily: "var(--font-display)" }}>Instant Estimate</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Estimated Budget</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      ${proposalData.estimated_cost_min?.toLocaleString()} - ${proposalData.estimated_cost_max?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Estimated Timeline</p>
                    <p className="text-lg font-semibold text-foreground mt-1">{proposalData.estimated_timeline || 'TBD'}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-muted-foreground font-medium mb-2">Recommended Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {proposalData.recommended_stack?.map((tech: any, i: number) => (
                      <span key={i} className="px-3 py-1 bg-surface border border-[#E2E8F0] text-foreground rounded-md text-xs font-medium">
                        {typeof tech === 'string' ? tech : tech.technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => { setIsSuccess(false); setProposalData(null); }}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition"
            >
              Start Another Request
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-background min-h-screen">
      <div className="pt-32">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Project Assistant</span>
              <div className="h-px w-8 bg-border" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-6">
              AI-Powered <span className="text-primary" style={{ fontFamily: "var(--font-display)" }}>Estimation</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Tell us your vision, and our AI will generate a tailored roadmap, technical architecture, and cost estimate in seconds.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-container ">
        <div className="bg-transparent mb-16 border border-border rounded-[2rem] overflow-hidden flex flex-col lg:flex-row">

          {/* Left Side: Animated Estimation Process */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/4 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-border "
          >
            <EstimationProcess />
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full lg:w-3/4"
          >
            <EstimationForm
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit(onSubmit)}
            />
          </motion.div>

        </div>
      </div>
    </main>
  );
}
