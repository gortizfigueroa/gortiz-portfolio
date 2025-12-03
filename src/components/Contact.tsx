import { Mail, Linkedin, MapPin, Globe, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-24 px-6 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-center">Get In Touch</h2>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xl text-slate-300 leading-relaxed">
            Always open to discussing engineering challenges, mentoring opportunities,
            and strategic technology initiatives. Let's connect!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          <a
            href="mailto:guillermo@guillermoortiz.es"
            className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-slate-300 text-sm break-all">guillermo@guillermoortiz.es</p>
          </a>

          <a
            href="tel:+34680577753"
            className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-slate-300 text-sm">+34 680 577 753</p>
          </a>

          <a
            href="https://www.linkedin.com/in/guillermoortizfigueroa"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Linkedin className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">LinkedIn</h3>
            <p className="text-slate-300 text-sm">Connect with me</p>
          </a>

          <a
            href="https://www.guillermoortiz.es"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">Website</h3>
            <p className="text-slate-300 text-sm">guillermoortiz.es</p>
          </a>

          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="text-slate-300 text-sm">Barcelona, Spain</p>
          </div>
        </div>

        <div className="text-center text-slate-400 border-t border-white/10 pt-8">
          <p>&copy; 2024 Guillermo Ortiz. Leading global engineering excellence.</p>
        </div>
      </div>
    </section>
  );
}
