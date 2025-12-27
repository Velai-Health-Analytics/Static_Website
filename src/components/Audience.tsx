import React from 'react';
import { motion } from 'framer-motion';
import { User, Building2, FileText, ArrowRight } from 'lucide-react';

const audiences = [
  {
    id: "patients",
    icon: <User className="w-10 h-10" />,
    title: "Patients",
    desc: "Take control of your heart health with app-based monitoring.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "professionals",
    icon: <Building2 className="w-10 h-10" />,
    title: "Providers",
    desc: "Reduce burnout and improve diagnostic accuracy with AI assistance.",
    color: "from-emerald-500 to-green-500"
  },
  {
    id: "insurers",
    icon: <FileText className="w-10 h-10" />,
    title: "Insurers",
    desc: "Data-driven risk models that lower costs and improve population health.",
    color: "from-purple-500 to-pink-500"
  }
];

const Audience: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black relative px-6 overflow-hidden py-20">
      
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80" />

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Built for the <br/> Ecosystem</h2>
          <p className="text-gray-400 text-lg">Connecting every stakeholder in the cardiac care journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative h-96 rounded-3xl overflow-hidden bg-gray-900/50 border border-white/10 flex flex-col items-center justify-center p-8 text-center"
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className={`w-20 h-20 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                 {item.icon}
              </div>
              
              <h3 className="text-2xl font-medium text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-8">{item.desc}</p>
              
              <div className="flex items-center gap-2 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Audience;