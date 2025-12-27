import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, ExternalLink, BookOpen, Mail } from 'lucide-react';

const publications = [
  {
    title: "Cautionary lessons from the COVID-19 pandemic: Healthcare systems grappled with the dual responsibility of delivering COVID-19 and non-COVID-19 care",
    authors: "Bhanu Duggal, Anuva Kapoor, Mona Duggal, Kangan Maria, Vasuki Rayapati, Mithlesh Chourase, Mukesh Kumar, Sujata Saunik, Praveen Gedam, Lakshminarayanan Subramanian",
    date: "November 4, 2024",
    journal: "Plos Global Public Health",
    description: "A survey of 461 AB-PMJAY hospitals across 20 states revealed that larger hospitals with adequate PPE and dedicated COVID-19 facilities maintained both emergency and elective services, while smaller hospitals struggled with staff attrition and revenue loss. Strengthening PPE supply, staff support, and data-driven resource allocation can improve healthcare resiliency during pandemics.",
    link: "#"
  },
  {
    title: "Using a national level cross-sectional study to develop a Hospital Preparedness Index (HOSPI) for Covid-19 management: A case study from India",
    authors: "Bhanu Duggal, Mona Duggal, Aparna Panch, Mithlesh Chourase, Praveen Gedam, Pushpendra Singh, Sujata Saunik, Lakshminarayanan Subramanian",
    date: "July 27, 2022",
    journal: "Plos One",
    description: "We developed a Hospital Preparedness Index (HOSPI) using survey responses from 954 hospitals across India, capturing readiness across five domains. Preparedness varied widely, with Goa scoring highest and clusters of states showing either strong or poor COVID-19 readiness.",
    link: "#"
  },
  {
    title: "The effects of dual antiplatelet therapy (DAPT) adherence on survival in patients undergoing revascularization and the determinants of DAPT adherence",
    authors: "Shuqi Zhang, Mithlesh Chourase, Nupur Sharma, Sujata Saunik, Mona Duggal, Goodarz Danaei & Bhanu Duggal",
    date: "May 23, 2022",
    journal: "BMC Cardiovascular Disorders",
    description: "In a cohort of 2,064 low-income PCI patients in Maharashtra, 22.8% discontinued DAPT within a year, and non-adherence doubled the risk of 1-year mortality (HR = 0.52 for adherent patients). Younger age, male sex, and use of antihypertensives predicted better adherence.",
    link: "#"
  },
  {
    title: "Survival outcomes post percutaneous coronary intervention: Why the hype about stent type? Lessons from a healthcare system in India",
    authors: "Dr. Bhanu Duggal, Jyothi Subramanian, Dr. Mona Duggal, Pushpendra Singh, Meeta Rajivlochan, Sujata Saunik, Koundinya Desiraju, Archana Avhad, Usha Ram, Sayan Sen, Anurag Agrawal",
    date: "May 24, 2018",
    journal: "Plos One",
    description: "A large multicenter study in Maharashtra (2012–2016, n=4595) found that total stent length and number of stents were the strongest predictors of 1-year survival after PCI, surpassing age. Drug-eluting stents were associated with fewer rehospitalizations and better outcomes, especially after price caps improved accessibility.",
    link: "#"
  }
];

const Publications: React.FC = () => {
  return (
    <section className="min-h-screen w-full snap-start relative bg-brand-dark pt-24 md:pt-32 pb-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
         <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px]" />
         <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }} 
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Publications</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our latest research and insights in healthcare analytics, AI applications, and data-driven care improvement.
            </p>
          </motion.div>
        </div>

        {/* Papers List */}
        <div className="space-y-6 mb-24">
          {publications.map((paper, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07]"
            >
              {/* Header Row: Icon + Title + Button */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-4">
                <div className="flex gap-4 items-start">
                   <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 mt-1 shrink-0">
                     <FileText className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="text-lg md:text-xl font-semibold text-white leading-snug mb-2 group-hover:text-emerald-300 transition-colors">
                       {paper.title}
                     </h3>
                     <p className="text-sm text-gray-500 font-mono leading-relaxed">
                       {paper.authors}
                     </p>
                   </div>
                </div>
                
                <a 
                  href={paper.link} 
                  className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 text-sm font-medium text-gray-300 hover:text-white transition-all whitespace-nowrap self-start md:self-start mt-2 md:mt-0"
                >
                  Read Paper <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Meta Data Row */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-4 pl-0 md:pl-[3.25rem]">
                 <div className="inline-flex items-center px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    Research Paper
                 </div>
                 <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{paper.date}</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="font-semibold text-gray-300">{paper.journal}</span>
                 </div>
              </div>

              {/* Description */}
              <div className="pl-0 md:pl-[3.25rem]">
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {paper.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 md:p-16 text-center"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Mail className="w-8 h-8 text-white" />
             </div>
             <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Stay Updated</h2>
             <p className="text-gray-400 mb-8">
               Subscribe to our newsletter to receive the latest research findings and insights in healthcare analytics.
             </p>
             
             <form className="flex flex-col sm:flex-row gap-3">
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
               />
               <button 
                 type="submit"
                 className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20 whitespace-nowrap"
               >
                 Subscribe to Newsletter
               </button>
             </form>
          </div>

          {/* Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-orange-500/5 blur-[100px] pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
};

export default Publications;