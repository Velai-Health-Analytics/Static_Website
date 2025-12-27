import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ShieldCheck, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: <BarChart3 className="w-8 h-8 text-emerald-400" />,
    title: "Predictive Analytics",
    desc: "Processing millions of records to forecast cardiac events before they happen."
  },
  {
    icon: <Users className="w-8 h-8 text-blue-400" />,
    title: "Patient 360",
    desc: "A holistic view combining genomic, lifestyle, and clinical data."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
    title: "Auto-Diagnostics",
    desc: "AI-driven segmentation for radiology achieving 99% accuracy."
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Real-time Triage",
    desc: "Instant risk scoring to prioritize critical care patients."
  }
];

const Features: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center px-6 md:px-20 bg-brand-dark relative overflow-hidden py-20">
       {/* Background Decoration */}
       <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-emerald-900/10 to-transparent pointer-events-none" />
       
       <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         
         {/* Left Side: Text & Nucleo Highlight */}
         <motion.div 
           initial={{ x: -100, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.8 }}
           className="relative z-10"
         >
           <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
             Capabilities that <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
               save lives.
             </span>
           </h2>
           <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
             Our platform isn't just a tool; it's a second pair of eyes that never sleeps, powered by the world's most advanced medical AI models.
           </p>
           
           {/* Detailed Stat Block */}
           <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md inline-block">
             <div className="flex items-end gap-2 mb-1">
               <span className="text-5xl font-bold text-white">2.5x</span>
               <span className="text-sm text-emerald-400 mb-2 font-mono">FASTER</span>
             </div>
             <div className="text-gray-500 text-sm">Diagnostic turnaround time</div>
           </div>
         </motion.div>

         {/* Right Side: Staggered Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
           {features.map((feature, idx) => (
             <motion.div
               key={idx}
               initial={{ x: 100, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               viewport={{ once: false, amount: 0.3 }}
               transition={{ duration: 0.6, delay: idx * 0.1 }}
               whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
               className="p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm cursor-default hover:border-emerald-500/30 transition-colors"
             >
               <div className="mb-4 p-3 bg-black/40 rounded-lg inline-block border border-white/5">
                 {feature.icon}
               </div>
               <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
               <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
             </motion.div>
           ))}
         </div>

       </div>
    </div>
  );
};

export default Features;