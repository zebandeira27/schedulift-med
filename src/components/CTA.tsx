import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Clinic?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of clinics using ClinicFlow to reduce administrative burden and provide better patient care.
            </p>
          </div>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in-up">
            {[
              "14-day free trial",
              "No credit card required",
              "Cancel anytime",
              "Setup in minutes",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-primary-foreground/95">
                <Check className="h-5 w-5" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button
              size="lg"
              variant="secondary"
              className="text-base shadow-strong hover:shadow-medium transition-all"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Schedule a Demo
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/20 animate-fade-in">
            <p className="text-sm text-primary-foreground/80 mb-4">
              Trusted by leading healthcare providers
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-80">
              <div className="text-2xl font-bold">HIPAA</div>
              <div className="w-px h-8 bg-primary-foreground/30"></div>
              <div className="text-2xl font-bold">SOC 2</div>
              <div className="w-px h-8 bg-primary-foreground/30"></div>
              <div className="text-2xl font-bold">GDPR</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
