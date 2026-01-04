import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Clinic } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Plus, Settings } from 'lucide-react';

const ClinicCard = ({ clinic, onClick }: { clinic: Clinic; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-5 p-4 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-3xl"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className={`
          absolute -inset-2 bg-gradient-to-br ${clinic.color} rounded-3xl opacity-0 
          group-hover:opacity-60 blur-xl transition-all duration-500
        `} />
        
        {/* Main card */}
        <div className={`
          relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden
          shadow-lg group-hover:shadow-2xl transition-all duration-500
          ring-4 ring-transparent group-hover:ring-primary/30
          group-hover:scale-105 transform
        `}>
          <img 
            src={clinic.avatar} 
            alt={clinic.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
          `} />
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>
      </div>
      
      <div className="text-center space-y-1">
        <span className="block text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {clinic.name}
        </span>
        <span className="block text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to enter
        </span>
      </div>
    </button>
  );
};

const AddClinicCard = () => {
  return (
    <button
      className="group flex flex-col items-center gap-5 p-4 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-3xl"
    >
      <div className="relative">
        <div className="
          w-32 h-32 md:w-40 md:h-40 rounded-2xl
          bg-gradient-to-br from-muted/80 to-muted/40
          backdrop-blur-sm
          flex items-center justify-center
          border-2 border-dashed border-muted-foreground/20 group-hover:border-primary/50
          transition-all duration-500 group-hover:scale-105
          shadow-lg group-hover:shadow-xl
        ">
          <div className="w-14 h-14 rounded-full bg-muted-foreground/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-300">
            <Plus className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-1">
        <span className="block text-base md:text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          Add Clinic
        </span>
        <span className="block text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Create new
        </span>
      </div>
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
      {/* Premium animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft">
            <span className="text-primary-foreground font-bold text-xl font-display">I</span>
          </div>
          <span className="text-xl font-bold text-foreground font-display tracking-tight hidden sm:block">Inturi</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <Settings className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={signOut}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        {/* Welcome section */}
        <div className="text-center mb-14 md:mb-20 space-y-4">
          <p className="text-sm md:text-base text-primary font-medium tracking-wide uppercase">
            Welcome back
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
            <span className="text-gradient">{user?.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            Select a clinic to manage today
          </p>
        </div>

        {/* Clinics grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-14 max-w-5xl">
          {clinics.map((clinic, index) => (
            <div 
              key={clinic.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ClinicCard
                clinic={clinic}
                onClick={() => handleSelectClinic(clinic)}
              />
            </div>
          ))}
          <div 
            className="animate-fade-in"
            style={{ animationDelay: `${clinics.length * 100}ms` }}
          >
            <AddClinicCard />
          </div>
        </div>

        {/* Footer action */}
        <div className="mt-20 text-center">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Manage Clinics
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SelectClinic;
