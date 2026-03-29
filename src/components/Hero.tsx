import heroImage from "@/assets/hero-architecture.jpg";
import logo from "@/assets/logo.png";
const Hero = () => {
  return <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }} />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 flex flex-col items-center gap-10">
        <img src={logo} alt="Avelar Arquitetos" className="w-[280px] md:w-[420px] lg:w-[560px] h-auto object-contain invert reveal" />
        <a href="/work" className="inline-block border border-white text-white text-minimal px-10 py-4 hover:bg-white hover:text-black transition-all duration-500 reveal-delayed">
          Ver Projetos
        </a>
      </div>
    </section>;
};
export default Hero;