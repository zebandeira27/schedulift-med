import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, languages, Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const currentLanguage = languages.find(l => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="gap-2 px-3 hover:bg-primary/5 transition-all duration-300 group"
        >
          <Globe className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-sm font-medium hidden sm:inline">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 p-2 bg-card/95 backdrop-blur-xl border-border/50 shadow-strong animate-scale-in"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200",
              language === lang.code 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-muted"
            )}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && (
              <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
