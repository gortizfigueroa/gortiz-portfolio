import { useTranslation } from 'react-i18next';
import { Plane, Briefcase, ShoppingBag, HeartPulse, Zap, Smartphone, Globe, Truck, GraduationCap, Landmark } from 'lucide-react';

const iconMap: Record<string, any> = {
    Plane,
    Briefcase,
    ShoppingBag,
    HeartPulse,
    Zap,
    Smartphone,
    Globe,
    Truck,
    GraduationCap,
    Landmark
};

export default function Sectors() {
    const { t } = useTranslation();
    const sectors = t('sectors.items', { returnObjects: true });

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold mb-16 text-slate-900">{t('sectors.title')}</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {sectors.map((sector: any, index: number) => {
                        const Icon = iconMap[sector.icon] || Globe;

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-7 h-7 text-slate-700" />
                                </div>
                                <span className="text-lg font-semibold text-slate-900 text-center">{sector.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
