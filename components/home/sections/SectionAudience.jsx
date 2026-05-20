/* global React */
// components/home/sections/SectionAudience.jsx — full-width partner tabs section.

function SectionAudience({ isActive, active, onActiveChange }) {
  const list = [
    { who: "Health systems",         blurb: "Cohort-level stratification, GDMT adherence measurement, and closed-loop reporting — embedded into the pathways your teams already use." },
    { who: "Medtech partners",       blurb: "Co-develop the cardiovascular analytics living inside your imaging device, wearable, or therapy programme — and the validation evidence behind it." },
    { who: "Research networks",      blurb: "Prospective study tooling, data trust structures, and joint publication frameworks — for the questions worth answering on cardiovascular outcomes." },
    { who: "Public health & payers", blurb: "Population-level risk stratification, care-gap and adherence measurement, and privacy-preserving outcomes attribution." },
  ];
  return (
    <section className="home-section hs-full-width" id="s-audience" data-section="3">
      <div className="hs-full">
        <div className="home-section__content wide">
          <span className="eyebrow reveal"><span className="dot" />Who we work with · 03 / 05</span>
          <div className="home-section__hgroup">
            <h2 className="home-section__h2 reveal" data-delay="1">
              One platform.<br /><em>Four partners</em>.
            </h2>
          </div>
          <div className="aud-tabs reveal" data-delay="2">
            {list.map((a, i) => (
              <button key={a.who}
                className={`aud-tab${i === active ? " active" : ""}`}
                onClick={() => onActiveChange(i)}>
                <span className="tab-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="tab-who">{a.who}</span>
              </button>
            ))}
          </div>
          <div className="aud-blurb reveal" data-delay="3">{list[active].blurb}</div>
        </div>
      </div>
    </section>
  );
}

window.SectionAudience = SectionAudience;
