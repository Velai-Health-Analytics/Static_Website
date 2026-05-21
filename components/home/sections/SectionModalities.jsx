/* global React, DaVinciPanel, useActivatedKey */
// components/home/sections/SectionModalities.jsx

const { useState } = React;

function SectionModalities({ isActive }) {
  const animKey = useActivatedKey(isActive);
  
  // 1. Add state to track which text item is being hovered
  const [hoveredId, setHoveredId] = useState(null);

  // 2. Added the matching 'id' to each modality
  const mods = [
    { id: "lab",        num: "01", title: "Lab panels",            desc: "Lipids, ApoB, hsCRP, glucose — read longitudinally across visits." },
    { id: "imaging",    num: "02", title: "Diagnostic imaging",    desc: "Echo, CT angiography, MRI, X-ray — interpreted as a trend, not a snapshot." },
    { id: "polygenic",  num: "03", title: "Polygenic risk",        desc: "Inherited cardiovascular risk, synthesised into a single clinical score." },
    { id: "meds",       num: "04", title: "Medications & history", desc: "Adherence, comorbidities and the full prescription context." },
    { id: "behavioral", num: "05", title: "Behavioural signal",    desc: "Sleep, activity, blood pressure — the daily picture between appointments." },
  ];

  return (
    <section className="home-section hs-grid atm-cream" id="s-modalities" data-section="1">
      <div className="hs-img hs-img-l">
        {/* 3. Pass hoveredId into DaVinciPanel */}
        <DaVinciPanel isActive={isActive} variant="mod" animKey={animKey} hoveredId={hoveredId} />
      </div>
      <div className="hs-txt hs-txt-r">
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
                // 4. Update the state when the mouse enters/leaves the item
                onMouseEnter={() => setHoveredId(m.id)}
                onMouseLeave={() => setHoveredId(null)}
                // Optional: Add a subtle visual change to the text item being hovered
                style={{ opacity: hoveredId && hoveredId !== m.id ? 0.4 : 1, transition: 'opacity 0.3s' }}
              >
                <span className="num">{m.num}</span>
                <div><h5>{m.title}</h5><p>{m.desc}</p></div>
                <span className="arrow" aria-hidden="true">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.SectionModalities = SectionModalities;