/* global React, PageHero, useReveal */
// pages/Publications.jsx — filterable publications list.

const { useState } = React;

function Publications() {
  useReveal();
  const [filter, setFilter] = useState("all");

  const pubs = [
    { year: "2024", kind: "Journal", title: "Cautionary lessons from the COVID-19 pandemic: Healthcare systems grappled with the dual responsibility of delivering COVID-19 and non-COVID-19 care.", authors: "Duggal B, Kapoor A, Duggal M et al.", venue: "PLOS Global Public Health", tag: "research", url: "https://journals.plos.org/globalpublichealth/article?id=10.1371/journal.pgph.0002035" },
    { year: "2022", kind: "Journal", title: "Using a national level cross-sectional study to develop a Hospital Preparedness Index (HOSPI) for Covid-19 management: A case study from India.", authors: "Duggal B, Duggal M, Panch A et al.", venue: "PLOS ONE", tag: "research", url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0269842" },
    { year: "2022", kind: "Journal", title: "The effects of dual antiplatelet therapy (DAPT) adherence on survival in patients undergoing revascularization and the determinants of DAPT adherence.", authors: "Zhang S, Chourase M, Sharma N et al.", venue: "BMC Cardiovascular Disorders", tag: "clinical", url: "https://bmccardiovascdisord.biomedcentral.com/articles/10.1186/s12872-022-02677-8" },
    { year: "2018", kind: "Journal", title: "Survival outcomes post percutaneous coronary intervention: Why the hype about stent type? Lessons from a healthcare system in India.", authors: "Duggal B, Subramanian J, Duggal M et al.", venue: "PLOS ONE", tag: "research", url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0196830" },
  ];

  const filters = [
    { id: "all",      label: "All" },
    { id: "research", label: "Research" },
    { id: "clinical", label: "Clinical" },
  ];

  const list = filter === "all" ? pubs : pubs.filter(p => p.tag === filter);

  return (
    <div className="page-enter">
      <PageHero
        section="Publications"
        title="The work behind <em>the work</em>."
        lede="Velai Health Analytics is built on a body of peer-reviewed cardiovascular evidence — much of it our own. Below is a running index of papers, preprints and perspectives from our team and our collaborators."
      />

      <section className="section-tight">
        <div className="container">
          <div className="pub-filters reveal">
            {filters.map(f => (
              <button key={f.id} className={"pub-filter" + (filter === f.id ? " active" : "")}
                onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
            <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
              {String(list.length).padStart(2, "0")} entries
            </span>
          </div>
          <div className="pub-list reveal" data-delay="1">
            {list.map((p, i) => (
              <a href={p.url} target="_blank" rel="noopener noreferrer" key={i} className="pub-row" style={{ color: "inherit" }}>
                <span className="year">{p.year}</span>
                <span className="kind">{p.kind}</span>
                <div>
                  <h4>{p.title}</h4>
                  <div className="authors">{p.authors}</div>
                </div>
                <span className="venue">{p.venue}</span>
                <span className="arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-banner reveal">
            <h2>Want to <em>publish with us</em>?</h2>
            <div className="right">
              <p>We co-author with academic centers and clinical networks. If you have a question worth asking of cardiovascular data, we'd like to hear it.</p>
              <a className="btn btn-primary" href="#contact"
                onClick={e => { e.preventDefault(); window.__navigate("contact"); }}>
                Reach the research team <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Publications = Publications;
