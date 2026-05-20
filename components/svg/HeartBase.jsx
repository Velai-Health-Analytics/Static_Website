/* global React */
// components/svg/HeartBase.jsx — animated anatomical heart SVG.
// Uses SVG pathLength="1" + stroke-dashoffset CSS trick for draw-on effects.
// Section overlays remount via animKey, restarting their CSS animations cleanly.

const { useEffect, useRef, useState } = React;

/* ── Anatomical path data (anterior view, 480×520 viewBox) ─────── */

const SILHOUETTE = `M 248 148
  C 262 122 294 110 328 120
  C 366 132 392 170 392 212
  C 392 256 372 292 346 322
  C 320 350 292 378 266 406
  C 254 424 244 450 238 472
  C 232 448 222 424 208 406
  C 182 376 152 348 128 318
  C 102 284 90 248 94 208
  C 98 164 124 128 162 116
  C 192 106 224 118 242 138 Z`;

const AORTA      = `M 262 154 C 264 124 270 94 278 70 C 284 50 300 38 322 38 C 348 38 368 58 376 82 C 382 104 376 128 368 152`;
const BRACHIO    = `M 290 54 L 292 12`;
const LCC_BR     = `M 314 42 L 318 6`;
const LSUB_BR    = `M 334 46 L 358 14`;
const PULM_TRUNK = `M 232 158 C 220 132 206 106 192 88`;
const PA_L       = `M 192 88 C 214 70 248 64 274 80`;
const PA_R       = `M 192 88 C 170 72 138 74 116 96`;
const SVC        = `M 350 98 C 352 130 350 162 346 192`;
const IVC        = `M 366 306 C 362 326 356 346 350 362`;
const PV_L       = `M 146 178 C 166 186 188 192 212 194`;
const PV_R       = `M 336 176 C 316 184 294 188 272 190`;

const AV_SULCUS  = `M 140 228 C 186 250 234 260 284 260 C 330 260 368 248 392 228`;
const AIV_GROOVE = `M 258 180 C 254 224 250 272 246 322 C 242 362 236 412 230 466`;

const LAD        = `M 258 178 C 254 222 250 272 246 320 C 242 362 236 412 230 466`;
const LAD_D1     = `M 252 242 C 238 256 220 264 200 270`;
const LAD_D2     = `M 248 304 C 234 316 216 324 196 330`;
const LCX        = `M 248 168 C 220 172 190 188 166 210 C 146 228 136 256 136 282`;
const LCX_OM     = `M 144 260 C 138 278 136 296 140 312`;
const RCA        = `M 264 168 C 298 180 332 202 354 230 C 376 256 380 286 372 314`;
const RCA_PDA    = `M 356 290 C 352 308 344 324 336 340`;

/* ── Overlay data ───────────────────────────────────────────────── */

const MOD_PROBES = [
  { anchor:{cx:350,cy:98},  path:"M 348 98  Q 258 46  80 38",   id:"labs",    delay:0.00 },
  { anchor:{cx:130,cy:272}, path:"M 130 272 Q 50  260  14 244",  id:"imaging", delay:0.18 },
  { anchor:{cx:392,cy:232}, path:"M 392 230 Q 446 214 466 202",  id:"genomics",delay:0.36 },
  { anchor:{cx:374,cy:314}, path:"M 374 314 Q 432 358 460 390",  id:"meds",    delay:0.54 },
  { anchor:{cx:230,cy:466}, path:"M 230 466 Q 196 502 128 516",  id:"behav",   delay:0.72 },
];

const FLOW_NODES = [
  { x:236, y:96,  num:"01", delay:0.00 },
  { x:248, y:292, num:"02", delay:0.22 },
  { x:322, y:96,  num:"03", delay:0.44 },
  { x:232, y:464, num:"04", delay:0.66 },
];

const FLOW_ARCS = [
  { d:"M 236 116 C 240 192 244 242 248 274",           delay:0.92 },
  { d:"M 262 274 C 282 196 300 148 312 116",           delay:1.10 },
  { d:"M 318 116 Q 406 294 250 444",                   delay:1.28, faint:true },
  { d:"M 242 444 Q 98  360 228 120",                   delay:1.46, faint:true },
];

const AUD_ZONES = [
  { cx:108, cy:108 },
  { cx:384, cy:108 },
  { cx:384, cy:452 },
  { cx:108, cy:452 },
];

/* ── HeartBase ──────────────────────────────────────────────────── */
function HeartBase({ sectionKey = "hero", audienceActive = 0 }) {
  const [drawn, setDrawn] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const prevKey = useRef(sectionKey);

  useEffect(() => {
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setDrawn(true));
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, []);

  useEffect(() => {
    if (sectionKey !== prevKey.current) {
      prevKey.current = sectionKey;
      setAnimKey(k => k + 1);
    }
  }, [sectionKey]);

  const isDark = sectionKey === "proof";
  const isWarm = sectionKey === "cta";

  const ink    = isDark ? "oklch(0.84 0.10 155)" : "oklch(0.40 0.13 155)";
  const ink2   = isDark ? "oklch(0.72 0.09 155)" : "oklch(0.34 0.12 155)";
  const paper  = isDark ? "oklch(0.20 0.014 200)" : "oklch(0.97 0.012 155)";
  const haloC  = isDark ? "oklch(0.26 0.014 200)" : isWarm ? "oklch(0.96 0.022 38)" : "oklch(0.94 0.026 155)";
  const accent = isWarm ? "oklch(0.64 0.13 38)"   : "oklch(0.60 0.18 155)";
  const probeC = isDark ? "oklch(0.84 0.10 155)"  : "oklch(0.40 0.13 155)";

  const dp = (dur, del) => ({
    pathLength: "1",
    className: "dp",
    style: { "--dur": dur, "--del": del },
  });

  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      aria-hidden="true"
      className={`heart-svg${drawn ? " drawn" : ""}`}
    >
      <defs>
        <linearGradient id="hgv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={ink} />
          <stop offset="100%" stopColor={ink2} />
        </linearGradient>
        <radialGradient id="hgr" cx="50%" cy="55%" r="52%">
          <stop offset="0%"   stopColor={haloC} stopOpacity="1" />
          <stop offset="62%"  stopColor={haloC} stopOpacity="0.30" />
          <stop offset="100%" stopColor={haloC} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hgi" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={ink} stopOpacity="0.06" />
          <stop offset="100%" stopColor={ink} stopOpacity="0" />
        </radialGradient>
        <filter id="hglow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="b"/>
          <feFlood floodColor={ink} floodOpacity="0.28" result="c"/>
          <feComposite in="c" in2="b" operator="in" result="s"/>
          <feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <path id="hmp-ao"  d={AORTA} />
        <path id="hmp-pt"  d={PULM_TRUNK} />
        <path id="hmp-rca" d={RCA} />
        <path id="hmp-lad" d={LAD} />
        <path id="hmp-pal" d={PA_L} />
        <path id="hmp-par" d={PA_R} />
      </defs>

      <ellipse cx="240" cy="295" rx="238" ry="232" fill="url(#hgr)" className="h-halo" />
      <ellipse cx="240" cy="295" rx="178" ry="172" fill="url(#hgi)" />

      <g opacity={isDark ? 0.09 : 0.22} style={{ transition: "opacity 0.8s" }}>
        {[145, 183, 221].map(r => (
          <circle key={r} cx="240" cy="290" r={r}
            stroke={isDark ? "oklch(0.38 0.010 200)" : "oklch(0.80 0.014 145)"}
            strokeWidth="0.5" strokeDasharray="2 7" />
        ))}
        {[0, 60, 120, 180, 240, 300].map(a => {
          const rad = (a - 90) * Math.PI / 180;
          return (
            <line key={a}
              x1={240 + Math.cos(rad) * 222} y1={290 + Math.sin(rad) * 222}
              x2={240 + Math.cos(rad) * 230} y2={290 + Math.sin(rad) * 230}
              stroke={isDark ? "oklch(0.34 0.008 200)" : "oklch(0.76 0.012 145)"}
              strokeWidth="0.8" />
          );
        })}
      </g>

      <g className="h-vessels">
        <path d={AORTA}    stroke="url(#hgv)" strokeWidth="3.4" strokeLinecap="round" {...dp("0.9s","0.54s")} />
        <path d={BRACHIO}  stroke="url(#hgv)" strokeWidth="2.4" strokeLinecap="round" {...dp("0.38s","1.02s")} />
        <path d={LCC_BR}   stroke="url(#hgv)" strokeWidth="2.1" strokeLinecap="round" {...dp("0.34s","1.08s")} />
        <path d={LSUB_BR}  stroke="url(#hgv)" strokeWidth="1.9" strokeLinecap="round" {...dp("0.34s","1.14s")} />
        <path d={PULM_TRUNK} stroke="url(#hgv)" strokeWidth="3.0" strokeLinecap="round" {...dp("0.48s","0.62s")} />
        <path d={PA_L}       stroke="url(#hgv)" strokeWidth="2.3" strokeLinecap="round" {...dp("0.38s","0.86s")} />
        <path d={PA_R}       stroke="url(#hgv)" strokeWidth="2.3" strokeLinecap="round" {...dp("0.38s","0.92s")} />
        <path d={SVC} stroke="url(#hgv)" strokeWidth="2.6" strokeLinecap="round" opacity="0.82" {...dp("0.46s","0.72s")} />
        <path d={IVC} stroke="url(#hgv)" strokeWidth="2.2" strokeLinecap="round" opacity="0.70" {...dp("0.38s","0.80s")} />
        <path d={PV_L} stroke={ink} strokeWidth="1.7" strokeLinecap="round" opacity="0.52" {...dp("0.32s","1.22s")} />
        <path d={PV_R} stroke={ink} strokeWidth="1.7" strokeLinecap="round" opacity="0.52" {...dp("0.32s","1.28s")} />
      </g>

      <g className="h-body heart-beat">
        <path d={SILHOUETTE} fill={paper}
          style={{ opacity: isDark ? 0.36 : 0.78, transition: "opacity 0.8s, fill 1s" }} />
        <path d={SILHOUETTE} stroke="url(#hgv)" strokeWidth="2.8"
          strokeLinejoin="round" strokeLinecap="round" {...dp("1.1s","0.12s")} />
        <path d={AV_SULCUS} stroke={ink2} strokeWidth="1.5" strokeLinecap="round"
          opacity="0.40" {...dp("0.58s","1.36s")} />
        <path d={AIV_GROOVE} stroke={ink2} strokeWidth="0.9" strokeLinecap="round"
          opacity="0.24" strokeDasharray="3 5" {...dp("0.52s","1.44s")} />
      </g>

      <g className="h-coronary">
        <path d={LAD}    stroke={ink2} strokeWidth="2.1" strokeLinecap="round" {...dp("0.68s","1.56s")} />
        <path d={LAD_D1} stroke={ink2} strokeWidth="1.3" strokeLinecap="round" opacity="0.80" {...dp("0.38s","1.82s")} />
        <path d={LAD_D2} stroke={ink2} strokeWidth="1.1" strokeLinecap="round" opacity="0.74" {...dp("0.32s","1.88s")} />
        <path d={LCX}    stroke={ink2} strokeWidth="1.9" strokeLinecap="round" {...dp("0.54s","1.64s")} />
        <path d={LCX_OM} stroke={ink2} strokeWidth="1.2" strokeLinecap="round" opacity="0.76" {...dp("0.30s","1.94s")} />
        <path d={RCA}    stroke={ink2} strokeWidth="1.9" strokeLinecap="round" {...dp("0.54s","1.70s")} />
        <path d={RCA_PDA}stroke={ink2} strokeWidth="1.2" strokeLinecap="round" opacity="0.76" {...dp("0.30s","2.00s")} />
        <path d={LAD} stroke={accent} strokeWidth="2.6" strokeLinecap="round" fill="none"
          strokeDasharray="18 420" className="cor-pulse cor-1" />
        <path d={RCA} stroke={accent} strokeWidth="2.2" strokeLinecap="round" fill="none"
          strokeDasharray="14 340" className="cor-pulse cor-2" />
      </g>

      {drawn && (
        <g className="h-chambers" opacity={isDark ? 0.24 : 0.38}>
          {[["RA",314,220],["LA",176,206],["RV",306,328],["LV",174,338]].map(([l,x,y]) => (
            <text key={l} x={x} y={y} fontFamily="Geist Mono,monospace" fontSize="7.5"
              fill={ink} letterSpacing="0.10em" textAnchor="middle">{l}</text>
          ))}
        </g>
      )}

      <g className="h-particles" opacity={isDark ? 0.18 : 0.72}
        style={{ transition: "opacity 0.9s" }}>
        {[0, 1.3, 2.6].map((b, i) => (
          <circle key={"ao"+i} r="3.4" fill={ink}>
            <animateMotion dur="3.8s" repeatCount="indefinite" begin={b+"s"} rotate="auto">
              <mpath href="#hmp-ao" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1"
              dur="3.8s" repeatCount="indefinite" begin={b+"s"} />
          </circle>
        ))}
        {[0, 1.5].map((b, i) => (
          <circle key={"pt"+i} r="2.7" fill={ink} opacity="0.80">
            <animateMotion dur="2.7s" repeatCount="indefinite" begin={b+"s"}>
              <mpath href="#hmp-pt" />
            </animateMotion>
          </circle>
        ))}
        <circle r="2.3" fill={ink} opacity="0.72">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.6s">
            <mpath href="#hmp-pal" />
          </animateMotion>
        </circle>
        <circle r="2.3" fill={ink} opacity="0.72">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin="1.4s">
            <mpath href="#hmp-par" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill={ink} opacity="0.76">
          <animateMotion dur="3.4s" repeatCount="indefinite" begin="0.4s">
            <mpath href="#hmp-rca" />
          </animateMotion>
        </circle>
        <circle r="2.7" fill={ink} opacity="0.80">
          <animateMotion dur="3.8s" repeatCount="indefinite" begin="1.1s">
            <mpath href="#hmp-lad" />
          </animateMotion>
        </circle>
      </g>

      {sectionKey === "modalities" && (
        <g key={"mod-"+animKey}>
          {MOD_PROBES.map(p => (
            <g key={p.id}>
              <path d={p.path} stroke={probeC} strokeWidth="1.2"
                strokeDasharray="3 6" strokeLinecap="round" opacity="0.48"
                pathLength="1" className="probe-line" style={{ "--delay": `${p.delay}s` }} />
              <circle cx={p.anchor.cx} cy={p.anchor.cy} r="5.5"
                fill={probeC} className="probe-dot" style={{ "--delay": `${p.delay+0.08}s` }} />
              <circle cx={p.anchor.cx} cy={p.anchor.cy} r="11"
                fill="none" stroke={probeC} strokeWidth="0.8" opacity="0.26"
                className="probe-dot" style={{ "--delay": `${p.delay+0.16}s` }} />
            </g>
          ))}
        </g>
      )}

      {sectionKey === "flow" && (
        <g key={"flow-"+animKey}>
          {FLOW_NODES.map((n, i) => (
            <g key={i} className="flow-node" style={{ "--delay": `${n.delay}s` }}>
              <circle cx={n.x} cy={n.y} r="26" fill="none"
                stroke={ink} strokeWidth="0.8" opacity="0.18" />
              <circle cx={n.x} cy={n.y} r="19" fill={paper}
                stroke={ink} strokeWidth="1.9" />
              <text x={n.x} y={n.y+1} textAnchor="middle" dominantBaseline="middle"
                fontFamily="Geist Mono,monospace" fontSize="9"
                fill={ink} letterSpacing="0.06em" fontWeight="600">{n.num}</text>
            </g>
          ))}
          {FLOW_ARCS.map((a, i) => (
            <path key={i} d={a.d} stroke={ink} strokeWidth="1.2"
              strokeDasharray="3 6" strokeLinecap="round"
              opacity={a.faint ? 0.15 : 0.32}
              pathLength="1" className="flow-arc" style={{ "--delay": `${a.delay}s` }} />
          ))}
        </g>
      )}

      {sectionKey === "audience" && (
        <g key={"aud-"+animKey}>
          {AUD_ZONES.map((z, i) => (
            <g key={i} className="aud-zone" style={{ "--delay": `${i * 0.14}s` }}>
              <line x1={z.cx} y1={z.cy} x2="240" y2="290"
                stroke={ink} strokeWidth="0.9" strokeDasharray="3 6"
                style={{
                  opacity: audienceActive === i ? 0.55 : 0.15,
                  transition: "opacity 0.4s ease"
                }} />
              <circle cx={z.cx} cy={z.cy} r="23"
                fill={ink} fillOpacity={audienceActive === i ? 0.68 : 0}
                stroke={ink} strokeOpacity={audienceActive === i ? 0.80 : 0.32}
                strokeWidth="1.7"
                style={{ transition: "fill-opacity 0.4s ease, stroke-opacity 0.4s ease" }} />
              {audienceActive === i && (
                <circle cx={z.cx} cy={z.cy} r="35" fill="none"
                  stroke={ink} strokeWidth="1" opacity="0.16"
                  className="aud-pulse" />
              )}
            </g>
          ))}
        </g>
      )}

      {sectionKey === "proof" && (
        <g key={"proof-"+animKey}>
          {[
            { r:114, w:1.9, op:0.52, del:"0.00s" },
            { r:146, w:1.0, op:0.24, del:"0.18s" },
            { r:180, w:0.5, op:0.12, del:"0.36s" },
          ].map((ring, i) => (
            <circle key={i} cx="240" cy="290" r={ring.r} fill="none"
              stroke="oklch(0.76 0.14 155)" strokeWidth={ring.w} opacity={ring.op}
              pathLength="1" className="proof-ring" style={{ "--delay": ring.del }} />
          ))}
          {[
            { cx:240, cy:120, del:0.42 },
            { cx:386, cy:350, del:0.60 },
            { cx:94,  cy:350, del:0.78 },
          ].map((m, i) => (
            <g key={i}>
              <line x1={m.cx} y1={m.cy} x2="240" y2="290"
                stroke="oklch(0.76 0.14 155)" strokeWidth="0.9"
                strokeDasharray="3 6" opacity="0.24"
                pathLength="1" className="proof-line" style={{ "--delay": `${m.del}s` }} />
              <circle cx={m.cx} cy={m.cy} r="6.5"
                fill="oklch(0.76 0.14 155)"
                className="proof-dot" style={{ "--delay": `${m.del+0.08}s` }} />
              <circle cx={m.cx} cy={m.cy} r="13"
                fill="none" stroke="oklch(0.76 0.14 155)" strokeWidth="0.7" opacity="0.26"
                className="proof-dot" style={{ "--delay": `${m.del+0.16}s` }} />
            </g>
          ))}
        </g>
      )}

      {sectionKey === "cta" && (
        <g key={"cta-"+animKey}>
          {[
            { r:100, w:1.8, cls:"cta-ring-1" },
            { r:130, w:1.1, cls:"cta-ring-2" },
            { r:162, w:0.7, cls:"cta-ring-3" },
            { r:196, w:0.4, cls:"cta-ring-4" },
          ].map(ring => (
            <circle key={ring.cls} cx="240" cy="290" r={ring.r}
              fill="none" stroke={accent} strokeWidth={ring.w}
              className={`cta-ring ${ring.cls}`} />
          ))}
        </g>
      )}
    </svg>
  );
}

window.HeartBase = HeartBase;
window.Heart = function Heart() { return <HeartBase />; };
