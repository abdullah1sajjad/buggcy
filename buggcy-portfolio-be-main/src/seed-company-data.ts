import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { CompanyData, CompanyDataCategory } from './company-data/entities/company-data.entity';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

config();

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
  entities: [CompanyData],
  synchronize: true,
});

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: 'gemini-embedding-2',
  apiKey: process.env.GEMINI_API_KEY as string,
});

// Hardcoded initial MVP data to simulate the static data
const services = [
  {
    name: 'Custom Web App Development',
    category: CompanyDataCategory.SERVICE,
    description: 'We build scalable, high-performance web applications tailored to your business needs, leveraging modern frameworks like React, Next.js, Node.js, and NestJS.',
    metadata: { tags: ['web', 'frontend', 'backend', 'full-stack'] },
  },
  {
    name: 'Mobile App Development',
    category: CompanyDataCategory.SERVICE,
    description: 'We design and develop native and cross-platform mobile applications for iOS and Android using React Native and Flutter.',
    metadata: { tags: ['mobile', 'ios', 'android'] },
  },
  {
    name: 'AI & Machine Learning Solutions',
    category: CompanyDataCategory.SERVICE,
    description: 'We integrate advanced AI features into your products, including natural language processing, predictive analytics, and computer vision.',
    metadata: { tags: ['ai', 'machine-learning', 'nlp'] },
  },
];

const roles = [
  {
    name: 'Frontend Developer',
    category: CompanyDataCategory.ROLE,
    description: 'Specializes in creating intuitive and responsive user interfaces using React, Vue, or Angular.',
    metadata: { rate_band: '$$' },
  },
  {
    name: 'Backend Developer',
    category: CompanyDataCategory.ROLE,
    description: 'Builds robust APIs and manages databases using Node.js, Python, or Go.',
    metadata: { rate_band: '$$' },
  },
  {
    name: 'AI Engineer',
    category: CompanyDataCategory.ROLE,
    description: 'Develops and integrates machine learning models and large language models.',
    metadata: { rate_band: '$$$' },
  }
];

const techStacks = [
  {
    name: 'MERN Stack',
    category: CompanyDataCategory.TECH_STACK,
    description: 'MongoDB, Express.js, React, Node.js. Ideal for rapid prototyping and full-stack JavaScript applications.',
    metadata: { category: 'Full-Stack' },
  },
  {
    name: 'NestJS & PostgreSQL',
    category: CompanyDataCategory.TECH_STACK,
    description: 'A robust, scalable backend architecture for enterprise applications.',
    metadata: { category: 'Backend' },
  },
];

async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const result = await embeddings.embedQuery(text);
    return result;
  } catch (error) {
    console.error('Error generating embedding:', error);
    return [];
  }
}

async function main() {
  try {
    await dataSource.initialize();
    console.log('Data Source initialized.');
    
    const repo = dataSource.getRepository(CompanyData);
    
    // Clear existing data
    await repo.clear();
    console.log('Cleared existing CompanyData.');

    const allData = [...services, ...roles, ...techStacks];
    
    for (const item of allData) {
      const textToEmbed = `${item.name}. ${item.description}`;
      console.log(`Generating embedding for: ${item.name}`);
      const embedding = await generateEmbedding(textToEmbed);
      
      const companyData = repo.create({
        ...item,
        embedding: embedding.length > 0 ? embedding : null,
      });
      
      await repo.save(companyData);
    }
    
    console.log('Successfully seeded company data with embeddings.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

main();
