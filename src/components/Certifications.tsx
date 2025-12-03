import { Award, Cloud, Server, ShieldCheck } from 'lucide-react';

const certifications = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    org: 'Amazon Web Services',
    href: 'https://www.credly.com/badges/PUT-BADGE-ID-HERE', // replace with actual badge URL
    desc: 'Designing distributed systems on AWS with best practices for scalability and resilience.',
    icon: Cloud,
  },
  {
    title: 'Google Cloud Professional Cloud Architect',
    org: 'Google Cloud',
    href: 'https://www.credly.com/badges/PUT-BADGE-ID-HERE', // replace with actual badge URL
    desc: 'Architecture, design and management of Google Cloud solutions.',
    icon: Cloud,
  },
  {
    title: 'Certified Kubernetes Administrator (CKA)',
    org: 'The Linux Foundation / CNCF',
    href: 'https://www.credly.com/badges/PUT-BADGE-ID-HERE', // replace with actual badge URL
    desc: 'Cluster administration, scheduling, networking and storage for Kubernetes.',
    icon: Server,
  },
  {
    title: 'ISO/IEC 27001 Lead Implementer',
    org: 'PECB / BSI / (replace org)',
    href: 'https://www.credly.com/badges/PUT-BADGE-ID-HERE', // replace with actual badge URL
    desc: 'Information security management, risk assessment and compliance practices.',
    icon: ShieldCheck,
  },
  {
    title: 'Full Credly profile',
    org: 'Credly',
    href: 'https://www.credly.com/users/guillermo-ortiz-figueroa',
    desc: 'Complete list of verified badges and evidence.',
    icon: Award,
  },
];

export default function Certifications() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-8 text-slate-900">Certifications</h2>

        <p className="text-slate-600 mb-10 max-w-3xl">
          Relevant professional certifications and verified badges demonstrating cloud architecture,
          container orchestration, security and compliance expertise. Click each badge to view the
          verified evidence on Credly or the issuing body.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{c.title}</h3>
                    <div className="text-sm text-slate-500 mb-2">{c.org}</div>
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}