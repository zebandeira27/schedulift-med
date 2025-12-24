import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  User, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  Snowflake,
  Play,
  Plus,
  Minus,
  History,
  CalendarPlus
} from 'lucide-react';
import { PatientPack, getVisualState } from '@/types/sessionPacks';
import { PackStatusBadge } from './PackStatusBadge';
import { SessionLedgerDialog } from './SessionLedgerDialog';
import { PackActionsDialog } from './PackActionsDialog';
import { format, differenceInDays } from 'date-fns';

interface PackCardProps {
  pack: PatientPack;
  onRefresh: () => void;
}

export function PackCard({ pack, onRefresh }: PackCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [actionType, setActionType] = useState<'add' | 'remove' | 'freeze' | 'unfreeze' | 'extend'>('add');
  
  const visualState = getVisualState(pack);
  const daysUntilExpiry = differenceInDays(new Date(pack.expiryDate), new Date());
  const usagePercentage = (pack.usedSessions / pack.totalSessions) * 100;
  
  const showExpiryWarning = daysUntilExpiry <= 7 && pack.status === 'active';
  const showLastSessionWarning = pack.remainingSessions === 1 && pack.status === 'active';

  const handleAction = (type: 'add' | 'remove' | 'freeze' | 'unfreeze' | 'extend') => {
    setActionType(type);
    setShowActions(true);
  };

  return (
    <>
      <Card className={`transition-all ${
        visualState === 'blocked' ? 'opacity-70' : ''
      } ${visualState === 'low' ? 'border-amber-500/30' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold">{pack.patientName}</CardTitle>
              <p className="text-sm text-muted-foreground">{pack.packTemplateName}</p>
            </div>
            <PackStatusBadge pack={pack} />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Session Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sessions Used</span>
              <span className="font-medium">
                {pack.usedSessions} / {pack.totalSessions}
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className={`font-semibold ${
                visualState === 'low' ? 'text-amber-600' : 'text-accent'
              }`}>
                {pack.remainingSessions} remaining
              </span>
            </div>
          </div>

          {/* Warnings */}
          {(showExpiryWarning || showLastSessionWarning) && (
            <div className="space-y-2">
              {showExpiryWarning && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-500/10 p-2 rounded-md text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Expires in {daysUntilExpiry} days</span>
                </div>
              )}
              {showLastSessionWarning && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-500/10 p-2 rounded-md text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Last session remaining</span>
                </div>
              )}
            </div>
          )}

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Expires {format(new Date(pack.expiryDate), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Purchased {format(new Date(pack.purchaseDate), 'MMM d, yyyy')}</span>
            </div>
          </div>

          {/* Financial Status */}
          <Badge variant="outline" className={
            pack.financialStatus === 'paid' ? 'bg-accent/10 text-accent border-accent/20' :
            pack.financialStatus === 'complimentary' ? 'bg-primary/10 text-primary border-primary/20' :
            'bg-amber-500/10 text-amber-600 border-amber-500/20'
          }>
            {pack.financialStatus === 'paid' ? 'Paid' :
             pack.financialStatus === 'complimentary' ? 'Complimentary' : 'Partial Payment'}
          </Badge>

          {/* Expand Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>Hide Actions <ChevronUp className="ml-2 h-4 w-4" /></>
            ) : (
              <>Show Actions <ChevronDown className="ml-2 h-4 w-4" /></>
            )}
          </Button>

          {/* Expanded Actions */}
          {expanded && (
            <div className="space-y-3 pt-2 border-t">
              {pack.internalNotes && (
                <div className="text-sm bg-muted/50 p-3 rounded-md">
                  <p className="font-medium mb-1">Internal Notes:</p>
                  <p className="text-muted-foreground">{pack.internalNotes}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction('add')}
                  disabled={pack.status === 'completed'}
                >
                  <Plus className="mr-1 h-4 w-4" /> Add Sessions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction('remove')}
                  disabled={pack.remainingSessions === 0}
                >
                  <Minus className="mr-1 h-4 w-4" /> Deduct
                </Button>
                {pack.status === 'active' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction('freeze')}
                  >
                    <Snowflake className="mr-1 h-4 w-4" /> Freeze
                  </Button>
                ) : pack.status === 'frozen' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction('unfreeze')}
                  >
                    <Play className="mr-1 h-4 w-4" /> Unfreeze
                  </Button>
                ) : null}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction('extend')}
                >
                  <CalendarPlus className="mr-1 h-4 w-4" /> Extend
                </Button>
              </div>
              
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => setShowLedger(true)}
              >
                <History className="mr-2 h-4 w-4" /> View Audit Trail
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <SessionLedgerDialog 
        packId={pack.id} 
        packName={`${pack.patientName} - ${pack.packTemplateName}`}
        open={showLedger} 
        onOpenChange={setShowLedger} 
      />
      
      <PackActionsDialog
        pack={pack}
        actionType={actionType}
        open={showActions}
        onOpenChange={setShowActions}
        onSuccess={onRefresh}
      />
    </>
  );
}
