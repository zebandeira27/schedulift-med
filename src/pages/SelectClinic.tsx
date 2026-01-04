import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Clinic } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Plus, Settings } from 'lucide-react';

const ClinicCard = ({ clinic, onClick }: { clinic: Clinic; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-4 p-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-2xl"
    >
      <div className={`
        w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br ${clinic.color}
        flex items-center justify-center text-4xl md:text-5xl
        shadow-xl group-hover:shadow-2xl transition-all duration-300
        border-4 border-transparent group-hover:border-white/30
        relative overflow-hidden
      `}>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <span className="relative z-10 drop-shadow-lg">{clinic.avatar}</span>
      </div>
      <span className="text-sm md:text-base font-medium text-foreground/80 group-hover:text-foreground transition-colors max-w-[120px] text-center leading-tight">
        {clinic.name}
      </span>
    </button>
  );
};

const AddClinicCard = () => {
  return (
    <button
      className="group flex flex-col items-center gap-4 p-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-2xl opacity-60 hover:opacity-100"
    >
      <div className="
        w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-muted/50
        flex items-center justify-center
        border-2 border-dashed border-muted-foreground/30 group-hover:border-primary/50
        transition-all duration-300
      ">
        <Plus className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <span className="text-sm md:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        Add Clinic
      </span>
    </button>
  );
};

const SelectClinic = () => {
  const { user, clinics, selectClinic, signOut, isAuthenticated, selectedClinic } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (selectedClinic) {
      navigate('/');
    }
  }, [isAuthenticated, selectedClinic, navigate]);

  const handleSelectClinic = (clinic: Clinic) => {
    selectClinic(clinic);
    navigate('/');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <span className="text-primary-foreground font-bold">C</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={signOut}
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
            Welcome, <span className="text-gradient">{user?.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Select a clinic to continue
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-4xl">
          {clinics.map((clinic) => (
            <ClinicCard
              key={clinic.id}
              clinic={clinic}
              onClick={() => handleSelectClinic(clinic)}
            />
          ))}
          <AddClinicCard />
        </div>

        <div className="mt-16 text-center">
          <Button 
            variant="link" 
            className="text-muted-foreground hover:text-foreground"
          >
            Manage Clinics
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SelectClinic;
