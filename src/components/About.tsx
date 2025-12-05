import { Code2, Users, TrendingUp, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-slate-900">{t('about.title')}</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>{t('about.intro')}</p>
            <p>{t('about.currentRole')}</p>
            <p>{t('about.approach')}</p>
          </div>

          <div className="grid gap-6">
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('about.enterpriseArchitecture.title')}</h3>
              <p className="text-slate-700">{t('about.enterpriseArchitecture.description')}</p>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('about.globalTeamLeadership.title')}</h3>
              <p className="text-slate-700">{t('about.globalTeamLeadership.description')}</p>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('about.platformTransformation.title')}</h3>
              <p className="text-slate-700">{t('about.platformTransformation.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
