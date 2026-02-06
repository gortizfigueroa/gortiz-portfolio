import { useTranslation } from 'react-i18next';
import { BookOpen, Code } from 'lucide-react';

const iconMap: Record<string, any> = {
    BookOpen,
    Code
};

interface EducationItem {
    degree: string;
    institution: string;
    period: string;
    icon: string;
    website?: string;
    isLogo?: boolean;
    description: string;
}

export default function Education() {
    const { t } = useTranslation();
    const education = t('education.items', { returnObjects: true }) as EducationItem[];

    return (
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold mb-12 text-slate-900">{t('education.title')}</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {education.map((item, index) => {
                        const Icon = iconMap[item.icon] || BookOpen;

                        const CardContent = (
                            <>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex-shrink-0 w-16 h-16 flex items-center justify-center">
                                        {item.isLogo ? (
                                            <img src={item.icon} alt={item.institution} className="w-full h-full object-contain" />
                                        ) : (
                                            <Icon className="w-8 h-8 text-slate-700" />
                                        )}
                                    </div>
                                    <span className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full border border-slate-200">{item.period}</span>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{item.degree}</h3>
                                    <p className="text-slate-600 font-medium">{item.institution}</p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-slate-100">
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </>
                        );

                        return item.website ? (
                            <a
                                key={index}
                                href={item.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-slate-300 flex flex-col h-full group"
                            >
                                {CardContent}
                            </a>
                        ) : (
                            <div key={index} className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200 flex flex-col h-full">
                                {CardContent}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
