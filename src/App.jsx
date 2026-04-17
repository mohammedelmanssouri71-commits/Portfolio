import "./styles/globals.css";
import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./pages/Hero";
import { About } from "./pages/About";
import { Skills } from "./pages/Skills";
import { Projects } from "./pages/Projects";
import { Certifications } from "./pages/Certifications";
import { Contact } from "./pages/Contact";
import { MagneticCursor } from "./components/animations/MagneticCursor";
import { BootSequence } from "./components/animations/BootScreen";

export default function App() {
  return (
    <I18nProvider defaultLang="fr">
      <ThemeProvider>
        <MagneticCursor />
        <BootSequence>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            {/* <Certifications /> */}
            <Contact />
          </main>
          <Footer />
        </BootSequence>
      </ThemeProvider>
    </I18nProvider>
  );
}
