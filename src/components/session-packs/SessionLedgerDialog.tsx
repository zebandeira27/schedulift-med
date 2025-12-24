import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSessionLedger } from '@/hooks/useSessionPacks';
import { ActionType, TriggeredBy } from '@/types/sessionPacks';
import { format } from 'date-fns';
import { 
  ArrowDown, 
  ArrowUp, 
  Ban, 
  CheckCircle, 
  Snowflake, 
  Play, 
  RefreshCw,
  Calendar,
  User
} from 'lucide-react';

interface SessionLedgerDialogProps {
  packId: string;
  packName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const actionIcons: Record<ActionType, React.ReactNode> = {
  'used': <CheckCircle className="h-4 w-4 text-accent" />,
  'no-show-charged': <Ban className="h-4 w-4 text-destructive" />,
  'no-show-waived': <RefreshCw className="h-4 w-4 text-amber-500" />,
  'cancelled': <Ban className="h-4 w-4 text-muted-foreground" />,
  'adjustment': <RefreshCw className="h-4 w-4 text-primary" />,
  'freeze': <Snowflake className="h-4 w-4 text-blue-500" />,
  'unfreeze': <Play className="h-4 w-4 text-accent" />,
  'refund': <ArrowUp className="h-4 w-4 text-amber-500" />,
  'transfer': <ArrowUp className="h-4 w-4 text-primary" />,
  'extend': <Calendar className="h-4 w-4 text-primary" />,
};

const actionLabels: Record<ActionType, string> = {
  'used': 'Session Used',
  'no-show-charged': 'No-Show Charged',
  'no-show-waived': 'No-Show Waived',
  'cancelled': 'Cancelled',
  'adjustment': 'Adjustment',
  'freeze': 'Pack Frozen',
  'unfreeze': 'Pack Unfrozen',
  'refund': 'Refund',
  'transfer': 'Transfer',
  'extend': 'Expiry Extended',
};

const triggeredByLabels: Record<TriggeredBy, string> = {
  'system': 'System',
  'reception': 'Reception',
  'admin': 'Admin',
};

export function SessionLedgerDialog({ packId, packName, open, onOpenChange }: SessionLedgerDialogProps) {
  const { entries } = useSessionLedger(packId);
  
  // Sort by timestamp descending (newest first)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Audit Trail</DialogTitle>
          <p className="text-sm text-muted-foreground">{packName}</p>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] pr-4">
          {sortedEntries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No ledger entries found
            </div>
          ) : (
            <div className="space-y-4">
              {sortedEntries.map((entry) => (
                <div 
                  key={entry.id} 
                  className="flex gap-4 p-4 border rounded-lg bg-card"
                >
                  <div className="flex-shrink-0 mt-1">
                    {actionIcons[entry.actionType]}
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">
                        {actionLabels[entry.actionType]}
                      </span>
                      <div className="flex items-center gap-2">
                        {entry.sessionsDelta !== 0 && (
                          <Badge 
                            variant="outline" 
                            className={entry.sessionsDelta > 0 
                              ? 'bg-accent/10 text-accent border-accent/20' 
                              : 'bg-destructive/10 text-destructive border-destructive/20'
                            }
                          >
                            {entry.sessionsDelta > 0 ? '+' : ''}{entry.sessionsDelta}
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {entry.previousBalance} → {entry.newBalance}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {entry.reason}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(entry.timestamp), 'MMM d, yyyy HH:mm')}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {triggeredByLabels[entry.triggeredBy]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
