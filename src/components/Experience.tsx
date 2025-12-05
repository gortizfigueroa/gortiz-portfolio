import { useTranslation } from 'react-i18next';

const experiences = [
  {
    title: 'Head of Engineering',
    company: 'Flight Centre Travel Group',
    period: 'November 2024 - Present',
    description: 'Leading 100+ engineers across global markets, driving global platform transformation, cloud migration, and security/compliance initiatives at scale.',
    highlights: [
      'Led 100+ engineers across Spain, UK, USA, Sweden, and South Africa',
      'Drove organizational transformation through stream-aligned team restructuring',
      'Architected migration to cloud-managed services and microservices',
      'Implemented enterprise security standards (ISO27001, PCI DSS)'
    ]
  },
  {
    title: 'CTO at FCM Lab',
    company: 'Flight Centre Travel Group',
    period: 'October 2021 - October 2024',
    description: 'Led regional innovation hub as CTO, managing engineering, QA, infrastructure, and data teams. Drove multiple architecture and security initiatives.',
    highlights: [
      'Redesigned architecture to API-oriented ecosystem with OAuth2 authorization',
      'Enhanced platform security: DevSecOps, DR/HA/BCP testing, data anonymization',
      'Implemented modern tooling: Kubernetes, Docker, DataDog, Snyk.io',
      'Built engagement across Product, Operations, Security, and Marketing teams'
    ]
  },
  {
    title: 'General Manager - Spain',
    company: 'TBSCG',
    period: 'February 2020 - September 2021',
    description: 'Country Director for Spain, building the AEM consulting practice and leading multinational teams delivering enterprise digital transformations.',
    highlights: [
      'Led Spanish team and distributed teams of 30+ engineers',
      'Built Adobe Experience Manager consulting practice',
      'Managed key accounts including Herbalife, El Corte Inglés, and Nikon',
      'Delivered enterprise transformations for global clients'
    ]
  },
  {
    title: 'Development Centre Lead - Spain',
    company: 'TBSCG',
    period: 'January 2017 - January 2020',
    description: 'Development Chapter Lead for 30+ engineers across multiple tech stacks (Java, .NET, PHP). Drove technology strategy and enterprise solution delivery.',
    highlights: [
      'Managed distributed team of 30+ engineers across Spain and Europe',
      'Built new Drupal team for European Union projects',
      'Delivered solutions for enterprise clients in energy, healthcare, telecom',
      'Introduced career path model and managed strategic business decisions'
    ]
  }
];

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-slate-900">{t('experience.title')}</h2>

        <div className="space-y-12">
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
