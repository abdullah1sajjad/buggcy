import { z } from 'zod';

/**
 * IMPORTANT: every field here is intentionally short (a sentence, a short list,
 * or a table row). We never ask the LLM for headers, HTML, or full paragraphs
 * of boilerplate copy — that content already lives in the static template.
 * This is what keeps completion tokens low and output deterministic.
 */

export const ProposalContentSchema = z.object({
  // --- narrative fields (kept to 1-3 sentences each) ---
  introductionText: z.string().describe('1-2 sentences framing why this proposal exists for this client. MUST be uniquely generated from the client\'s business instead of static boilerplate.'),
  aboutUsText: z
    .string()
    .describe(
      'A dynamic Executive Summary. 2-3 sentences max. Start with "Based on your requirements..." or similar, and explicitly mention their industry, scale, or specific problem. Do NOT use static/generic text.',
    ),
  proposedSolutionText: z.string().describe('1-3 sentences describing the proposed solution at a high level.'),
  architectureApproach: z
    .string()
    .describe(
      'One or two sentences naming the exact architectural approach chosen (e.g., modular monolith, microservices, serverless) and deeply explaining WHY it fits the client\'s specific scale and stated budget tier. MUST heavily consider budget constraints.',
    ),
  techStackReasoning: z.string().describe('1-2 sentences explaining WHY the chosen tech stack is the best fit for this specific project and industry. Be persuasive.'),
  scalabilityApproach: z.string().describe('1-2 sentences detailing how the system will scale (e.g., caching, read replicas, horizontal scaling). Must match the stated scale requirements.'),
  nextStepsText: z.string().describe('1-2 sentences on how the client proceeds (review, sign, deposit, kickoff). No contact info here.'),
  deliveryAdvantages: z.array(z.string()).describe('Bullet-point reasons why this team structure is advantageous.'),
  deliveryApproach: z.string().describe('Philosophy of the delivery approach, e.g. assembling the team according to technical requirements...'),

  // --- short lists ---
  clientChallenges: z.array(z.string()).describe('Bullet-point challenges/pain points, each under 20 words'),
  clientBenefits: z.array(z.string()).describe('List of business outcomes (e.g., "Increase online orders", "Reduce manual bookings").'),
  recommendedStack: z.array(z.object({
    technology: z.string(),
    reason: z.string().describe('Explanation of why this tool fits the specific industry and project')
  })),
  assumptions: z.array(z.string()).describe('Important assumptions made because requirements were vague (e.g. "Customers can browse menus", "One location").'),
  risks: z.array(z.string()).describe('Important risks for this project (e.g., "Third-party API changes").'),
  clarificationsNeeded: z.array(z.string()).describe('List of questions to ask the client during the discovery phase (e.g. "Delivery or pickup?").'),
  projectDeliverables: z.array(z.string()).describe('List of exact deliverables (e.g., "Responsive Web Dashboard", "Driver Mobile App", "REST API", "Source Code").'),
  thirdPartyIntegrations: z.array(z.string()).describe('Explicit list of third-party tools/services to integrate (e.g., "Stripe", "Google Maps", "Twilio", "QuickBooks").'),
  futureEnhancements: z.array(z.string()).describe('Features to add in the future (e.g. "Mobile application", "Loyalty rewards").'),
  nonFunctionalRequirements: z.array(z.string()).describe('e.g., Performance, Security, Scalability, SEO, High Availability.'),

  goalsImmediate: z.string(),
  goalsShortTerm: z.string(),
  goalsLongTerm: z.string(),

  // --- structured repeatable blocks ---
  keyFeatures: z.array(z.object({
    name: z.string(),
    description: z.string().describe('Under 15 words'),
  })),

  scopePhases: z.array(z.object({
    phase: z.string(),
    description: z.string().describe('Under 15 words'),
    duration: z.string().describe('e.g. "Weeks 1-2"'),
  })),

  milestones: z.array(z.object({
    name: z.string(),
    date: z.string().describe('Relative or estimated date, e.g. "Week 3"'),
  })),

  budgetLineItems: z.array(z.object({
    item: z.string().describe('Specific discipline, e.g. "UI/UX", "Development", "QA", "Buffer"'),
    percentage: z.string().describe('e.g. "20%"'),
    cost: z.string().describe('Formatted currency string, e.g. "$5,000"'),
  })),

  estimatedTeam: z.array(z.object({
    quantity: z.number().describe('Number of people needed for this role, e.g. 3'),
    role: z.string().describe('e.g. "Solution Architect", "Backend Engineer"'),
    responsibility: z.string().describe('A detailed list of responsibilities (e.g., "• System architecture • Technology decisions")'),
  })),

  // --- numeric / meta fields used for downstream calc & template ---
  estimatedTimeline: z.string().describe('e.g. "8-10 weeks"'),
  estimatedCostMin: z.number(),
  estimatedCostMax: z.number(),
});

export type ProposalContent = z.infer<typeof ProposalContentSchema>;

/**
 * Fields that are NOT generated by the LLM at all — they come straight from
 * your CRM/DB/user input and are merged in at render time. Keeping these out
 * of the LLM call saves tokens and avoids the model inventing client details.
 */
export const ProposalMetaSchema = z.object({
  companyName: z.string(),
  clientCompanyName: z.string(),
  clientContactName: z.string(),
  senderContactName: z.string(),
  senderContactEmail: z.string(),
  senderContactPhone: z.string(),
  proposalDate: z.string(),
  targetCompletionDate: z.string(),
  estimatedCostRange: z.string().optional(), // derived: `$${min} - $${max}`
});

export type ProposalMeta = z.infer<typeof ProposalMetaSchema>;
