import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Download, Trash2 } from 'lucide-react';
import { httpClient } from '../../services/httpClient';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

export default function LeadsDashboardPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [deleteLeadId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await httpClient.get('/leads');
      setLeads(res.data || []);
    } catch (error) {
      console.error('Error fetching leads', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedLeadId(expandedLeadId === id ? null : id);
  };

  const initiateDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteId(id);
  };

  const confirmDeleteLead = async () => {
    if (!deleteLeadId) return;
    try {
      await httpClient.delete(`/leads/${deleteLeadId}`);
      setLeads(leads.filter(l => l.id !== deleteLeadId));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting lead', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Project Leads & Proposals</h1>
        <button
          onClick={fetchLeads}
          className="p-2 rounded-full text-muted-foreground hover:bg-surface transition"
          title="Refresh"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0185B1]"></div>
        </div>
      ) : (
        <div className="bg-card border border-border overflow-hidden rounded-xl shadow-sm">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-surface ">
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Budget</th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="p-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pdf</th>

                <th className="p-3 relative">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {leads.map((lead) => {
                const isExpanded = expandedLeadId === lead.id;
                const proposal = lead.proposals && lead.proposals.length > 0 ? lead.proposals[0] : null;

                return (
                  <React.Fragment key={lead.id}>
                    <tr
                      className={`cursor-pointer transition duration-150 ${isExpanded ? 'bg-primary/5' : 'hover:bg-surface'}`}
                      onClick={() => toggleExpand(lead.id)}
                    >
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-sm font-semibold text-foreground">{lead.company_name || lead.full_name}</div>
                        {lead.company_name && (
                          <div className="text-xs text-muted-foreground mt-0.5">{lead.full_name}</div>
                        )}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-foreground">{lead.budget || 'N/A'}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${lead.status === 'sent' ? 'bg-green-100 text-green-700' :
                          lead.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-surface text-muted-foreground'
                          }`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-3 whitespace-nowrap text-center text-sm font-medium">
                        {proposal?.file_url ? (
                          <a
                            href={`http://localhost:3000/api/v1/leads/${lead.id}/proposal-document`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0185B1] hover:text-[#016a8e] bg-blue-50 hover:bg-blue-100 inline-flex items-center p-2 rounded-full transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            title="Download PDF"
                          >
                            <Download className="w-5 h-5" />
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">No PDF</span>
                        )}
                      </td>
                      <td className="p-3 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => initiateDelete(lead.id, e)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-500/10 inline-flex items-center p-2 rounded-full transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Detail Row */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={7} className="bg-surface px-6 py-6 border-b border-border">
                          {proposal ? (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                            >
                              <div className="lg:col-span-2 space-y-6">
                                <div className="bg-card p-5 rounded border border-border">
                                  <h4 className="font-semibold text-foreground mb-2 border-b pb-2 border-border">Full Project Requirements</h4>
                                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{lead.project_description}</p>
                                </div>

                                <div className="bg-card p-5 rounded border border-border">
                                  <h4 className="font-semibold text-foreground mb-2 border-b pb-2 border-border">AI Recommended Tech Stack</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {proposal.recommended_stack?.map((tech: any, i: number) => (
                                        <span key={i} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium border border-primary/20">
                                            {typeof tech === 'string' ? tech : tech.technology}
                                        </span>
                                    ))}
                                    {!proposal.recommended_stack?.length && <span className="text-sm text-muted-foreground">None generated</span>}
                                  </div>
                                </div>

                                <div className="bg-card p-5 rounded border border-border">
                                  <h4 className="font-semibold text-foreground mb-2 border-b pb-2 border-border">Key Features</h4>
                                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                    {proposal.ai_output_json?.keyFeatures?.map((feature: any, i: number) => (
                                      <li key={i}><strong>{feature.name}:</strong> {feature.description}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-6">
                                <div className="bg-card p-5 rounded border border-border">
                                  <h4 className="font-semibold text-foreground mb-2 border-b pb-2 border-border">Estimated Cost & Timeline</h4>
                                  <div className="space-y-3">
                                    <div>
                                      <div className="text-xs text-muted-foreground">Cost Range</div>
                                      <div className="text-xl font-bold text-foreground">${proposal.estimated_cost_min?.toLocaleString()} - ${proposal.estimated_cost_max?.toLocaleString()}</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-muted-foreground">Timeline</div>
                                      <div className="text-md font-medium text-foreground">{proposal.estimated_timeline || 'N/A'}</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-muted-foreground">Architecture</div>
                                      <div className="text-sm text-muted-foreground">{proposal.ai_output_json?.architectureApproach || 'Standard'}</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-card p-5 rounded border border-border">
                                  <h4 className="font-semibold text-foreground mb-2 border-b pb-2 border-border">Recommended Team</h4>
                                  <ul className="list-none pl-0 text-sm text-muted-foreground space-y-3">
                                    {proposal.ai_output_json?.estimatedTeam?.map((member: any, i: number) => (
                                      <li key={i} className="flex flex-col">
                                        <span className="font-semibold">{member.quantity} × {member.role}</span>
                                        <span className="text-xs text-muted-foreground">{member.responsibility}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="text-center py-4 text-muted-foreground">
                              No AI proposal was generated for this lead yet.
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-muted-foreground">
                    No leads found. Wait for someone to submit the form!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmDialog
        open={!!deleteLeadId}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        onConfirm={confirmDeleteLead}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
