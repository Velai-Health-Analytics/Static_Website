/* global React, DaVinciPanel, useActivatedKey */
// components/home/sections/SectionFlow.jsx — text left, Da Vinci right, workflow steps.

const { useState, useEffect } = React;

function SectionFlow({ isActive }) {
  const animKey = useActivatedKey(isActive);
  const [textReady, setTextReady] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1100);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isActive) {
      setTextReady(false);
      setListOpen(false);
      return;
    }
    // Desktop: 800ms waits for the DaVinci bridge roll to finish.
    // Mobile: 550ms waits for the shorter drop animation (750ms).
    const t = setTimeout(() => setTextReady(true), isMobile ? 550 : 800);
    return () => clearTimeout(t);
  }, [isActive, isMobile]);

  const steps = [
    { num: "01", title: "Ingest",   desc: "Multimodal patient data mapped to a longitudinal clinical profile." },
    { num: "02", title: "Model",    desc: "Risk computed across modalities — validated against your population." },
    { num: "03", title: "Deploy",   desc: "Quietly embedded into the workflows clinicians already use." },
    { num: "04", title: "Measure",  desc: "Closed-loop reporting on guideline adherence and outcomes." },
  ];

  return (
    <section className="home-section hs-grid atm-sage" id="s-flow" data-section="2">
      <div className="hs-txt hs-txt-l">
        <div className={`home-section__content flow-txt-content${textReady ? " flow-txt-in" : ""}`}>
          <span className="eyebrow"><span className="dot" />How we work · 02 / 05</span>
          <div className="home-section__hgroup">
            <h2 className="home-section__h2">
              Signal to<br /><em>measurable outcome</em>.
            </h2>
            <p className="home-section__lede">
              Four steps. Always validated against your population. Always closed-loop.
            </p>
          </div>

          {isMobile ? (
            /* ── Mobile: expand button + collapsible steps ── */
            <div>
              <button
                className="mob-expand-btn"
                onClick={() => setListOpen(o => !o)}
                aria-expanded={listOpen}
              >
                {listOpen ? '↑ Less' : '↓ How it works'}
              </button>
              <div className={`mob-list-panel${listOpen ? ' mob-list-open' : ''}`}>
                <div className="steps-mini">
                  {steps.map(s => (
                    <div className="sm" key={s.num}>
                      <span className="num">{s.num}</span>
                      <div><h5>{s.title}</h5><p>{s.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ── Desktop: full steps always visible ── */
            <div className="steps-mini">
              {steps.map(s => (
                <div className="sm" key={s.num}>
                  <span className="num">{s.num}</span>
                  <div><h5>{s.title}</h5><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="hs-img hs-img-r">
        <DaVinciPanel isActive={isActive} variant="flow" animKey={animKey} />
      </div>
    </section>
  );
}

window.SectionFlow = SectionFlow;
