/* global React */
// components/svg/HeartFramePlayer.jsx
// HUD/FUI-style flipbook animation of heart being drawn.
// Overlay: scan sweep, ambient rings, probe arms w/ data readouts,
// tick ring, corner brackets, view annotation. LIGHT_GRN from DaVinciPanel.

const { useEffect, useRef, useState } = React;

const FPS       = 20;
const FRAME_MS  = 1000 / FPS;
const LIGHT_GRN = "oklch(0.55 0.15 155)"; // matches DaVinciPanel LIGHT_GRN

// Heart centre in the 1280×720 frame coordinate space
const CX = 640, CY = 360;
const RAD_IN  = 196;   // probe arm start (ring edge)
const RAD_OUT = 390;   // probe arm end / dot

// ── Frame sources (all 120 frames) ──────────────────────
const FRAME_SRCS = (() => {
  const a = [];
  for (let i = 1; i <= 120; i++) a.push(`frames_transparent/${i}.png`);
  return a;
})();
const TOTAL = FRAME_SRCS.length;

// ── Tick marks: 24 ticks, 15° apart, around r=325 ──────
const TICKS = Array.from({ length: 24 }, (_, i) => {
  const rad    = (i * 15 - 90) * Math.PI / 180;
  const isMain = i % 6 === 0;
  const isMid  = i % 3 === 0;
  const r1     = isMain ? 312 : isMid ? 317 : 320;
  const r2     = 328;
  return {
    x1: CX + Math.cos(rad) * r1, y1: CY + Math.sin(rad) * r1,
    x2: CX + Math.cos(rad) * r2, y2: CY + Math.sin(rad) * r2,
    w:  isMain ? 1.3 : isMid ? 0.70 : 0.45,
    op: isMain ? 0.62 : isMid ? 0.40 : 0.22,
  };
});

// ── Cardinal probe arms with data readouts ──────────────
// label = category (small), value = measured readout (large), fill = bar 0–1
const PROBES = [
  { angle: -90, label: "CARDIAC RHYTHM", value: "72 BPM", fill: 0.72 },
  { angle:   0, label: "BLOOD PRESSURE", value: "120/80", fill: 0.83 },
  { angle:  90, label: "PERFUSION",      value: "98 %",   fill: 0.98 },
  { angle: 180, label: "CIRCULATION",    value: "5.2 L",  fill: 0.87 },
];

// ── Corner HUD brackets ─────────────────────────────────
const CORNERS  = [[228, 34, 1, 1], [1052, 34, -1, 1], [228, 686, 1, -1], [1052, 686, -1, -1]];
const BRACKET  = 40;

// ── Quadrant arcs between probe arms ───────────────────
const ARC_R   = 382;
const ARC_GAP = 12; // degrees left clear at each probe arm

function arcPath(cx, cy, r, a1deg, a2deg) {
  const a1 = a1deg * Math.PI / 180, a2 = a2deg * Math.PI / 180;
  const x1 = (cx + Math.cos(a1) * r).toFixed(2), y1 = (cy + Math.sin(a1) * r).toFixed(2);
  const x2 = (cx + Math.cos(a2) * r).toFixed(2), y2 = (cy + Math.sin(a2) * r).toFixed(2);
  return `M ${x1},${y1} A ${r},${r} 0 0 1 ${x2},${y2}`;
}

const ARCS = [
  { a1: -90 + ARC_GAP, a2:   0 - ARC_GAP, del: "1.8s" },
  { a1:   0 + ARC_GAP, a2:  90 - ARC_GAP, del: "2.2s" },
  { a1:  90 + ARC_GAP, a2: 180 - ARC_GAP, del: "2.6s" },
  { a1: 180 + ARC_GAP, a2: 270 - ARC_GAP, del: "3.0s" },
];

// ── Probe text layout helper ────────────────────────────
function probeLayout(p) {
  const rad = p.angle * Math.PI / 180;
  const x1  = CX + Math.cos(rad) * RAD_OUT;
  const y1  = CY + Math.sin(rad) * RAD_OUT;
  const isN = p.angle === -90, isS = p.angle === 90;
  const isE = p.angle === 0,   isW = p.angle === 180;
  const ta  = isE ? "start" : isW ? "end" : "middle";
  let lx, ly_val, ly_lbl;
  if (isN) { lx = x1;      ly_val = y1 - 14; ly_lbl = y1 - 28; }
  if (isS) { lx = x1;      ly_val = y1 + 22; ly_lbl = y1 + 38; }
  if (isE) { lx = x1 + 15; ly_val = y1 + 7;  ly_lbl = y1 - 9;  }
  if (isW) { lx = x1 - 15; ly_val = y1 + 7;  ly_lbl = y1 - 9;  }
  // Progress bar: track full width, fill scales to p.fill
  const BW = isE || isW ? 38 : 44;
  let bx, by;
  if (isN) { bx = lx - BW / 2; by = ly_lbl + 14; }
  if (isS) { bx = lx - BW / 2; by = ly_lbl + 15; }
  if (isE) { bx = lx;          by = ly_lbl + 18;  }
  if (isW) { bx = lx - BW;     by = ly_lbl + 18;  }
  return { x1, y1, lx, ly_val, ly_lbl, ta, bx, by, bw: BW };
}

// ────────────────────────────────────────────────────────
function HeartFramePlayer({ animKey = 0 }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const rafRef    = useRef(null);
  const tLastRef  = useRef(null);
  const idxRef    = useRef(0);
  const [ready,  setReady]  = useState(false);
  const [phase,  setPhase]  = useState('idle'); // idle | drawing | beating

  /* ── Preload all frames once ──────────────────────── */
  useEffect(() => {
    let n = 0;
    const imgs = FRAME_SRCS.map(src => {
      const img = new Image();
      img.src = src;
      const done = () => { if (++n === TOTAL) setReady(true); };
      img.onload = done; img.onerror = done;
      return img;
    });
    imagesRef.current = imgs;
  }, []);

  /* ── Restart on animKey or first load ────────────── */
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    idxRef.current   = 0;
    tLastRef.current = null;
    setPhase('drawing');

    const drawFrame = (img) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const tick = (ts) => {
      if (tLastRef.current === null) tLastRef.current = ts;
      const dt = ts - tLastRef.current;
      if (dt >= FRAME_MS) {
        tLastRef.current = ts - (dt % FRAME_MS);
        const img = imagesRef.current[idxRef.current];
        if (img?.complete) drawFrame(img);
        idxRef.current++;
        if (idxRef.current >= TOTAL) {
          const last = imagesRef.current[TOTAL - 1];
          if (last?.complete) drawFrame(last);
          setPhase('beating');
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [ready, animKey]);

  const isDrawing = phase === 'drawing';
  const isBeating = phase === 'beating';
  const cls = `hfp-area${isDrawing ? ' hfp-drawing' : ''}${isBeating ? ' hfp-beating' : ''}`;

  return (
    <div className="hfp-wrap">
      <div className={cls}>

        {/* ── Canvas ──────────────────────────────── */}
        <canvas
          ref={canvasRef}
          width={1280} height={720}
          className="hfp-canvas"
          style={{ opacity: phase !== 'idle' ? 1 : 0 }}
          aria-hidden="true"
        />

        {/* ── Decorative HUD overlay ───────────────── */}
        <svg
          viewBox="0 0 1280 720"
          className="hfp-overlay"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="hfp-halo-g" cx="50%" cy="50%" r="50%">
              <stop offset="18%"  stopColor={LIGHT_GRN} stopOpacity="0.13" />
              <stop offset="100%" stopColor={LIGHT_GRN} stopOpacity="0"    />
            </radialGradient>
          </defs>

          {/* Ambient halo */}
          <ellipse cx={CX} cy={CY} rx="316" ry="286"
            fill="url(#hfp-halo-g)"
            className="hfp-el hfp-halo" />

          {/* 3 concentric rotating rings */}
          <circle cx={CX} cy={CY} r="198"
            fill="none" stroke={LIGHT_GRN} strokeWidth="0.80"
            strokeDasharray="5 11" strokeLinecap="round"
            className="hfp-el hfp-ring hfp-ring-1" />
          <circle cx={CX} cy={CY} r="254"
            fill="none" stroke={LIGHT_GRN} strokeWidth="0.52"
            strokeDasharray="2 15" strokeLinecap="round"
            className="hfp-el hfp-ring hfp-ring-2" />
          <circle cx={CX} cy={CY} r="308"
            fill="none" stroke={LIGHT_GRN} strokeWidth="0.38"
            strokeDasharray="1 20" strokeLinecap="round"
            className="hfp-el hfp-ring hfp-ring-3" />

          {/* Tick ring */}
          <g className="hfp-el hfp-tick-group">
            {TICKS.map((t, i) => (
              <line key={i}
                x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                stroke={LIGHT_GRN} strokeWidth={t.w} opacity={t.op}
                strokeLinecap="round" />
            ))}
          </g>

          {/* Probe arms + data readouts */}
          {PROBES.map((p, i) => {
            const { x1, y1, lx, ly_val, ly_lbl, ta, bx, by, bw } = probeLayout(p);
            const rad = p.angle * Math.PI / 180;
            const x0  = CX + Math.cos(rad) * RAD_IN;
            const y0  = CY + Math.sin(rad) * RAD_IN;
            return (
              <g key={i} className="hfp-el hfp-probe" style={{ "--del": `${i * 0.15}s` }}>
                <line x1={x0} y1={y0} x2={x1} y2={y1}
                  stroke={LIGHT_GRN} strokeWidth="0.90"
                  strokeDasharray="4 9" strokeLinecap="round" />
                <circle cx={x1} cy={y1} r="5.5"
                  fill={LIGHT_GRN} opacity="0.82"
                  className="hfp-probe-dot" />
                <circle cx={x1} cy={y1} r="11.5"
                  fill="none" stroke={LIGHT_GRN}
                  strokeWidth="0.70" opacity="0.28" />
                {/* Category label — small */}
                <text x={lx} y={ly_lbl}
                  fill={LIGHT_GRN} fontSize="11"
                  fontFamily="Geist Mono, monospace"
                  letterSpacing="0.13em" opacity="0.52"
                  textAnchor={ta}>{p.label}</text>
                {/* Data value — prominent */}
                <text x={lx} y={ly_val}
                  fill={LIGHT_GRN} fontSize="18"
                  fontFamily="Geist Mono, monospace"
                  letterSpacing="0.06em" opacity="0.82"
                  textAnchor={ta}
                  className="hfp-data-value">{p.value}</text>
                {/* Health bar indicator */}
                <g className="hfp-probe-bar-group" style={{ "--del": `${i * 0.22}s` }}>
                  <rect x={bx} y={by} width={bw} height="1.5" rx="0.75"
                    fill={LIGHT_GRN} opacity="0.14" />
                  <rect x={bx} y={by} width={bw * p.fill} height="1.5" rx="0.75"
                    fill={LIGHT_GRN} opacity="0.55"
                    className="hfp-probe-bar" />
                </g>
              </g>
            );
          })}

          {/* Quadrant arcs — dashed, appear between probe arms */}
          {ARCS.map((arc, i) => (
            <path key={i}
              d={arcPath(CX, CY, ARC_R, arc.a1, arc.a2)}
              fill="none" stroke={LIGHT_GRN} strokeWidth="0.55"
              strokeDasharray="3 9" strokeLinecap="round"
              className="hfp-el hfp-arc"
              style={{ "--del": arc.del }} />
          ))}

          {/* Corner HUD brackets */}
          {CORNERS.map(([x, y, dx, dy], i) => (
            <path key={i}
              d={`M ${x + dx * BRACKET} ${y} L ${x} ${y} L ${x} ${y + dy * BRACKET}`}
              fill="none" stroke={LIGHT_GRN} strokeWidth="1.4"
              strokeLinecap="round"
              className="hfp-el hfp-corner"
              style={{ "--del": `${i * 0.09}s` }} />
          ))}

          {/* Scan sweep — one-shot during drawing */}
          <g className="hfp-scanline">
            <line x1="0" y1="-5" x2="1280" y2="-5"
              stroke={LIGHT_GRN} strokeWidth="0.5" opacity="0.22" />
            <line x1="0" y1="0" x2="1280" y2="0"
              stroke={LIGHT_GRN} strokeWidth="1.0" opacity="0.58" />
            <line x1="0" y1="5" x2="1280" y2="5"
              stroke={LIGHT_GRN} strokeWidth="3.0" opacity="0.10" />
          </g>

          {/* View annotation */}
          <text x={CX} y="44"
            fill={LIGHT_GRN} fontSize="11"
            fontFamily="Geist Mono, monospace"
            letterSpacing="0.24em" opacity="0.42"
            textAnchor="middle"
            className="hfp-el hfp-annotation"
            style={{ "--del": "0.5s" }}>
            ANTERIOR VIEW
          </text>

          {/* Status indicator — blinks while drawing, steady when beating */}
          <g className="hfp-el hfp-status" style={{ "--del": "0.2s" }}>
            <circle cx="232" cy="42" r="4"
              fill={LIGHT_GRN} opacity="0.80"
              className={isDrawing ? "hfp-status-blink" : "hfp-status-steady"} />
            <text x="244" y="47"
              fill={LIGHT_GRN} fontSize="10"
              fontFamily="Geist Mono, monospace"
              letterSpacing="0.14em" opacity="0.50">
              {isBeating ? "MAPPING COMPLETE" : "ANALYZING..."}
            </text>
          </g>

          {/* Beat pulse ring */}
          <circle cx={CX} cy={CY} r="191"
            fill="none" stroke={LIGHT_GRN} strokeWidth="1.5"
            className="hfp-pulse-ring" />

          {/* Centre crosshair dot */}
          <circle cx={CX} cy={CY} r="3.5"
            fill={LIGHT_GRN} opacity="0.38"
            className="hfp-el hfp-center-dot" />
        </svg>

      </div>
    </div>
  );
}

window.HeartFramePlayer = HeartFramePlayer;
