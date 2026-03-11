import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import Location from "../components/Location";
import Navbar from "../components/Navbar";
import Services from "../components/Services";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
