import { useTranslation } from 'react-i18next';
import { Award, TrendingUp, Users, Shield, Globe, Zap } from 'lucide-react';

const iconMap: Record<string, any> = {
  Users,
  Globe,
  Shield,
  Zap,
  Award,
  TrendingUp,
};

const colorClasses: Record<string, { bg: string; icon: string; border: string; hover: string }> = {
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-500', border: 'border-emerald-100', hover: 'hover:border-emerald-300' },
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-500', border: 'border-blue-100', hover: 'hover:border-blue-300' },
  amber: { bg: 'bg-amber-50', icon: 'bg-amber-500', border: 'border-amber-100', hover: 'hover:border-amber-300' },
  rose: { bg: 'bg-rose-50', icon: 'bg-rose-500', border: 'border-rose-100', hover: 'hover:border-rose-300' }
};

export default function Achievements() {
  const { t } = useTranslation();
  const achievements = t('achievements.items', { returnObjects: true });
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-slate-900">{t('achievements.title')}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement: any, index: number) => {
            const Icon = iconMap[achievement.color === 'emerald' ? 'Users' : achievement.color === 'blue' ? 'Globe' : achievement.color === 'rose' ? 'Shield' : 'Zap'];
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
