// Session Packs Data Models

export type PackStatus = 'active' | 'completed' | 'expired' | 'frozen';
export type FinancialStatus = 'paid' | 'partial' | 'complimentary';
export type RefundPolicy = 'none' | 'partial' | 'manual';
export type ActionType = 'used' | 'no-show-charged' | 'no-show-waived' | 'cancelled' | 'adjustment' | 'freeze' | 'unfreeze' | 'refund' | 'transfer' | 'extend';
export type TriggeredBy = 'system' | 'reception' | 'admin';
export type VisualState = 'healthy' | 'low' | 'blocked';

export interface PackTemplate {
  id: string;
  name: string;
  totalSessions: number;
  totalPrice: number;
  sessionReferencePrice: number;
  validityPeriod: number; // in days
  allowedServices: string[];
  allowedProfessionals: string[];
  noShowPolicy: 'deduct' | 'waive'; // default: deduct 1 session
  refundPolicy: RefundPolicy;
  transferable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PatientPack {
  id: string;
  patientId: string;
  patientName: string;
  packTemplateId: string;
  packTemplateName: string;
  purchaseDate: string;
  expiryDate: string;
  totalSessions: number;
  usedSessions: number;
  remainingSessions: number;
  status: PackStatus;
  financialStatus: FinancialStatus;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionLedger {
  id: string;
  timestamp: string;
  patientPackId: string;
  appointmentId?: string;
  actionType: ActionType;
  sessionsDelta: number; // positive or negative
  triggeredBy: TriggeredBy;
  reason: string;
  previousBalance: number;
  newBalance: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPackId?: string;
  scheduledDate: string;
  service: string;
  professional: string;
  status: 'scheduled' | 'attended' | 'cancelled' | 'no-show';
}

// Helper to calculate visual state
export function getVisualState(pack: PatientPack): VisualState {
  if (pack.status === 'frozen' || pack.status === 'expired' || pack.status === 'completed') {
    return 'blocked';
  }
  if (pack.remainingSessions <= 1) {
    return 'low';
  }
  const daysUntilExpiry = Math.ceil(
    (new Date(pack.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (daysUntilExpiry <= 7) {
    return 'low';
  }
  return 'healthy';
}
