import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { type LeadFormValues } from '../../../schemas/lead.schema';

const inputClass =
  "block w-full px-4 py-3 rounded-xl border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-primary/50 transition-all duration-200 bg-transparent";

const selectClass =
  "block w-full px-4 py-3 rounded-xl border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:border-primary/50 transition-all duration-200 bg-transparent appearance-none";

interface EstimationFormProps {
  register: UseFormRegister<LeadFormValues>;
  errors: FieldErrors<LeadFormValues>;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function EstimationForm({ register, errors, isSubmitting, onSubmit }: EstimationFormProps) {
  return (
    <form onSubmit={onSubmit} className="p-8 sm:p-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
            <input
              type="text"
              {...register('full_name')}
              placeholder="John Doe"
              className={inputClass}
            />
            {errors.full_name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.full_name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Company Name *</label>
            <input
              type="text"
              {...register('company_name')}
              placeholder="Acme Corp"
              className={inputClass}
            />
            {errors.company_name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.company_name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Business Email *</label>
            <input
              type="email"
              {...register('business_email')}
              placeholder="john@acme.com"
              className={inputClass}
            />
            {errors.business_email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.business_email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Contact Number</label>
            <input
              type="text"
              {...register('contact_number')}
              placeholder="+1 (555) 000-0000"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5 flex justify-between">
            Project Description *
            <span className="text-muted-foreground font-normal text-xs">Be as detailed as possible</span>
          </label>
          <textarea
            rows={5}
            {...register('project_description')}
            placeholder="We are looking to build a multi-tenant SaaS platform for healthcare professionals..."
            className={`${inputClass} resize-none`}
          ></textarea>
          {errors.project_description && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.project_description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-semibold text-foreground mb-1.5">Estimated Budget</label>
            <select
              {...register('budget')}
              className={selectClass}
            >
              <option value="">Select a range</option>
              <option value="< $10k">Less than $10,000</option>
              <option value="$10k - $25k">$10,000 - $25,000</option>
              <option value="$25k - $50k">$25,000 - $50,000</option>
              <option value="$50k+">$50,000+</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pt-7 pointer-events-none text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-foreground mb-1.5">Desired Timeline</label>
            <select
              {...register('timeline')}
              className={selectClass}
            >
              <option value="">Select a timeline</option>
              <option value="< 1 month">Less than 1 month</option>
              <option value="1 - 3 months">1 to 3 months</option>
              <option value="3 - 6 months">3 to 6 months</option>
              <option value="6+ months">More than 6 months</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pt-7 pointer-events-none text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 group"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Requirements...
              </>
            ) : (
              'Generate AI Proposal'
            )}
          </button>
          <p className="text-center text-xs text-muted-foreground mt-4">
            By submitting this form, you agree to receive an AI-generated proposal email.
          </p>
        </div>
      </form>
  );
}
