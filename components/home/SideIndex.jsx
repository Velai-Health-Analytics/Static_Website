/* global React */
// components/home/SideIndex.jsx — vertical section navigation dots for the home page.

const SECTIONS = [
  { id: "hero",       num: "01", label: "Intro" },
  { id: "modalities", num: "02", label: "Signals" },
  { id: "flow",       num: "03", label: "How we work" },
  { id: "audience",   num: "04", label: "Partners" },
  { id: "proof",      num: "05", label: "Why" },
  { id: "cta",        num: "06", label: "Talk to us" },
];

// Section indices with a dark background — side index needs light text on these
const DARK_SECTIONS = new Set([4]); // 4 = Proof

function SideIndex({ active, onJump }) {
  return (
    <nav className={`home-side-index${DARK_SECTIONS.has(active) ? " on-dark" : ""}`} aria-label="Section navigation">
      {SECTIONS.map((s, i) => (
        <button key={s.id} className={i === active ? "active" : ""} onClick={() => onJump(i)}>
          <span className="tick" /><span className="ix-num">{s.num}</span><span className="ix-lbl">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}

window.SECTIONS = SECTIONS;
window.SideIndex = SideIndex;
