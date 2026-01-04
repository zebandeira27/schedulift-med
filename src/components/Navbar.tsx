import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 glass border-b-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft">
              <span className="text-primary-foreground font-bold text-lg font-display">I</span>
            </div>
            <span className="text-xl font-bold text-foreground font-display tracking-tight">Inturi</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium text-sm">
              {t('nav.features')}
            </a>
            <Link to="/patient-history" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium text-sm">
              {t('nav.patientHistory')}
            </Link>
            <a href="/#pricing" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium text-sm">
              {t('nav.pricing')}
            </a>
            <a href="/#testimonials" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium text-sm">
              {t('nav.testimonials')}
            </a>
            <a href="/#contact" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium text-sm">
              {t('nav.contact')}
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/auth">
              <Button variant="ghost" className="font-medium">{t('nav.signIn')}</Button>
            </Link>
            <Button className="font-medium shadow-soft hover:shadow-medium transition-all duration-300">{t('nav.startTrial')}</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              <a
                href="/#features"
                className="text-foreground/80 hover:text-primary hover:bg-muted transition-all duration-300 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.features')}
              </a>
              <Link
                to="/patient-history"
                className="text-foreground/80 hover:text-primary hover:bg-muted transition-all duration-300 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.patientHistory')}
              </Link>
              <a
                href="/#pricing"
                className="text-foreground/80 hover:text-primary hover:bg-muted transition-all duration-300 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.pricing')}
              </a>
              <a
                href="/#testimonials"
                className="text-foreground/80 hover:text-primary hover:bg-muted transition-all duration-300 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.testimonials')}
              </a>
              <a
                href="/#contact"
                className="text-foreground/80 hover:text-primary hover:bg-muted transition-all duration-300 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.contact')}
              </a>
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border/50">
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full font-medium">
                    {t('nav.signIn')}
                  </Button>
                </Link>
                <Button className="w-full font-medium shadow-soft">{t('nav.startTrial')}</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;