/* global React, SECTIONS, DaVinciBridge, SideIndex, SectionHero, SectionModalities, SectionFlow, SectionAudience, SectionProof, SectionCTA, useReveal */
// pages/Home.jsx — home page root. Orchestrates scroll-snap, section tracking,
// keyboard/wheel/touch navigation, and the side index.

const { useState, useEffect, useRef, useCallback } = React;

function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [audienceActive, setAudienceActive] = useState(0);
  const [bridgeActive, setBridgeActive] = useState(false);
  const activeRef = useRef(0);
  const bridgeTimerRef = useRef(null);
  useReveal();

  useEffect(() => { activeRef.current = activeSection; }, [activeSection]);

  // Clean up bridge on unmount
  useEffect(() => () => {
    clearTimeout(bridgeTimerRef.current);
    document.body.classList.remove("bridge-active");
  }, []);

  const jump = useCallback(i => {
    const el = document.querySelector(`[data-section="${i}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

    // S2 (Modalities) → S3 (Flow): fire the rolling bridge overlay
    if (i === 2 && activeRef.current === 1) {
      setBridgeActive(true);
      document.body.classList.add("bridge-active");
      clearTimeout(bridgeTimerRef.current);
      // Bridge animation is 1.1s; give a small buffer then hand off to S3's panel
      bridgeTimerRef.current = setTimeout(() => {
        setBridgeActive(false);
        document.body.classList.remove("bridge-active");
      }, 1250);
    }

    setActiveSection(i);
    activeRef.current = i;
  }, []);

  // Wheel / touch / keyboard navigation between sections
  useEffect(() => {
    let locked = false;
    const LOCK_MS = 920;
    const goTo = next => {
      if (locked) return;
      const clamped = Math.max(0, Math.min(SECTIONS.length - 1, next));
      if (clamped === activeRef.current) return;
      locked = true;
      jump(clamped);
      setTimeout(() => { locked = false; }, LOCK_MS);
    };
    const atLastSection = () => activeRef.current >= SECTIONS.length - 1;
    const onWheel = e => {
      // At the last section scrolling down: release snap so the footer is reachable
      if (atLastSection() && e.deltaY > 0) return;
      e.preventDefault();
      goTo(activeRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    let touchY = 0;
    const onTouchStart = e => { touchY = e.touches[0].clientY; };
    const onTouchEnd = e => {
      const diff = touchY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 48) return;
      // Swiping up (diff > 0) at last section: let natural scroll show footer
      if (atLastSection() && diff > 0) return;
      goTo(activeRef.current + (diff > 0 ? 1 : -1));
    };
    const onKey = e => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (atLastSection()) return; // let natural scroll show footer
        e.preventDefault(); goTo(activeRef.current + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); goTo(activeRef.current - 1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [jump]);

  // Scroll-snap on <html>
  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollSnapType = "y mandatory";
    root.style.overflowY = "scroll";
    const sections = Array.from(document.querySelectorAll(".home-section[data-section]"));
    // Apply snap to all sections except the last — the last section + footer
    // scroll together naturally so the footer is always reachable.
    sections.forEach((s, i) => {
      if (i < sections.length - 1) {
        s.style.scrollSnapAlign = "start";
        s.style.scrollSnapStop = "always";
      }
    });
    return () => {
      root.style.scrollSnapType = "";
      root.style.overflowY = "";
      sections.forEach(s => { s.style.scrollSnapAlign = ""; s.style.scrollSnapStop = ""; });
    };
  }, []);

  // IntersectionObserver to sync activeSection with scroll position
  useEffect(() => {
    const sections = document.querySelectorAll(".home-section[data-section]");
    if (!sections.length) return;
    const ratios = new Map();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => ratios.set(e.target, e.intersectionRatio));
      let best = -1, bestRatio = 0;
      ratios.forEach((ratio, el) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = parseInt(el.dataset.section, 10); }
      });
      if (best >= 0 && bestRatio > 0.4 && best !== activeRef.current) {
        activeRef.current = best;
        setActiveSection(best);
      }
    }, { threshold: [0, 0.25, 0.5, 0.75, 1.0] });
    sections.forEach(s => { ratios.set(s, 0); io.observe(s); });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <DaVinciBridge active={bridgeActive} />
      <SideIndex active={activeSection} onJump={jump} />
      <SectionHero       isActive={activeSection === 0} />
      <SectionModalities isActive={activeSection === 1} />
      <SectionFlow       isActive={activeSection === 2} />
      <SectionAudience   isActive={activeSection === 3} active={audienceActive} onActiveChange={setAudienceActive} />
      <SectionProof      isActive={activeSection === 4} />
      <SectionCTA        isActive={activeSection === 5} />
    </>
  );
}

window.Home = Home;
