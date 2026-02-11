import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
const Portfolio = () => {
  const projects = [{
    image: project1,
    title: "CASA LAGOA",
    location: "LAGOA SANTA",
    description: "A contemporary home focusing on light, space, and material honesty"
  }, {
    image: project2,
    title: "CORPORATE HEADQUARTERS",
    location: "LONDON, 2023",
    description: "Modern office space emphasizing collaboration and natural elements"
  }, {
    image: project3,
    title: "CULTURAL CENTER",
    location: "TOKYO, 2023",
    description: "Public architecture that bridges tradition with contemporary design"
  }];
  return <section id="work" className="py-32 bg-muted">
      <div className="mx-auto px-12 md:px-20 lg:px-32">
        <div className="mb-20">
          <h2 className="text-minimal text-muted-foreground mb-4">SELECTED WORK</h2>
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