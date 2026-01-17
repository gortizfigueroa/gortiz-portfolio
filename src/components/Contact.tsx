import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, MapPin, Globe, Phone } from 'lucide-react';
import { APP_CONFIG } from '../config';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-6 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-center">{t('contact.title')}</h2>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xl text-slate-300 leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          <a
            href={`mailto:${t('contact.email.value')}`}
            className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">{t('contact.email.label')}</h3>
            <p className="text-slate-300 text-sm break-all">{t('contact.email.value')}</p>
          </a>

          <a
            href={`tel:+34680577753`}
            className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">{t('contact.phone.label')}</h3>
            <p className="text-slate-300 text-sm">{t('contact.phone.value')}</p>
          </a>

          <a
            href={t('contact.linkedin.href')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Linkedin className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">{t('contact.linkedin.label')}</h3>
            <p className="text-slate-300 text-sm">{t('contact.linkedin.value')}</p>
          </a>

          <a
            href={APP_CONFIG.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">{t('contact.website.label')}</h3>
            <p className="text-slate-300 text-sm">{APP_CONFIG.websiteDisplay}</p>
          </a>

          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">{t('contact.location.label')}</h3>
            <p className="text-slate-300 text-sm">{t('contact.location.value')}</p>
          </div>
        </div>

        <div className="text-center text-slate-400 border-t border-white/10 pt-8">
          <p>{t('contact.copyright')}</p>
        </div>
      </div>
    </section>
  );
}
