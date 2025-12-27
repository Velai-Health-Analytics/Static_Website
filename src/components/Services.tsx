import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Users, 
  Stethoscope, 
  Shield, 
  BarChart3, 
  Activity, 
  BrainCircuit, 
  Database
} from 'lucide-react';

const Services: React.FC = () => {
  return (
    <>
      {/* Section 1: Intro & Flagship Service */}
      <section className="min-h-screen w-full snap-start relative bg-brand-dark pt-24 md:pt-32 pb-20 px-6 flex flex-col justify-center">
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
           <div className="absolute inset-0 opacity-20" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)', 
                 backgroundSize: '30px 30px' 
               }} 
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Our Services</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A comprehensive suite of solutions designed to harness the power of data for better healthcare.
              </p>
            </motion.div>
          </div>

          {/* Flagship Service Section */}
         <motion.div 
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  /* --- HOVER ANIMATION START --- */
  whileHover={{ 
    y: -10,               // Moves up
    scale: 1.02,          // Grows slightly
    borderColor: "rgba(16, 185, 129, 0.4)", // Border turns emerald
    boxShadow: "0 20px 40px -15px rgba(16, 185, 129, 0.2)", // Emerald glow behind
    transition: { duration: 0.3, ease: "easeOut" } // Snappy hover timing
  }}
  /* --- HOVER ANIMATION END --- */
  viewport={{ once: true }}
  transition={{ duration: 0.8 }} // Keeps entrance slow and smooth
  className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-12 relative overflow-hidden cursor-pointer group" // Added cursor-pointer
>
   <div className="flex flex-col lg:flex-row gap-12 items-center">
      {/* Content */}
      <div className="flex-1">
         <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-emerald-500 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
            Flagship Service
         </div>
         <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 group-hover:text-emerald-400 transition-colors duration-300">
            Second Opinion
         </h2>
         <p className="text-gray-400 mb-8 leading-relaxed">
           Our premier offering that provides patients, healthcare professionals, and insurance agencies 
           with AI-supported medical insights. It combines cutting-edge technology with expert human 
           oversight to deliver trusted, data-driven second opinions.
         </p>
         
         <div className="space-y-4 mb-8">
            {[
              "AI-powered report analysis",
              "Review by certified medical experts",
              "Personalized recommendations"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
         </div>

         <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20">
           Explore Second Opinion
         </button>
      </div>

      {/* Illustration Placeholder */}
      <div className="flex-1 w-full">
         <div className="aspect-video w-full rounded-2xl bg-[#1e2330] border border-white/5 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 group-hover:opacity-100 transition-opacity" />
            <span className="text-gray-600 font-mono text-sm z-10 group-hover:text-white transition-colors">Illustration</span>
            
            {/* Abstract Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse group-hover:bg-emerald-500/30 transition-all duration-500" />
         </div>
      </div>
   </div>
</motion.div>
        </div>
      </section>

      {/* Section 2: Access & Grid */}
      <section className="min-h-screen w-full snap-start relative bg-brand-dark pt-24 pb-20 px-6 flex flex-col justify-center">
         {/* Background Ambience */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 opacity-20" 
                 style={{ 
                   backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)', 
                   backgroundSize: '30px 30px' 
                 }} 
            />
         </div>

         <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Access Platforms */}
          <div className="mb-24">
             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="text-center mb-12"
             >
               <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif">Access Second Opinion Platform</h2>
               <p className="text-gray-400">Our platform serves three distinct user types, each with tailored features and access levels</p>
             </motion.div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AccessCard 
                  icon={<Users className="w-6 h-6" />}
                  title="Patients"
                  desc="Access your health records, get second opinions, and connect with healthcare professionals"
                  btnText="Patient Login"
                  color="emerald"
                  delay={0}
                />
                <AccessCard 
                  icon={<Stethoscope className="w-6 h-6" />}
                  title="Healthcare Professionals"
                  desc="Collaborate with peers, provide expert opinions, and access advanced analytics tools"
                  btnText="Doctor Login"
                  color="emerald"
                  delay={0.1}
                />
                <AccessCard 
                  icon={<Shield className="w-6 h-6" />}
                  title="Insurance Agencies"
                  desc="Access risk assessment tools, verify medical opinions, and streamline claim processing"
                  btnText="Insurance Login"
                  color="emerald"
                  delay={0.2}
                />
             </div>
          </div>

          {/* Other Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
             <ServiceGridItem 
               icon={<BarChart3 className="w-6 h-6" />}
               title="Healthcare Analytics Platform"
               desc="Comprehensive analytics solution that transforms healthcare data into actionable insights for improved decision-making."
               features={["Real-time dashboards", "Predictive modeling", "Custom reporting", "Data visualization"]}
             />
             <ServiceGridItem 
               icon={<Shield className="w-6 h-6" />}
               title="Risk Assessment Tools"
               desc="Advanced risk stratification and assessment tools to identify high-risk patients and prevent adverse outcomes."
               features={["Patient risk scoring", "Early warning systems", "Readmission prediction", "Mortality risk assessment"]}
             />
             <ServiceGridItem 
               icon={<Users className="w-6 h-6" />}
               title="Population Health Management"
               desc="Tools to manage and improve the health outcomes of entire patient populations through data-driven insights."
               features={["Cohort analysis", "Outcome tracking", "Quality metrics", "Care gap identification"]}
             />
             <ServiceGridItem 
               icon={<BrainCircuit className="w-6 h-6" />}
               title="AI-Powered Diagnostics"
               desc="Machine learning algorithms that assist healthcare providers in making accurate and timely diagnoses."
               features={["Image analysis", "Pattern recognition", "Diagnostic assistance", "Clinical decision support"]}
             />
             <ServiceGridItem 
               icon={<Activity className="w-6 h-6" />}
               title="Continuous Patient Monitoring"
               desc="Real-time monitoring solutions that track patient vital signs and health metrics continuously."
               features={["Remote monitoring", "Alert systems", "Trend analysis"]}
             />
             <ServiceGridItem 
               icon={<Database className="w-6 h-6" />}
               title="Data Integration Services"
               desc="Seamless integration of healthcare data from multiple sources into a unified analytics platform."
               features={["EHR integration", "Data cleansing", "API connectivity"]}
             />
          </div>
        </div>
      </section>
    </>
  );
};

// --- Sub Components ---

const AccessCard: React.FC<{
  icon: React.ReactElement;
  title: string;
  desc: string;
  btnText: string;
  color: string;
  delay: number;
}> = ({ icon, title, desc, btnText, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-black border border-white/20 rounded-xl p-8 flex flex-col items-center text-center hover:border-emerald-500/50 transition-colors group"
  >
    <div className="w-12 h-12 rounded-lg bg-emerald-900/30 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
       {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed">
      {desc}
    </p>
    <button className="w-full py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors">
      {btnText}
    </button>
  </motion.div>
);

const ServiceGridItem: React.FC<{
  icon: React.ReactElement;
  title: string;
  desc: string;
  features: string[];
}> = ({ icon, title, desc, features }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#15171e] border border-white/10 rounded-xl p-8 hover:border-emerald-500/30 transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
         <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
           {icon}
         </div>
         <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
    </div>
    
    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
      {desc}
    </p>

    <div className="space-y-2">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
           <span>{feature}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default Services;