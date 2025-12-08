import { Calendar, Users, Bell, BarChart3, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered calendar that prevents conflicts and optimizes your day automatically.",
    highlight: "Reduce scheduling errors by 90%",
  },
  {
    icon: Users,
    title: "Patient Management",
    description: "Complete profiles with medical history, preferences, and instant access to records.",
    highlight: "360° patient view",
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    description: "SMS, email, and WhatsApp reminders that cut no-shows in half.",
    highlight: "30% fewer no-shows",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Real-time dashboards showing revenue, utilization, and patient flow.",
    highlight: "Data-driven decisions",
  },
  {
    icon: Clock,
    title: "Waitlist Management",
    description: "Fill cancellations automatically and keep your calendar optimized.",
    highlight: "Maximize revenue",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with SOC 2 Type II and full HIPAA compliance.",
    highlight: "Bank-level security",
  },
];

const Features = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Everything you need.
            <span className="block text-muted-foreground mt-2">Nothing you don't.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Built by healthcare professionals, for healthcare professionals. Every feature serves a purpose.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-medium animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-xs font-medium text-primary/80 mb-2 uppercase tracking-wider">
                    {feature.highlight}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            And dozens more features to discover...
          </p>
          <Button variant="outline" size="lg" className="rounded-xl group">
            Explore All Features
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
