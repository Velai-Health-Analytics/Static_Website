import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <div className="w-full flex flex-col relative bg-brand-dark font-sans">
      
      {/* ---------------------------------------------------------------------------
         UPPER PART: Call to Action (With Green Background Restored)
      --------------------------------------------------------------------------- */}
      <div className="flex-grow flex flex-col items-center justify-center relative overflow-hidden min-h-[70vh] py-20">
         
         {/* RESTORED: Green Gradient Background */}
         <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent pointer-events-none" />
         
         {/* Optional: Add a subtle radial glow for extra pop */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

         <div className="text-center z-10 px-6 relative">
            <motion.h2 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-8xl font-serif text-white mb-8 md:mb-12 leading-tight"
            >
              Ready to <span className="italic text-emerald-500">Transform?</span>
            </motion.h2>
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <button className="px-10 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Book a Demo
              </button>
              <button className="px-10 py-4 border border-white/20 text-white text-lg font-bold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                Contact Sales
              </button>
            </motion.div>
         </div>
      </div>

      {/* ---------------------------------------------------------------------------
         LOWER PART: Standard Footer
      --------------------------------------------------------------------------- */}
      <div className="bg-black/40 border-t border-white/10 py-12 md:py-16 px-6 z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-sm text-gray-400">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative h-10 w-10 transition-transform duration-300 group-hover:rotate-12">
                <Image 
                  src="/favicon.ico"
                  alt='Velai Health'
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-xl font-semibold text-white tracking-wide">
                VelAI Health
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-[200px]">
              Empowering cardiac care with real-time, predictive intelligence.
            </p>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Analytics</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Diagnostics</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Genomics</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Security</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link></li>
              <li><Link href="/publications" className="hover:text-emerald-400 transition-colors">Publications</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact-Us</Link></li>
            </ul>
          </div>

          {/* Social + Copyright Column */}
          <div className="flex flex-col gap-4 items-start">
             <h4 className="text-white font-semibold mb-2 text-base">Connect</h4>
            <div className="flex gap-4">
              <div className="p-2 bg-white/5 rounded-full hover:bg-emerald-500/20 hover:text-emerald-400 transition-all cursor-pointer">
                 <Twitter className="w-5 h-5" />
              </div>
              <div className="p-2 bg-white/5 rounded-full hover:bg-emerald-500/20 hover:text-emerald-400 transition-all cursor-pointer">
                 <Linkedin className="w-5 h-5" />
              </div>
              <div className="p-2 bg-white/5 rounded-full hover:bg-emerald-500/20 hover:text-emerald-400 transition-all cursor-pointer">
                 <Github className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs opacity-40 mt-auto pt-4">© 2022 VelAI Health Analytics Pvt. LTD. All rights reserved.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;