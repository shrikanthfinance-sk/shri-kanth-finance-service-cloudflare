import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, LeadTemperature, LoanType, LeadSource } from '../types/lead';
import { 
  Users, 
  Flame, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  Search, 
  Download, 
  RefreshCw, 
  ExternalLink, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Edit3, 
  X, 
  Save, 
  FileSpreadsheet, 
  Copy, 
  Check, 
  Calendar,
  Building,
  ArrowRight
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('skf_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [googleSheetsConnected, setGoogleSheetsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'sheets'>('leads');

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [tempFilter, setTempFilter] = useState<string>('All');
  const [loanTypeFilter, setLoanTypeFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Editing state
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Google Sheets config state
  const [webhookUrlInput, setWebhookUrlInput] = useState('');
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSuccessMsg, setConfigSuccessMsg] = useState('');
  const [isTestingSheet, setIsTestingSheet] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');

  // Fetch leads
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        headers: {
          Authorization: 'Bearer skf@2026',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setStats(data.stats || {});
        setGoogleSheetsConnected(data.googleSheetsConnected || false);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('skf_admin_auth');
      }
    } catch (e) {
      console.error('Failed to fetch leads:', e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch config
  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/admin/config', {
        headers: { Authorization: 'Bearer skf@2026' },
      });
      if (res.ok) {
        const data = await res.json();
        setWebhookUrlInput(data.googleSheetsWebhookUrl || '');
      }
    } catch (e) {
      console.error('Failed to fetch config:', e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
      fetchConfig();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('skf_admin_auth', 'true');
      } else {
        setAuthError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('skf_admin_auth');
  };

  // Handle Save Lead Changes
  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    setIsSavingEdit(true);
    try {
      const res = await fetch(`/api/leads/${editingLead.leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer skf@2026',
        },
        body: JSON.stringify({
          leadStatus: editingLead.leadStatus,
          leadTemperature: editingLead.leadTemperature,
          assignedAgent: editingLead.assignedAgent,
          followUpDate: editingLead.followUpDate,
          remarks: editingLead.remarks,
        }),
      });

      if (res.ok) {
        setEditingLead(null);
        fetchLeads();
      }
    } catch (err) {
      console.error('Failed to update lead:', err);
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Handle Save Google Sheets Webhook URL
  const handleSaveWebhookConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    setConfigSuccessMsg('');

    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer skf@2026',
        },
        body: JSON.stringify({
          googleSheetsWebhookUrl: webhookUrlInput.trim(),
        }),
      });

      if (res.ok) {
        setConfigSuccessMsg('Google Sheets Webhook URL saved successfully!');
        fetchLeads();
        setTimeout(() => setConfigSuccessMsg(''), 4000);
      }
    } catch (err) {
      console.error('Failed to save config:', err);
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Test Webhook Connection
  const handleTestSheetConnection = async () => {
    setIsTestingSheet(true);
    setConfigSuccessMsg('');
    try {
      const res = await fetch('/api/admin/test-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer skf@2026',
        },
        body: JSON.stringify({ webhookUrl: webhookUrlInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setConfigSuccessMsg('Connection test passed! Master Google Sheet is actively listening.');
      } else {
        alert(data.message || 'Connection test failed. Please verify the Webhook URL.');
      }
    } catch (err) {
      alert('Network error testing Google Sheet connection.');
    } finally {
      setIsTestingSheet(false);
    }
  };

  // Sync all pending leads
  const handleSyncAllPending = async () => {
    setIsSyncingAll(true);
    setSyncStatusMsg('');
    try {
      const res = await fetch('/api/leads/sync-all', {
        method: 'POST',
        headers: { Authorization: 'Bearer skf@2026' },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSyncStatusMsg(data.message);
        fetchLeads();
      } else {
        setSyncStatusMsg(data.message || 'Sync failed');
      }
    } catch (err) {
      setSyncStatusMsg('Network error during bulk sync');
    } finally {
      setIsSyncingAll(false);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        lead.leadId.toLowerCase().includes(q) ||
        lead.customerName.toLowerCase().includes(q) ||
        lead.mobileNumber.includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.city.toLowerCase().includes(q) ||
        lead.district.toLowerCase().includes(q) ||
        lead.remarks.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (statusFilter !== 'All' && lead.leadStatus !== statusFilter) return false;
    if (tempFilter !== 'All' && lead.leadTemperature !== tempFilter) return false;
    if (loanTypeFilter !== 'All' && lead.loanType !== loanTypeFilter) return false;
    if (sourceFilter !== 'All' && lead.leadSource !== sourceFilter) return false;
    if (districtFilter !== 'All' && lead.district !== districtFilter) return false;
    if (dateFilter && lead.submissionDate !== dateFilter) return false;

    return true;
  });

  // Calculate Breakdown counts
  const loanTypeCounts = leads.reduce((acc: any, l) => {
    acc[l.loanType] = (acc[l.loanType] || 0) + 1;
    return acc;
  }, {});

  const sourceCounts = leads.reduce((acc: any, l) => {
    acc[l.leadSource] = (acc[l.leadSource] || 0) + 1;
    return acc;
  }, {});

  const districtCounts = leads.reduce((acc: any, l) => {
    acc[l.district] = (acc[l.district] || 0) + 1;
    return acc;
  }, {});

  // Copy Google Apps Script code
  const copyGoogleAppsScriptCode = () => {
    const scriptCode = `// Master Google Apps Script for Shri Kanth Finance Service
var HEADERS = ["Lead ID","Submission Date","Submission Time","Customer Name","Mobile Number","Email","City","District","Loan Type","Loan Amount","Employment Type","Monthly Income","Existing Loan","Lead Source","Lead Status","Lead Temperature","Assigned Agent","Follow-up Date","Remarks"];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Master Leads") || ss.getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground("#0B2A4A").setFontColor("#FFFFFF").setFontWeight("bold");
    }
    var payload = JSON.parse(e.postData.contents);
    var rowData = [
      payload.leadId || "",
      payload.submissionDate || "",
      payload.submissionTime || "",
      payload.customerName || "",
      payload.mobileNumber || "",
      payload.email || "",
      payload.city || "",
      payload.district || "",
      payload.loanType || "",
      payload.loanAmount || "",
      payload.employmentType || "",
      payload.monthlyIncome || "",
      payload.existingLoan || "",
      payload.leadSource || "",
      payload.leadStatus || "New",
      payload.leadTemperature || "Warm",
      payload.assignedAgent || "Unassigned",
      payload.followUpDate || "",
      payload.remarks || ""
    ];
    sheet.appendRow(rowData);
    return ContentService.createTextOutput(JSON.stringify({ success: true, leadId: payload.leadId })).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;
    navigator.clipboard.writeText(scriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  // If Not Authenticated, render Login View
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
          <div className="bg-[#0B2A4A] text-white p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-[#C9A227]/40 text-[#C9A227] font-bold text-xl flex items-center justify-center mx-auto mb-3">
              SK
            </div>
            <h3 className="text-xl font-bold font-serif">Staff Lead Management</h3>
            <p className="text-xs text-slate-300 mt-1">Shri Kanth Finance Service Central Database</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter authorized password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A]"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Default access PIN: skf@2026</span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="flex-1 py-3 bg-[#0B2A4A] hover:bg-[#071E36] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm disabled:opacity-75"
              >
                {isLoggingIn ? 'Verifying...' : 'Access Dashboard'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-100 overflow-hidden">
      
      {/* Top Navbar */}
      <header className="bg-[#0B2A4A] text-white px-4 sm:px-6 py-3.5 border-b border-[#071E36] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 border border-[#C9A227]/40 text-[#C9A227] font-bold text-base flex items-center justify-center">
            SK
          </div>
          <div>
            <h2 className="text-base font-bold font-serif leading-tight">
              Shri Kanth Finance Service · Lead Management
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span>Master Google Sheets Sync System</span>
              <span>·</span>
              <span className={`inline-flex items-center gap-1 font-semibold ${
                googleSheetsConnected ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${googleSheetsConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                {googleSheetsConnected ? 'Google Sheet Connected' : 'Google Sheet URL Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchLeads()}
            disabled={loading}
            className="p-2 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <a
            href="/api/leads/export-csv"
            download
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#C9A227] hover:bg-[#DFB73D] text-[#071E36] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors ml-1"
            title="Close Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'leads' ? 'bg-[#0B2A4A] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Master Leads Table ({leads.length})
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'analytics' ? 'bg-[#0B2A4A] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Distribution & Metrics
          </button>

          <button
            onClick={() => setActiveTab('sheets')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'sheets' ? 'bg-[#0B2A4A] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Sheet Sync & Settings</span>
          </button>
        </div>

        {/* Sync all unsynced pill button */}
        {stats.unsyncedCount > 0 && (
          <button
            onClick={handleSyncAllPending}
            disabled={isSyncingAll}
            className="text-xs bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 px-3 py-1 rounded-lg font-medium flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-700 ${isSyncingAll ? 'animate-spin' : ''}`} />
            <span>Sync {stats.unsyncedCount} Pending to Sheet</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Total Leads
            </span>
            <div className="text-2xl font-bold font-mono text-[#0B2A4A]">
              {stats.totalLeads ?? leads.length}
            </div>
            <span className="text-[11px] text-slate-400">All Master Entries</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/30 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-1">
              New Leads
            </span>
            <div className="text-2xl font-bold font-mono text-blue-900">
              {stats.newLeads ?? 0}
            </div>
            <span className="text-[11px] text-blue-600">Pending Review</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/30 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 block mb-1 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>Hot Leads</span>
            </span>
            <div className="text-2xl font-bold font-mono text-rose-900">
              {stats.hotLeads ?? 0}
            </div>
            <span className="text-[11px] text-rose-600">High Priority</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/30 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mb-1">
              Warm Leads
            </span>
            <div className="text-2xl font-bold font-mono text-amber-900">
              {stats.warmLeads ?? 0}
            </div>
            <span className="text-[11px] text-amber-600">Default Intake</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
              Cold Leads
            </span>
            <div className="text-2xl font-bold font-mono text-slate-700">
              {stats.coldLeads ?? 0}
            </div>
            <span className="text-[11px] text-slate-400">Low Urgency</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 block mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Follow-ups</span>
            </span>
            <div className="text-2xl font-bold font-mono text-emerald-900">
              {stats.followUps ?? 0}
            </div>
            <span className="text-[11px] text-emerald-600">Scheduled Actions</span>
          </div>
        </div>

        {/* TAB 1: LEADS TABLE & FILTERS */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                {/* Search input */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search by Lead ID, Customer Name, Mobile..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="text-xs text-slate-500">
                  Showing <strong>{filteredLeads.length}</strong> of <strong>{leads.length}</strong> leads
                </div>
              </div>

              {/* Multi-Filters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-100 text-xs">
                {/* Status */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 text-xs"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Review">In Review</option>
                    <option value="Bank Submitted">Bank Submitted</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Temperature */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Temperature</label>
                  <select
                    value={tempFilter}
                    onChange={(e) => setTempFilter(e.target.value)}
                    className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 text-xs"
                  >
                    <option value="All">All Temperatures</option>
                    <option value="Hot">Hot</option>
                    <option value="Warm">Warm</option>
                    <option value="Cold">Cold</option>
                  </select>
                </div>

                {/* Loan Type */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Loan Type</label>
                  <select
                    value={loanTypeFilter}
                    onChange={(e) => setLoanTypeFilter(e.target.value)}
                    className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 text-xs"
                  >
                    <option value="All">All 8 Loan Types</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Construction Loan">Construction Loan</option>
                    <option value="Loan Against Property">Loan Against Property</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Balance Transfer">Balance Transfer</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Education Loan">Education Loan</option>
                    <option value="Vehicle Loan">Vehicle Loan</option>
                  </select>
                </div>

                {/* Lead Source */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Lead Source</label>
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 text-xs truncate"
                  >
                    <option value="All">All Sources</option>
                    <option value="Website – Apply Now">Website – Apply Now</option>
                    <option value="Website – Home Loan">Website – Home Loan</option>
                    <option value="Website – Construction Loan">Website – Construction Loan</option>
                    <option value="Website – Loan Against Property">Website – Loan Against Property</option>
                    <option value="Website – Business Loan">Website – Business Loan</option>
                    <option value="Website – Balance Transfer">Website – Balance Transfer</option>
                    <option value="Website – Personal Loan">Website – Personal Loan</option>
                    <option value="Website – Education Loan">Website – Education Loan</option>
                    <option value="Website – Vehicle Loan">Website – Vehicle Loan</option>
                    <option value="Website – Contact Enquiry">Website – Contact Enquiry</option>
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">District</label>
                  <select
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 text-xs"
                  >
                    <option value="All">All Districts</option>
                    <option value="Gwalior">Gwalior</option>
                    <option value="Bhind">Bhind</option>
                    <option value="Morena">Morena</option>
                    <option value="Datia">Datia</option>
                    <option value="Guna">Guna</option>
                    <option value="Shivpuri">Shivpuri</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0B2A4A] text-white border-b border-[#071E36]">
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">Lead ID</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">Date / Time</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">Customer</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">Contact</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">District</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">Loan Type</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">Amount</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">Source</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">Status</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">Temp</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px]">Sheet Sync</th>
                      <th className="py-3 px-3.5 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={12} className="py-12 text-center text-slate-400">
                          No leads matching the specified filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.leadId} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3.5 font-mono font-bold text-[#0B2A4A] whitespace-nowrap">
                            {lead.leadId}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                            <div>{lead.submissionDate}</div>
                            <div className="text-[10px] text-slate-400">{lead.submissionTime}</div>
                          </td>
                          <td className="py-3 px-3.5 font-semibold text-slate-900 whitespace-nowrap">
                            {lead.customerName}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap font-mono">
                            <a
                              href={`tel:+91${lead.mobileNumber}`}
                              className="text-slate-800 hover:text-[#0B2A4A] hover:underline"
                            >
                              +91 {lead.mobileNumber}
                            </a>
                            {lead.email && (
                              <div className="text-[10px] text-slate-400 font-sans truncate max-w-[130px]">
                                {lead.email}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap text-slate-700">
                            {lead.district}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap font-medium text-slate-800">
                            {lead.loanType}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap font-mono font-semibold text-[#0B2A4A]">
                            {lead.loanAmount}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap text-slate-500 text-[11px]">
                            {lead.leadSource}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                              lead.leadStatus === 'New' ? 'bg-blue-100 text-blue-800' :
                              lead.leadStatus === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                              lead.leadStatus === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {lead.leadStatus}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              lead.leadTemperature === 'Hot' ? 'bg-rose-100 text-rose-700' :
                              lead.leadTemperature === 'Warm' ? 'bg-amber-100 text-amber-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {lead.leadTemperature}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            {lead.syncedToGoogleSheets ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Synced</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700" title={lead.googleSheetsSyncError}>
                                <Clock className="w-3 h-3 text-amber-600" />
                                <span>Pending</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`https://wa.me/91${lead.mobileNumber}?text=${encodeURIComponent(`Hello ${lead.customerName}, this is regarding your ${lead.loanType} enquiry with Shri Kanth Finance Service (${lead.leadId}).`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5 fill-emerald-600" />
                              </a>
                              <a
                                href={`tel:+91${lead.mobileNumber}`}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                                title="Call Lead"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => setEditingLead({ ...lead })}
                                className="p-1.5 bg-[#0B2A4A] hover:bg-[#071E36] text-white rounded transition-colors"
                                title="Edit Lead Status & Details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ANALYTICS & DISTRIBUTION */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Loan Type Breakdown */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-[#0B2A4A] uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                Loan-Type-Wise Leads
              </h3>
              <div className="space-y-2.5 text-xs">
                {Object.entries(loanTypeCounts).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">{type}</span>
                    <span className="font-mono font-bold text-[#0B2A4A] bg-slate-100 px-2 py-0.5 rounded">
                      {count as number}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Source-wise Breakdown */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-[#0B2A4A] uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                Source-Wise Leads
              </h3>
              <div className="space-y-2.5 text-xs">
                {Object.entries(sourceCounts).map(([src, count]) => (
                  <div key={src} className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium truncate max-w-[200px]">{src}</span>
                    <span className="font-mono font-bold text-[#0B2A4A] bg-slate-100 px-2 py-0.5 rounded">
                      {count as number}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* District-wise Breakdown */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-[#0B2A4A] uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                District-Wise Leads
              </h3>
              <div className="space-y-2.5 text-xs">
                {Object.entries(districtCounts).map(([dist, count]) => (
                  <div key={dist} className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">{dist}</span>
                    <span className="font-mono font-bold text-[#0B2A4A] bg-slate-100 px-2 py-0.5 rounded">
                      {count as number}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: GOOGLE SHEETS SETUP & SETTINGS */}
        {activeTab === 'sheets' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Connection Status Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-[#0B2A4A]">
                      Master Google Sheets Webhook Connection
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect your master spreadsheet so every website submission automatically creates a row with all 19 columns.
                  </p>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  googleSheetsConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {googleSheetsConnected ? 'Connected & Active' : 'Setup Required'}
                </div>
              </div>

              {configSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium mb-4">
                  {configSuccessMsg}
                </div>
              )}

              {syncStatusMsg && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 font-medium mb-4">
                  {syncStatusMsg}
                </div>
              )}

              <form onSubmit={handleSaveWebhookConfig} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Google Apps Script Web App Deployment URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    value={webhookUrlInput}
                    onChange={(e) => setWebhookUrlInput(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A]"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Generated from your Google Sheet by following the instructions below.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSavingConfig}
                    className="px-5 py-2.5 bg-[#0B2A4A] hover:bg-[#071E36] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Webhook URL</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTestSheetConnection}
                    disabled={isTestingSheet || !webhookUrlInput}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingSheet ? 'animate-spin' : ''}`} />
                    <span>Test Webhook</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSyncAllPending}
                    disabled={isSyncingAll || !webhookUrlInput}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
                    <span>Sync All Leads Now</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Step-by-Step Google Sheet Setup Instructions */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-[#0B2A4A] uppercase tracking-wider">
                How to Setup Your Master Google Sheet in 2 Minutes
              </h4>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <div>
                    Open a new Google Sheet at <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-[#0B2A4A] font-bold underline">sheets.new</a> and name it <strong>"Shri Kanth Finance Service Master Leads"</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <div>
                    In the top menu of your Google Sheet, click <strong>Extensions &gt; Apps Script</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <div className="space-y-2 w-full">
                    <div>Delete all code in the script editor and paste the complete script below:</div>
                    <button
                      type="button"
                      onClick={copyGoogleAppsScriptCode}
                      className="px-3 py-1.5 bg-slate-800 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-700 transition-colors"
                    >
                      {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScript ? 'Copied to Clipboard!' : 'Copy Ready-to-Paste Script'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    4
                  </span>
                  <div>
                    Click <strong>Deploy &gt; New deployment</strong>, select type <strong>Web app</strong>, set <em>Who has access</em> to <strong>Anyone</strong>, and click <strong>Deploy</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    5
                  </span>
                  <div>
                    Copy the <strong>Web app URL</strong> and paste it into the box above. That's it!
                  </div>
                </div>
              </div>

              {/* Master Columns List */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  19 Master Columns Stored:
                </span>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {[
                    'Lead ID', 'Submission Date', 'Submission Time', 'Customer Name', 'Mobile Number', 'Email',
                    'City', 'District', 'Loan Type', 'Loan Amount', 'Employment Type', 'Monthly Income',
                    'Existing Loan', 'Lead Source', 'Lead Status', 'Lead Temperature', 'Assigned Agent',
                    'Follow-up Date', 'Remarks'
                  ].map((col) => (
                    <span key={col} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[10px]">
                      {col}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* EDIT LEAD MODAL */}
      {editingLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-[#0B2A4A] text-white p-4 flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold font-mono text-[#C9A227]">
                  {editingLead.leadId}
                </h4>
                <p className="text-xs text-slate-300">
                  {editingLead.customerName} · +91 {editingLead.mobileNumber}
                </p>
              </div>
              <button
                onClick={() => setEditingLead(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLead} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Lead Status
                  </label>
                  <select
                    value={editingLead.leadStatus}
                    onChange={(e) => setEditingLead({ ...editingLead, leadStatus: e.target.value as LeadStatus })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-semibold"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Review">In Review</option>
                    <option value="Bank Submitted">Bank Submitted</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Temperature */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Lead Temperature
                  </label>
                  <select
                    value={editingLead.leadTemperature}
                    onChange={(e) => setEditingLead({ ...editingLead, leadTemperature: e.target.value as LeadTemperature })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-bold"
                  >
                    <option value="Hot">Hot (High Priority)</option>
                    <option value="Warm">Warm (Standard)</option>
                    <option value="Cold">Cold (Low Urgency)</option>
                  </select>
                </div>
              </div>

              {/* Assigned Agent */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assigned Agent
                </label>
                <select
                  value={editingLead.assignedAgent}
                  onChange={(e) => setEditingLead({ ...editingLead, assignedAgent: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Deependra Singh Rajawat">Deependra Singh Rajawat</option>
                  <option value="Anuj Singh Rajawat">Anuj Singh Rajawat</option>
                  <option value="Senior Loan Consultant">Senior Loan Consultant</option>
                </select>
              </div>

              {/* Follow-up Date */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Scheduled Follow-up Date
                </label>
                <input
                  type="date"
                  value={editingLead.followUpDate}
                  onChange={(e) => setEditingLead({ ...editingLead, followUpDate: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                />
              </div>

              {/* Remarks */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Agent Remarks & Follow-up Notes
                </label>
                <textarea
                  rows={3}
                  value={editingLead.remarks}
                  onChange={(e) => setEditingLead({ ...editingLead, remarks: e.target.value })}
                  placeholder="Record customer discussion notes, lender file status, or verification update..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2 bg-[#0B2A4A] hover:bg-[#071E36] text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-xs"
                >
                  {isSavingEdit ? 'Saving...' : 'Update Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
