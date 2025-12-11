import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, CheckCircle2 } from "lucide-react";
import abstractHero from "@/assets/abstract-hero.png";
import abstractNetwork from "@/assets/abstract-network.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Abstract background image */}
      <div className="absolute inset-0">
        <img 
          src={abstractHero} 
          alt="" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-card/80 backdrop-blur-md border border-primary/20 text-primary rounded-full text-sm font-medium mb-8 animate-fade-in shadow-soft">
              <Sparkles className="w-4 h-4" />
              <span>The future of clinic operations</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.05] tracking-tight animate-fade-in-up">
              Simplicity is the
              <span className="block bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                ultimate sophistication
              </span>
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-foreground/80 mb-3 font-medium animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Less friction. More flow.
            </p>
            
            {/* Subheadline */}
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              We built what we wished existed—an operations platform so intuitive, it disappears into your workflow. Trusted by teams who refuse to compromise.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="text-base px-8 py-6 shadow-medium hover:shadow-glow transition-all duration-500 rounded-xl group">
                Experience it free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl group bg-card/50 backdrop-blur-sm border-border/50">
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                See it in action
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              {[
                "Enterprise-grade security",
                "No setup fees",
                "Cancel anytime",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Abstract Visual */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/30 via-primary/10 to-accent/30 rounded-full blur-3xl opacity-60" />
              
              {/* Main abstract image */}
              <img 
                src={abstractNetwork} 
                alt="Connected network visualization" 
                className="relative rounded-3xl w-full shadow-strong"
              />
              
              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-xl rounded-2xl shadow-medium border border-border/30 p-5 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">2 hours</p>
                    <p className="text-sm text-muted-foreground">saved daily, per team</p>
                  </div>
                </div>
              </div>
              
              {/* Top stat card */}
              <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-xl rounded-2xl shadow-medium border border-border/30 p-5 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">
                    99.9%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">uptime guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Stats - More abstract messaging */}
        <div className="mt-28 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="bg-card/40 backdrop-blur-md rounded-3xl border border-border/30 p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: "500+", label: "Teams trust us" },
                { value: "1M+", label: "Tasks automated" },
                { value: "30%", label: "Time reclaimed" },
                { value: "4.9", label: "Out of 5 stars" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
