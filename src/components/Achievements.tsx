import { Award, TrendingUp, Users, Shield, Globe, Zap } from 'lucide-react';

const achievements = [
  {
    icon: Users,
    title: 'Global Team Leadership',
    description: 'Leading 100+ engineers across 6 countries (Spain, UK, USA, Sweden, South Africa) with distributed, high-performing teams',
    color: 'emerald'
  },
  {
    icon: Globe,
    title: 'Platform Transformation',
    description: 'Successfully drove global platform transformation, cloud migration, and organizational restructuring at enterprise scale',
    color: 'blue'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Implemented enterprise security standards including ISO27001, PCI DSS, and comprehensive DevSecOps practices',
    color: 'rose'
  },
  {
    icon: Zap,
    title: 'Architecture Excellence',
    description: 'Architected API-oriented ecosystem, OAuth2 authorization system, and migration to cloud-managed containerized microservices',
    color: 'amber'
  }
];

const colorClasses: Record<string, { bg: string; icon: string; border: string; hover: string }> = {
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-500', border: 'border-emerald-100', hover: 'hover:border-emerald-300' },
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-500', border: 'border-blue-100', hover: 'hover:border-blue-300' },
  amber: { bg: 'bg-amber-50', icon: 'bg-amber-500', border: 'border-amber-100', hover: 'hover:border-amber-300' },
  rose: { bg: 'bg-rose-50', icon: 'bg-rose-500', border: 'border-rose-100', hover: 'hover:border-rose-300' }
};

export default function Achievements() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-slate-900">Key Achievements</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const colors = colorClasses[achievement.color];

            return (
              <div
                key={index}
                className={`${colors.bg} p-8 rounded-2xl border ${colors.border} ${colors.hover} transition-all duration-300 hover:shadow-lg`}
              >
                <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{achievement.title}</h3>
                <p className="text-slate-700 text-lg leading-relaxed">{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
