const skillCategories = [
  {
    title: 'Leadership & Enterprise',
    skills: ['Team Building', 'Strategic Planning', 'Organizational Design', 'Global Team Leadership', 'Stakeholder Engagement', 'P&L Management', 'Agile/Scrum']
  },
  {
    title: 'Architecture & Cloud',
    skills: ['Microservices Architecture', 'Event-Driven Systems', 'API-Oriented Ecosystems', 'Cloud Migration', 'Infrastructure as Code', 'Cloud-Native Systems', 'Kubernetes']
  },
  {
    title: 'Security & Compliance',
    skills: ['DevSecOps', 'ISO27001', 'PCI DSS', 'OAuth2 Authorization', 'SBOM', 'Data Anonymization', 'Access Segregation', 'DR/HA/BCP']
  },
  {
    title: 'Technologies & Tools',
    skills: ['Java', 'Python', '.NET', 'PHP', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'DataDog', 'GitHub', 'Azure DevOps', 'Airflow', 'Kong', 'Keycloak']
  },
  {
    title: 'CMS & Enterprise Platforms',
    skills: ['Adobe AEM', 'Magnolia CMS', 'OpenText Teamsite', 'Drupal', 'Sitecore', 'Umbraco']
  },
  {
    title: 'Methodologies',
    skills: ['CI/CD Pipelines', 'Enterprise Transformation', 'Team Restructuring', 'Architecture Redesign', 'Performance Optimization', 'Technical Leadership']
  }
];

export default function Skills() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-slate-900">Skills & Expertise</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white rounded-lg text-slate-700 font-medium border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300"
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
