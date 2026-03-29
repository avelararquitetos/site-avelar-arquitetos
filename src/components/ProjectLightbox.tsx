import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectLightboxProps {
  images: string[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectLightbox = ({ images, title, isOpen, onClose }: ProjectLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-white/90 text-sm tracking-widest">{title}</p>
          <p className="text-white/50 text-xs mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors p-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Image area */}
      <div className="flex-1 flex items-center justify-center relative px-16">
        {images.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute left-4 text-white/50 hover:text-white transition-colors p-2 z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        <img
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          className="max-h-[80vh] max-w-full object-contain transition-opacity duration-300"
        />

        {images.length > 1 && (
          <button
            onClick={goNext}
            className="absolute right-4 text-white/50 hover:text-white transition-colors p-2 z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 py-4 px-6 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-all duration-300 ${
                idx === currentIndex
                  ? "border-white opacity-100"
                  : "border-transparent opacity-40 hover:opacity-70"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectLightbox;
