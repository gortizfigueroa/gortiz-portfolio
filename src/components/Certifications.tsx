import { Award, Cloud, Users, FileText, Zap } from 'lucide-react';

const certifications = [
	{
		title: 'AWS Certified Solutions Architect – Associate',
		org: 'Amazon Web Services',
		href: 'https://www.credly.com/badges/b7c9fed3-a07b-4d73-bf07-bce48f77c07f',
		desc: 'Designing distributed systems on AWS with best practices for scalability and resilience.',
		icon: Cloud,
	},
	{
		title: 'AWS Certified Cloud Practitioner',
		org: 'Amazon Web Services',
		href: 'https://www.credly.com/badges/5e34ee99-e63d-46b2-8c5d-add3829a496e',
		desc: 'Foundational knowledge of AWS cloud services and best practices.',
		icon: Cloud,
	},
	{
		title: 'Azure AI Engineer Associate',
		org: 'Microsoft',
		href: 'https://www.credly.com/badges/7b6fef3d-8c55-4e05-bca9-3b435ba21870',
		desc: 'Design and implement AI solutions using Azure AI services.',
		icon: Zap,
	},
	{
		title: 'Azure Fundamentals',
		org: 'Microsoft',
		href: 'https://www.credly.com/badges/26cf01fa-08bb-4780-98bd-97373426805f',
		desc: 'Foundational knowledge of Azure cloud services and concepts.',
		icon: Cloud,
	},
	{
		title: 'Professional Scrum Master I',
		org: 'Scrum.org',
		href: 'https://www.credly.com/badges/d5f8654a-93be-47f4-b89a-8f2e6452008c',
		desc: 'Expertise in Agile and Scrum methodologies for team leadership.',
		icon: Users,
	},
	{
		title: 'Magnolia Associate Developer Certificate',
		org: 'Magnolia',
		href: 'https://www.magnolia-cms.com/services/education/certification.html',
		desc: 'Development and implementation skills for Magnolia CMS platform.',
		icon: FileText,
	},
	{
		title: 'Adobe Certified Expert – AEM Sites Business Practitioner',
		org: 'Adobe',
		href: 'https://www.credly.com/badges/bee0ece2-05ab-4611-9da9-23b669f01d4f',
		desc: 'Expertise in Adobe Experience Manager Sites business practices.',
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