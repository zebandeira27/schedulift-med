import { Quote } from "lucide-react";
import medicalTeam from "@/assets/medical-team.png";

const clinicLogos = [
  "HealthFirst",
  "MedCare",
  "WellnessHub",
  "PrimeCare",
  "VitalHealth",
  "CarePoint",
];

const SocialProof = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Logo Cloud */}
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
            Powering the clinics that power healthcare
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 items-center">
            {clinicLogos.map((name, idx) => (
              <div 
                key={idx} 
                className="text-xl md:text-2xl font-bold text-muted-foreground/40 hover:text-primary/60 transition-colors duration-300"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured Story */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl" />
              <img 
                src={medicalTeam} 
                alt="Medical team at HealthCare Plus clinic"
                className="relative rounded-2xl shadow-medium border border-border/50 w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-xl rounded-xl p-4 border border-border/50">
                <p className="font-semibold text-foreground">HealthCare Plus Clinic</p>
                <p className="text-sm text-muted-foreground">San Francisco, CA · 12 practitioners</p>
              </div>
            </div>
            
            {/* Quote */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <Quote className="w-16 h-16 text-primary/10 mb-6" />
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-8">
                "ClinicFlow didn't just streamline our operations—it transformed how we think about patient care. We've reduced wait times by 40% and our staff finally has time to breathe."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  JM
                </div>
                <div>
                  <p className="font-semibold text-foreground">Dr. James Mitchell</p>
                  <p className="text-muted-foreground">Medical Director, HealthCare Plus</p>
                </div>
              </div>
              
              {/* Results */}
              <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                {[
                  { value: "40%", label: "Less Wait Time" },
                  { value: "2hrs", label: "Saved Daily" },
                  { value: "35%", label: "Revenue Growth" },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Slogan */}
        <div className="text-center mt-20 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-medium text-foreground">
            From solo practitioners to multi-location networks—
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              {" "}ClinicFlow scales with you.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
