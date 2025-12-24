import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePatientPacks } from '@/hooks/useSessionPacks';
import { PatientPack, TriggeredBy } from '@/types/sessionPacks';
import { toast } from 'sonner';
import { format, addDays } from 'date-fns';

interface PackActionsDialogProps {
  pack: PatientPack;
  actionType: 'add' | 'remove' | 'freeze' | 'unfreeze' | 'extend';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const actionTitles = {
  add: 'Add Sessions',
  remove: 'Deduct Session',
  freeze: 'Freeze Pack',
  unfreeze: 'Unfreeze Pack',
  extend: 'Extend Expiry Date',
};

export function PackActionsDialog({ 
  pack, 
  actionType, 
  open, 
  onOpenChange,
  onSuccess 
}: PackActionsDialogProps) {
  const { addSessions, deductSession, freeze, unfreeze, extendExpiry } = usePatientPacks();
  
  const [sessions, setSessions] = useState('1');
  const [reason, setReason] = useState('');
  const [triggeredBy, setTriggeredBy] = useState<TriggeredBy>('admin');
  const [newExpiryDate, setNewExpiryDate] = useState(
    format(addDays(new Date(pack.expiryDate), 30), 'yyyy-MM-dd')
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!reason.trim()) {
      toast.error('Please provide a reason for this action');
      return;
    }

    setLoading(true);
    let result;

    try {
      switch (actionType) {
        case 'add':
          result = addSessions(pack.id, parseInt(sessions), reason, triggeredBy);
          break;
        case 'remove':
          result = deductSession(pack.id, reason, triggeredBy);
          break;
        case 'freeze':
          result = freeze(pack.id, reason, triggeredBy);
          break;
        case 'unfreeze':
          result = unfreeze(pack.id, reason, triggeredBy);
          break;
        case 'extend':
          result = extendExpiry(pack.id, newExpiryDate, reason, triggeredBy);
          break;
      }

      if (result) {
        toast.success(`${actionTitles[actionType]} completed successfully`);
        onOpenChange(false);
        onSuccess();
        // Reset form
        setSessions('1');
        setReason('');
      } else {
        toast.error('Action failed. Please try again.');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{actionTitles[actionType]}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-sm text-muted-foreground">
            <strong>Patient:</strong> {pack.patientName}<br />
            <strong>Pack:</strong> {pack.packTemplateName}<br />
            <strong>Current Balance:</strong> {pack.remainingSessions} sessions
          </div>

          {actionType === 'add' && (
            <div className="space-y-2">
              <Label htmlFor="sessions">Number of Sessions to Add</Label>
              <Input
                id="sessions"
                type="number"
                min="1"
                max="50"
                value={sessions}
                onChange={(e) => setSessions(e.target.value)}
              />
            </div>
          )}

          {actionType === 'extend' && (
            <div className="space-y-2">
              <Label htmlFor="expiry">New Expiry Date</Label>
              <Input
                id="expiry"
                type="date"
                value={newExpiryDate}
                min={format(new Date(), 'yyyy-MM-dd')}
                onChange={(e) => setNewExpiryDate(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="triggeredBy">Performed By</Label>
            <Select value={triggeredBy} onValueChange={(v) => setTriggeredBy(v as TriggeredBy)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="reception">Reception</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason (Required)</Label>
            <Textarea
              id="reason"
              placeholder="Provide a reason for this action..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !reason.trim()}>
            {loading ? 'Processing...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
