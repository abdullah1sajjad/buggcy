import { Injectable, Logger } from '@nestjs/common';
import * as htmlPdf from 'html-pdf-node';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentService {
  private readonly logger = new Logger(DocumentService.name);

  async generateProposalPdf(leadInfo: any, aiOutput: any): Promise<Buffer> {
    try {
      // Basic MVP HTML Template
      const templateHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; padding: 40px; }
          h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
          h2 { color: #2980b9; margin-top: 30px; }
          .section { margin-bottom: 20px; }
          .highlight { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; }
          ul { padding-left: 20px; }
        </style>
      </head>
      <body>
        <h1>Project Proposal for ${leadInfo.company_name || leadInfo.full_name}</h1>
        <p>Prepared by Buggcy AI Project Assistant</p>
        
        <div class="section highlight">
          <h2>Executive Summary</h2>
          <p>${aiOutput.rationale_summary}</p>
        </div>

        <div class="section">
          <h2>Recommended Services</h2>
          <ul>
            ${aiOutput.recommended_services.map((s: string) => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <div class="section">
          <h2>Tech Stack</h2>
          <ul>
            ${aiOutput.recommended_stack.map((s: string) => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <div class="section">
          <h2>Required Roles</h2>
          <ul>
            ${aiOutput.recommended_roles.map((s: string) => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <div class="section highlight">
          <h2>Project Estimates</h2>
          <p><strong>Timeline:</strong> ${aiOutput.estimated_timeline}</p>
          <p><strong>Estimated Cost:</strong> $${aiOutput.estimated_cost_min} - $${aiOutput.estimated_cost_max}</p>
        </div>
        
        <div style="margin-top: 50px; font-size: 0.9em; color: #7f8c8d; text-align: center;">
          <p>This is an automatically generated proposal estimate. A Business Development representative will follow up with you shortly.</p>
        </div>
      </body>
      </html>
      `;

      const options = { format: 'A4' };
      const file = { content: templateHtml };

      return new Promise<Buffer>((resolve, reject) => {
        htmlPdf.generatePdf(file, options)
          .then((pdfBuffer: Buffer) => {
            resolve(pdfBuffer);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    } catch (error) {
      this.logger.error('Error generating PDF', error);
      throw error;
    }
  }
}
