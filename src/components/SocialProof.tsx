import { Quote, ArrowRight } from "lucide-react";
import abstractShapes from "@/assets/abstract-shapes.png";
import { Button } from "@/components/ui/button";

const brandLogos = [
  "Meridian",
  "Elevate",
  "Catalyst",
  "Nexus",
  "Prism",
  "Vertex",
];

const SocialProof = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Opening statement */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Built for those who
            <span className="block bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              demand more
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join the organizations that chose excellence over convenience.
          </p>
        </div>
        
        {/* Logo Cloud */}
        <div className="mb-24">
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 items-center">
            {brandLogos.map((name, idx) => (
              <div 
                key={idx} 
                className="text-2xl md:text-3xl font-bold text-muted-foreground/25 hover:text-primary/50 transition-all duration-500 cursor-default"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured Story - Abstract approach */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Abstract Image */}
            <div className="relative animate-fade-in order-2 lg:order-1">
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl opacity-50" />
              <img 
                src={abstractShapes} 
                alt="Abstract fluid shapes representing seamless workflow"
                className="relative rounded-3xl w-full"
              />
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-lg">Seamless integration</p>
                    <p className="text-sm text-muted-foreground">Works with tools you already use</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-xl">∞</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="relative animate-fade-in-up order-1 lg:order-2" style={{ animationDelay: "0.15s" }}>
              <Quote className="w-20 h-20 text-primary/8 mb-4" />
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-snug mb-10">
                "This isn't software. It's a{" "}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  philosophy
                </span>
                {" "}of how work should feel."
              </blockquote>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-lg ring-2 ring-primary/10">
                  SC
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sarah Chen</p>
                  <p className="text-muted-foreground">COO, Meridian Health Systems</p>
                </div>
              </div>
              
              {/* Results - Less clinical, more impactful */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/30">
                {[
                  { value: "3x", label: "Faster onboarding" },
                  { value: "40%", label: "Cost reduction" },
                  { value: "12hrs", label: "Weekly time saved" },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Philosophy Statement */}
        <div className="text-center mt-28 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-card/0 via-card/60 to-card/0 backdrop-blur-sm rounded-3xl py-16 px-8">
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed mb-8">
              We don't sell features.{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                We sell time back.
              </span>
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Every minute you spend wrestling with tools is a minute stolen from what matters. We're here to end that.
            </p>
            <Button variant="outline" className="rounded-xl px-6 py-5 group bg-card/50 border-border/50">
              Read our story
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
