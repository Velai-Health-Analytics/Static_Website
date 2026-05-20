/* global React, HeartPanel, useActivatedKey */
// components/home/sections/SectionHero.jsx — hero section: text left, heart right.

function SectionHero({ isActive }) {
  const animKey = useActivatedKey(isActive);
  return (
    <section className="home-section hs-grid" id="s-hero" data-section="0">
      <div className="hs-txt hs-txt-l">
        <div className="home-section__content">
          <span className="eyebrow reveal"><span className="dot" />Velai Health Analytics</span>
          <div className="home-section__hgroup">
            <h1 className="home-section__h1 reveal" data-delay="1">
              A clearer read<br />on <em>every heart</em>.
            </h1>
            <p className="home-section__lede reveal" data-delay="2">
              We build cardiovascular AI for the institutions, medtech teams and
              research networks that take heart care seriously.
            </p>
          </div>
          <div className="section-cta-row reveal" data-delay="3">
            <a className="btn btn-primary" href="#contact"
              onClick={e => { e.preventDefault(); window.__navigate("contact"); }}>
              Start a conversation <span className="arrow">→</span>
            </a>
            <a className="btn btn-ghost" href="#services"
              onClick={e => { e.preventDefault(); window.__navigate("services"); }}>
              How we work
            </a>
          </div>
          <div className="hero-scroll-cue reveal" data-delay="4" aria-hidden="true">
            <span className="cue-line" /><span>Scroll to explore</span>
          </div>
        </div>
      </div>
      <div className="hs-img hs-img-r">
        <HeartPanel isActive={isActive} sectionKey="hero" animKey={animKey} />
      </div>
    </section>
  );
}

window.SectionHero = SectionHero;
