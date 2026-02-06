import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Sectors from './components/Sectors';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Languages from './components/Languages';


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Hero />
      <About />
      <Experience />
      <Sectors />
      <Education />
      <Certifications />
      <Languages />
      <Skills />
      <Achievements />
      <Contact />
    </I18nextProvider>
  );
}

export default App;
