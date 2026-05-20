/* global React, HeartBase */
// components/svg/HeartStage.jsx — fixed-position heart stage with section-specific callout chips.

const { useEffect, useRef, useState } = React;

/* ── Chip icon glyphs ───────────────────────────────────────── */
function ChipGlyph({ kind }) {
  const sw = 1.4;
  const g = (path, extra = {}) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw}
      strokeLinecap="round" strokeLinejoin="round" {...extra}>{path}</svg>
  );
  if (kind === "lab")      return g(<><path d="M9 3v14c0 2 1.5 4 3 4s3-2 3-4V3"/><line x1="7" y1="3" x2="17" y2="3"/><path d="M9 13l6 0"/></>);
  if (kind === "ct")       return g(<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M3 12h18M12 3v18" strokeDasharray="2 2"/></>);
  if (kind === "dna")      return g(<><path d="M7 3c10 6 10 12 0 18"/><path d="M17 3c-10 6-10 12 0 18"/><path d="M8 8l8 0M8 16l8 0" strokeWidth="1"/></>);
  if (kind === "meds")     return g(<><rect x="4" y="9" width="16" height="6" rx="3"/><line x1="12" y1="9" x2="12" y2="15"/></>);
  if (kind === "echo")     return g(<><path d="M2 12l4 0 2-4 2 8 2-12 2 10 2-6 4 4"/></>);
  if (kind === "ingest")   return g(<><path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/></>);
  if (kind === "model")    return g(<><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></>);
  if (kind === "deploy")   return g(<><path d="M21 3L11 14M21 3l-7 18-3-7-7-3 18-8z"/></>);
  if (kind === "measure")  return g(<><path d="M4 19l4-6 4 3 4-8 4 4"/><path d="M4 19h16"/></>);
  if (kind === "hospital") return g(<><rect x="4" y="8" width="16" height="13"/><path d="M12 8V4M10 6h4"/><line x1="8" y1="12" x2="8" y2="21"/><line x1="16" y1="12" x2="16" y2="21"/><line x1="12" y1="14" x2="12" y2="21"/></>);
  if (kind === "device")   return g(<><rect x="5" y="3" width="14" height="18" rx="2"/><line x1="9" y1="6" x2="15" y2="6"/><circle cx="12" cy="17" r="1.6"/><path d="M8 11l3 0 1.5-2 1.5 4 2-2"/></>);
  if (kind === "research") return g(<><path d="M5 4h12c1 0 2 1 2 2v14H7c-1 0-2-1-2-2z"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="13" y2="13"/></>);
  if (kind === "payer")    return g(<><path d="M5 3h14v18l-2-2-2 2-2-2-2 2-2-2-2 2z" strokeLinejoin="round"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/></>);
  if (kind === "pulse")    return g(<><path d="M3 12l4 0 2-5 2 10 2-8 2 3 4 0"/></>);
  if (kind === "talk")     return g(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>);
  return null;
}

/* ── Chip configurations per section ───────────────────────── */
const CHIP_CONFIGS = {
  hero: [],

  modalities: [
    { label: "Lab panels",       glyph: "lab",      top: "7%",  left: "14%", delay: 0.38 },
    { label: "CT · Echo · MRI",  glyph: "ct",       top: "44%", left: "4%",  delay: 0.58 },
    { label: "Polygenic risk",   glyph: "dna",      top: "36%", left: "90%", delay: 0.78 },
    { label: "Medications",      glyph: "meds",     top: "78%", left: "90%", delay: 0.98 },
    { label: "Behavioural",      glyph: "echo",     top: "96%", left: "26%", delay: 1.18 },
  ],

  flow: [
    { label: "Ingest",   glyph: "ingest",  top: "8%",  left: "20%", delay: 0.20 },
    { label: "Model",    glyph: "model",   top: "53%", left: "10%", delay: 0.46 },
    { label: "Deploy",   glyph: "deploy",  top: "8%",  left: "78%", delay: 0.72 },
    { label: "Measure",  glyph: "measure", top: "85%", left: "72%", delay: 0.98 },
  ],

  audience: [
    { label: "Health systems",   glyph: "hospital", top: "18%", left: "20%", delay: 0.18 },
    { label: "Medtech",          glyph: "device",   top: "18%", left: "80%", delay: 0.30 },
    { label: "Research",         glyph: "research", top: "84%", left: "80%", delay: 0.42 },
    { label: "Payers",           glyph: "payer",    top: "84%", left: "20%", delay: 0.54 },
  ],

  proof: [
    { label: "5+ modalities",    glyph: "model",    top: "17%", left: "50%", delay: 0.50 },
    { label: "365 days watching",glyph: "pulse",    top: "62%", left: "86%", delay: 0.70 },
    { label: "12 papers cited",  glyph: "research", top: "62%", left: "14%", delay: 0.90 },
  ],

  cta: [
    { label: "Start a conversation →", glyph: "talk", top: "50%", left: "50%", delay: 0.40 },
  ],
};

function Chip({ chip, animKey }) {
  return (
    <div
      className="sat-chip"
      style={{
        top: chip.top,
        left: chip.left,
        "--delay": `${chip.delay || 0}s`,
      }}
      key={animKey}
    >
      <span className="chip-glyph"><ChipGlyph kind={chip.glyph} /></span>
      <span>{chip.label}</span>
    </div>
  );
}

function ChipLayer({ sectionKey, activeKey }) {
  const chips = CHIP_CONFIGS[sectionKey] || [];
  const isActive = sectionKey === activeKey;
  return (
    <div className={`sat-layer${isActive ? " in" : ""}`}>
      {isActive && chips.map((c, i) => (
        <Chip key={i} chip={c} animKey={`${activeKey}-${i}`} />
      ))}
    </div>
  );
}

function HomeHeartStage({ sectionKey = "hero", audienceActive = 0 }) {
  return (
    <div className="heart-stage-fixed" aria-hidden="true">
      <div className="heart-canvas">
        <HeartBase
          sectionKey={sectionKey}
          audienceActive={audienceActive}
        />
        {Object.keys(CHIP_CONFIGS).map(k => (
          <ChipLayer key={k} sectionKey={k} activeKey={sectionKey} />
        ))}
      </div>
    </div>
  );
}

window.HomeHeartStage = HomeHeartStage;
window.ChipGlyph = ChipGlyph;
