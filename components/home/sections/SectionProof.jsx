/* global React, ECGPanel, useActivatedKey */
// components/home/sections/SectionProof.jsx — proof section: dark left, ECG monitor right.

function SectionProof({ isActive }) {
  const animKey = useActivatedKey(isActive);
  return (
    <section className="home-section hs-grid proof-section" id="s-proof" data-section="4">
      <div className="hs-txt hs-txt-l proof-left">
        <div className="home-section__content">
          <span className="eyebrow reveal"><span className="dot" />Why we built this · 04 / 05</span>
          <div className="proof-overlay">
            <blockquote className="reveal" data-delay="1">
              Most cardiovascular events were predictable. The signal was always
              there — nobody was reading it together, continuously.
            </blockquote>
            <div className="metric-row-inline reveal" data-delay="2">
              <div className="m"><div className="v">5<sup>+</sup></div><div className="k">modalities unified per patient</div></div>
              <div className="m"><div className="v">365</div><div className="k">days of continuous watch</div></div>
              <div className="m"><div className="v">12</div><div className="k">peer-reviewed studies cited</div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="hs-img hs-img-r proof-right">
        <ECGPanel isActive={isActive} animKey={animKey} />
      </div>
    </section>
  );
}

window.SectionProof = SectionProof;
