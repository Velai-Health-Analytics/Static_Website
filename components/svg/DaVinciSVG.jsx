/* global React */
// components/svg/DaVinciSVG.jsx — SVG Vitruvian Man, built from SVG primitives.

const { useState } = React;

const INK   = "oklch(0.40 0.13 155)";
const INK2  = "oklch(0.34 0.12 155)";
const PAPER = "oklch(0.975 0.008 145)";

const CX=240, CY=308, CR=200;
const SX=40,  SY=108, SW=400, SH_SQ=400;

const circ = (cx,cy,r) => `M ${cx} ${cy-r} A ${r} ${r} 0 1 1 ${cx-0.01} ${cy-r}`;

const P_CIRCLE = circ(CX,CY,CR);
const P_SQUARE = `M ${SX} ${SY} L ${SX+SW} ${SY} L ${SX+SW} ${SY+SH_SQ} L ${SX} ${SY+SH_SQ} Z`;
const P_TICKS_T = [0,50,100,150,200,250,300,350,400].map((o,i)=>`M${SX+o} ${SY}L${SX+o} ${SY-(i%4===0?10:6)}`).join(' ');
const P_TICKS_L = [0,50,100,150,200,250,300,350,400].map((o,i)=>`M${SX} ${SY+o}L${SX-(i%4===0?10:6)} ${SY+o}`).join(' ');
const P_TICKS_R = [0,50,100,150,200,250,300,350,400].map((o,i)=>`M${SX+SW} ${SY+o}L${SX+SW+(i%4===0?10:6)} ${SY+o}`).join(' ');
const P_RAIL_T = `M ${SX} ${SY-7} L ${SX+SW} ${SY-7}`;
const P_RAIL_L = `M ${SX-7} ${SY} L ${SX-7} ${SY+SH_SQ}`;
const P_RAIL_R = `M ${SX+SW+7} ${SY} L ${SX+SW+7} ${SY+SH_SQ}`;

const HC=136, HR=28;
const P_HEAD  = circ(CX,HC,HR);
const P_HAIR  = `M ${CX-HR+4} ${HC-HR+8} C ${CX-28} ${HC-HR-12} ${CX-10} ${HC-HR-15} ${CX} ${HC-HR-10} C ${CX+10} ${HC-HR-15} ${CX+28} ${HC-HR-12} ${CX+HR-4} ${HC-HR+8}`;
const EY = HC-2;
const P_FACE  = `M ${CX-12} ${EY} C ${CX-10} ${EY-4} ${CX-6} ${EY-4} ${CX-4} ${EY} M ${CX+4} ${EY} C ${CX+6} ${EY-4} ${CX+10} ${EY-4} ${CX+12} ${EY} M ${CX-2} ${EY+5} L ${CX-4} ${EY+11} L ${CX+4} ${EY+11} M ${CX-9} ${EY+18} C ${CX-5} ${EY+22} ${CX+5} ${EY+22} ${CX+9} ${EY+18}`;
const P_NECK  = `M ${CX-10} ${HC+HR} L ${CX-12} 196 M ${CX+10} ${HC+HR} L ${CX+12} 196`;

const SHY=200, SHW=78;
const WAY=286, WAW=48;
const HIY=362, HIW=62;

const P_TORSO  = `M ${CX-SHW} ${SHY} C ${CX-SHW-12} ${SHY+22} ${CX-WAW-16} ${WAY-22} ${CX-WAW} ${WAY} C ${CX-WAW+4} ${WAY+26} ${CX-HIW-10} ${HIY-26} ${CX-HIW} ${HIY} L ${CX+HIW} ${HIY} C ${CX+HIW+10} ${HIY-26} ${CX+WAW-4} ${WAY+26} ${CX+WAW} ${WAY} C ${CX+WAW+16} ${WAY-22} ${CX+SHW+12} ${SHY+22} ${CX+SHW} ${SHY} C ${CX+SHW-16} ${SHY-16} ${CX+26} ${SHY-24} ${CX} ${SHY-26} C ${CX-26} ${SHY-24} ${CX-SHW+16} ${SHY-16} ${CX-SHW} ${SHY} Z`;
const P_COLLAR = `M ${CX-SHW} ${SHY+4} C ${CX-SHW+22} ${SHY-14} ${CX-16} ${SHY-24} ${CX} ${SHY-26} C ${CX+16} ${SHY-24} ${CX+SHW-22} ${SHY-14} ${CX+SHW} ${SHY+4}`;
const P_STERN  = `M ${CX} ${SHY-22} L ${CX} ${WAY-12}`;
const P_RIBS   = `M ${CX} ${SHY+8} C ${CX-18} ${SHY+14} ${CX-38} ${SHY+22} ${CX-50} ${SHY+36} M ${CX} ${SHY+26} C ${CX-16} ${SHY+32} ${CX-34} ${SHY+42} ${CX-44} ${SHY+58} M ${CX} ${SHY+44} C ${CX-14} ${SHY+50} ${CX-30} ${SHY+60} ${CX-38} ${SHY+76} M ${CX} ${SHY+8} C ${CX+18} ${SHY+14} ${CX+38} ${SHY+22} ${CX+50} ${SHY+36} M ${CX} ${SHY+26} C ${CX+16} ${SHY+32} ${CX+34} ${SHY+42} ${CX+44} ${SHY+58} M ${CX} ${SHY+44} C ${CX+14} ${SHY+50} ${CX+30} ${SHY+60} ${CX+38} ${SHY+76}`;
const P_ABS    = `M ${CX-8} ${WAY} L ${CX-8} ${HIY-6} M ${CX+8} ${WAY} L ${CX+8} ${HIY-6} M ${CX-18} ${WAY+20} L ${CX+18} ${WAY+20} M ${CX-18} ${WAY+40} L ${CX+18} ${WAY+40} M ${CX-18} ${WAY+60} L ${CX+18} ${WAY+60}`;
const P_NAVEL  = circ(CX, CY-8, 4);
const P_PELVIS = `M ${CX-HIW} ${HIY} C ${CX-HIW+18} ${HIY+14} ${CX-14} ${HIY+20} ${CX} ${HIY+20} C ${CX+14} ${HIY+20} ${CX+HIW-18} ${HIY+14} ${CX+HIW} ${HIY}`;

const ARMY = SHY+22;
const P_ARM_L  = `M ${CX-SHW} ${ARMY} L ${SX} ${ARMY}`;
const P_ARM_R  = `M ${CX+SHW} ${ARMY} L ${SX+SW} ${ARMY}`;
const HLX=SX, HRX=SX+SW, HY=ARMY;
const P_HAND_L = `M ${HLX} ${HY} C ${HLX-4} ${HY-8} ${HLX-2} ${HY-16} ${HLX+6} ${HY-18} M ${HLX} ${HY} C ${HLX+1} ${HY-13} ${HLX+5} ${HY-19} ${HLX+13} ${HY-19} M ${HLX} ${HY} C ${HLX+3} ${HY-11} ${HLX+9} ${HY-17} ${HLX+17} ${HY-14} M ${HLX} ${HY} C ${HLX+4} ${HY-8} ${HLX+11} ${HY-12} ${HLX+18} ${HY-8} M ${HLX} ${HY} C ${HLX-6} ${HY+2} ${HLX-5} ${HY+10} ${HLX} ${HY+14}`;
const P_HAND_R = `M ${HRX} ${HY} C ${HRX+4} ${HY-8} ${HRX+2} ${HY-16} ${HRX-6} ${HY-18} M ${HRX} ${HY} C ${HRX-1} ${HY-13} ${HRX-5} ${HY-19} ${HRX-13} ${HY-19} M ${HRX} ${HY} C ${HRX-3} ${HY-11} ${HRX-9} ${HY-17} ${HRX-17} ${HY-14} M ${HRX} ${HY} C ${HRX-4} ${HY-8} ${HRX-11} ${HY-12} ${HRX-18} ${HY-8} M ${HRX} ${HY} C ${HRX+6} ${HY+2} ${HRX+5} ${HY+10} ${HRX} ${HY+14}`;
const P_ARM_LR = `M ${CX-SHW+8} ${SHY+12} C ${CX-SHW-20} ${SHY-4} ${CX-SHW-52} ${SHY-12} 80 188`;
const P_ARM_RR = `M ${CX+SHW-8} ${SHY+12} C ${CX+SHW+20} ${SHY-4} ${CX+SHW+52} ${SHY-12} 400 188`;

const KLX=112, KLY=436, KRX=368, KRY=436;
const P_LEG_LS = `M ${CX-HIW} ${HIY} C ${CX-HIW-12} ${HIY+30} ${KLX+18} ${KLY-36} ${KLX} ${KLY} C ${KLX-16} ${KLY+32} ${SX+22} ${SY+SH_SQ-20} ${SX} ${SY+SH_SQ}`;
const P_LEG_RS = `M ${CX+HIW} ${HIY} C ${CX+HIW+12} ${HIY+30} ${KRX-18} ${KRY-36} ${KRX} ${KRY} C ${KRX+16} ${KRY+32} ${SX+SW-22} ${SY+SH_SQ-20} ${SX+SW} ${SY+SH_SQ}`;
const P_KNEE_L = circ(KLX, KLY, 12);
const P_KNEE_R = circ(KRX, KRY, 12);
const P_FOOT_L = `M ${SX} ${SY+SH_SQ} C ${SX-4} ${SY+SH_SQ-7} ${SX-4} ${SY+SH_SQ-16} ${SX+5} ${SY+SH_SQ-18} C ${SX+18} ${SY+SH_SQ-12} ${SX+34} ${SY+SH_SQ-8} ${SX+50} ${SY+SH_SQ-5}`;
const P_FOOT_R = `M ${SX+SW} ${SY+SH_SQ} C ${SX+SW+4} ${SY+SH_SQ-7} ${SX+SW+4} ${SY+SH_SQ-16} ${SX+SW-5} ${SY+SH_SQ-18} C ${SX+SW-18} ${SY+SH_SQ-12} ${SX+SW-34} ${SY+SH_SQ-8} ${SX+SW-50} ${SY+SH_SQ-5}`;
const P_LEG_LT = `M ${CX-36} ${HIY} C ${CX-24} ${HIY+60} ${CX-14} ${HIY+120} ${CX-12} ${SY+SH_SQ}`;
const P_LEG_RT = `M ${CX+36} ${HIY} C ${CX+24} ${HIY+60} ${CX+14} ${HIY+120} ${CX+12} ${SY+SH_SQ}`;
const P_FOOT_LT = `M ${CX-12} ${SY+SH_SQ} C ${CX-14} ${SY+SH_SQ-8} ${CX-12} ${SY+SH_SQ-16} ${CX-5} ${SY+SH_SQ-18} C ${CX+2} ${SY+SH_SQ-14} ${CX+6} ${SY+SH_SQ-10} ${CX+8} ${SY+SH_SQ-4}`;
const P_FOOT_RT = `M ${CX+12} ${SY+SH_SQ} C ${CX+14} ${SY+SH_SQ-8} ${CX+12} ${SY+SH_SQ-16} ${CX+5} ${SY+SH_SQ-18} C ${CX-2} ${SY+SH_SQ-14} ${CX-6} ${SY+SH_SQ-10} ${CX-8} ${SY+SH_SQ-4}`;

const ANNOTS = [
  { x: CX,       y: SY-18,          text: "ψ",   anchor: "middle" },
  { x: SX-18,    y: SHY+10,         text: "ε",   anchor: "end" },
  { x: SX-18,    y: HIY+5,          text: "ζ",   anchor: "end" },
  { x: SX+SW+18, y: WAY+5,          text: "σ",   anchor: "start" },
  { x: SX+SW+18, y: KRY-10,         text: "θ",   anchor: "start" },
  { x: SX-18,    y: SY+SH_SQ-20,   text: "κ",   anchor: "end" },
  { x: SX+SW+8,  y: SY+SH_SQ-8,   text: "LdV", anchor: "end", italic: true, size: 8.5 },
];

const ZONES = [
  { cx: CX, cy: HC,       r: 38,  label: "Neurological",  desc: "brain signals",    chipDy: -56 },
  { cx: CX, cy: SHY+55,   r: 62,  label: "Cardiovascular",desc: "risk profile",     chipDy: -76 },
  { cx: CX, cy: CY+10,    r: 46,  label: "Metabolic",     desc: "core markers",     chipDy: -60 },
];

const dp = (dur, del) => ({ pathLength:"1", className:"dv-dp", style:{ "--dur": dur, "--del": del } });

function DaVinciSVG({ drawn = false, mouseX = 0, mouseY = 0 }) {
  const [hover, setHover] = useState(-1);

  const layer = (f) => ({
    transform: `translate(${mouseX * f * 10}px, ${mouseY * f * 8}px)`,
    willChange: "transform",
    transition: "transform 0.18s ease-out",
  });

  return (
    <svg viewBox="0 0 480 560" fill="none" aria-hidden="true"
      className={`davinci-svg${drawn ? " dv-drawn" : ""}`}>

      <defs>
        <filter id="dv-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="b"/>
          <feFlood floodColor={INK} floodOpacity="0.20" result="c"/>
          <feComposite in="c" in2="b" operator="in" result="s"/>
          <feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <path id="dv-mp-up"    d={`M ${CX} ${HIY} L ${CX} ${SHY} L ${CX} ${HC}`} />
        <path id="dv-mp-left"  d={`M ${CX} ${SHY+10} C ${CX-10} ${WAY} ${CX-38} ${HIY} ${KLX} ${KLY} L ${SX} ${SY+SH_SQ}`} />
        <path id="dv-mp-right" d={`M ${CX} ${SHY+10} C ${CX+10} ${WAY} ${CX+38} ${HIY} ${KRX} ${KRY} L ${SX+SW} ${SY+SH_SQ}`} />
      </defs>

      <g style={layer(0.5)}>
        <path d={P_RAIL_T} stroke={INK} strokeWidth="0.8" opacity="0.32" {...dp("0.6s","0.05s")} />
        <path d={P_RAIL_L} stroke={INK} strokeWidth="0.8" opacity="0.32" {...dp("0.6s","0.10s")} />
        <path d={P_RAIL_R} stroke={INK} strokeWidth="0.8" opacity="0.32" {...dp("0.6s","0.12s")} />
        <path d={P_TICKS_T} stroke={INK} strokeWidth="0.8" opacity="0.38" {...dp("0.5s","0.52s")} />
        <path d={P_TICKS_L} stroke={INK} strokeWidth="0.8" opacity="0.38" {...dp("0.5s","0.56s")} />
        <path d={P_TICKS_R} stroke={INK} strokeWidth="0.8" opacity="0.38" {...dp("0.5s","0.60s")} />
        <path d={P_CIRCLE} stroke={INK} strokeWidth="1.6" opacity="0.68" {...dp("1.4s","0.10s")} />
        <path d={P_SQUARE} stroke={INK} strokeWidth="1.6" opacity="0.68" {...dp("1.2s","0.30s")} />
      </g>

      <g opacity="0.26" style={layer(0.9)}>
        <path d={P_ARM_LR}  stroke={INK} strokeWidth="1.8" strokeLinecap="round" {...dp("0.5s","2.00s")} />
        <path d={P_ARM_RR}  stroke={INK} strokeWidth="1.8" strokeLinecap="round" {...dp("0.5s","2.00s")} />
        <path d={P_LEG_LT}  stroke={INK} strokeWidth="1.8" strokeLinecap="round" {...dp("0.45s","2.10s")} />
        <path d={P_LEG_RT}  stroke={INK} strokeWidth="1.8" strokeLinecap="round" {...dp("0.45s","2.10s")} />
        <path d={P_FOOT_LT} stroke={INK} strokeWidth="1.2" strokeLinecap="round" {...dp("0.28s","2.42s")} />
        <path d={P_FOOT_RT} stroke={INK} strokeWidth="1.2" strokeLinecap="round" {...dp("0.28s","2.42s")} />
      </g>

      <g style={layer(1.4)}>
        <path d={P_ARM_L}  stroke={INK} strokeWidth="2.2" strokeLinecap="round" {...dp("0.55s","1.80s")} />
        <path d={P_ARM_R}  stroke={INK} strokeWidth="2.2" strokeLinecap="round" {...dp("0.55s","1.80s")} />
        <path d={P_HAND_L} stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.76" {...dp("0.40s","2.22s")} />
        <path d={P_HAND_R} stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.76" {...dp("0.40s","2.22s")} />
        <path d={P_LEG_LS} stroke={INK} strokeWidth="2.2" strokeLinecap="round" {...dp("0.65s","1.88s")} />
        <path d={P_LEG_RS} stroke={INK} strokeWidth="2.2" strokeLinecap="round" {...dp("0.65s","1.88s")} />
        <path d={P_KNEE_L} stroke={INK} strokeWidth="1.0" opacity="0.55" {...dp("0.22s","2.46s")} />
        <path d={P_KNEE_R} stroke={INK} strokeWidth="1.0" opacity="0.55" {...dp("0.22s","2.46s")} />
        <path d={P_FOOT_L} stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.78" {...dp("0.30s","2.50s")} />
        <path d={P_FOOT_R} stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.78" {...dp("0.30s","2.50s")} />
        <path d={P_TORSO}  stroke={INK}  strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" className="dv-dp dv-breathe" pathLength="1" style={{ "--dur":"1.0s", "--del":"1.68s" }} />
        <path d={P_COLLAR} stroke={INK2} strokeWidth="1.2" strokeLinecap="round" opacity="0.62" {...dp("0.40s","2.05s")} />
        <path d={P_STERN}  stroke={INK2} strokeWidth="0.8" strokeLinecap="round" opacity="0.42" {...dp("0.30s","2.12s")} />
        <path d={P_RIBS}   stroke={INK2} strokeWidth="0.85" strokeLinecap="round" opacity="0.40" {...dp("0.45s","2.18s")} />
        <path d={P_ABS}    stroke={INK2} strokeWidth="0.85" strokeLinecap="round" opacity="0.45" {...dp("0.40s","2.24s")} />
        <path d={P_NAVEL}  stroke={INK}  strokeWidth="1.0" opacity="0.52" {...dp("0.18s","2.30s")} />
        <path d={P_PELVIS} stroke={INK}  strokeWidth="1.1" strokeLinecap="round" opacity="0.58" {...dp("0.30s","2.36s")} />
        <path d={P_HEAD} stroke={INK} strokeWidth="2.0" {...dp("0.65s","1.64s")} />
        <path d={P_HAIR} stroke={INK} strokeWidth="1.3" strokeLinecap="round" opacity="0.72" {...dp("0.35s","2.00s")} />
        <path d={P_NECK} stroke={INK} strokeWidth="1.4" strokeLinecap="round" {...dp("0.25s","2.08s")} />
        <path d={P_FACE} stroke={INK} strokeWidth="0.9" strokeLinecap="round" opacity="0.68" {...dp("0.30s","2.62s")} />
        <circle cx={CX} cy={SHY+58} r="20" fill="none" stroke={INK} strokeWidth="1.0"
          opacity="0.14" className="dv-heart-beat" />
      </g>

      <g style={layer(0.35)}>
        {ANNOTS.map((a, i) => (
          <text key={i} x={a.x} y={a.y} textAnchor={a.anchor || "middle"}
            fontFamily="Newsreader, serif"
            fontSize={a.size || 10.5}
            fontStyle={a.italic ? "italic" : "normal"}
            fill={INK} className="dv-annotation"
            style={{ "--del": `${2.9 + i * 0.12}s` }}>
            {a.text}
          </text>
        ))}
      </g>

      {drawn && (
        <g opacity="0.52">
          <circle r="3.2" fill={INK}>
            <animateMotion dur="3.6s" repeatCount="indefinite" begin="0.4s">
              <mpath href="#dv-mp-up" />
            </animateMotion>
            <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.08;0.92;1" dur="3.6s" repeatCount="indefinite" begin="0.4s" />
          </circle>
          <circle r="3.0" fill={INK}>
            <animateMotion dur="4.2s" repeatCount="indefinite" begin="0.6s">
              <mpath href="#dv-mp-left" />
            </animateMotion>
            <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.08;0.92;1" dur="4.2s" repeatCount="indefinite" begin="0.6s" />
          </circle>
          <circle r="2.8" fill={INK}>
            <animateMotion dur="4.2s" repeatCount="indefinite" begin="2.0s">
              <mpath href="#dv-mp-right" />
            </animateMotion>
            <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.08;0.92;1" dur="4.2s" repeatCount="indefinite" begin="2.0s" />
          </circle>
        </g>
      )}

      {hover >= 0 && (
        <g className="dv-zone-popup">
          <circle cx={ZONES[hover].cx} cy={ZONES[hover].cy} r={ZONES[hover].r + 6}
            fill={INK} opacity="0.06" className="dv-zone-glow" />
          <circle cx={ZONES[hover].cx} cy={ZONES[hover].cy} r={ZONES[hover].r + 6}
            stroke={INK} strokeWidth="1.0" strokeDasharray="4 5" opacity="0.28"
            className="dv-zone-glow" />
          <rect
            x={ZONES[hover].cx - 58}
            y={ZONES[hover].cy + ZONES[hover].chipDy}
            width="116" height="28" rx="5"
            fill={PAPER} stroke={INK} strokeWidth="0.8" opacity="0.96"
          />
          <text
            x={ZONES[hover].cx}
            y={ZONES[hover].cy + ZONES[hover].chipDy + 11}
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="Geist Mono, monospace" fontSize="8" fill={INK}
            letterSpacing="0.09em" fontWeight="500">
            {ZONES[hover].label.toUpperCase()}
          </text>
          <text
            x={ZONES[hover].cx}
            y={ZONES[hover].cy + ZONES[hover].chipDy + 22}
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="Geist Mono, monospace" fontSize="7" fill={INK}
            letterSpacing="0.06em" opacity="0.55">
            {ZONES[hover].desc}
          </text>
        </g>
      )}

      {ZONES.map((z, i) => (
        <circle key={i} cx={z.cx} cy={z.cy} r={z.r}
          fill="transparent" style={{ cursor: "crosshair" }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(-1)} />
      ))}
    </svg>
  );
}

window.DaVinciSVG = DaVinciSVG;
