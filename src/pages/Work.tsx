import { useState } from "react";
import Navigation from "@/components/Navigation";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const projects = [
    {
      image: project1,
      title: "CASA LAGOA",
      location: "LAGOA SANTA MG",
      category: "CASA LAGOA",
      description: "Uma casa contemporânea focada em luz, espaço e honestidade material. O design enfatiza linhas limpas e materiais naturais.",
      area: "450 M²",
      year: "2024"
    },
    {
      image: project2,
      title: "CASA SETE",
      location: "SETE LAGOAS MG",
      category: "CASA SETE",
      description: "Espaço de escritório moderno enfatizando colaboração e elementos naturais. Apresenta espaços de trabalho flexíveis e princípios de design sustentável.",
      area: "1200 M²",
      year: "2023"
    },
    {
      image: project3,
      title: "CASA DO VALE",
      location: "TÓQUIO, 2023",
      category: "CASA DO VALE",
      description: "Arquitetura pública que conecta tradição com design contemporâneo. Um espaço para encontros comunitários e intercâmbio cultural.",
      area: "800 M²",
      year: "2023"
    },
    {
      image: project1,
      title: "APARTAMENTO NL",
      location: "NOVA LIMA MG",
      category: "APTº NL",
      description: "Herança industrial encontra vida contemporânea. Materiais brutos equilibrados com detalhes refinados.",
      area: "180 M²",
      year: "2024"
    },
    {
      image: project2,
      title: "ESPAÇO GALERIA",
      location: "PARIS, 2022",
      category: "CULTURAL",
      description: "Galeria minimalista projetada para exibir arte sem distração. Espaços brancos puros com iluminação cuidadosamente controlada.",
      area: "600 M²",
      year: "2022"
    },
    {
      image: project3,
      title: "HOTEL BOUTIQUE",
      location: "MILÃO, 2023",
      category: "HOTELARIA",
      description: "Hospitalidade de luxo redefinida através da contenção arquitetônica. Cada detalhe cuidadosamente pensado para a experiência do hóspede.",
      area: "2400 M²",
      year: "2023"
    }
  ];

  const categories = ["TODOS", "\n", "\n", "\n", "\n"];

  const filteredProjects = activeCategory === "TODOS" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl font-light text-architectural mb-8">
                NOSSOS PROJETOS
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Uma seleção curada dos nossos projetos arquitetônicos, cada um contando uma história 
                única através de design cuidadoso e atenção meticulosa aos detalhes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-minimal transition-colors duration-300 relative group ${
                    activeCategory === category 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                  <span className={`absolute bottom-0 left-0 w-full h-px bg-foreground transition-transform duration-300 origin-left ${
                    activeCategory === category 
                      ? "scale-x-100" 
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
              {filteredProjects.map((project, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-8">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2">
                      <span className="text-minimal text-foreground">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-light text-architectural mb-2 group-hover:text-muted-foreground transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="text-minimal text-muted-foreground">
                        {project.location}
                      </p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex gap-8 pt-4 border-t border-border">
                      <div>
                        <p className="text-minimal text-muted-foreground mb-1">ÁREA</p>
                        <p className="text-foreground">{project.area}</p>
                      </div>
                      <div>
                        <p className="text-minimal text-muted-foreground mb-1">ANO</p>
                        <p className="text-foreground">{project.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
              Pronto Para Iniciar
              <br />
              Seu Projeto?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Vamos conversar sobre como podemos dar vida à sua visão arquitetônica
            </p>
            <a 
              href="/contact" 
              className="inline-block text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group"
            >
              ENTRE EM CONTATO
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground group-hover:bg-muted-foreground transition-colors duration-300"></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
