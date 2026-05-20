/* global React */
// components/shared/PageHero.jsx — hero header used at the top of every inner page.

function PageHero({ section, title, lede }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="crumb reveal">
          <span>Velai Health</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--ink-2)" }}>{section}</span>
        </div>
        <h1 className="display reveal" data-delay="1"
          dangerouslySetInnerHTML={{ __html: title }} />
        <p className="lede reveal" data-delay="2">{lede}</p>
      </div>
    </section>
  );
}

window.PageHero = PageHero;
