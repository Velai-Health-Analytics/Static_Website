import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Calendar } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="min-h-screen w-full snap-start relative bg-brand-dark pt-24 md:pt-32 pb-20 overflow-hidden flex items-center justify-center">
       {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px]" />
         <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side: Form */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">Send us a message</h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">First Name</label>
                            <input type="text" placeholder="Enter your first name" className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Last Name</label>
                            <input type="text" placeholder="Enter your last name" className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <input type="email" placeholder="Enter your email" className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Company/Organization</label>
                        <input type="text" placeholder="Enter your company name" className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Subject</label>
                        <input type="text" placeholder="What is this regarding?" className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Message</label>
                        <textarea rows={4} placeholder="Tell us about your project or questions..." className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none" />
                    </div>

                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-500/20">
                        Send Message
                    </button>
                </form>
            </motion.div>

            {/* Right Side: Info */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col h-full"
            >
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">Get in touch</h2>
                <p className="text-gray-400 mb-10 leading-relaxed">
                    We're here to help you implement cutting-edge healthcare analytics solutions. Reach out to our team for consultations, support, or partnership opportunities.
                </p>

                <div className="space-y-8 mb-12">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                            <Mail className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">Email</h3>
                            <p className="text-gray-400 text-sm">velaihealthanalytics@gmail.com</p>
                            <p className="text-gray-400 text-sm">support@velal.health</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                            <Phone className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">Phone</h3>
                            <p className="text-gray-400 text-sm">+91-7548801657</p>
                            <p className="text-gray-500 text-xs mt-1">Mon-Fri 9AM-6PM IST</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                            <MapPin className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">Address</h3>
                            <p className="text-gray-400 text-sm">IITM Research Park</p>
                            <p className="text-gray-400 text-sm">Chennai, Tamilnadu, India</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                            <Clock className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">Business Hours</h3>
                            <p className="text-gray-400 text-sm">Monday - Friday</p>
                            <p className="text-gray-400 text-sm">9:00 AM - 6:00 PM PST</p>
                        </div>
                    </div>
                </div>

                {/* Callout Card */}
                <div className="mt-auto bg-[#0a0c10] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                     {/* Glow effect */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
                     
                     <h3 className="text-xl font-bold text-white mb-2 relative z-10">Need immediate assistance?</h3>
                     <p className="text-gray-400 text-sm mb-6 relative z-10">
                        Our support team is available to help with technical questions and implementation guidance.
                     </p>
                     <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-sm transition-colors relative z-10">
                        Schedule a Demo
                     </button>
                </div>

            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;