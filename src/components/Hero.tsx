import { ArrowDown, Linkedin, Mail, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Guillermo Ortiz
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 mb-4">
            Head of Engineering
          </p>
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            CTO | Director of Engineering | Enterprise Architect
          </p>
          <p className="text-slate-400 mb-12">Based in Barcelona, Spain</p>

          <div className="flex gap-6 justify-center mb-16">
            <a
              href="https://www.linkedin.com/in/guillermoortizfigueroa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.guillermoortiz.es"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Globe className="w-6 h-6" />
            </a>
            <a
              href="mailto:guillermo@guillermoortiz.es"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-6 h-6" />
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
