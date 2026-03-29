import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import ProjectLightbox from "@/components/ProjectLightbox";

const Portfolio = () => {
  const [lightbox, setLightbox] = useState<{ images: string[]; title: string } | null>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["portfolio-covers"],
    queryFn: async () => {
      const { data: projectsData, error: projError } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (projError) throw projError;

      const { data: imagesData, error: imgError } = await supabase
        .from("project_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (imgError) throw imgError;

      return (projectsData || [])
        .map((project) => {
          const projectImages = (imagesData || []).filter(
            (img) => img.project_id === project.id
          );
          const cover = projectImages.find((img) => img.is_cover) || projectImages[0];
          return {
            ...project,
            coverImage: cover?.image_url || "",
            images: projectImages.map((img) => img.image_url),
          };
        })
        .filter((p) => p.coverImage);
    },
  });

  return (
    <section id="work" className="py-32 bg-muted">
      <div className="mx-auto px-12 md:px-20 lg:px-32">
        <div className="mb-20">
          <h2 className="text-minimal text-muted-foreground mb-4">TRABALHOS SELECIONADOS</h2>
          <h3 className="text-4xl md:text-6xl font-light text-architectural">Nossos Projetos</h3>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-[4/5] bg-muted-foreground/10 rounded" />
                <div className="mt-6 h-5 w-1/2 bg-muted-foreground/10 rounded" />
                <div className="mt-2 h-4 w-1/3 bg-muted-foreground/10 rounded" />
              </div>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                onClick={() =>
                  setLightbox({ images: project.images, title: project.title })
                }
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-6">
                  <h4 className="text-xl font-light text-architectural mb-1">
                    {project.title}
                  </h4>
                  <p className="text-minimal text-muted-foreground">
                    {project.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-12">
            Nenhum projeto cadastrado ainda.
          </p>
        )}
      </div>

      {lightbox && (
        <ProjectLightbox
          images={lightbox.images}
          title={lightbox.title}
          isOpen={!!lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
};

export default Portfolio;
