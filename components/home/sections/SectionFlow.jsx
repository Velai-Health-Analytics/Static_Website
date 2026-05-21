/* global React, DaVinciPanel, useActivatedKey */
// components/home/sections/SectionFlow.jsx — text left, Da Vinci right, workflow steps.

const { useState, useEffect } = React;

function SectionFlow({ isActive }) {
  const animKey = useActivatedKey(isActive);
  const [textReady, setTextReady] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setTextReady(false);
      return;
    }
    // Delay text until the Da Vinci has rolled past the left text column.
    // The image starts at roughly S2's left-column position and rolls right;
    // 800ms is after it has clearly crossed the centre line into the right column.
    const t = setTimeout(() => setTextReady(true), 800);
    return () => clearTimeout(t);
  }, [isActive]);

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
      <div className="hs-img hs-img-r">
        <DaVinciPanel isActive={isActive} variant="flow" animKey={animKey} />
      </div>
    </section>
  );
}

window.SectionFlow = SectionFlow;
