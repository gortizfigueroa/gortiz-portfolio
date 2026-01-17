import { useTranslation } from 'react-i18next';

export default function Skills() {
  const { t } = useTranslation();
  const skillCategories = t('skills.categories', { returnObjects: true });
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-slate-900">{t('skills.title')}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 rounded-lg text-sm text-slate-700 font-medium border border-slate-300 hover:border-slate-400 hover:bg-slate-200 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
