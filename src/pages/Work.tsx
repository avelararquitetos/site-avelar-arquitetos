import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import ProjectLightbox from "@/components/ProjectLightbox";

type ProjectWithImages = {
  id: string;
  title: string;
  location: string | null;
  category: string | null;
  description: string | null;
  area: string | null;
  year: string | null;
  coverImage: string;
  images: string[];
};

const Work = () => {
  const [lightbox, setLightbox] = useState<{ images: string[]; title: string } | null>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects-with-images"],
    queryFn: async () => {
      const { data: projectsData, error: projErr } = await supabase
        .from("projects")
        .select("*")
        .order("display_order");
      if (projErr) throw projErr;

      const { data: imagesData, error: imgErr } = await supabase
        .from("project_images")
        .select("*")
        .order("display_order");
      if (imgErr) throw imgErr;

      return projectsData.map((p): ProjectWithImages => {
        const projectImages = imagesData.filter((img) => img.project_id === p.id);
        const cover = projectImages.find((img) => img.is_cover);
        return {
          id: p.id,
          title: p.title,
          location: p.location,
          category: p.category,
          description: p.description,
          area: p.area,
          year: p.year,
          coverImage: cover?.image_url || projectImages[0]?.image_url || "",
          images: projectImages.map((img) => img.image_url),
        };
      }).filter((p) => p.images.length > 0);
    },
  });

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

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted h-[60vh] mb-8" />
                    <div className="h-8 bg-muted w-2/3 mb-2" />
                    <div className="h-4 bg-muted w-1/3" />
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <p className="text-center text-muted-foreground py-20 text-lg">
                Nenhum projeto publicado ainda.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="group cursor-pointer"
                    onClick={() => setLightbox({ images: project.images, title: project.title })}
                  >
                    <div className="relative overflow-hidden mb-8">
                      <img 
                        src={project.coverImage} 
                        alt={project.title}
                        className="w-full h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {project.category && (
                        <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2">
                          <span className="text-minimal text-foreground">
                            {project.category}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-light text-architectural mb-2 group-hover:text-muted-foreground transition-colors duration-500">
                          {project.title}
                        </h3>
                        {project.location && (
                          <p className="text-minimal text-muted-foreground">
                            {project.location}
                          </p>
                        )}
                      </div>
                      
                      {project.description && (
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      )}
                      
                      {(project.area || project.year) && (
                        <div className="flex gap-8 pt-4 border-t border-border">
                          {project.area && (
                            <div>
                              <p className="text-minimal text-muted-foreground mb-1">ÁREA</p>
                              <p className="text-foreground">{project.area}</p>
                            </div>
                          )}
                          {project.year && (
                            <div>
                              <p className="text-minimal text-muted-foreground mb-1">ANO</p>
                              <p className="text-foreground">{project.year}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
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

      <ProjectLightbox
        images={lightbox?.images || []}
        title={lightbox?.title || ""}
        isOpen={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
};

export default Work;
