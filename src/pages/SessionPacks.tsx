import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePatientPacks, usePackTemplates } from '@/hooks/useSessionPacks';
import { PackCard } from '@/components/session-packs/PackCard';
import { PackTemplateCard } from '@/components/session-packs/PackTemplateCard';
import { PacksOverview } from '@/components/session-packs/PacksOverview';
import { CreatePackDialog } from '@/components/session-packs/CreatePackDialog';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Package,
  LayoutTemplate
} from 'lucide-react';

export default function SessionPacks() {
  const { packs, loading: packsLoading, refresh: refreshPacks } = usePatientPacks();
  const { templates, loading: templatesLoading, remove: removeTemplate } = usePackTemplates();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePack, setShowCreatePack] = useState(false);
  const [activeTab, setActiveTab] = useState('packs');

  const filteredPacks = packs.filter(
    (pack) =>
      pack.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.packTemplateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteTemplate = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      removeTemplate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Session Packs</h1>
                <p className="text-sm text-muted-foreground">
                  Manage patient session packages with full audit trail
                </p>
              </div>
            </div>
            <Button onClick={() => setShowCreatePack(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Pack
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Overview Stats */}
        <PacksOverview packs={packs} />

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search packs or templates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="packs" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Patient Packs ({packs.length})
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4" />
              Templates ({templates.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="packs" className="mt-6">
            {packsLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading packs...
              </div>
            ) : filteredPacks.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No packs found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? 'Try adjusting your search query'
                    : 'Create your first patient pack to get started'}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setShowCreatePack(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Pack
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPacks.map((pack) => (
                  <PackCard 
                    key={pack.id} 
                    pack={pack} 
                    onRefresh={refreshPacks}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            {templatesLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading templates...
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <LayoutTemplate className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No templates found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? 'Try adjusting your search query'
                    : 'Pack templates define the structure for patient packs'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <PackTemplateCard
                    key={template.id}
                    template={template}
                    onDelete={handleDeleteTemplate}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <CreatePackDialog
        open={showCreatePack}
        onOpenChange={setShowCreatePack}
        onSuccess={refreshPacks}
      />
    </div>
  );
}
