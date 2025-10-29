import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, BarChart3 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter text-primary rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Trusted by 500+ clinics
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Streamline Your Clinic's{" "}
              <span className="text-primary">Scheduling</span> & Operations
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Modern scheduling and patient management software designed specifically for small to medium health clinics. Reduce no-shows, optimize workflows, and focus on what matters most—patient care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="text-base shadow-medium hover:shadow-strong transition-all">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">30%</div>
                <div className="text-sm text-muted-foreground">Fewer No-Shows</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">2hrs</div>
                <div className="text-sm text-muted-foreground">Saved Daily</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Visual */}
          <div className="relative animate-scale-in">
            <div className="relative bg-card rounded-2xl shadow-strong p-8 border border-border">
              {/* Calendar Preview */}
              <div className="bg-gradient-card rounded-xl p-6 mb-4 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Today's Schedule</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Dec 29, 2025</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { time: "09:00 AM", patient: "Sarah Johnson", type: "Checkup", colorClass: "bg-accent" },
                    { time: "10:30 AM", patient: "Michael Chen", type: "Consultation", colorClass: "bg-primary" },
                    { time: "02:00 PM", patient: "Emma Davis", type: "Follow-up", colorClass: "bg-accent" },
                  ].map((appointment, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border hover:shadow-soft transition-all"
                    >
                      <div className={`w-1 h-12 rounded-full ${appointment.colorClass}`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground text-sm">{appointment.patient}</div>
                        <div className="text-xs text-muted-foreground">{appointment.type}</div>
                      </div>
                      <div className="text-sm font-medium text-primary">{appointment.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-lighter rounded-lg p-4 border border-primary/20">
                  <Users className="h-5 w-5 text-primary mb-2" />
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-xs text-primary/80">Patients Today</div>
                </div>
                <div className="bg-accent-light rounded-lg p-4 border border-accent/20">
                  <BarChart3 className="h-5 w-5 text-accent mb-2" />
                  <div className="text-2xl font-bold text-accent">92%</div>
                  <div className="text-xs text-accent/80">Capacity</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
