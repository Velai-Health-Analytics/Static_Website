import React, { useState } from 'react';
import { Menu, X, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  scrolled: boolean;
  activePage: 'home' | 'about' | 'publications' | 'services' | 'contact';
  onNavigate: (page: 'home' | 'about' | 'publications' | 'services' | 'contact', sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (page: 'home' | 'about' | 'publications' | 'services' | 'contact', sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen ? 'bg-black/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => handleLinkClick('home', 'hero')}
        >
          <div className="rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10">
                <Image 
                  src="/favicon.ico"
                  alt='Velai Health'
                  fill
                  className="object-contain"
                />
              </div>
          </Link>
          </div>
          <span className="font-serif text-xl tracking-wide font-semibold">VelAI Health</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button 
            onClick={() => handleLinkClick('home')} 
            className={`transition-colors ${activePage === 'home' ? 'text-emerald-400 font-semibold' : 'hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleLinkClick('about')} 
            className={`transition-colors ${activePage === 'about' ? 'text-emerald-400 font-semibold' : 'hover:text-white'}`}
          >
            About
          </button>
          <button 
            onClick={() => handleLinkClick('services')} 
            className={`transition-colors ${activePage === 'services' ? 'text-emerald-400 font-semibold' : 'hover:text-white'}`}
          >
            Services
          </button>
          <button 
            onClick={() => handleLinkClick('publications')} 
            className={`transition-colors ${activePage === 'publications' ? 'text-emerald-400 font-semibold' : 'hover:text-white'}`}
          >
            Publications
          </button>
          <button className="hover:text-white transition-colors text-gray-400 cursor-not-allowed">
            Blogs & News
          </button>
          <button 
            onClick={() => handleLinkClick('contact')} 
            className={`transition-colors ${activePage === 'contact' ? 'text-emerald-400 font-semibold' : 'hover:text-white'}`}
          >
            Contact us
          </button>
          
          <div className="flex items-center gap-3 ml-4">
             <button className="px-4 py-2 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 border border-cyan-500/20 rounded text-xs font-semibold transition-all">
                Try Second Opinion
             </button>
             <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm font-bold transition-all shadow-lg shadow-orange-500/20">
                Get Started
             </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4 h-screen">
           <button onClick={() => handleLinkClick('home')} className={`text-left text-lg py-2 border-b border-white/5 ${activePage === 'home' ? 'text-emerald-400' : 'text-gray-300'}`}>
              Home
           </button>
           <button onClick={() => handleLinkClick('about')} className={`text-left text-lg py-2 border-b border-white/5 ${activePage === 'about' ? 'text-emerald-400' : 'text-gray-300'}`}>
              About
           </button>
           <button onClick={() => handleLinkClick('services')} className={`text-left text-lg py-2 border-b border-white/5 ${activePage === 'services' ? 'text-emerald-400' : 'text-gray-300'}`}>
              Services
           </button>
           <button onClick={() => handleLinkClick('publications')} className={`text-left text-lg py-2 border-b border-white/5 ${activePage === 'publications' ? 'text-emerald-400' : 'text-gray-300'}`}>
              Publications
           </button>
           <button onClick={() => handleLinkClick('contact')} className={`text-left text-lg py-2 border-b border-white/5 ${activePage === 'contact' ? 'text-emerald-400' : 'text-gray-300'}`}>
              Contact us
           </button>
           
          <div className="mt-4 flex flex-col gap-3">
             <button className="w-full py-3 border border-cyan-500/30 text-cyan-400 rounded-lg">Try Second Opinion</button>
             <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-bold">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;