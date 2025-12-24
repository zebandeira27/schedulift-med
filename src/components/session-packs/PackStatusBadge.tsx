import { Badge } from '@/components/ui/badge';
import { PatientPack, getVisualState, VisualState } from '@/types/sessionPacks';

interface PackStatusBadgeProps {
  pack: PatientPack;
  showRemaining?: boolean;
}

const visualStateStyles: Record<VisualState, string> = {
  healthy: 'bg-accent/10 text-accent border-accent/20',
  low: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  blocked: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusLabels: Record<PatientPack['status'], string> = {
  active: 'Active',
  completed: 'Completed',
  expired: 'Expired',
  frozen: 'Frozen',
};

export function PackStatusBadge({ pack, showRemaining = false }: PackStatusBadgeProps) {
  const visualState = getVisualState(pack);
  
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={visualStateStyles[visualState]}>
        {statusLabels[pack.status]}
      </Badge>
      {showRemaining && pack.status === 'active' && (
        <span className={`text-sm font-medium ${
          visualState === 'low' ? 'text-amber-600' : 'text-muted-foreground'
        }`}>
          {pack.remainingSessions} sessions left
        </span>
      )}
    </div>
  );
}
