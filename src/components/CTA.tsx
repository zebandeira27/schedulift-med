import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, Star } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(0_0%_100%/0.15),transparent)]" />
      
      {/* Abstract floating shapes */}
      <div className="absolute top-1/4 left-[10%] w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-[10%] w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-10 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Ready when you are
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1] animate-fade-in-up">
            The best time to start
            <span className="block mt-2 text-white/70">was yesterday.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            The second best time is now. Join thousands who chose to stop settling for less.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-14 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {[
              "14-day free trial",
              "No credit card",
              "5-minute setup",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-white/80">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-base px-10 py-7 rounded-xl shadow-strong text-lg font-semibold group"
            >
              Get started free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/25 text-white hover:bg-white/10 hover:border-white/40 text-base px-10 py-7 rounded-xl text-lg"
            >
              Talk to us
            </Button>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-3 mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/70 font-medium">Loved by 500+ teams</span>
          </div>

          {/* Trust badges - More universal */}
          <div className="pt-10 border-t border-white/10 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-sm text-white/50 mb-6 tracking-wide">
              Enterprise security. Startup speed.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-14 items-center">
              {["SOC 2", "GDPR", "ISO 27001", "256-bit SSL"].map((badge, idx) => (
                <div key={idx} className="text-base md:text-lg font-semibold text-white/30 tracking-wider uppercase">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
