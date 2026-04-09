import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="hover:opacity-70 transition-opacity duration-300">
          <img src={logo} alt="Avelar Arquitetos" className="h-5 md:h-6 dark:invert" />
        </a>
        
        <div className="hidden md:flex items-center space-x-12">
          <a href="/" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">HOME</a>
          <a href="/work" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">PROJETOS</a>
          <a href="/services" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">SERVIÇOS</a>
          <a href="/about" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">SOBRE NÓS</a>
          <a href="/contact" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">CONTATO</a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
        </div>

        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </Button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            <a href="/" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              HOME
            </a>
            <a href="/work" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              PROJETOS
            </a>
            <a href="/services" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              SERVIÇOS
            </a>
            <a href="/about" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              SOBRE NÓS
            </a>
            <a href="/contact" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              CONTATO
            </a>
            
            <div className="pt-4 border-t border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>}
    </nav>;
};
export default Navigation;
