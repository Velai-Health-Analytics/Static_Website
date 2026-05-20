/* global React */
// components/home/sections/SectionCTA.jsx — final CTA, full-width warm background.

function SectionCTA({ isActive }) {
  return (
    <section className="home-section hs-full-width atm-terra" id="s-cta" data-section="5">
      <div className="hs-full">
        <div className="home-section__content" style={{ maxWidth: "none", width: "100%" }}>
          <span className="eyebrow reveal"><span className="dot" />Talk to us · 05 / 05</span>
          <div className="cta-banner reveal" data-delay="1">
            <h2>If you take cardiovascular care seriously, <em>so do we</em>.</h2>
            <div className="right">
              <p>Pilot with us, co-develop a model, or just hand us a hard case.
                We'd like to hear which.</p>
              <a className="btn btn-primary" href="#contact"
                onClick={e => { e.preventDefault(); window.__navigate("contact"); }}>
                Start a conversation <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.SectionCTA = SectionCTA;
