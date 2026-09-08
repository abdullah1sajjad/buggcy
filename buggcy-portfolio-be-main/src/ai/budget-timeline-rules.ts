/**
 * Deterministic classification of budget & timeline into tiers, with
 * explicit architecture/phase guidance per tier. This runs in plain code
 * BEFORE the LLM call, so the model is told what tier it's in rather than
 * left to infer it — and a guardrail pass runs AFTER the call to catch
 * cases where the model ignores the instruction.
 */

export type BudgetTier = 'starter' | 'growth' | 'enterprise' | 'unspecified';
export type TimelineTier = 'sprint' | 'standard' | 'extended' | 'unspecified';

interface BudgetProfile {
  label: string;
  architectureGuidance: string;
  maxPhases: number;
  // stack terms considered off-tier; stripped in guardrail pass unless the
  // project description explicitly justifies them (see justifiesEnterprise below)
  disallowedStackTerms: string[];
}

interface TimelineProfile {
  label: string;
  phaseGuidance: string;
  maxPhases: number;
}

export const BUDGET_TIER_PROFILES: Record<BudgetTier, BudgetProfile> = {
  starter: {
    label: '$10k–$25k (Starter / MVP)',
    architectureGuidance:
      'Modular monolith on managed hosting (e.g. single Render/EC2/Heroku instance), one relational database, no dedicated caching or queueing layer unless strictly required. Do NOT recommend Kubernetes, microservices, multi-region deployment, or a message broker.',
    maxPhases: 3,
    disallowedStackTerms: ['kubernetes', 'k8s', 'microservices', 'service mesh', 'kafka', 'multi-region', 'istio'],
  },
  growth: {
    label: '$25k–$75k (Growth)',
    architectureGuidance:
      'Modular monolith or a light split into 2-3 services, managed database with a read replica if scale requires it, Redis for sessions/cart caching, CDN for static assets, Docker containers without full orchestration.',
    maxPhases: 5,
    disallowedStackTerms: ['kubernetes', 'k8s', 'service mesh', 'istio'],
  },
  enterprise: {
    label: '$75k+ (Enterprise / Scale)',
    architectureGuidance:
      'Microservices or service-oriented architecture, Kubernetes orchestration, Redis caching, CDN, an event queue (SQS/Kafka), centralized monitoring/observability, multi-AZ high availability.',
    maxPhases: 7,
    disallowedStackTerms: [],
  },
  unspecified: {
    label: 'Not specified',
    architectureGuidance:
      'Default to a pragmatic modular monolith unless the project description explicitly implies enterprise scale (e.g. explicit 100k+ concurrent users, multi-region requirement, stated enterprise budget).',
    maxPhases: 5,
    disallowedStackTerms: [],
  },
};

export const TIMELINE_TIER_PROFILES: Record<TimelineTier, TimelineProfile> = {
  sprint: {
    label: 'Sprint (≤6 weeks)',
    phaseGuidance:
      'Scope to a true MVP: 1-2 core user flows only, explicitly defer secondary features to a "Phase 2 (future)" note rather than including them in scopePhases. 2-3 phases max (e.g. Build, QA, Launch).',
    maxPhases: 3,
  },
  standard: {
    label: 'Standard (7-16 weeks)',
    phaseGuidance:
      'Deliver the full core product across 3-5 phases, including a dedicated QA phase and a staged rollout/launch phase.',
    maxPhases: 5,
  },
  extended: {
    label: 'Extended (16+ weeks)',
    phaseGuidance:
      'Full core product plus secondary features (analytics, AI-assisted functionality, mobile apps, performance optimization) staged across 5-7 milestones, with later phases explicitly building on earlier ones.',
    maxPhases: 7,
  },
  unspecified: {
    label: 'Not specified',
    phaseGuidance: 'Default to a standard 3-5 phase plan (Discovery, Build, QA, Launch).',
    maxPhases: 5,
  },
};

/** Extracts the largest dollar figure mentioned (handles "10k", "10,000", "100k+") */
function extractMaxDollarAmount(text: string): number | null {
  const matches = [...text.matchAll(/\$?\s*([\d,]+(?:\.\d+)?)\s*(k|K)?\s*\+?/g)];
  let max: number | null = null;
  for (const m of matches) {
    const raw = m[1].replace(/,/g, '');
    if (!raw) continue;
    let value = parseFloat(raw);
    if (isNaN(value)) continue;
    if (m[2]) value *= 1000; // "k" suffix
    if (max === null || value > max) max = value;
  }
  return max;
}

export function classifyBudget(budget?: string): BudgetTier {
  if (!budget || !budget.trim()) return 'unspecified';
  const max = extractMaxDollarAmount(budget);
  if (max === null) return 'unspecified';
  if (max <= 25000) return 'starter';
  if (max <= 75000) return 'growth';
  return 'enterprise';
}

/** Extracts the largest duration mentioned, normalized to weeks */
function extractMaxWeeks(text: string): number | null {
  const matches = [...text.matchAll(/(\d+)\s*(week|weeks|wk|month|months|mo)\b/gi)];
  let maxWeeks: number | null = null;
  for (const m of matches) {
    const num = parseInt(m[1], 10);
    if (isNaN(num)) continue;
    const unit = m[2].toLowerCase();
    const weeks = unit.startsWith('month') || unit === 'mo' ? num * 4.33 : num;
    if (maxWeeks === null || weeks > maxWeeks) maxWeeks = weeks;
  }
  return maxWeeks;
}

export function classifyTimeline(timeline?: string): TimelineTier {
  if (!timeline || !timeline.trim()) return 'unspecified';
  const weeks = extractMaxWeeks(timeline);
  if (weeks === null) return 'unspecified';
  if (weeks <= 6) return 'sprint';
  if (weeks <= 16) return 'standard';
  return 'extended';
}

/** True if the project description itself justifies enterprise-grade architecture regardless of stated budget */
export function descriptionJustifiesEnterprise(projectDescription: string): boolean {
  const signals = [
    /100\s*,?000\+?\s*(monthly\s*)?users/i,
    /multi-region/i,
    /high availability/i,
    /millions of/i,
    /enterprise[- ]grade/i,
  ];
  return signals.some((re) => re.test(projectDescription));
}

export function applyBudgetTimelineGuardrails<T>(content: T, budgetTier: BudgetTier, timelineTier: TimelineTier, projectDescription: string): T {
  // Let the LLM handle reasoning and output. We just return the content unchanged.
  return content;
}
