import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} Avelar Arquitetos. Todos os direitos reservados.
          </p>
          <Link
            to="/politica-de-privacidade"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 underline underline-offset-4"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
