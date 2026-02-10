import { useState, useEffect, useCallback } from "react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import heroImage from "@/assets/hero-architecture.jpg";

const slides = [
  {
    image: project1,
    concept: "Espaços que respiram — onde a luz natural define cada ambiente.",
  },
  {
    image: project2,
    concept: "Materialidade honesta — betão, madeira e vidro em equilíbrio.",
  },
  {
    image: heroImage,
    concept: "Integração com a paisagem — arquitectura que pertence ao lugar.",
  },
  {
    image: project3,
    concept: "Forma segue intenção — cada detalhe com propósito.",
  },
];

const Slideshow = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 600);
    },
    [current, isTransitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section className="relative h-screen overflow-hidden bg-foreground">
      {/* Images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: current === i ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Concept text */}
      <div className="absolute bottom-16 left-12 md:left-20 lg:left-32 right-12 md:right-20 lg:right-32 z-10 flex items-end justify-between gap-8">
        <p
          className={`text-white/90 text-lg md:text-2xl font-light max-w-xl leading-relaxed transition-all duration-600 ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
          style={{ transition: "opacity 0.5s ease, transform 0.5s ease" }}
        >
          {slides[current].concept}
        </p>

        {/* Dots */}
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
