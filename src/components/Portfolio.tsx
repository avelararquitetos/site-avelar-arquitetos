import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
const Portfolio = () => {
  const projects = [{
    image: project1,
    title: "CASA LAGOA",
    location: "LAGOA SANTA - MG",
    description: "Uma casa contemporânea focada em luz, espaço e honestidade material"
  }, {
    image: project2,
    title: "CASA SETE",
    location: "NOVA LIMA - MG",
    description: "Espaço de escritório moderno enfatizando colaboração e elementos naturais"
  }, {
    image: project3,
    title: "CENTRO CULTURAL",
    location: "TÓQUIO, 2023",
    description: "Arquitetura pública que conecta tradição com design contemporâneo"
  }];
  return <section id="work" className="py-32 bg-muted">
      <div className="mx-auto px-12 md:px-20 lg:px-32">
        <div className="mb-20">
          <h2 className="text-minimal text-muted-foreground mb-4">TRABALHOS SELECIONADOS</h2>
          <h3 className="text-4xl md:text-6xl font-light text-architectural">Nossos Projetos</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {projects.map((project, index) => <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full aspect-[4/5] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              </div>
              
              <div className="mt-6">
                <h4 className="text-xl font-light text-architectural mb-1">
                  {project.title}
                </h4>
                <p className="text-minimal text-muted-foreground">
                  {project.location}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Portfolio;
