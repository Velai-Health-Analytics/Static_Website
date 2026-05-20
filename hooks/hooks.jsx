/* global React */
// hooks/hooks.jsx — shared React hooks used across the site.

const { useState, useEffect, useRef } = React;

// useReveal — adds .pre-reveal then .in to .reveal elements as they scroll
// into view. Uses IntersectionObserver with a rAF double-frame for elements
// already visible on mount.
function useReveal() {
  useEffect(() => {
    const all = document.querySelectorAll(".reveal:not(.pre-reveal)");
    all.forEach(el => el.classList.add("pre-reveal"));
    if (!("IntersectionObserver" in window)) { all.forEach(el => el.classList.add("in")); return; }
    let ra, rb;
    ra = requestAnimationFrame(() => {
      rb = requestAnimationFrame(() => {
        const vh = window.innerHeight || 800;
        document.querySelectorAll(".pre-reveal:not(.in)").forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.95 && r.bottom > 0) el.classList.add("in");
        });
      });
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.04 });
    all.forEach(el => io.observe(el));
    return () => { cancelAnimationFrame(ra); cancelAnimationFrame(rb); io.disconnect(); };
  });
}

// useActivatedKey — increments a counter each time isActive flips false→true,
// used to remount animated panels and restart their CSS animations cleanly.
function useActivatedKey(isActive) {
  const [key, setKey] = useState(0);
  const prev = useRef(false);
  useEffect(() => {
    if (isActive && !prev.current) setKey(k => k + 1);
    prev.current = isActive;
  }, [isActive]);
  return key;
}

window.useReveal = useReveal;
window.useActivatedKey = useActivatedKey;
