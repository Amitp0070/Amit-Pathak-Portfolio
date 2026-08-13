import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollProgress from "./anim/ScrollProgress";
import { useSmoothScroll } from "./anim/useSmoothScroll";
import { useMagnetic } from "./anim/useMagnetic";
import "./index.css";

const App = () => {
  useSmoothScroll();
  // magnetic pull on tagged primary buttons; runs after children mount
  useMagnetic(".btn-primary.magnetic");

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
