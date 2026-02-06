import { useTranslation } from 'react-i18next';
import { Layers, Cloudy, UserCheck, BrainCircuit } from 'lucide-react';

const iconMap: Record<string, any> = {
	Cloudy,
	UserStar: UserCheck, // Mapping old key to new icon
	BrainCircuit,
	Layers
};

export default function Certifications() {
	const { t } = useTranslation();
	const certifications = t('certifications.items', { returnObjects: true });
	return (
		<section className="py-24 px-6 bg-white">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-5xl font-bold mb-8 text-slate-900">{t('certifications.title')}</h2>

				<p className="text-slate-600 mb-10 max-w-3xl">
					{t('certifications.description')}
				</p>

				<div className="grid md:grid-cols-2 gap-6">
					{certifications.map((c: any) => {
						const Icon = iconMap[c.icon];
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