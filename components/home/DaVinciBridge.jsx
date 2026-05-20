/* global React */
// components/home/DaVinciBridge.jsx
// Fixed-position overlay that fires during the S2 → S3 scroll snap.
// Starts at S2's left-column centre (coral) and rolls to S3's right-column
// centre (forest green) while the sections scroll beneath it — creating the
// illusion of a single continuous Da Vinci travelling between sections.

const { useEffect, useState } = React;

const FLOW_FILTER = "sepia(0.9) hue-rotate(120deg) saturate(2.0) brightness(0.68)";

function DaVinciBridge({ active }) {
  // Double-rAF: paint the initial (coral / left) position first, then flip
  // .dvb-rolling to start the CSS transitions from a rendered state.
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (!active) { setRolling(false); return; }
    let ra, rb;
    ra = requestAnimationFrame(() => {
      rb = requestAnimationFrame(() => setRolling(true));
    });
    return () => { cancelAnimationFrame(ra); cancelAnimationFrame(rb); };
  }, [active]);

  if (!active) return null;

  return (
    <div className={`davinci-bridge${rolling ? " dvb-rolling" : ""}`} aria-hidden="true">
      {/* Background transitions paper → sage so mix-blend-mode matches each section */}
      <div className={`dvb-bg${rolling ? " dvb-bg-rolling" : ""}`}>
        <img
          src="davinci.png"
          className="dvb-img"
          style={{
            filter: rolling ? FLOW_FILTER : "none",
            transition: rolling
              ? "filter 1.1s cubic-bezier(0.16,1,0.3,1)"
              : "none",
          }}
        />
      </div>
    </div>
  );
}

window.DaVinciBridge = DaVinciBridge;
