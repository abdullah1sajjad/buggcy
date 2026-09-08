import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { z } from 'zod';
import { CompanyData } from '../company-data/entities/company-data.entity';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private llm: ChatGoogleGenerativeAI;

  constructor(
    @InjectRepository(CompanyData)  
    private companyDataRepo: Repository<CompanyData>,
    private configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY') || '';
    this.llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.5-flash',
      apiKey,
      maxOutputTokens: 2048,
    });
  }

  async generateProposalData(projectDescription: string, budget?: string, timeline?: string): Promise<any> {
    try {
      // Fetch all company data for MVP. For production, use vector search.
      const companyDataList = await this.companyDataRepo.find();
      
      const contextText = companyDataList.map(item => {
        return `[${item.category.toUpperCase()}] ${item.name}: ${item.description}`;
      }).join('\n');

      const prompt = `
You are an expert AI Project Assistant for Buggcy, a software development agency.
Your task is to analyze the following client project request and generate a structured project proposal recommendation using the provided company data context.

=== COMPANY DATA CONTEXT ===
${contextText}

=== CLIENT REQUEST ===
Project Description: ${projectDescription}
Budget: ${budget || 'Not specified'}
Timeline: ${timeline || 'Not specified'}

=== INSTRUCTIONS ===
Based ONLY on the context provided, recommend the most suitable services, tech stack, and roles for this project.
Provide an estimated timeline and cost range.
`;

      const outputSchema = z.object({
        recommended_services: z.array(z.string()).describe("List of recommended services based on context"),
        recommended_stack: z.array(z.string()).describe("List of recommended technologies based on context"),
        recommended_roles: z.array(z.string()).describe("List of recommended roles based on context"),
        estimated_timeline: z.string().describe("Estimated timeline for the project (e.g. 8-10 weeks)"),
        estimated_cost_min: z.number().describe("Minimum estimated cost"),
        estimated_cost_max: z.number().describe("Maximum estimated cost"),
        rationale_summary: z.string().describe("A short paragraph explaining why this stack and services were chosen"),
      });

      const structuredLlm = this.llm.withStructuredOutput(outputSchema);

      const result = await structuredLlm.invoke([
        { role: 'user', content: prompt }
      ]);
      
      return result;
    } catch (error) {
      this.logger.error('Error generating AI proposal data with LangChain', error);
      throw error;
    }
  }
}
