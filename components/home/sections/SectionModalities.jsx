/* global React, DaVinciPanel, useActivatedKey */
// components/home/sections/SectionModalities.jsx

const { useState, useEffect } = React;

function SectionModalities({ isActive }) {
  const animKey = useActivatedKey(isActive);
  const [hoveredId, setHoveredId] = useState(null);   // desktop hover
  const [selectedId, setSelectedId] = useState(null); // mobile tap
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);
  const [textReady, setTextReady] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1100);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Text fades in after DaVinci drop settles (~650ms)
  useEffect(() => {
    if (!isActive || !isMobile) { setTextReady(false); return; }
    const t = setTimeout(() => setTextReady(true), 650);
    return () => clearTimeout(t);
  }, [isActive, isMobile]);

  // Reset selection when leaving the section
  useEffect(() => {
    if (!isActive) setSelectedId(null);
  }, [isActive]);

  const mods = [
    { id: "lab",        num: "01", title: "Lab panels",     desc: "Lipids, ApoB, hsCRP, glucose — read longitudinally across visits." },
    { id: "imaging",    num: "02", title: "Imaging",         desc: "Echo, CT angiography, MRI, X-ray — interpreted as a trend, not a snapshot." },
    { id: "polygenic",  num: "03", title: "Polygenic risk",  desc: "Inherited cardiovascular risk, synthesised into a single clinical score." },
    { id: "meds",       num: "04", title: "Medications",     desc: "Adherence, comorbidities and the full prescription context." },
    { id: "behavioral", num: "05", title: "Behaviour",       desc: "Sleep, activity, blood pressure — the daily picture between appointments." },
  ];

  // On mobile use tap-selection to drive the DaVinci ring highlight
  const activeRingId = isMobile ? selectedId : hoveredId;

  return (
    <section className="home-section hs-grid atm-cream" id="s-modalities" data-section="1">
      <div className={`hs-img hs-img-l${isActive ? ' img-drop-active' : ''}`}>
        <DaVinciPanel isActive={isActive} variant="mod" animKey={animKey} hoveredId={activeRingId} />
      </div>
      <div className="hs-txt hs-txt-r">

        {isMobile ? (
          /* ── Mobile: 2×2 + 1 tab grid, text delayed until DaVinci drops ── */
          <div className={`home-section__content mob-txt-delayed${textReady ? ' ready' : ''}`}>
            <span className="eyebrow"><span className="dot" />What we read</span>
            <div className="home-section__hgroup">
              <h2 className="home-section__h2">
                Risk lives across <em>many signals</em>.
              </h2>
            </div>

            <div className="mob-mod-grid">
              {mods.map(m => (
                <button
                  key={m.id}
                  className={`mob-mod-tab${selectedId === m.id ? ' selected' : ''}`}
                  onClick={() => setSelectedId(s => s === m.id ? null : m.id)}
                  aria-pressed={selectedId === m.id}
                >
                  <span className="num">{m.num}</span>
                  <span className="tab-title">{m.title}</span>
                </button>
              ))}
            </div>

            {selectedId && (
              <p className="mob-mod-desc">
                {mods.find(m => m.id === selectedId)?.desc}
              </p>
            )}
          </div>

        ) : (
          /* ── Desktop: full list, hover interaction, reveal animations ── */
          <div className="home-section__content">
            <span className="eyebrow reveal"><span className="dot" />What we read · 01 / 05</span>
            <div className="home-section__hgroup">
              <h2 className="home-section__h2 reveal" data-delay="1">
                Risk lives across<br /><em>many signals</em>.
              </h2>
              <p className="home-section__lede reveal" data-delay="2">
                We read labs, imaging, genomics, medications and behaviour —
                and pull them into one picture.
              </p>
            </div>
            <div className="mods-mini reveal" data-delay="3">
              {mods.map(m => (
                <div
                  className="mm"
                  key={m.num}
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ opacity: hoveredId && hoveredId !== m.id ? 0.4 : 1, transition: 'opacity 0.3s' }}
                >
                  <span className="num">{m.num}</span>
                  <div><h5>{m.title}</h5><p>{m.desc}</p></div>
                  <span className="arrow" aria-hidden="true">→</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

window.SectionModalities = SectionModalities;
