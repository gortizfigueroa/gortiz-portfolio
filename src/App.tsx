import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <About />
      <Experience />
      <Certifications />
      <Skills />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
