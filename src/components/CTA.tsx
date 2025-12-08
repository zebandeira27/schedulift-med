import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap, Star } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0_0%_100%/0.1),transparent_50%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            Join 500+ clinics already thriving
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in-up">
            Stop managing chaos.
            <span className="block mt-2 text-white/80">Start delivering care.</span>
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            The average clinic saves 15 hours per week with ClinicFlow. Imagine what you could do with that time.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {[
              "14-day free trial",
              "No credit card required",
              "Setup in 5 minutes",
              "Cancel anytime",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-white/90">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-base px-10 py-7 rounded-xl shadow-strong text-lg font-semibold"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-base px-10 py-7 rounded-xl text-lg"
            >
              Schedule a Demo
            </Button>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-3 mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/80 font-medium">4.9/5 from 200+ reviews</span>
          </div>

          {/* Trust badges */}
          <div className="pt-8 border-t border-white/10 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-sm text-white/60 mb-6">
              Enterprise-grade security & compliance
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
              {["HIPAA Certified", "SOC 2 Type II", "GDPR Ready", "256-bit SSL"].map((badge, idx) => (
                <div key={idx} className="text-lg md:text-xl font-bold text-white/40 tracking-wider">
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
