import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Slideshow from "@/components/Slideshow";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Hero />
      <Slideshow />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
