import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Shield, Zap, GraduationCap, Building2 } from 'lucide-react';

const teamMembers = [
  {
    name: "Prof.Lakshminarayanan Subramanian",
    role: "Co-Founder",
    details: "New York University (AI/ML, Health, Systems)",
    sub: "Co-founder Entrupy, Flipped.ai, Vel.ai",
    color: "emerald",
    image: "/team/lakshmi.jpg" // Add image URL here
  },
  {
    name: "Shivaram Velayutham",
    role: "Co-Founder",
    details: "B.Tech + M.Tech in Biological Engineering",
    sub: "IIT Madras",
    color: "blue",
    image: "/team/me.jpeg" // Add image URL here
  },
  {
    name: "Dr. Anuva Kapoor",
    role: "Co-Founder",
    details: "Junior Resident in Community and Family Medicine",
    sub: "AIIMS Nagpur",
    color: "purple",
    image: "/team/anuva.jpeg" // Add image URL here
  },
  {
    name: "Prof. Balaraman Ravindran",
    role: "Advisor",
    details: "Head of Data Science and AI Department (IIT Madras)",
    sub: "PhD @ UMass",
    color: "yellow",
    image: "/team/ravindran.jpg" // Add image URL here
  },
  {
    name: "Dr. Bhanu Duggal",
    role: "Advisor",
    details: "AIIMS Rishikesh (Cardiology), JJ Hospitals (Cardiac Surgeon)",
    sub: "Fellowship @ Cleveland Clinic",
    color: "rose",
    image: "/team/bhanu.jpeg" // Add image URL here
  },
  {
    name: "Dr. Mona Duggal",
    role: "Advisor",
    details: "Director: ICMR- National Institute for Research in Digital Health",
    sub: "New Delhi",
    color: "cyan",
    image: "/team/monaduggal.jpg" // Add image URL here
  }
];

const values = [
  { text: "Innovation in healthcare technology", icon: <Zap className="w-4 h-4" /> },
  { text: "Patient-centered care approach", icon: <Heart className="w-4 h-4" /> },
  { text: "Data privacy and security", icon: <Shield className="w-4 h-4" /> },
  { text: "Continuous improvement", icon: <Target className="w-4 h-4" /> },
];

const About: React.FC = () => {
  return (
    <>
      {/* Section 1: Mission & Values */}
      <section className="min-h-screen w-full snap-start relative overflow-hidden flex items-center justify-center bg-brand-dark px-6 py-20">
         {/* Background Grid Pattern */}
         <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)', 
                 backgroundSize: '30px 30px' 
               }} 
         />
         
         <div className="max-w-7xl mx-auto w-full z-10 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               
               {/* Mission */}
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="space-y-6"
               >
                 <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-mono mb-2">
                   OUR MISSION
                 </div>
                 <h2 className="text-4xl md:text-5xl font-serif leading-tight text-white">
                   Transforming healthcare through <span className="text-emerald-400">intelligent insights.</span>
                 </h2>
                 <p className="text-gray-400 text-lg leading-relaxed">
                   To transform healthcare delivery by providing cutting-edge analytics and insights that 
                   enable healthcare providers to deliver personalized, proactive, and precise care to every 
                   patient. We believe that data-driven healthcare is the future.
                 </p>
               </motion.div>

               {/* Values Card */}
               <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="relative"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-3xl opacity-20" />
                  <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                    <h3 className="text-2xl font-serif mb-6 text-white">Our Values</h3>
                    <div className="space-y-4">
                      {values.map((val, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                            {val.icon}
                          </div>
                          <span>{val.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Section 2: Team */}
      <section className="min-h-screen w-full snap-start relative overflow-hidden flex items-center justify-center bg-brand-dark px-6 py-20">
         {/* Background Grid Pattern */}
         <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)', 
                 backgroundSize: '30px 30px' 
               }} 
         />

         <div className="max-w-7xl mx-auto w-full z-10 pt-20">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-6"
           >
             <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">Our Team</h2>
             <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
               A convergence of medical expertise and artificial intelligence research from the world's leading institutions.
             </p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
             {teamMembers.map((member, idx) => (
               <TeamCard key={idx} member={member} index={idx} />
             ))}
           </div>
         </div>
      </section>
    </>
  );
};

const TeamCard: React.FC<{ member: any, index: number }> = ({ member, index }) => {
  // Color mapping for dynamic styles
  const colorStyles: any = {
    emerald: "from-emerald-500 to-teal-500 border-emerald-500/30 text-emerald-400",
    blue: "from-blue-500 to-indigo-500 border-blue-500/30 text-blue-400",
    purple: "from-purple-500 to-fuchsia-500 border-purple-500/30 text-purple-400",
    yellow: "from-yellow-500 to-orange-500 border-yellow-500/30 text-yellow-400",
    rose: "from-rose-500 to-pink-500 border-rose-500/30 text-rose-400",
    cyan: "from-cyan-500 to-sky-500 border-cyan-500/30 text-cyan-400",
  };
  
  const style = colorStyles[member.color] || colorStyles.emerald;
  const initials = member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group bg-white/5 border border-white/5 hover:border-white/20 rounded-xl p-4 md:p-6 relative overflow-hidden transition-all duration-300"
    >
      {/* Abstract Background Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${style.split(' ')[0]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div
          className={`w-32 h-32 md:w-36 md:h-36 lg:w-24 lg:h-24
                      rounded-2xl bg-gradient-to-br ${style.split(' ')[0]}
                      p-[1px] relative shadow-lg
                      group-hover:scale-105 transition-transform duration-300`}
        >
          <div className="absolute inset-0 bg-black/40 rounded-xl md:rounded-2xl" />
          <div className="relative h-full w-full bg-brand-dark/90 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm overflow-hidden">
             {member.image ? (
               <img 
                 src={member.image} 
                 alt={member.name} 
                 className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
               />
             ) : (
               <span className={`text-base md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${style.split(' ')[0]}`}>
                 {initials}
               </span>
             )}
          </div>
          {/* Status Dot */}
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black bg-gradient-to-br ${style.split(' ')[0]} animate-pulse`} />
        </div>
        
        <div className={`px-2 py-1 md:px-3 md:py-1 rounded-full bg-white/5 text-[9px] md:text-[10px] uppercase font-bold tracking-wider ${style.split(' ').pop()}`}>
          {member.role}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-3 group-hover:text-emerald-300 transition-colors truncate">
          {member.name}
        </h3>
        
        <div className="space-y-2 md:space-y-3">
           <div className="flex items-start gap-2 text-xs md:text-sm text-gray-400">
              <GraduationCap className="w-3 h-3 md:w-4 md:h-4 mt-0.5 shrink-0" />
              <span className="line-clamp-2">{member.details}</span>
           </div>
           
           <div className="flex items-start gap-2 text-xs md:text-sm text-gray-500 border-t border-white/5 pt-2 md:pt-3 mt-2 md:mt-3">
              <Building2 className="w-3 h-3 md:w-4 md:h-4 mt-0.5 shrink-0" />
              <span className="line-clamp-1">{member.sub}</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;