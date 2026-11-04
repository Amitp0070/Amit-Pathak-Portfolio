import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Education from "./Education";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Outro from "./Outro";
import Footer from "./Footer";
import ScrollProgress from "./anim/ScrollProgress";
import DotCursor from "./anim/DotCursor";
import { useSmoothScroll } from "./anim/useSmoothScroll";
import { useMagnetic } from "./anim/useMagnetic";
import "./index.css";

const App = () => {
  useSmoothScroll();
  // magnetic pull on tagged primary buttons; runs after children mount
  useMagnetic(".btn-primary.magnetic");

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>
      <DotCursor />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        {/* <Certifications /> */}
        <Contact />
        <Outro />
      </main>
      <Footer />
    </div>
  );
};

export default App;
