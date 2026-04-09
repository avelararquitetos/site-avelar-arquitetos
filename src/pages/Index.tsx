import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Slideshow from "@/components/Slideshow";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Slideshow />
      <Services />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
