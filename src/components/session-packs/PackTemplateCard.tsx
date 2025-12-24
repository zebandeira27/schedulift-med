import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PackTemplate } from '@/types/sessionPacks';
import { DollarSign, Clock, Users, Briefcase, Edit, Trash2 } from 'lucide-react';

interface PackTemplateCardProps {
  template: PackTemplate;
  onEdit?: (template: PackTemplate) => void;
  onDelete?: (id: string) => void;
  onSelect?: (template: PackTemplate) => void;
  selectable?: boolean;
}

export function PackTemplateCard({ 
  template, 
  onEdit, 
  onDelete, 
  onSelect,
  selectable = false 
}: PackTemplateCardProps) {
  const savingsPercent = Math.round(
    ((template.sessionReferencePrice * template.totalSessions - template.totalPrice) / 
    (template.sessionReferencePrice * template.totalSessions)) * 100
  );

  return (
    <Card 
      className={`transition-all ${selectable ? 'cursor-pointer hover:border-primary hover:shadow-medium' : ''}`}
      onClick={selectable && onSelect ? () => onSelect(template) : undefined}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{template.name}</CardTitle>
          {savingsPercent > 0 && (
            <Badge className="bg-accent text-accent-foreground">
              Save {savingsPercent}%
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>{template.totalSessions} sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${template.totalPrice}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{template.validityPeriod} days</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>${template.sessionReferencePrice}/session ref</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {template.allowedServices.slice(0, 3).map((service) => (
            <Badge key={service} variant="outline" className="text-xs">
              {service}
            </Badge>
          ))}
          {template.allowedServices.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{template.allowedServices.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex gap-1">
          {template.transferable && (
            <Badge variant="secondary" className="text-xs">Transferable</Badge>
          )}
          <Badge variant="secondary" className="text-xs">
            No-show: {template.noShowPolicy === 'deduct' ? 'Deduct 1' : 'Waive'}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Refund: {template.refundPolicy}
          </Badge>
        </div>

        {(onEdit || onDelete) && (
          <div className="flex gap-2 pt-2">
            {onEdit && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={(e) => { e.stopPropagation(); onEdit(template); }}
              >
                <Edit className="mr-1 h-4 w-4" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={(e) => { e.stopPropagation(); onDelete(template.id); }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
