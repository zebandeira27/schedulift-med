import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { usePackTemplates, usePatientPacks } from '@/hooks/useSessionPacks';
import { PackTemplate, FinancialStatus } from '@/types/sessionPacks';
import { PackTemplateCard } from './PackTemplateCard';
import { toast } from 'sonner';

interface CreatePackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreatePackDialog({ open, onOpenChange, onSuccess }: CreatePackDialogProps) {
  const { templates } = usePackTemplates();
  const { create } = usePatientPacks();
  
  const [step, setStep] = useState<'template' | 'patient'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<PackTemplate | null>(null);
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [financialStatus, setFinancialStatus] = useState<FinancialStatus>('paid');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTemplateSelect = (template: PackTemplate) => {
    setSelectedTemplate(template);
    setStep('patient');
  };

  const handleSubmit = () => {
    if (!selectedTemplate || !patientId.trim() || !patientName.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      create(patientId, patientName, selectedTemplate, financialStatus, notes);
      toast.success('Pack created successfully');
      onOpenChange(false);
      onSuccess();
      // Reset form
      setStep('template');
      setSelectedTemplate(null);
      setPatientId('');
      setPatientName('');
      setFinancialStatus('paid');
      setNotes('');
    } catch {
      toast.error('Failed to create pack');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep('template');
    setSelectedTemplate(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 'template' ? 'Select Pack Template' : 'Assign to Patient'}
          </DialogTitle>
        </DialogHeader>

        {step === 'template' ? (
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <PackTemplateCard
                key={template.id}
                template={template}
                selectable
                onSelect={handleTemplateSelect}
              />
            ))}
            {templates.length === 0 && (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                No pack templates available. Create a template first.
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {selectedTemplate && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium">{selectedTemplate.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedTemplate.totalSessions} sessions • ${selectedTemplate.totalPrice} • 
                  Valid for {selectedTemplate.validityPeriod} days
                </p>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID *</Label>
                <Input
                  id="patientId"
                  placeholder="e.g., patient-001"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  placeholder="e.g., John Smith"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="financialStatus">Payment Status</Label>
              <Select value={financialStatus} onValueChange={(v) => setFinancialStatus(v as FinancialStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid in Full</SelectItem>
                  <SelectItem value="partial">Partial Payment</SelectItem>
                  <SelectItem value="complimentary">Complimentary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Internal Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any internal notes about this pack..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setStep('template')}>
                Back
              </Button>
              <Button 
                className="flex-1" 
                onClick={handleSubmit}
                disabled={loading || !patientId.trim() || !patientName.trim()}
              >
                {loading ? 'Creating...' : 'Create Pack'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
