import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(239_84%_67%/0.12),transparent)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>Trusted by 500+ clinics worldwide</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight animate-fade-in-up">
            The modern way to
            <span className="block bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              manage your clinic
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Streamline scheduling, reduce no-shows, and deliver exceptional patient care with our intuitive platform.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="text-base px-8 py-6 shadow-medium hover:shadow-glow transition-all duration-300 rounded-xl">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl group">
              <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {[
              { value: "98%", label: "Uptime SLA" },
              { value: "30%", label: "Less No-Shows" },
              { value: "2hrs", label: "Saved Daily" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Preview Card */}
        <div className="mt-20 max-w-4xl mx-auto animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 rounded-3xl blur-2xl" />
            <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl shadow-strong border border-border/50 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Today's Schedule</span>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { time: "09:00", patient: "Sarah Johnson", type: "Annual Checkup", status: "Confirmed" },
                  { time: "10:30", patient: "Michael Chen", type: "Consultation", status: "In Progress" },
                  { time: "14:00", patient: "Emma Davis", type: "Follow-up", status: "Upcoming" },
                ].map((apt, idx) => (
                  <div 
                    key={idx} 
                    className="group p-4 bg-background/60 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-semibold text-primary">{apt.time}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        apt.status === "Confirmed" ? "bg-accent/10 text-accent" :
                        apt.status === "In Progress" ? "bg-primary/10 text-primary" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="font-medium text-foreground mb-1">{apt.patient}</div>
                    <div className="text-sm text-muted-foreground">{apt.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;