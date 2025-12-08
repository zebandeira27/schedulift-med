import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0_0%_100%/0.1),transparent_50%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            Get started in minutes
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in-up">
            Ready to transform your clinic?
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Join hundreds of clinics already saving time and delivering better patient care.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {[
              "14-day free trial",
              "No credit card required",
              "Setup in minutes",
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-base px-8 py-6 rounded-xl shadow-strong"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-base px-8 py-6 rounded-xl"
            >
              Schedule a Demo
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-16 pt-8 border-t border-white/10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-white/60 mb-6">
              Trusted by leading healthcare providers
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
              {["HIPAA", "SOC 2", "GDPR"].map((badge, idx) => (
                <div key={idx} className="text-xl md:text-2xl font-bold text-white/40 tracking-wider">
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