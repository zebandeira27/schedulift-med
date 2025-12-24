import { useState, useEffect, useCallback } from 'react';
import {
  PackTemplate,
  PatientPack,
  SessionLedger,
  Appointment,
  TriggeredBy,
} from '@/types/sessionPacks';
import * as store from '@/stores/sessionPacksStore';

export function usePackTemplates() {
  const [templates, setTemplates] = useState<PackTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setTemplates(store.getPackTemplates());
    setLoading(false);
  }, []);

  useEffect(() => {
    store.initializeDemoData();
    refresh();
  }, [refresh]);

  const create = useCallback(
    (template: Omit<PackTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
      const saved = store.savePackTemplate(template);
      refresh();
      return saved;
    },
    [refresh]
  );

  const update = useCallback(
    (id: string, updates: Partial<PackTemplate>) => {
      const updated = store.updatePackTemplate(id, updates);
      refresh();
      return updated;
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      const deleted = store.deletePackTemplate(id);
      refresh();
      return deleted;
    },
    [refresh]
  );

  return { templates, loading, refresh, create, update, remove };
}

export function usePatientPacks() {
  const [packs, setPacks] = useState<PatientPack[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setPacks(store.getPatientPacks());
    setLoading(false);
  }, []);

  useEffect(() => {
    store.initializeDemoData();
    refresh();
  }, [refresh]);

  const create = useCallback(
    (
      patientId: string,
      patientName: string,
      template: PackTemplate,
      financialStatus?: PatientPack['financialStatus'],
      notes?: string
    ) => {
      const pack = store.createPatientPack(patientId, patientName, template, financialStatus, notes);
      refresh();
      return pack;
    },
    [refresh]
  );

  const deductSession = useCallback(
    (
      packId: string,
      reason: string,
      triggeredBy: TriggeredBy = 'reception',
      appointmentId?: string
    ) => {
      const pack = store.deductSession(packId, reason, 'used', triggeredBy, appointmentId);
      refresh();
      return pack;
    },
    [refresh]
  );

  const addSessions = useCallback(
    (packId: string, sessions: number, reason: string, triggeredBy: TriggeredBy = 'admin') => {
      const pack = store.addSessions(packId, sessions, reason, triggeredBy);
      refresh();
      return pack;
    },
    [refresh]
  );

  const freeze = useCallback(
    (packId: string, reason: string, triggeredBy: TriggeredBy = 'admin') => {
      const pack = store.freezePack(packId, reason, triggeredBy);
      refresh();
      return pack;
    },
    [refresh]
  );

  const unfreeze = useCallback(
    (packId: string, reason: string, triggeredBy: TriggeredBy = 'admin') => {
      const pack = store.unfreezePack(packId, reason, triggeredBy);
      refresh();
      return pack;
    },
    [refresh]
  );

  const extendExpiry = useCallback(
    (packId: string, newExpiryDate: string, reason: string, triggeredBy: TriggeredBy = 'admin') => {
      const pack = store.extendExpiry(packId, newExpiryDate, reason, triggeredBy);
      refresh();
      return pack;
    },
    [refresh]
  );

  const waiveNoShow = useCallback(
    (packId: string, appointmentId: string, reason: string, triggeredBy: TriggeredBy = 'admin') => {
      const pack = store.waiveNoShow(packId, appointmentId, reason, triggeredBy);
      refresh();
      return pack;
    },
    [refresh]
  );

  return {
    packs,
    loading,
    refresh,
    create,
    deductSession,
    addSessions,
    freeze,
    unfreeze,
    extendExpiry,
    waiveNoShow,
  };
}

export function useSessionLedger(packId?: string) {
  const [entries, setEntries] = useState<SessionLedger[]>([]);

  const refresh = useCallback(() => {
    if (packId) {
      setEntries(store.getLedgerForPack(packId));
    } else {
      setEntries(store.getLedger());
    }
  }, [packId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { entries, refresh };
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const refresh = useCallback(() => {
    setAppointments(store.getAppointments());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(
    (
      patientId: string,
      patientName: string,
      scheduledDate: string,
      service: string,
      professional: string
    ) => {
      const appointment = store.createAppointment(patientId, patientName, scheduledDate, service, professional);
      refresh();
      return appointment;
    },
    [refresh]
  );

  const markAttended = useCallback(
    (appointmentId: string) => {
      const result = store.markAppointmentAttended(appointmentId);
      refresh();
      return result;
    },
    [refresh]
  );

  const markNoShow = useCallback(
    (appointmentId: string) => {
      const result = store.markAppointmentNoShow(appointmentId);
      refresh();
      return result;
    },
    [refresh]
  );

  return { appointments, refresh, create, markAttended, markNoShow };
}
