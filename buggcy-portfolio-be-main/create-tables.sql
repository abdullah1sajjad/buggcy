-- Enable pgvector extension (Required for company_data)
CREATE EXTENSION IF NOT EXISTS vector;

-- Create Leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR NOT NULL,
    company_name VARCHAR NOT NULL,
    business_email VARCHAR NOT NULL,
    contact_number VARCHAR,
    project_description TEXT NOT NULL,
    budget VARCHAR,
    timeline VARCHAR,
    status VARCHAR DEFAULT 'new',
    assigned_to UUID,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Create Proposal Templates table
CREATE TABLE IF NOT EXISTS proposal_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    project_type VARCHAR NOT NULL,
    file_url VARCHAR,
    placeholder_map JSONB,
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_by UUID,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Create Proposals table
CREATE TABLE IF NOT EXISTS proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    template_id UUID REFERENCES proposal_templates(id) ON DELETE SET NULL,
    ai_output_json JSONB NOT NULL,
    recommended_services JSONB,
    recommended_stack JSONB,
    recommended_roles JSONB,
    estimated_timeline VARCHAR,
    estimated_cost_min DECIMAL(10, 2),
    estimated_cost_max DECIMAL(10, 2),
    file_url VARCHAR,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Create Company Data table
CREATE TABLE IF NOT EXISTS company_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    category VARCHAR DEFAULT 'general',
    description TEXT NOT NULL,
    metadata JSONB,
    embedding vector(768),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
