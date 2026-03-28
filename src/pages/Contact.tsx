import Navigation from "@/components/Navigation";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <h1 className="text-minimal text-muted-foreground mb-4">ENTRE EM CONTATO</h1>
                <h2 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                  Vamos Criar Algo
                  <br />
                  Extraordinário
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">EMAIL</h3>
                    <a href="mailto:contato@avelararquitetos.com.br" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                      contato@avelararquitetos.com.br
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">TELEFONE</h3>
                    <a href="tel:+553131572813" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                      +55 31 3157-2813
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">ESCRITÓRIO</h3>
                    <address className="text-xl not-italic">
                      Lagoa Santa
                      <br />
                      Minas Gerais, Brasil
                    </address>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-minimal text-muted-foreground mb-6">SIGA-NOS</h3>
                  <div className="space-y-4">
                    <a href="https://instagram.com/avelar.arquitetos" target="_blank" rel="noopener noreferrer" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      Instagram
                    </a>
                    <a href="#" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      LinkedIn
                    </a>
                    <a href="#" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      Behance
                    </a>
                  </div>
                </div>
                
                <div className="pt-12 border-t border-border">
                  <p className="text-muted-foreground">
                    Abordamos cada projeto com curiosidade, rigor e compromisso com a excelência. 
                    Nosso processo começa com a escuta, compreendendo sua visão e traduzindo-a 
                    em espaços que superam expectativas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
