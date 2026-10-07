import { promises as fs } from 'node:fs';
import path from 'node:path';

const DATA_DIR = process.env.LEADS_DATA_DIR || path.join(process.cwd(), '.data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl');
const UNDELIVERED_FILE = path.join(DATA_DIR, 'leads-undelivered.jsonl');

export type Lead = {
  name: string;
  phone: string;
  purpose: string;
  interest: string;
  form: string;
  at: string;
};

async function append(file: string, lead: Lead): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(file, JSON.stringify(lead) + '\n', 'utf8');
  } catch (e) {
    console.error('lead store failed', file, e, JSON.stringify(lead));
  }
}

export async function recordLead(lead: Lead): Promise<void> {
  await append(LEADS_FILE, lead);
}

export async function recordUndelivered(lead: Lead): Promise<void> {
  await append(UNDELIVERED_FILE, lead);
}
