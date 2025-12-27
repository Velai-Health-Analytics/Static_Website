"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function ServicePage() {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'publications' | 'services' | 'contact'>('services');
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

    // HOME ALWAYS MEANS "/"
    const targetPath = page === "home" ? "/" : `/${page}`;

    router.push(targetPath);

    // Scroll only when landing on "/"
    if (page === "home" && sectionId) {
        const scrollToSection = () => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
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
          <Services />
          <section className="min-h-screen w-full snap-start relative overflow-hidden flex flex-col">
            <Footer />
          </section>
        </div>
      </div>
      );
};