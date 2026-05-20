/* global React */
// components/svg/ECGPanel.jsx
// Continuously scrolling 3-lead ECG animation for the Proof section.
// Aesthetic: real cardiogram printout — dark green ink on light paper grid.
// Distinct from hero (frame flipbook) and all HeartBase SVG sections.

const { useEffect, useState } = React;

// ── Colour tokens ────────────────────────────────────────
const INK    = "oklch(0.40 0.13 155)";         // dark forest green — matches site ink
const INK2   = "oklch(0.50 0.11 155)";         // slightly lighter for glow
const PAPER  = "oklch(0.975 0.008 145)";       // proof-right background
const GRID   = "oklch(0.62 0.09 155)";         // muted green for ECG paper grid
const CURSOR = "oklch(0.58 0.18 28)";          // recording cursor — coral red

// ── Layout ───────────────────────────────────────────────
const W = 800, H = 480;
const PERIOD  = 320;   // SVG units per heartbeat
const N_REPS  = 8;     // repetitions in the strip (ensures seamless loop)
const BPM_DUR = "0.86s"; // ≈ 70 BPM scroll period

// ── ECG path data: one PQRST complex (y-up = negative, baseline y=0) ────
// Lead I  — classic balanced morphology
const PATH_I = [
  "M 0,0 L 48,0",
  "C 57,-11 80,-11 96,0",      // P wave
  "L 115,0",                    // PR segment
  "L 121,7 L 125,-62 L 130,14 L 148,0",  // QRS
  "L 178,0",                    // ST segment
  "C 193,-17 218,-17 235,0",   // T wave
  `L ${PERIOD},0`,
].join(" ");

// Lead II — taller R, broader T (inferior lead)
const PATH_II = [
  "M 0,0 L 46,0",
  "C 55,-13 79,-13 94,0",
  "L 114,0",
  "L 120,5 L 124,-74 L 129,16 L 148,0",
  "L 183,0",
  "C 200,-20 228,-20 248,0",
  `L ${PERIOD},0`,
].join(" ");

// Lead aVF — widened P, shorter R, early T
const PATH_AVF = [
  "M 0,0 L 50,0",
  "C 60,-8 85,-8 102,0",
  "L 118,0",
  "L 124,8 L 128,-54 L 133,12 L 150,0",
  "L 174,0",
  "C 190,-22 215,-22 234,0",
  `L ${PERIOD},0`,
].join(" ");

const LEADS = [
  { id: "I",   label: "I",   y: 100, path: PATH_I,   del: "0s"     },
  { id: "II",  label: "II",  y: 248, path: PATH_II,  del: "-0.29s" },
  { id: "aVF", label: "aVF", y: 390, path: PATH_AVF, del: "-0.57s" },
];

// ─────────────────────────────────────────────────────────
function ECGPanel({ isActive, animKey = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isActive) { setVisible(false); return; }
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [isActive, animKey]);

  return (
    <div className={`hs-panel ecg-panel${visible ? " panel-in" : ""}`}>
      <div className="ecg-wrap">

        {/* Header bar — sits above the SVG */}
        <div className="ecg-header">
          <span className="ecg-header-label">12-LEAD MONITOR</span>
          <span className="ecg-header-bpm">
            <span className="ecg-bpm-dot" />70 BPM · NSR
          </span>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="ecg-svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* ECG paper: small (5mm) squares */}
            <pattern id="ecg-grid-sm" x="0" y="0" width="20" height="20"
              patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none"
                stroke={GRID} strokeWidth="0.5" opacity="0.28" />
            </pattern>
            {/* ECG paper: large (25mm) squares */}
            <pattern id="ecg-grid-lg" x="0" y="0" width="100" height="100"
              patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#ecg-grid-sm)" />
              <path d="M 100 0 L 0 0 0 100" fill="none"
                stroke={GRID} strokeWidth="1.0" opacity="0.55" />
            </pattern>

            {/* Clip — prevent scroll bleed outside SVG bounds */}
            <clipPath id="ecg-clip-all">
              <rect x="0" y="0" width={W} height={H} />
            </clipPath>

            {/* Per-channel clips */}
            {LEADS.map(l => (
              <clipPath key={l.id} id={`ecg-ch-${l.id}`}>
                <rect x="0" y={l.y - 86} width={W} height="172" />
              </clipPath>
            ))}

            {/* Recording cursor glow */}
            <filter id="ecg-cursor-glow" x="-600%" y="0%" width="1300%" height="100%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7 0" />
            </filter>

            {/* Fade-out gradients for left & right edges */}
            <linearGradient id="ecg-fade-l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor={PAPER} stopOpacity="1" />
              <stop offset="10%" stopColor={PAPER} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ecg-fade-r" x1="0" y1="0" x2="1" y2="0">
              <stop offset="88%" stopColor={PAPER} stopOpacity="0" />
              <stop offset="100%" stopColor={PAPER} stopOpacity="1" />
            </linearGradient>

            {/* One PQRST period per lead */}
            <path id="ecg-I"   d={PATH_I}   />
            <path id="ecg-II"  d={PATH_II}  />
            <path id="ecg-aVF" d={PATH_AVF} />
          </defs>

          {/* ECG paper grid */}
          <rect x="0" y="0" width={W} height={H} fill="url(#ecg-grid-lg)" />

          {/* 3 channel strips */}
          <g clipPath="url(#ecg-clip-all)">
            {LEADS.map((lead, li) => (
              <g key={lead.id}>
                {/* Channel divider */}
                {li > 0 && (
                  <line x1="0" y1={lead.y - 88} x2={W} y2={lead.y - 88}
                    stroke={GRID} strokeWidth="1" opacity="0.55" />
                )}

                {/* Lead label */}
                <text x="10" y={lead.y - 60}
                  fill={INK} fontSize="12"
                  fontFamily="Geist Mono, monospace"
                  letterSpacing="0.06em" opacity="0.55">
                  {lead.label}
                </text>

                {/* Calibration mark (1mV box, 20px wide × 50px tall) */}
                <path
                  d={`M 34,${lead.y - 38} L 34,${lead.y + 12} L 54,${lead.y + 12} L 54,${lead.y - 38}`}
                  fill="none" stroke={INK} strokeWidth="1.2" opacity="0.30"
                  strokeLinecap="square" />

                {/* Baseline */}
                <line x1="58" y1={lead.y} x2={W} y2={lead.y}
                  stroke={INK} strokeWidth="0.5" opacity="0.16" strokeDasharray="2 8" />

                {/* Scrolling waveform — main stroke */}
                <g clipPath={`url(#ecg-ch-${lead.id})`}>
                  <g className="ecg-track"
                    style={{ "--ecg-dur": BPM_DUR, "--ecg-del": lead.del }}>
                    {Array.from({ length: N_REPS }, (_, i) => (
                      <use key={i}
                        href={`#ecg-${lead.id}`}
                        x={58 + i * PERIOD} y={lead.y}
                        stroke={INK} strokeWidth="1.7"
                        fill="none"
                        strokeLinecap="round" strokeLinejoin="round" />
                    ))}
                  </g>
                  {/* Glow layer */}
                  <g className="ecg-track"
                    style={{ "--ecg-dur": BPM_DUR, "--ecg-del": lead.del }}>
                    {Array.from({ length: N_REPS }, (_, i) => (
                      <use key={i}
                        href={`#ecg-${lead.id}`}
                        x={58 + i * PERIOD} y={lead.y}
                        stroke={INK2} strokeWidth="5"
                        fill="none" opacity="0.12"
                        strokeLinecap="round" strokeLinejoin="round" />
                    ))}
                  </g>
                </g>
              </g>
            ))}
          </g>

          {/* Recording cursor — marks live write position */}
          <g className="ecg-cursor">
            {/* Glow halo */}
            <rect x="675" y="0" width="14" height={H}
              fill={CURSOR} opacity="0.10" filter="url(#ecg-cursor-glow)" />
            {/* Crisp cursor line */}
            <line x1="682" y1="0" x2="682" y2={H}
              stroke={CURSOR} strokeWidth="0.9"
              className="ecg-cursor-line" />
            {/* Live indicator dot */}
            <circle cx="682" cy="20" r="3.5"
              fill={CURSOR} className="ecg-cursor-dot" />
          </g>

          {/* Edge fade overlays (mask the scroll entry/exit) */}
          <rect x="0" y="0" width={W} height={H} fill="url(#ecg-fade-l)" />
          <rect x="0" y="0" width={W} height={H} fill="url(#ecg-fade-r)" />
        </svg>

        {/* Footer metadata */}
        <div className="ecg-footer">
          <span>25 mm/s · 10 mm/mV · 0.05–150 Hz</span>
          <span>VELAI CARDIAC ANALYTICS</span>
        </div>

      </div>
    </div>
  );
}

window.ECGPanel = ECGPanel;
