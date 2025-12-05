import { ArrowDown, Linkedin, Mail, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import '../i18n'; // Import the i18n configuration

export default function Hero() {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const GithubIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.32 3.53 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.61-5.49 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0012 .5z" />
    </svg>
  );

  const StackOverflowIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M17.5 20.5h-11v-3h11v3zm-8.9-4.2l7.6 1.7.6-3-7.6-1.7-.6 3zm1.3-5.3l6.9 3 1.2-2.9-6.9-3-1.2 2.9zm2.9-5.3l5.5 4.2 1.8-2.4-5.5-4.2-1.8 2.4zM6.2 17.8H4v-11h2.2v11z" />
    </svg>
  );

  const CredlyIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Language Dropdown */}
      <div className="absolute top-4 right-4">
        <button onClick={toggleDropdown} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
          {t('changeLanguage')}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white/10 rounded-lg shadow-lg">
            <button
              onClick={() => changeLanguage('en')}
              className="block px-4 py-2 hover:bg-white/20 transition-all duration-300"
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('es')}
              className="block px-4 py-2 hover:bg-white/20 transition-all duration-300"
            >
              Español
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        
        <div className="animate-fade-in">
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            {t('hero.name')}
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 mb-4">
            {t('hero.title')}
          </p>
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          <p className="text-slate-400 mb-12">Based in Barcelona, Spain</p>

          

          <div className="flex gap-6 justify-center mb-6">
            <a
              href="https://www.linkedin.com/in/guillermoortizfigueroa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label={t('hero.linkedin')}
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.guillermoortiz.es"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label={t('hero.website')}
            >
              <Globe className="w-6 h-6" />
            </a>
            <a
              href="mailto:guillermo@guillermoortiz.es"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label={t('hero.email')}
            >
              <Mail className="w-6 h-6" />
            </a>

            <a
              href="https://github.com/gortizfigueroa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label={t('hero.github')}
            >
              <GithubIcon />
            </a>

            <a
              href="https://stackoverflow.com/users/159218/guillermo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label={t('hero.stackoverflow')}
            >
              <StackOverflowIcon />
            </a>

            <a
              href="https://www.credly.com/users/guillermo-ortiz-figueroa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label={t('hero.credly')}
            >
              <CredlyIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-slate-400" />
      </div>
    </section>
  );
}
