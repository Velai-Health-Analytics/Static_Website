"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Audience from "@/components/Audience";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'publications' | 'services' | 'contact'>('home');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll for Navbar transparency
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 50);
  };
  const handleNavigate = (
  page: "home" | "about" | "publications" | "services" | "contact",
  sectionId?: string
) => {
  setActivePage(page);
  setScrolled(false);

  const targetPath = page === "home" ? "/" : `/${page}`;

  router.push(targetPath);

  // Only scroll when navigating to home sections
  if (page === "home" && sectionId) {
    const scrollToSection = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Retry on next frame until DOM is ready
        requestAnimationFrame(scrollToSection);
      }
    };

    requestAnimationFrame(scrollToSection);
  }
};


  return (
    <div className="h-screen w-full bg-brand-dark text-white selection:bg-brand-primary selection:text-black overflow-hidden relative">
      <Navbar 
        scrolled={scrolled} 
        activePage={activePage} 
        onNavigate={handleNavigate} 
      />
      
        <div 
          onScroll={handleScroll}
          className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        >
          <section id="hero" className="min-h-screen w-full snap-start relative overflow-hidden flex flex-col">
            <Hero />
          </section>
          
          <section id="product" className="min-h-screen w-full snap-start relative overflow-hidden flex flex-col">
            <Features />
          </section>
          
          <section id="science" className="min-h-screen w-full snap-start relative overflow-hidden flex flex-col">
            <Audience />
          </section>
          
          <section className="min-h-screen w-full snap-start relative overflow-hidden flex flex-col">
            <Footer />
          </section>
        </div>
      </div>
      );
};