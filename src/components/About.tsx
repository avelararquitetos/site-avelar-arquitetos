const About = () => {
  return (
    <section id="about" className="py-32 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-minimal text-muted-foreground mb-4">SOBRE NÓS</h2>
                <h3 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                Arquitetura Contemporânea com Identidade

              </h3>
              
              <div className="space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  À frente do Avelar Arquitetos, o arquiteto Daniel Avelar transforma sonhos em projetos há mais de 13 anos no mercado mineiro. Especializado em residências exclusivas, o escritório desenvolve cada projeto como uma resposta única às necessidades e estilo de vida dos clientes, sempre com um olhar contemporâneo e atento aos detalhes.

                  Com rigor técnico e sensibilidade estética, nossos projetos unem:
                  ✔ Funcionalidade inteligente - soluções personalizadas para cada modo de viver
                  ✔ Estética contemporânea - linhas limpas e integração de materiais
                  ✔ Detalhamento preciso - desde o estudo preliminar até a execução

                  Na Avelar Arquitetos, acreditamos que a melhor arquitetura é aquela que traduz personalidade em espaços que inspiram.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Fundado em 2015, nosso estúdio concluiu mais de 200 projetos nos 
                  setores residencial, comercial e cultural. Cada projeto começa 
                  com uma escuta atenta e termina com uma execução cuidadosa.
                </p>
              </div>
            </div>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-minimal text-muted-foreground mb-6">ABORDAGEM</h4>
                <div className="space-y-6">
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Pesquisa</h5>
                    <p className="text-muted-foreground">Compreensão profunda do contexto, cultura e clima</p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Colaboração</h5>
                    <p className="text-muted-foreground">Parceria próxima com clientes, engenheiros e artesãos</p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Inovação</h5>
                    <p className="text-muted-foreground">Materiais sustentáveis e soluções de design inovadoras</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-border">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-minimal text-muted-foreground mb-2">FUNDAÇÃO</h4>
                    <p className="text-xl">2015</p>
                  </div>
                  <div>
                    <h4 className="text-minimal text-muted-foreground mb-2">PROJETOS</h4>
                    <p className="text-xl">200+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
