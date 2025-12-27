"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";

export default function AboutPage() {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'publications' | 'services' | 'contact'>('about');
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
          <About />
          <section className="min-h-screen w-full snap-start relative overflow-hidden flex flex-col">
            <Footer />
          </section>
        </div>
      </div>
      );
};