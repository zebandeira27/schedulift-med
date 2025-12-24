import { Card, CardContent } from '@/components/ui/card';
import { PatientPack } from '@/types/sessionPacks';
import { Package, CheckCircle, AlertTriangle, Snowflake } from 'lucide-react';

interface PacksOverviewProps {
  packs: PatientPack[];
}

export function PacksOverview({ packs }: PacksOverviewProps) {
  const activePacks = packs.filter(p => p.status === 'active');
  const completedPacks = packs.filter(p => p.status === 'completed');
  const frozenPacks = packs.filter(p => p.status === 'frozen');
  const lowSessionPacks = activePacks.filter(p => p.remainingSessions <= 2);
  
  const stats = [
    {
      label: 'Active Packs',
      value: activePacks.length,
      icon: Package,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Completed',
      value: completedPacks.length,
      icon: CheckCircle,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Low Sessions',
      value: lowSessionPacks.length,
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
    },
    {
      label: 'Frozen',
      value: frozenPacks.length,
      icon: Snowflake,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
