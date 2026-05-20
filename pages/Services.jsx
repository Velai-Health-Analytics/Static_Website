/* global React, PageHero, SectionMark, useReveal */
// pages/Services.jsx — services page: engagement models and Second Opinion product.

function Services() {
  useReveal();

  const engagements = [
    {
      ix: "01", title: "Risk model development.",
      copy: "We build, validate and deploy custom cardiovascular risk models on your population. Multimodal by default — labs, imaging, genomics, medications and behavioural signal — and grounded in cardiovascular evidence.",
      points: ["Population-specific calibration", "Explainable risk drivers", "Regulatory documentation", "Validation against your cohort"],
    },
    {
      ix: "02", title: "Medtech co-development.",
      copy: "Bring us your imaging device, wearable, lab platform or therapy programme. We co-develop the analytics layer that lives inside it — and the evidence that proves it works in the real world.",
      points: ["Embedded cardiovascular AI", "Multimodal signal fusion", "Joint IP & publication models", "Clinical study design"],
    },
    {
      ix: "03", title: "Research partnerships.",
      copy: "We collaborate with academic centers and consortia on validation cohorts, real-world evidence and joint publication. If your hypothesis is about cardiovascular outcomes, let's test it.",
      points: ["Prospective study tooling", "Data trust frameworks", "Joint authorship", "Open data contributions"],
    },
    {
      ix: "04", title: "Population analytics for payers.",
      copy: "For payers and public-health programmes, we deliver population-level cardiovascular risk stratification, care-gap measurement, and intervention targeting — without moving data out of trust boundaries.",
      points: ["Population dashboards", "Care-gap & adherence", "Privacy-preserving analytics", "Outcome attribution"],
    },
  ];

  const secondOpinion = [
    { who: "Individual patients",
      copy: "A clear, plain-language read on your heart — combining every test, scan and prescription you already have. Daily nudges that fit your real life.",
      points: ["Unified longitudinal risk picture", "Personalised daily guidance", "Sharable summary for your clinician"] },
    { who: "Individual doctors",
      copy: "The second read you wish you had time for. Patterns across visits, citations to the underlying evidence, and patient-ready summaries — without rewriting your workflow.",
      points: ["Multimodal patient summary", "Citation-backed recommendations", "Patient-facing follow-up"] },
    { who: "Healthcare institutions",
      copy: "Population stratification, GDMT adherence tracking, and outreach prioritisation — embedded into the workflows your teams already use.",
      points: ["Cohort risk stratification", "Care-pathway integration", "Outcome reporting"] },
    { who: "Health insurance agencies",
      copy: "Identify the members most likely to benefit from preventive intervention, measure the impact of programmes, and reduce avoidable cardiovascular cost.",
      points: ["Member-level risk scoring", "Programme effectiveness", "Privacy-preserving evaluation"] },
  ];

  return (
    <div className="page-enter">
      <PageHero
        section="Services"
        title="Two ways to <em>work with us</em>."
        lede="Velai Health Analytics is an analytics partner for institutions, medtech teams and research networks. Second Opinion is our flagship product — a standalone platform for individual patients, doctors, institutions and insurance agencies."
      />

      <section className="section-tight">
        <div className="container">
          <div className="section-divider">
            <span><span className="num">01</span> · Velai Health Analytics</span>
            <span>Engagement models</span>
            <span style={{ justifySelf: "end" }}>↓</span>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="service-hero">
            <div className="reveal reveal-l">
              <div className="eyebrow" style={{ marginBottom: 20 }}><span className="dot" />For institutions & medtech</div>
              <h2 className="display">An analytics partner for the institutions building the future of heart care.</h2>
              <p style={{ marginTop: 28, color: "var(--ink-2)", fontSize: 17, lineHeight: 1.6, maxWidth: "58ch" }}>
                We work with health systems, medtech teams, research networks and public-health
                programmes. We bring the models, the validation discipline and the engineering —
                you bring the patients, the questions, and the will to act.
              </p>
            </div>
            <div className="product-card reveal reveal-r" data-delay="1">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--coral-wash)", display: "grid", placeItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 18L10 12L14 16L20 8" stroke="oklch(0.58 0.18 22)" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M15 8L20 8L20 13" stroke="oklch(0.58 0.18 22)" strokeWidth="1.6" />
                  </svg>
                </div>
                <span className="label">B2B engagements</span>
              </div>
              <div className="name">Analytics partnership</div>
              <p className="desc">Custom cardiovascular models, validation studies, embedded analytics, and population-level intelligence — delivered as a partnership, not a SaaS subscription.</p>
              <div className="tags">
                <span className="tag">Custom models</span>
                <span className="tag">Validation</span>
                <span className="tag">Co-development</span>
                <span className="tag">Population</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionMark ix="01" total="02" label="Engagement models" />
        <div className="container">
          <div className="section-head">
            <div className="eyebrow reveal"><span className="dot" />Engagement models</div>
            <h2 className="display reveal" data-delay="1">Four ways we partner with institutions.</h2>
          </div>
          {engagements.map(r => (
            <div className="service-row reveal" data-delay="1" key={r.ix}>
              <div className="ix">{r.ix} / 04</div>
              <div>
                <h3>{r.title}</h3>
                <p>{r.copy}</p>
                <ul className="points">{r.points.map(p => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight section-atm-coral">
        <div className="container">
          <div className="section-divider">
            <span><span className="num">02</span> · Flagship product</span>
            <span>Second Opinion™</span>
            <span style={{ justifySelf: "end" }}>↓</span>
          </div>
        </div>
      </section>

      <section className="section section-atm-coral">
        <SectionMark ix="02" total="02" label="Second Opinion" />
        <div className="container">
          <div className="service-hero">
            <div className="reveal reveal-l">
              <div className="eyebrow" style={{ marginBottom: 20 }}><span className="dot" />Our flagship product</div>
              <h2 className="display"><em>Second Opinion™</em><br/>A continuous read on every heart.</h2>
              <p style={{ marginTop: 28, color: "var(--ink-2)", fontSize: 17, lineHeight: 1.6, maxWidth: "58ch" }}>
                A standalone product from Velai Health Analytics — Second Opinion gives every
                heart a continuous second read. It speaks four languages: the patient's,
                the doctor's, the institution's, and the insurer's.
              </p>
              <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className="btn btn-primary" href="#contact"
                  onClick={e => { e.preventDefault(); window.__navigate("contact"); }}>
                  Request access <span className="arrow">→</span>
                </a>
                <a className="btn btn-ghost" href="#contact"
                  onClick={e => { e.preventDefault(); window.__navigate("contact"); }}>
                  Book a demo
                </a>
              </div>
            </div>
            <div className="product-card reveal reveal-r" data-delay="1" style={{ background: "var(--paper)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--coral-wash)", display: "grid", placeItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6C10 4,6 4,5 6.5C3.5 9.5,6 13,12 18C18 13,20.5 9.5,19 6.5C18 4,14 4,12 6Z"
                      stroke="oklch(0.58 0.18 22)" strokeWidth="1.5" />
                  </svg>
                </div>
                <span className="label">v.26.05 · GA H2</span>
              </div>
              <div className="name">Second Opinion™</div>
              <p className="desc">Continuous cardiovascular risk intelligence and care continuity — for the patient, the clinician, the institution, and the insurer.</p>
              <div className="tags">
                <span className="tag">Patients</span>
                <span className="tag">Doctors</span>
                <span className="tag">Institutions</span>
                <span className="tag">Insurance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-atm-coral">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow reveal"><span className="dot" />Who Second Opinion is for</div>
            <h2 className="display reveal" data-delay="1">One product. <em>Four conversations.</em></h2>
          </div>
          {secondOpinion.map((r, i) => (
            <div className="service-row reveal" data-delay="1" key={r.who}>
              <div className="ix">{String(i + 1).padStart(2, "0")} / 04</div>
              <div>
                <h3>{r.who}.</h3>
                <p>{r.copy}</p>
                <ul className="points">{r.points.map(p => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-banner reveal reveal-scale">
            <h2>Whichever side of the table you're on — we'd like to <em>talk</em>.</h2>
            <div className="right">
              <p>Institution, medtech team, clinician, patient or payer — start a conversation and we'll point you to the right person.</p>
              <a className="btn btn-primary" href="#contact"
                onClick={e => { e.preventDefault(); window.__navigate("contact"); }}>
                Get in touch <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Services = Services;
