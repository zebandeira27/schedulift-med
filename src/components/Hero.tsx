import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, CheckCircle2 } from "lucide-react";
import abstractHero from "@/assets/abstract-hero.png";
import abstractNetwork from "@/assets/abstract-network.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient opacity-80" />
      
      {/* Abstract background image */}
      <div className="absolute inset-0">
        <img 
          src={abstractHero} 
          alt="" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Floating orbs with enhanced animation */}
      <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-warm/8 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/6 w-64 h-64 bg-accent/6 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "3s" }} />
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-foreground/90">{t('hero.badge')}</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.05] tracking-tight animate-fade-in-up font-display">
              {t('hero.headline1')}
              <span className="block text-gradient">
                {t('hero.headline2')}
              </span>
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-foreground/70 mb-3 font-medium animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {t('hero.tagline')}
            </p>
            
            {/* Subheadline */}
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              {t('hero.description')}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="text-base px-8 py-6 shadow-medium hover:shadow-glow transition-all duration-500 rounded-2xl group font-medium">
                {t('hero.cta1')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-2xl group glass border-border/50 hover:bg-card/80 transition-all duration-300 font-medium">
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                {t('hero.cta2')}
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              {[
                t('hero.trust1'),
                t('hero.trust2'),
                t('hero.trust3'),
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Abstract Visual */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-warm/10 to-accent/20 rounded-full blur-3xl opacity-60 animate-glow-pulse" />
              
              {/* Main abstract image */}
              <img 
                src={abstractNetwork} 
                alt="Connected network visualization" 
                className="relative rounded-3xl w-full shadow-strong"
              />
              
              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-5 animate-float hover-lift" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
                    <span className="text-primary-foreground font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg font-display">2 hours</p>
                    <p className="text-sm text-muted-foreground">{t('hero.cardLabel1')}</p>
                  </div>
                </div>
              </div>
              
              {/* Top stat card */}
              <div className="absolute -top-4 -right-4 glass-strong rounded-2xl p-5 animate-float hover-lift" style={{ animationDelay: "0.8s" }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient font-display">
                    99.9%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t('hero.cardLabel2')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Stats */}
        <div className="mt-28 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="glass-strong rounded-3xl p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: "500+", label: t('hero.stat1Label') },
                { value: "1M+", label: t('hero.stat2Label') },
                { value: "30%", label: t('hero.stat3Label') },
                { value: "4.9", label: t('hero.stat4Label') },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 font-display group-hover:scale-105 transition-transform duration-300">
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