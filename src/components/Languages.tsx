
const languages = [
  { flag: '🇪🇸', name: 'Spanish', level: 'Native' },
  { flag: '/images/flags/catalonia.svg', name: 'Catalan', level: 'Fluent', isImage: true },
  { flag: '🇬🇧', name: 'English', level: 'Fluent (Business)' },
  { flag: '🇫🇷', name: 'French', level: 'B1 (Intermediate)' },
  { flag: '🇩🇪', name: 'German', level: 'B1 (Intermediate)' },
];

export default function Languages() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Languages</h2>

        <p className="text-slate-600 mb-10 max-w-3xl">
          Multilingual communication is a core asset for international leadership and cross‑functional collaboration.
          Native Spanish, fluent Catalan and English (business level) enable effective stakeholder engagement across
          Iberia and global teams. French and German are at a B1 conversational/intermediate level — suitable for
          technical collaboration, travel and day‑to‑day interactions.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-white/10">
                {lang.isImage ? (
                  <img
                    src={lang.flag}
                    alt={`${lang.name} flag`}
                    className="w-8 h-8 object-cover rounded"
                  />
                ) : (
                  <span role="img" aria-label={`${lang.name} flag`} className="text-2xl">
                    {lang.flag}
                  </span>
                )}
              </div>

              <div>
                <div className="text-lg font-semibold text-slate-900">{lang.name}</div>
                <div className="text-sm text-slate-600">{lang.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}