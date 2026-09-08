import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as htmlPdfNode from 'html-pdf-node';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { CompanyData } from '../company-data/entities/company-data.entity';
import {
  ProposalContentSchema,
  ProposalContent,
  ProposalMeta,
} from './proposal-schema';
import {
  classifyBudget,
  classifyTimeline,
  BUDGET_TIER_PROFILES,
  TIMELINE_TIER_PROFILES,
  applyBudgetTimelineGuardrails,
} from './budget-timeline-rules';

// Register once at module load — cheap, and Handlebars caches the compiled fn.
Handlebars.registerHelper('each', function (this: any, context: any, options: any) {
  let ret = '';
  for (let i = 0; i < (context || []).length; i++) {
    ret += options.fn(context[i]);
  }
  return ret;
});



@Injectable()
export class ProposalService {
  private templateSource: string;
  private compiledTemplate: HandlebarsTemplateDelegate;
  private readonly logger = new Logger(ProposalService.name);
  private llm: ChatGoogleGenerativeAI;

  constructor(
    @InjectRepository(CompanyData)
    private companyDataRepo: Repository<CompanyData>,
    private configService: ConfigService,
  ) {
    // Read the template file
    const templatePath = path.join(process.cwd(), 'templates', 'software-proposal.html');
    this.templateSource = fs.readFileSync(templatePath, 'utf-8');
    this.compiledTemplate = Handlebars.compile(this.templateSource);

    // Initialize LLM
    const apiKey = this.configService.get<string>('GEMINI_API_KEY') || '';
    this.llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.5-flash',
      apiKey,
      maxOutputTokens: 8192,
    });
  }

  /**
   * Step 1: Generate ONLY the variable content via structured output.
   * This is the token-expensive step, so the prompt is deliberately tight:
   * short context, short instructions, short schema fields.
   */
  async generateProposalContent(
    projectDescription: string,
    budget?: string,
    timeline?: string,
  ): Promise<ProposalContent> {
    try {
      // 1. Generate embedding for the project description
      const embeddingsModel = new GoogleGenerativeAIEmbeddings({
        model: 'gemini-embedding-2',
        apiKey: this.configService.get<string>('GEMINI_API_KEY') || '',
      });
      const queryEmbedding = await embeddingsModel.embedQuery(projectDescription);

      // 2. Vector similarity search against pgvector (top 5 most relevant)
      const companyDataList = await this.companyDataRepo.query(
        `SELECT name, category, description 
         FROM company_data 
         WHERE embedding IS NOT NULL
         ORDER BY embedding <-> $1 
         LIMIT 5`,
        [JSON.stringify(queryEmbedding)]
      );

      // Trim context to what's relevant instead of dumping the whole table.
      const contextText = companyDataList
        .map((item: any) => `[${item.category.toUpperCase()}] ${item.name}: ${item.description}`)
        .join('\n');

      // Deterministic classification — computed in code, not left to the model
      // to infer from a loosely-worded budget/timeline string.
      const budgetTier = classifyBudget(budget);
      const timelineTier = classifyTimeline(timeline);

      const prompt = `You are Buggcy's elite Solutions Architect. Using ONLY the context below, generate the requested fields for a software proposal. Be concise — short phrases, not paragraphs. Do not include HTML, markdown, or section headers.

CONTEXT:
${contextText}

CLIENT REQUEST:
Description: ${projectDescription}
Budget Constraint: ${budget ?? 'Not specified'}
Timeline Constraint: ${timeline ?? 'Not specified'}

CRITICAL RULES:
1. BUDGET MATTERS: If the budget is < $25k, recommend MVP / Monolith. If $50k+, recommend Redis, Docker, Modular Monolith. If $100k+, recommend Microservices, Kubernetes, AWS. YOU MUST STRICTLY ADHERE TO THIS.
2. TIMELINE MATTERS: Derive the exact duration of your 'scopePhases' and 'milestones' so they perfectly add up to the requested Timeline Constraint. DO NOT output a 6-week timeline if the user selected 6 months!
3. TAILOR THE STACK: Recommend a highly tailored stack for the industry (e.g. logistics needs real-time GPS, websockets, routing, etc.). Do not just output generic stack names.
4. INCORPORATE FEATURES: Summarize ALL the core requirements and features requested in the description. Do not ignore them.
5. DYNAMIC EXECUTIVE SUMMARY: For 'aboutUsText', write a highly personalized 2-3 sentence executive summary. explicitly mention their industry, scale, or specific problem. DO NOT write a generic tagline.
6. ARCHITECTURE REASONING: Explain deeply WHY the architecture fits the budget and scale.
7. COMPREHENSIVE COST BREAKDOWN: Break down 'budgetLineItems' into detailed phases (e.g. Discovery, UI/UX, Frontend, Backend, DevOps, QA, Project Management).

Return a valid JSON object that matches the requested schema. Do not wrap the response in markdown fences.`;

      const structuredLlm = this.llm.withStructuredOutput(ProposalContentSchema, {
        name: 'ProposalContent',
      });
      const result = await structuredLlm.invoke(prompt);

      // Deterministic backstop: strip off-tier stack items and cap phase/
      // milestone counts even if the model ignored the prompt rules above.
      return applyBudgetTimelineGuardrails(result, budgetTier, timelineTier, projectDescription);
    } catch (error) {
      this.logger.error('Error generating proposal content', error);
      throw error;
    }
  }

  /**
   * Step 2: Merge LLM content + static/CRM meta into the HTML template.
   * Zero LLM tokens spent here — pure string templating.
   */
  private hasMeaningfulContent(...values: unknown[]): boolean {
    return values.some((value) => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }

      if (Array.isArray(value)) {
        return value.some((item) => {
          if (typeof item === 'string') {
            return item.trim().length > 0;
          }

          if (item && typeof item === 'object') {
            return Object.values(item as Record<string, unknown>).some((nested) => {
              if (typeof nested === 'string') return nested.trim().length > 0;
              if (Array.isArray(nested)) return nested.some((entry) => typeof entry === 'string' ? entry.trim().length > 0 : false);
              return !!nested;
            });
          }

          return !!item;
        });
      }

      if (value && typeof value === 'object') {
        return Object.values(value as Record<string, unknown>).some((nested) => {
          if (typeof nested === 'string') return nested.trim().length > 0;
          if (Array.isArray(nested)) return nested.length > 0;
          return !!nested;
        });
      }

      return !!value;
    });
  }

  renderHtml(content: ProposalContent, meta: ProposalMeta): string {
    const estimatedCostRange =
      meta.estimatedCostRange ??
      `$${content.estimatedCostMin.toLocaleString()} - $${content.estimatedCostMax.toLocaleString()}`;

    const pageVisibility = {
      introPage: this.hasMeaningfulContent(
        content.introductionText,
        content.aboutUsText,
        content.clientChallenges,
        content.clarificationsNeeded,
        content.goalsImmediate,
        content.goalsShortTerm,
        content.goalsLongTerm,
        content.clientBenefits,
      ),
      overviewPage: this.hasMeaningfulContent(
        content.proposedSolutionText,
        content.keyFeatures,
        content.architectureApproach,
        content.scalabilityApproach,
        content.techStackReasoning,
        content.recommendedStack,
        content.thirdPartyIntegrations,
        content.nonFunctionalRequirements,
        content.scopePhases,
        content.futureEnhancements,
      ),
      timelinePage: this.hasMeaningfulContent(
        content.estimatedTimeline,
        meta.targetCompletionDate,
        content.milestones,
        content.projectDeliverables,
        content.budgetLineItems,
        estimatedCostRange,
      ),
      teamPage: this.hasMeaningfulContent(
        content.estimatedTeam,
        content.deliveryAdvantages,
        content.deliveryApproach,
      ),
      risksPage: this.hasMeaningfulContent(content.assumptions, content.risks),
      nextStepsPage: this.hasMeaningfulContent(
        content.nextStepsText,
        meta.senderContactName,
        meta.senderContactEmail,
        meta.senderContactPhone,
        meta.clientContactName,
        meta.clientCompanyName,
      ),
    };

    return this.compiledTemplate({
      ...meta,
      ...content,
      estimatedCostRange,
      pageVisibility,
    });
  }

  /**
   * Step 3: Convert the merged HTML to a paginated PDF.
   * Using html-pdf-node instead of puppeteer.
   */
  async renderPdf(html: string, outputPath: string): Promise<string> {
    const options = { format: 'A4', printBackground: true, path: outputPath };
    const file = { content: html };

    try {
      await htmlPdfNode.generatePdf(file, options);
      return outputPath;
    } catch (error) {
      this.logger.error('Error generating PDF with html-pdf-node', error);
      throw error;
    }
  }

  /**
   * Convenience wrapper: description -> content -> html -> pdf, in one call.
   */
  async generateFullProposal(
    projectDescription: string,
    meta: ProposalMeta,
    budget?: string,
    timeline?: string,
    outputPath: string = path.join(process.cwd(), `proposal-${Date.now()}.pdf`),
  ): Promise<{ content: ProposalContent; html: string; pdfPath: string }> {
    const content = await this.generateProposalContent(projectDescription, budget, timeline);
    const html = this.renderHtml(content, meta);
    const pdfPath = await this.renderPdf(html, outputPath);
    return { content, html, pdfPath };
  }
}
