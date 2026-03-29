import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Slideshow = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { data: slides = [] } = useQuery({
    queryKey: ["slideshow-10"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_images")
        .select("image_url, project_id, projects(title)")
        .order("display_order", { ascending: true });

      if (error) throw error;

      const all = (data || []).map((img) => ({
        image: img.image_url,
        concept: (img.projects as any)?.title || "",
        project_id: img.project_id,
      }));

      // Pick up to 2 images per project
      const perProject = new Map<string, typeof all>();
      for (const slide of all) {
        const arr = perProject.get(slide.project_id) || [];
        if (arr.length < 2) {
          arr.push(slide);
          perProject.set(slide.project_id, arr);
        }
      }
      let selected = Array.from(perProject.values()).flat();

      // Limit to 10 images
      // Shuffle first
      for (let i = selected.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selected[i], selected[j]] = [selected[j], selected[i]];
      }
      selected = selected.slice(0, 10);

      return selected;
    },
    staleTime: 1000 * 60 * 5,
  });

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current || slides.length === 0) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 600);
    },
    [current, isTransitioning, slides.length]
  );

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo, slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className="relative h-screen overflow-hidden bg-foreground">
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.image}
          alt={slide.concept}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: current === i ? 1 : 0 }}
        />
      ))}

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute bottom-16 left-12 md:left-20 lg:left-32 right-12 md:right-20 lg:right-32 z-10 flex items-end justify-between gap-8">
        <p
          className={`text-white/90 text-lg md:text-2xl font-light max-w-xl leading-relaxed ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
          style={{ transition: "opacity 0.5s ease, transform 0.5s ease" }}
        >
          {slides[current]?.concept}
        </p>

        <div className="flex gap-3 shrink-0">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                current === i
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slideshow;
