import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, CheckCircle2 } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";
import doctorImage from "@/assets/doctor-1.png";

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
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary rounded-full text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>#1 Clinic Management Platform</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight animate-fade-in-up">
              Where care meets
              <span className="block bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                efficiency
              </span>
            </h1>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Less admin. More healing.
            </p>
            
            {/* Subheadline */}
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              The scheduling platform that gives you back 2 hours every day. So you can focus on what matters most—your patients.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="text-base px-8 py-6 shadow-medium hover:shadow-glow transition-all duration-300 rounded-xl">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl group">
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              {[
                "30-day money back",
                "No credit card needed",
                "HIPAA compliant",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Images */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.3s" }}>
            {/* Main Dashboard Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 rounded-3xl blur-2xl" />
              <img 
                src={heroDashboard} 
                alt="ClinicFlow dashboard showing appointment management" 
                className="relative rounded-2xl shadow-strong border border-border/50 w-full"
              />
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card/95 backdrop-blur-xl rounded-xl shadow-medium border border-border/50 p-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <img 
                    src={doctorImage} 
                    alt="Healthcare professional" 
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">Dr. Sarah Mitchell</p>
                    <p className="text-xs text-muted-foreground">"Saved us 15 hours/week"</p>
                  </div>
                </div>
              </div>
              
              {/* Stats floating card */}
              <div className="absolute -top-4 -right-4 bg-card/95 backdrop-blur-xl rounded-xl shadow-medium border border-border/50 p-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">
                    98.7%
                  </div>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Stats */}
        <div className="mt-24 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider font-medium">
            Trusted by 500+ clinics processing 1M+ appointments monthly
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Clinics" },
              { value: "1M+", label: "Appointments" },
              { value: "30%", label: "Less No-Shows" },
              { value: "4.9★", label: "Rating" },
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
      </div>
    </section>
  );
};

export default Hero;
