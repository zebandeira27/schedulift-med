import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Emily Rodriguez",
    role: "Medical Director",
    clinic: "Wellness Family Clinic",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    content: "ClinicFlow transformed how we manage appointments. Our no-show rate dropped by 35% and staff productivity increased significantly. It's incredibly intuitive.",
    rating: 5,
  },
  {
    name: "Dr. James Mitchell",
    role: "Practice Manager",
    clinic: "HealthCare Plus",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
    content: "The automated reminders alone have saved us countless hours. The analytics dashboard gives us insights we never had before. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sarah Thompson",
    role: "Office Administrator",
    clinic: "Community Health Center",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    content: "Switching to ClinicFlow was the best decision for our clinic. Easy to use, reliable, and the support team is exceptional. Our patients love the reminder system.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of clinics already saving time and improving patient care with ClinicFlow.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card hover:shadow-medium transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.clinic}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
