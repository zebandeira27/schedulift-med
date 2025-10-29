import { Calendar, Users, Bell, BarChart3, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Intelligent calendar system with automated reminders and conflict prevention for seamless appointment management.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Patient Management",
    description: "Complete patient profiles, medical history tracking, and instant access to all essential information.",
    color: "accent",
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    description: "Reduce no-shows with SMS and email reminders sent automatically to patients before appointments.",
    color: "primary",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Real-time insights into clinic performance, revenue tracking, and patient flow optimization.",
    color: "accent",
  },
  {
    icon: Clock,
    title: "Waitlist Management",
    description: "Automatically fill cancellations with waitlisted patients to maximize clinic utilization.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with full HIPAA compliance to protect sensitive patient data.",
    color: "accent",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything Your Clinic Needs
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to streamline operations and improve patient care at every touchpoint.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-medium transition-all duration-300 border-border bg-gradient-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                      feature.color === "primary" ? "bg-primary-lighter" : "bg-accent-light"
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${feature.color === "primary" ? "text-primary" : "text-accent"}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
