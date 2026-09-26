import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Persistent Data Storage Paths
const DATA_DIR = path.resolve(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize config file
interface AppConfig {
  googleSheetsWebhookUrl: string;
  adminPasswordHash?: string;
  lastLeadSequence: number;
}

function loadConfig(): AppConfig {
  const envWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
      return {
        googleSheetsWebhookUrl: envWebhook || data.googleSheetsWebhookUrl || '',
        lastLeadSequence: data.lastLeadSequence || 0,
      };
    } catch (e) {
      console.error('Error reading config file:', e);
    }
  }
  const defaultConf: AppConfig = {
    googleSheetsWebhookUrl: envWebhook,
    lastLeadSequence: 0,
  };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConf, null, 2));
  return defaultConf;
}

function saveConfig(conf: AppConfig) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(conf, null, 2));
}

// Master Lead interface matching 19 columns
interface LeadRecord {
  id: string; // e.g. SKF-2026-0001
  leadId: string;
  submissionDate: string;
  submissionTime: string;
  customerName: string;
  mobileNumber: string;
  email: string;
  city: string;
  district: string;
  loanType: string;
  loanAmount: string;
  employmentType: string;
  monthlyIncome: string;
  existingLoan: string;
  leadSource: string;
  leadStatus: string;
  leadTemperature: string;
  assignedAgent: string;
  followUpDate: string;
  remarks: string;
  createdAt: number;
  clientSubmissionId?: string;
  syncedToGoogleSheets: boolean;
  googleSheetsSyncError?: string;
}

// Load leads safely
function loadLeads(): LeadRecord[] {
  if (fs.existsSync(LEADS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
      if (Array.isArray(data)) return data;
    } catch (e) {
      console.error('Error reading leads file:', e);
    }
  }
  return [];
}

function saveLeads(leads: LeadRecord[]) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

// Get Indian Standard Time (IST) strings
function getISTDateTime(): { date: string; time: string } {
  const now = new Date();
  // Format in Asia/Kolkata timezone
  const formatterDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formatterTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return {
    date: formatterDate.format(now), // YYYY-MM-DD
    time: formatterTime.format(now), // HH:mm:ss
  };
}

// Validate Indian 10-digit mobile number
function validateIndianMobile(rawPhone: string): { valid: boolean; cleanPhone: string } {
  if (!rawPhone) return { valid: false, cleanPhone: '' };
  // Remove spaces, hyphens, parentheses, plus
  const digitsOnly = rawPhone.replace(/\D/g, '');
  
  let tenDigit = digitsOnly;
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    tenDigit = digitsOnly.slice(2);
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    tenDigit = digitsOnly.slice(1);
  }

  // Indian numbers must be 10 digits and start with 6, 7, 8, or 9
  const isValid = /^[6-9]\d{9}$/.test(tenDigit);
  return { valid: isValid, cleanPhone: tenDigit };
}

// Helper: Post a lead to the Google Sheets Webhook
async function postToGoogleSheetsWebhook(webhookUrl: string, lead: LeadRecord): Promise<{ success: boolean; error?: string }> {
  if (!webhookUrl || !webhookUrl.trim().startsWith('http')) {
    return { success: false, error: 'No Google Sheets Webhook URL configured' };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const payload = {
      leadId: lead.leadId,
      submissionDate: lead.submissionDate,
      submissionTime: lead.submissionTime,
      customerName: lead.customerName,
      mobileNumber: lead.mobileNumber,
      email: lead.email,
      city: lead.city,
      district: lead.district,
      loanType: lead.loanType,
      loanAmount: lead.loanAmount,
      employmentType: lead.employmentType,
      monthlyIncome: lead.monthlyIncome,
      existingLoan: lead.existingLoan,
      leadSource: lead.leadSource,
      leadStatus: lead.leadStatus,
      leadTemperature: lead.leadTemperature,
      assignedAgent: lead.assignedAgent,
      followUpDate: lead.followUpDate,
      remarks: lead.remarks,
    };

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return { success: false, error: `Google Sheets endpoint returned HTTP ${res.status}: ${errText}` };
    }

    const json = await res.json().catch(() => ({}));
    if (json.success === false) {
      return { success: false, error: json.error || 'Google Apps Script reported an error' };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error connecting to Google Sheets' };
  }
}

// -------------------------------------------------------------
// PUBLIC API: LEAD SUBMISSION
// -------------------------------------------------------------
app.post('/api/leads', async (req, res) => {
  try {
    const {
      customerName,
      mobileNumber,
      email,
      city,
      district,
      loanType,
      loanAmount,
      employmentType,
      monthlyIncome,
      existingLoan,
      existingLoanDetails,
      leadSource,
      remarks,
      clientSubmissionId,
    } = req.body;

    // 1. Validation
    if (!customerName || typeof customerName !== 'string' || !customerName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your full name.',
      });
    }

    const { valid: isPhoneValid, cleanPhone } = validateIndianMobile(mobileNumber);
    if (!isPhoneValid) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.',
      });
    }

    if (!loanAmount || typeof loanAmount !== 'string' || !loanAmount.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please specify the approximate loan amount.',
      });
    }

    // 2. Duplicate Protection check (within last 60 seconds by clientSubmissionId or phone+name)
    const leads = loadLeads();
    const config = loadConfig();

    if (clientSubmissionId) {
      const existing = leads.find((l) => l.clientSubmissionId === clientSubmissionId);
      if (existing) {
        return res.status(200).json({
          success: true,
          leadId: existing.leadId,
          message: 'Thank you for contacting Shri Kanth Finance Service. Your enquiry has been received successfully. Our team will review your requirement and contact you regarding the next steps.',
          lead: existing,
        });
      }
    }

    // Prevent immediate double-clicks on identical phone within 45 seconds
    const recentDuplicate = leads.find(
      (l) => l.mobileNumber === cleanPhone && Date.now() - l.createdAt < 45000 && l.loanType === (loanType || 'Home Loan')
    );
    if (recentDuplicate) {
      return res.status(200).json({
        success: true,
        leadId: recentDuplicate.leadId,
        message: 'Thank you for contacting Shri Kanth Finance Service. Your enquiry has been received successfully. Our team will review your requirement and contact you regarding the next steps.',
        lead: recentDuplicate,
      });
    }

    // 3. Generate Sequential Lead ID (e.g. SKF-2026-0001)
    let nextSeq = (config.lastLeadSequence || 0) + 1;
    if (leads.length > 0) {
      const maxExisting = leads.reduce((max, l) => {
        const parts = l.leadId.split('-');
        const num = parseInt(parts[parts.length - 1], 10);
        return !isNaN(num) && num > max ? num : max;
      }, 0);
      if (maxExisting >= nextSeq) {
        nextSeq = maxExisting + 1;
      }
    }
    config.lastLeadSequence = nextSeq;
    saveConfig(config);

    const paddedSeq = String(nextSeq).padStart(4, '0');
    const leadId = `SKF-2026-${paddedSeq}`;

    // 4. Timestamp
    const { date, time } = getISTDateTime();

    // 5. Build consolidated remarks
    let consolidatedRemarks = (remarks || '').trim();
    if (existingLoan === 'Yes' && existingLoanDetails) {
      consolidatedRemarks = consolidatedRemarks 
        ? `${consolidatedRemarks} | Existing Loan: ${existingLoanDetails}`
        : `Existing Loan: ${existingLoanDetails}`;
    }

    // 6. Build Master Lead Record matching 19 columns
    const newLead: LeadRecord = {
      id: leadId,
      leadId: leadId,
      submissionDate: date,
      submissionTime: time,
      customerName: customerName.trim(),
      mobileNumber: cleanPhone,
      email: (email || '').trim().toLowerCase(),
      city: (city || district || 'Gwalior').trim(),
      district: (district || 'Gwalior').trim(),
      loanType: (loanType || 'Home Loan').trim(),
      loanAmount: loanAmount.trim(),
      employmentType: (employmentType || 'Salaried').trim(),
      monthlyIncome: (monthlyIncome || '').trim(),
      existingLoan: existingLoan === 'Yes' ? 'Yes' : 'No',
      leadSource: (leadSource || 'Website – Apply Now').trim(),
      leadStatus: 'New', // Default
      leadTemperature: 'Warm', // Default
      assignedAgent: 'Unassigned',
      followUpDate: '',
      remarks: consolidatedRemarks,
      createdAt: Date.now(),
      clientSubmissionId: clientSubmissionId || undefined,
      syncedToGoogleSheets: false,
    };

    // 7. Save to local Master Database
    leads.unshift(newLead);
    saveLeads(leads);

    // 8. Sync to Google Sheets
    if (config.googleSheetsWebhookUrl) {
      const syncResult = await postToGoogleSheetsWebhook(config.googleSheetsWebhookUrl, newLead);
      newLead.syncedToGoogleSheets = syncResult.success;
      if (!syncResult.success) {
        newLead.googleSheetsSyncError = syncResult.error;
        console.warn(`[Google Sheets Sync] Error for ${leadId}:`, syncResult.error);
      } else {
        console.log(`[Google Sheets Sync] Successfully synced ${leadId} to Google Sheet`);
      }
      saveLeads(leads);
    } else {
      newLead.googleSheetsSyncError = 'Google Sheets Webhook URL not configured yet in settings';
      saveLeads(leads);
    }

    // 9. Respond with the exact required success message
    return res.status(200).json({
      success: true,
      leadId: newLead.leadId,
      message: 'Thank you for contacting Shri Kanth Finance Service. Your enquiry has been received successfully. Our team will review your requirement and contact you regarding the next steps.',
      lead: newLead,
    });

  } catch (error: any) {
    console.error('Lead submission failure:', error);
    return res.status(500).json({
      success: false,
      message: 'We could not submit your enquiry right now. Please try again or contact us directly on WhatsApp.',
      error: error.message || 'Internal server error',
    });
  }
});

// -------------------------------------------------------------
// ADMIN & LEAD MANAGEMENT ENDPOINTS
// -------------------------------------------------------------
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'skf@2026';

// Middleware for Admin Auth
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Admin credentials required.' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (token === ADMIN_PASSWORD || token === 'authenticated_skf_session') {
    return next();
  }
  return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
}

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: 'authenticated_skf_session',
      message: 'Admin authentication successful',
    });
  }
  return res.status(401).json({
    success: false,
    message: 'Incorrect admin password. Please try again.',
  });
});

// Get Leads (Protected)
app.get('/api/leads', requireAdminAuth, (req, res) => {
  const leads = loadLeads();
  const config = loadConfig();

  // Compute stats
  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.leadStatus === 'New').length,
    hotLeads: leads.filter((l) => l.leadTemperature === 'Hot').length,
    warmLeads: leads.filter((l) => l.leadTemperature === 'Warm').length,
    coldLeads: leads.filter((l) => l.leadTemperature === 'Cold').length,
    followUps: leads.filter((l) => l.followUpDate && l.followUpDate.trim() !== '').length,
    syncedCount: leads.filter((l) => l.syncedToGoogleSheets).length,
    unsyncedCount: leads.filter((l) => !l.syncedToGoogleSheets).length,
  };

  return res.json({
    success: true,
    leads,
    stats,
    googleSheetsConnected: Boolean(config.googleSheetsWebhookUrl && config.googleSheetsWebhookUrl.startsWith('http')),
  });
});

// Update Lead (Status, Temperature, Agent, Follow-up, Remarks)
app.patch('/api/leads/:leadId', requireAdminAuth, async (req, res) => {
  const { leadId } = req.params;
  const updates = req.body;

  const leads = loadLeads();
  const index = leads.findIndex((l) => l.leadId === leadId || l.id === leadId);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Lead not found.' });
  }

  // Allow updating specific fields
  const allowedFields = [
    'leadStatus',
    'leadTemperature',
    'assignedAgent',
    'followUpDate',
    'remarks',
    'loanAmount',
    'city',
    'district',
  ];

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      (leads[index] as any)[field] = updates[field];
    }
  }

  saveLeads(leads);

  // If user requested sync or if Google Sheets is connected, update/sync
  return res.json({
    success: true,
    lead: leads[index],
    message: 'Lead updated successfully',
  });
});

// Sync Unsynced Leads to Google Sheets
app.post('/api/leads/sync-all', requireAdminAuth, async (req, res) => {
  const config = loadConfig();
  if (!config.googleSheetsWebhookUrl) {
    return res.status(400).json({
      success: false,
      message: 'No Google Sheets Webhook URL configured. Please add the Webhook URL in Settings first.',
    });
  }

  const leads = loadLeads();
  const unsynced = leads.filter((l) => !l.syncedToGoogleSheets);

  let successCount = 0;
  let failCount = 0;

  for (const lead of unsynced) {
    const result = await postToGoogleSheetsWebhook(config.googleSheetsWebhookUrl, lead);
    if (result.success) {
      lead.syncedToGoogleSheets = true;
      lead.googleSheetsSyncError = undefined;
      successCount++;
    } else {
      lead.googleSheetsSyncError = result.error;
      failCount++;
    }
  }

  saveLeads(leads);

  return res.json({
    success: true,
    totalAttempted: unsynced.length,
    successCount,
    failCount,
    message: `Sync completed: ${successCount} leads synced, ${failCount} failed.`,
  });
});

// Admin Config: Get Settings
app.get('/api/admin/config', requireAdminAuth, (req, res) => {
  const config = loadConfig();
  return res.json({
    success: true,
    googleSheetsWebhookUrl: config.googleSheetsWebhookUrl || '',
    lastLeadSequence: config.lastLeadSequence || 0,
  });
});

// Admin Config: Update Settings
app.post('/api/admin/config', requireAdminAuth, async (req, res) => {
  const { googleSheetsWebhookUrl } = req.body;
  const config = loadConfig();

  config.googleSheetsWebhookUrl = (googleSheetsWebhookUrl || '').trim();
  saveConfig(config);

  return res.json({
    success: true,
    message: 'Settings updated successfully.',
    config,
  });
});

// Admin Config: Test Connection to Google Sheets Webhook
app.post('/api/admin/test-sheets', requireAdminAuth, async (req, res) => {
  const { webhookUrl } = req.body;
  const targetUrl = webhookUrl || loadConfig().googleSheetsWebhookUrl;

  if (!targetUrl || !targetUrl.startsWith('http')) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid Webhook URL starting with https://',
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    // Send a test GET or POST request
    const response = await fetch(targetUrl, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      return res.json({
        success: true,
        message: 'Connected to Google Sheets Apps Script Web App successfully!',
        details: data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Google Sheets endpoint returned HTTP ${response.status}`,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: `Failed to connect: ${err.message}`,
    });
  }
});

// Export Leads to CSV (matching exact 19 columns)
app.get('/api/leads/export-csv', requireAdminAuth, (req, res) => {
  const leads = loadLeads();
  const headers = [
    'Lead ID',
    'Submission Date',
    'Submission Time',
    'Customer Name',
    'Mobile Number',
    'Email',
    'City',
    'District',
    'Loan Type',
    'Loan Amount',
    'Employment Type',
    'Monthly Income',
    'Existing Loan',
    'Lead Source',
    'Lead Status',
    'Lead Temperature',
    'Assigned Agent',
    'Follow-up Date',
    'Remarks',
  ];

  const escapeCsv = (str: any) => {
    if (str === null || str === undefined) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = leads.map((l) => [
    escapeCsv(l.leadId),
    escapeCsv(l.submissionDate),
    escapeCsv(l.submissionTime),
    escapeCsv(l.customerName),
    escapeCsv(l.mobileNumber),
    escapeCsv(l.email),
    escapeCsv(l.city),
    escapeCsv(l.district),
    escapeCsv(l.loanType),
    escapeCsv(l.loanAmount),
    escapeCsv(l.employmentType),
    escapeCsv(l.monthlyIncome),
    escapeCsv(l.existingLoan),
    escapeCsv(l.leadSource),
    escapeCsv(l.leadStatus),
    escapeCsv(l.leadTemperature),
    escapeCsv(l.assignedAgent),
    escapeCsv(l.followUpDate),
    escapeCsv(l.remarks),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="Shri_Kanth_Finance_Leads_${Date.now()}.csv"`);
  return res.send(csvContent);
});

// -------------------------------------------------------------
// VITE INTEGRATION (DEV & PROD)
// -------------------------------------------------------------
async function setupVite() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shri Kanth Finance Service server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
});
