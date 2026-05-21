/* global React */
// components/home/DaVinciBridge.jsx
// Fixed-position overlay that fires during S2 ↔ S3 scroll-snap transitions.
// Forward  (S2→S3): starts at S2's left column  (25vw, coral),  rolls to S3's right column (75vw, green).
// Reverse  (S3→S2): starts at S3's right column (75vw, green),  rolls to S2's left column  (25vw, coral).

const { useEffect, useState } = React;

const FLOW_FILTER = "sepia(0.9) hue-rotate(120deg) saturate(2.0) brightness(0.68)";

function DaVinciBridge({ active, reverse }) {
  // Double-rAF: paint the initial position first, then start the CSS transition.
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

  // Forward: none → FLOW_FILTER.  Reverse: FLOW_FILTER → none.
  const imgFilter = reverse
    ? (rolling ? "none"        : FLOW_FILTER)
    : (rolling ? FLOW_FILTER   : "none");

  return (
    <div
      className={`davinci-bridge${rolling  ? " dvb-rolling"  : ""}${reverse ? " dvb-reverse" : ""}`}
      aria-hidden="true"
    >
      <div className={`dvb-bg${rolling ? " dvb-bg-rolling" : ""}${reverse ? " dvb-bg-reverse" : ""}`}>
        <img
          src="davinci.png"
          className="dvb-img"
          style={{
            filter: imgFilter,
            transition: "filter 1.1s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
    </div>
  );
}

window.DaVinciBridge = DaVinciBridge;
