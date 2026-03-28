const Services = () => {
  const services = [
    {
      number: "01",
      title: "RESIDENCIAL",
      description: "Projetos completos de arquitetura e design de interiores para residências — do conceito à execução, criando espaços que unem funcionalidade, conforto e identidade"
    },
    {
      number: "02",
      title: "CURADORIA DE MOBILIÁRIOS",
      description: "Seleção personalizada de mobiliário, iluminação e objetos de design, alinhados ao conceito do projeto e ao estilo de vida de cada cliente"
    },
    {
      number: "03",
      title: "CONSULTORIA",
      description: "Orientação especializada em direção criativa, planejamento espacial e soluções arquitetônicas para quem busca apoio pontual em seus projetos"
    },
    {
      number: "04",
      title: "GESTÃO DE OBRA",
      description: "Administração e acompanhamento técnico de obra, garantindo qualidade, cumprimento de prazos e fidelidade ao projeto"
    }
  ];

  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-muted-foreground mb-4">SERVIÇOS</h2>
            <h3 className="text-4xl md:text-6xl font-light text-architectural">
              O que fazemos
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="flex items-start space-x-6">
                  <span className="text-minimal text-muted-foreground font-medium">
                    {service.number}
                  </span>
                  <div>
                    <h4 className="text-2xl font-light mb-4 text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
