import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import danielPhoto from "@/assets/daniel-avelar.png";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <section className="pt-32 pb-32 bg-background flex-1">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-start">
              <div>
                <img src={danielPhoto} alt="Daniel Avelar" className="w-full aspect-[3/4] object-cover object-top rounded-sm mb-6" />
                <p className="text-lg font-light text-foreground">Daniel Avelar</p>
                <p className="text-sm text-muted-foreground">Arquiteto & Fundador</p>
              </div>

              <div className="space-y-12">
                <div>
                  <h1 className="text-minimal text-muted-foreground mb-4">SOBRE NÓS</h1>
                  <h2 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                    Arquitetura Contemporânea com Identidade
                  </h2>
                  
                  <div className="space-y-8">
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line text-justify">
                      Transformando sonhos em projetos. Especializado em residências exclusivas, o escritório desenvolve cada projeto como uma resposta única às necessidades e estilo de vida dos clientes, sempre com um olhar contemporâneo e atento aos detalhes.



Com rigor técnico e sensibilidade estética, nossos projetos unem:
✔ Funcionalidade inteligente - soluções personalizadas para cada modo de viver.
✔ Estética contemporânea - linhas limpas e integração de materiais.
✔ Detalhamento preciso - desde o estudo preliminar até a execução.
                    </p>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      Na Avelar Arquitetos, acreditamos que a melhor arquitetura é aquela que traduz personalidade em espaços que inspiram.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-minimal text-muted-foreground mb-6">ABORDAGEM</h3>
                  <div className="space-y-6">
                    <div className="border-l-2 border-architectural pl-6">
                      <h4 className="text-lg font-medium mb-2">Pesquisa</h4>
                      <p className="text-muted-foreground">Compreensão profunda do contexto, cultura e clima</p>
                    </div>
                    <div className="border-l-2 border-architectural pl-6">
                      <h4 className="text-lg font-medium mb-2">Colaboração</h4>
                      <p className="text-muted-foreground">Parceria próxima com clientes</p>
                    </div>
                    <div className="border-l-2 border-architectural pl-6">
                      <h4 className="text-lg font-medium mb-2">Inovação</h4>
                      <p className="text-muted-foreground">Materiais sustentáveis e soluções de design inovadoras</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-border">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-minimal text-muted-foreground mb-2">FUNDAÇÃO</h3>
                      <p className="text-xl">2024</p>
                    </div>
                    <div>
                      <h3 className="text-minimal text-muted-foreground mb-2">PROJETOS</h3>
                      <p className="text-xl">50+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
