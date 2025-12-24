import { 
  PackTemplate, 
  PatientPack, 
  SessionLedger, 
  Appointment,
  ActionType,
  TriggeredBy 
} from '@/types/sessionPacks';

const STORAGE_KEYS = {
  TEMPLATES: 'session-pack-templates',
  PACKS: 'session-patient-packs',
  LEDGER: 'session-ledger',
  APPOINTMENTS: 'session-appointments',
};

// Generate unique IDs
const generateId = () => crypto.randomUUID();

// Local storage helpers
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Pack Templates
export function getPackTemplates(): PackTemplate[] {
  return getFromStorage<PackTemplate[]>(STORAGE_KEYS.TEMPLATES, []);
}

export function savePackTemplate(template: Omit<PackTemplate, 'id' | 'createdAt' | 'updatedAt'>): PackTemplate {
  const templates = getPackTemplates();
  const newTemplate: PackTemplate = {
    ...template,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  templates.push(newTemplate);
  saveToStorage(STORAGE_KEYS.TEMPLATES, templates);
  return newTemplate;
}

export function updatePackTemplate(id: string, updates: Partial<PackTemplate>): PackTemplate | null {
  const templates = getPackTemplates();
  const index = templates.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  templates[index] = {
    ...templates[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveToStorage(STORAGE_KEYS.TEMPLATES, templates);
  return templates[index];
}

export function deletePackTemplate(id: string): boolean {
  const templates = getPackTemplates();
  const filtered = templates.filter(t => t.id !== id);
  if (filtered.length === templates.length) return false;
  saveToStorage(STORAGE_KEYS.TEMPLATES, filtered);
  return true;
}

// Patient Packs
export function getPatientPacks(): PatientPack[] {
  return getFromStorage<PatientPack[]>(STORAGE_KEYS.PACKS, []);
}

export function getPatientPackById(id: string): PatientPack | undefined {
  return getPatientPacks().find(p => p.id === id);
}

export function getActivePacksForPatient(patientId: string): PatientPack[] {
  return getPatientPacks().filter(
    p => p.patientId === patientId && p.status === 'active' && p.remainingSessions > 0
  );
}

export function createPatientPack(
  patientId: string,
  patientName: string,
  template: PackTemplate,
  financialStatus: PatientPack['financialStatus'] = 'paid',
  internalNotes: string = ''
): PatientPack {
  const packs = getPatientPacks();
  const now = new Date();
  const expiryDate = new Date(now.getTime() + template.validityPeriod * 24 * 60 * 60 * 1000);
  
  const newPack: PatientPack = {
    id: generateId(),
    patientId,
    patientName,
    packTemplateId: template.id,
    packTemplateName: template.name,
    purchaseDate: now.toISOString(),
    expiryDate: expiryDate.toISOString(),
    totalSessions: template.totalSessions,
    usedSessions: 0,
    remainingSessions: template.totalSessions,
    status: 'active',
    financialStatus,
    internalNotes,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
  
  packs.push(newPack);
  saveToStorage(STORAGE_KEYS.PACKS, packs);
  
  // Create initial ledger entry
  createLedgerEntry({
    patientPackId: newPack.id,
    actionType: 'adjustment',
    sessionsDelta: template.totalSessions,
    triggeredBy: 'system',
    reason: `Pack purchased: ${template.name}`,
    previousBalance: 0,
    newBalance: template.totalSessions,
  });
  
  return newPack;
}

export function updatePatientPack(id: string, updates: Partial<PatientPack>): PatientPack | null {
  const packs = getPatientPacks();
  const index = packs.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  packs[index] = {
    ...packs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveToStorage(STORAGE_KEYS.PACKS, packs);
  return packs[index];
}

// Session Ledger - CRITICAL: All session changes must go through this
export function getLedger(): SessionLedger[] {
  return getFromStorage<SessionLedger[]>(STORAGE_KEYS.LEDGER, []);
}

export function getLedgerForPack(patientPackId: string): SessionLedger[] {
  return getLedger().filter(l => l.patientPackId === patientPackId);
}

export function createLedgerEntry(entry: Omit<SessionLedger, 'id' | 'timestamp'>): SessionLedger {
  const ledger = getLedger();
  const newEntry: SessionLedger = {
    ...entry,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };
  ledger.push(newEntry);
  saveToStorage(STORAGE_KEYS.LEDGER, ledger);
  return newEntry;
}

// Core operations that modify sessions (always create ledger entries)
export function deductSession(
  packId: string,
  reason: string,
  actionType: ActionType,
  triggeredBy: TriggeredBy,
  appointmentId?: string
): PatientPack | null {
  const pack = getPatientPackById(packId);
  if (!pack || pack.remainingSessions <= 0) return null;
  
  const previousBalance = pack.remainingSessions;
  const newBalance = previousBalance - 1;
  
  createLedgerEntry({
    patientPackId: packId,
    appointmentId,
    actionType,
    sessionsDelta: -1,
    triggeredBy,
    reason,
    previousBalance,
    newBalance,
  });
  
  return updatePatientPack(packId, {
    usedSessions: pack.usedSessions + 1,
    remainingSessions: newBalance,
    status: newBalance === 0 ? 'completed' : pack.status,
  });
}

export function addSessions(
  packId: string,
  sessions: number,
  reason: string,
  triggeredBy: TriggeredBy
): PatientPack | null {
  const pack = getPatientPackById(packId);
  if (!pack) return null;
  
  const previousBalance = pack.remainingSessions;
  const newBalance = previousBalance + sessions;
  
  createLedgerEntry({
    patientPackId: packId,
    actionType: 'adjustment',
    sessionsDelta: sessions,
    triggeredBy,
    reason,
    previousBalance,
    newBalance,
  });
  
  return updatePatientPack(packId, {
    totalSessions: pack.totalSessions + sessions,
    remainingSessions: newBalance,
    status: pack.status === 'completed' ? 'active' : pack.status,
  });
}

export function freezePack(packId: string, reason: string, triggeredBy: TriggeredBy): PatientPack | null {
  const pack = getPatientPackById(packId);
  if (!pack || pack.status !== 'active') return null;
  
  createLedgerEntry({
    patientPackId: packId,
    actionType: 'freeze',
    sessionsDelta: 0,
    triggeredBy,
    reason,
    previousBalance: pack.remainingSessions,
    newBalance: pack.remainingSessions,
  });
  
  return updatePatientPack(packId, { status: 'frozen' });
}

export function unfreezePack(packId: string, reason: string, triggeredBy: TriggeredBy): PatientPack | null {
  const pack = getPatientPackById(packId);
  if (!pack || pack.status !== 'frozen') return null;
  
  createLedgerEntry({
    patientPackId: packId,
    actionType: 'unfreeze',
    sessionsDelta: 0,
    triggeredBy,
    reason,
    previousBalance: pack.remainingSessions,
    newBalance: pack.remainingSessions,
  });
  
  return updatePatientPack(packId, { status: 'active' });
}

export function extendExpiry(
  packId: string,
  newExpiryDate: string,
  reason: string,
  triggeredBy: TriggeredBy
): PatientPack | null {
  const pack = getPatientPackById(packId);
  if (!pack) return null;
  
  createLedgerEntry({
    patientPackId: packId,
    actionType: 'extend',
    sessionsDelta: 0,
    triggeredBy,
    reason: `${reason} | New expiry: ${new Date(newExpiryDate).toLocaleDateString()}`,
    previousBalance: pack.remainingSessions,
    newBalance: pack.remainingSessions,
  });
  
  return updatePatientPack(packId, { 
    expiryDate: newExpiryDate,
    status: pack.status === 'expired' ? 'active' : pack.status,
  });
}

// Appointments
export function getAppointments(): Appointment[] {
  return getFromStorage<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, []);
}

export function createAppointment(
  patientId: string,
  patientName: string,
  scheduledDate: string,
  service: string,
  professional: string
): Appointment {
  const appointments = getAppointments();
  
  // Auto-link to active pack if available
  const activePacks = getActivePacksForPatient(patientId);
  const linkedPack = activePacks.length > 0 ? activePacks[0] : undefined;
  
  const newAppointment: Appointment = {
    id: generateId(),
    patientId,
    patientName,
    patientPackId: linkedPack?.id,
    scheduledDate,
    service,
    professional,
    status: 'scheduled',
  };
  
  appointments.push(newAppointment);
  saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
  return newAppointment;
}

export function markAppointmentAttended(appointmentId: string): { appointment: Appointment; pack: PatientPack | null } | null {
  const appointments = getAppointments();
  const index = appointments.findIndex(a => a.id === appointmentId);
  if (index === -1) return null;
  
  const appointment = appointments[index];
  appointments[index] = { ...appointment, status: 'attended' };
  saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
  
  let updatedPack: PatientPack | null = null;
  if (appointment.patientPackId) {
    updatedPack = deductSession(
      appointment.patientPackId,
      `Session attended - ${appointment.service}`,
      'used',
      'system',
      appointmentId
    );
  }
  
  return { appointment: appointments[index], pack: updatedPack };
}

export function markAppointmentNoShow(appointmentId: string): { appointment: Appointment; pack: PatientPack | null } | null {
  const appointments = getAppointments();
  const index = appointments.findIndex(a => a.id === appointmentId);
  if (index === -1) return null;
  
  const appointment = appointments[index];
  appointments[index] = { ...appointment, status: 'no-show' };
  saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
  
  let updatedPack: PatientPack | null = null;
  if (appointment.patientPackId) {
    updatedPack = deductSession(
      appointment.patientPackId,
      `No-show charge - ${appointment.service}`,
      'no-show-charged',
      'system',
      appointmentId
    );
  }
  
  return { appointment: appointments[index], pack: updatedPack };
}

export function waiveNoShow(
  packId: string,
  appointmentId: string,
  reason: string,
  triggeredBy: TriggeredBy
): PatientPack | null {
  const pack = getPatientPackById(packId);
  if (!pack) return null;
  
  return addSessions(packId, 1, `No-show waived: ${reason}`, triggeredBy);
}

// Initialize with demo data
export function initializeDemoData(): void {
  if (getPackTemplates().length > 0) return;
  
  const templates: Omit<PackTemplate, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: 'Physiotherapy Pack - 10 Sessions',
      totalSessions: 10,
      totalPrice: 800,
      sessionReferencePrice: 100,
      validityPeriod: 90,
      allowedServices: ['Physiotherapy', 'Manual Therapy'],
      allowedProfessionals: ['Dr. Sarah Chen', 'Dr. Michael Ross'],
      noShowPolicy: 'deduct',
      refundPolicy: 'partial',
      transferable: false,
    },
    {
      name: 'Wellness Pack - 5 Sessions',
      totalSessions: 5,
      totalPrice: 350,
      sessionReferencePrice: 80,
      validityPeriod: 60,
      allowedServices: ['Massage', 'Acupuncture', 'Wellness Consultation'],
      allowedProfessionals: ['Dr. Emily Watson', 'Dr. James Liu'],
      noShowPolicy: 'deduct',
      refundPolicy: 'none',
      transferable: true,
    },
    {
      name: 'Premium Care - 20 Sessions',
      totalSessions: 20,
      totalPrice: 1400,
      sessionReferencePrice: 90,
      validityPeriod: 180,
      allowedServices: ['All Services'],
      allowedProfessionals: ['Any Professional'],
      noShowPolicy: 'deduct',
      refundPolicy: 'manual',
      transferable: true,
    },
  ];
  
  const savedTemplates = templates.map(t => savePackTemplate(t));
  
  // Create demo patient packs
  if (savedTemplates[0]) {
    createPatientPack('patient-001', 'John Smith', savedTemplates[0], 'paid', 'Regular patient, good compliance');
  }
  if (savedTemplates[1]) {
    createPatientPack('patient-002', 'Maria Garcia', savedTemplates[1], 'paid', 'New patient');
  }
  if (savedTemplates[2]) {
    const pack = createPatientPack('patient-003', 'Robert Johnson', savedTemplates[2], 'complimentary', 'VIP patient - corporate agreement');
    if (pack) {
      // Simulate some usage
      deductSession(pack.id, 'Initial consultation', 'used', 'system');
      deductSession(pack.id, 'Follow-up session', 'used', 'system');
      deductSession(pack.id, 'No-show - 15/12/2024', 'no-show-charged', 'system');
    }
  }
}
