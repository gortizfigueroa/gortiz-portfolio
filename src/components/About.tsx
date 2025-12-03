import { Code2, Users, TrendingUp, Globe } from 'lucide-react';

export default function About() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-slate-900">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              My journey began as a full-stack developer in 2008, building applications across Java, PHP, and .NET.
              Over 16 years, I've progressively grown into enterprise architecture and technical leadership,
              realizing that my greatest impact comes from enabling teams to build exceptional systems.
            </p>
            <p>
              Today, as Head of Engineering at Flight Centre Travel Group, I lead 100+ engineers across
              global markets. I architect cloud-native platforms, drive organizational transformations,
              and foster cultures where innovation and excellence thrive.
            </p>
            <p>
              My approach merges hands-on technical depth—from microservices and cloud infrastructure to
              security and DevOps—with strategic leadership that aligns engineering excellence with business goals.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise Architecture</h3>
              <p className="text-slate-700">
                Expertise in microservices, cloud-native systems, API-oriented ecosystems, and scalable infrastructure
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Global Team Leadership</h3>
              <p className="text-slate-700">
                Leading distributed teams across 6+ continents, driving organizational transformation and talent development
              </p>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Platform Transformation</h3>
              <p className="text-slate-700">
                Cloud migrations, security & compliance at scale (ISO27001, PCI DSS), and enterprise-wide modernization initiatives
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
