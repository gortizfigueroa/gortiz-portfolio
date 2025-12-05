import { useTranslation } from 'react-i18next';

export default function Experience() {
  const { t } = useTranslation();
  const experiences = t('experience.positions', { returnObjects: true });

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-slate-900">{t('experience.title')}</h2>

        <div className="space-y-12 relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-900 via-slate-400 to-slate-200" />
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-0 md:pl-20">
              <div className="absolute left-0 md:left-5 top-2 w-7 h-7 bg-slate-900 rounded-full border-4 border-slate-50 shadow-lg" />

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{exp.title}</h3>
                    <p className="text-lg text-slate-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-slate-500 font-medium mt-2 md:mt-0">{exp.period}</span>
                </div>

                <p className="text-slate-700 mb-4 leading-relaxed">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
