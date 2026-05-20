/* global React */
// components/home/DaVinciPanel.jsx

const { useState, useEffect, useRef } = React;

const GRN = "oklch(0.40 0.13 155)";
const CORAL = "oklch(0.65 0.15 35)";

// ==========================================
// CONFIG 1: "FLOW" VARIANT (!isMod)
// The 3 text rings (INGEST, MODEL, MONITORING)
// ==========================================
const FLOW_CX = 50, FLOW_CY = 51; // SVG Center for 100x100 viewBox
const ORBITS = [
  { r: 48, txt: "INGEST",         dur: "24s", rev: false, del: 0.30 },
  { r: 58, txt: "MODEL & DEPLOY", dur: "32s", rev: false, del: 0.52 }, 
  { r: 68, txt: "MONITORING",     dur: "44s", rev: false, del: 0.74 },
];

// ==========================================
// CONFIG 2: "MODALITIES" VARIANT (isMod)
// The 5 interactive thematic rings
// ==========================================
const MOD_CX = 70, MOD_CY = 70; // SVG Center for 140x140 viewBox (needs more space)
const DATA_RINGS = [
  { id: 'lab',        r: 68, speed: '45s', rev: false },
  { id: 'imaging',    r: 78, speed: '55s', rev: true },
  { id: 'polygenic',  r: 88, speed: '65s', rev: false },
  { id: 'meds',       r: 98, speed: '75s', rev: true },
  { id: 'behavioral', r: 108, speed: '90s', rev: false }
];

function DaVinciPanel({ isActive, variant, animKey, hoveredId }) {
  const isMod    = variant === "mod";
  const panelRef = useRef(null);
  const [scrollProg, setScrollProg] = useState(0);

  useEffect(() => {
    const tick = () => {
      const el = panelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      const raw  = 1 - rect.top / vh;
      const p    = Math.max(0, Math.min(1, raw));
      setScrollProg(p);
    };
    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, []);

  // Entrance animation math
  const ep      = 1 - Math.pow(1 - scrollProg, 2);
  const spins   = isMod ? 360 : 180;
  const rollX   = (1 - ep) * -130;
  const rollRot = (1 - ep) * -spins;

  // ----------------------------------------------------
  // Helper: Generates the thematic strokes for the 5 rings
  // ----------------------------------------------------
// 1. Add 'index' as the second parameter
  const renderThematicRing = (ring, index, isHovered, baseOpacity) => {
    const strokeW = isHovered ? 1.2 : 0.4;
    const op = isHovered ? 1 : baseOpacity;
    const LIGHT_GRN = "oklch(0.55 0.15 155)";
    
    // 2. The Alternator: Even numbers = GRN, Odd numbers = CORAL
    const ringColor = index % 2 === 0 ? LIGHT_GRN : CORAL;
    
    // 3. Make the glow match the alternating color
    const glow = isHovered ? `drop-shadow(0px 0px 4px ${ringColor})` : "none";

    // 4. Apply the dynamic ringColor
    const commonProps = {
      cx: MOD_CX, cy: MOD_CY, fill: "none", stroke: ringColor,
      opacity: op, style: { filter: glow, transition: 'all 0.4s ease' }
    };

    switch (ring.id) {
      case 'lab':
        return (
          <React.Fragment>
            <circle {...commonProps} r={ring.r - 0.6} strokeWidth={strokeW * 0.7} />
            <circle {...commonProps} r={ring.r + 0.6} strokeWidth={strokeW * 0.7} />
          </React.Fragment>
        );
      case 'imaging':
        return <circle {...commonProps} r={ring.r} strokeWidth={strokeW} strokeDasharray="3 4" />;
      case 'polygenic':
        return (
          <React.Fragment>
            <circle {...commonProps} r={ring.r} strokeWidth={strokeW * 1.5} strokeDasharray="4 6" />
            <circle {...commonProps} r={ring.r} strokeWidth={strokeW * 1.5} strokeDasharray="4 6" strokeDashoffset="5" opacity={op * 0.5} />
          </React.Fragment>
        );
      case 'meds':
        return <circle {...commonProps} r={ring.r} strokeWidth={strokeW > 0.4 ? 2.5 : 1.5} strokeLinecap="round" strokeDasharray="0 10" />;
      case 'behavioral':
        return <circle {...commonProps} r={ring.r} strokeWidth={strokeW} strokeDasharray="10 2 2 2 2 2" />;
      default:
        return <circle {...commonProps} r={ring.r} strokeWidth={strokeW} />;
    }
  };

  return (
    <div
      className={`hs-panel davinci-panel dv-${variant}${isActive ? " panel-in" : ""}`}
      ref={panelRef}
      key={animKey}
    >
      <div
        className="panel-img-wrap dv-wrap"
        style={{ transform: `translateX(${rollX}%) rotate(${rollRot}deg)` }}
      >
        {/* Background glow circle for Flow variant only */}
        {!isMod && <div className="dv-flow-bg-circle" />}

        {/* The Da Vinci Figure */}
        <img
          src="davinci.png"
          alt="Da Vinci Figure"
          className={`panel-img davinci-png dv-${variant}-img dv-explorer-img`}
        />

        {/* ==================================================== */}
        {/* VARIANT A: The 5 Interactive Dashboard Rings (isMod) */}
        {/* ==================================================== */}
        {isMod && (
          <div className="dv-callout orbit-callout" aria-hidden="true">
            <svg viewBox="0 0 140 140" preserveAspectRatio="xMidYMid meet" className="orbit-svg" style={{ overflow: 'visible' }}>
              {DATA_RINGS.map((ring, i) => {
                const isHovered = hoveredId === ring.id;
                const baseOpacity = hoveredId ? (isHovered ? 1 : 0.15) : 0.5;

                return (
                  <g 
                    key={ring.id} 
                    className="dv-ring-wrapper" 
                    style={{ 
                      'transformOrigin': `${MOD_CX}px ${MOD_CY}px`, /* Centers the rotation */
                      '--spin-dur': ring.speed, 
                      '--spin-dir': ring.rev ? 'reverse' : 'normal',
                      '--draw-del': `${0.3 + (i * 0.15)}s` 
                    }}
                  >
                    {renderThematicRing(ring, isHovered, baseOpacity)}
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {/* ==================================================== */}
        {/* VARIANT B: The 3 Flow Text Rings (!isMod)            */}
        {/* ==================================================== */}
        {!isMod && (
          <div className="dv-callout orbit-callout" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="orbit-svg" style={{ overflow: 'visible' }}>
              <defs>
                {ORBITS.map((o, i) => (
                  <path
                    key={i}
                    id={`dv-flow-orbit-${i}`}
                    d={`
                      M ${FLOW_CX - o.r} ${FLOW_CY} 
                      A ${o.r} ${o.r} 0 1 1 ${FLOW_CX + o.r} ${FLOW_CY} 
                      A ${o.r} ${o.r} 0 1 1 ${FLOW_CX - o.r} ${FLOW_CY}
                    `}
                  />
                ))}
              </defs>

              {ORBITS.map((o, i) => (
                <g
                  key={i}
                  className={`orbit-grp orbit-grp-${i}${isActive ? " orbit-in" : ""}`}
                  style={{ "--del": `${o.del}s` }}
                >
                  <g transform={`rotate(${i * 120}, ${FLOW_CX}, ${FLOW_CY})`}>
                    
                    {/* The dotted visual ring */}
                    <circle
                      cx={FLOW_CX} cy={FLOW_CY} r={o.r}
                      fill="none" stroke={GRN}
                      strokeWidth="0.55" opacity="0.65"
                      strokeDasharray="0 15"
                      strokeLinecap="round"
                    />
                    
                    {/* The arced text */}
                    <text
                      fontSize="4.8"
                      fontFamily="Geist Mono, monospace"
                      letterSpacing="0.14em"
                      fill={GRN}
                      opacity="0.92"
                      dominantBaseline="baseline"
                      dy="-0.5em" 
                    >
                      <textPath
                        href={`#dv-flow-orbit-${i}`}
                        startOffset="25%" 
                        textAnchor="middle"
                      >
                        {o.txt}
                      </textPath>
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </div>
        )}
        
      </div>
    </div>
  );
}

window.DaVinciPanel = DaVinciPanel;