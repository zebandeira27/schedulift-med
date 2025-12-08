import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Emily Rodriguez",
    role: "Medical Director",
    clinic: "Wellness Family Clinic",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    content: "ClinicFlow transformed how we manage appointments. Our no-show rate dropped by 35% and staff productivity increased significantly.",
  },
  {
    name: "Dr. James Mitchell",
    role: "Practice Manager",
    clinic: "HealthCare Plus",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
    content: "The automated reminders alone have saved us countless hours. The analytics dashboard gives us insights we never had before.",
  },
  {
    name: "Sarah Thompson",
    role: "Office Administrator",
    clinic: "Community Health Center",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    content: "Easy to use, reliable, and the support team is exceptional. Our patients love the reminder system.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Loved by healthcare professionals
          </h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of clinics already transforming their patient care.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card p-8 rounded-2xl border border-border/50 h-full flex flex-col">
                <Quote className="w-10 h-10 text-primary/20 mb-6" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground leading-relaxed flex-grow mb-8">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/10"
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.clinic}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;