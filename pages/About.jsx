/* global React, PageHero, SectionMark, useReveal */
// pages/About.jsx — about page: mission, science, team, and CTA.

function About() {
  useReveal();

  const team = [
    { name: "Prof. Lakshminarayanan Subramanian", role: "Co-founder, AI",         bio: "Professor of Computer Science at NYU Courant and researcher in AI, machine learning, and networked systems. Co-founder of Entrupy, Flipped.ai, and Vel.ai, with work spanning AI-driven hiring, healthcare, and resilient enterprise systems.",  photo: "/team/lakshmi.jpg" },
    { name: "Shivaram Velayutham",                role: "Co-founder, AI",         bio: "B.Tech + M.Tech in Biological Engineering from IIT Madras",     photo: "/team/me.jpeg" },
    { name: "Dr. Anuva Kapoor",                   role: "Co-founder, Medicine",   bio: "Junior Resident in Community and Family Medicine from AIIMS Nagpur",             photo: "/team/anuva.jpeg" },
    { name: "Dr. Bhanu Duggal",                   role: "Advisor, Cardiology",    bio: "Vice-Chancellor of Hemwati Nandan Bahuguna Uttarakhand Medical Education University, Dehradun, and senior interventional cardiologist with over two decades of clinical and academic experience. Former Professor and Head of Cardiology at AIIMS Rishikesh, with research experience at Cleveland Clinic and 100+ publications in cardiovascular medicine.",                 photo: "/team/bhanu.jpeg" },
    { name: "Dr. Mona Duggal",                    role: "Advisor, Digital Health",bio: "Director at ICMR’s National Institute for Research in Digital Health and Data Science. Former Professor at PGIMER with experience spanning digital health, medical research, and healthcare policy, including prior research roles at Yale University and THSTI.",         photo: "/team/monaduggal.jpg" },
    { name: "Prof. Balaraman Ravindran",          role: "Advisor, AI",            bio: "Heads Data Science and AI at IIT Madras. Founder of WSAI, RBCDSAI, and CeRAI, with three decades of experience in AI, reinforcement learning, and responsible AI.",               photo: "/team/ravindran.jpg" },
  ];

  return (
    <div className="page-enter">
      <PageHero
        section="About"
        title="We exist to make <em>cardiovascular care</em><br/>continuous, evidenced, and human."
        lede="Velai Health Analytics is a small team of cardiologists, scientists and engineers building the analytics layer behind better heart care — for institutions, medtech partners, and through our flagship product, Second Opinion."
      />

      <section className="section-tight">
        <div className="container">
          <div className="about-grid">
            <div className="reveal reveal-l">
              <div className="eyebrow" style={{ marginBottom: 24 }}><span className="dot" />Mission</div>
              <h2 className="display">Most heart attacks were not surprises.</h2>
              <p>For decades, the signs of cardiovascular disease have been visible — in lipid panels, in coronary calcium scans, in family history, in the way a patient's sleep and activity quietly degrade in the months before an event.</p>
              <p>What was missing was someone reading those signs together, across time, for every patient. We built Velai Health Analytics to do exactly that: a research-grade analytics partner for the institutions, medtech teams and clinicians who care about heart outcomes.</p>
              <div className="pull">"The technology to prevent most cardiovascular events already exists. What was missing was attention — and we are determined to provide it."</div>
            </div>
            <div className="reveal reveal-r" data-delay="1">
              <div className="eyebrow" style={{ marginBottom: 24 }}><span className="dot" />Science</div>
              <h2 className="display">Built on evidence, not vibes.</h2>
              <p>Our analytics is built on top of decades of cardiovascular evidence — the Framingham descendants, SCORE2, PCE, MESA, UK Biobank-derived polygenic scores, and a growing body of imaging-based plaque progression work.</p>
              <p>We don't replace those models; we read them together. Every recommendation we surface is cited back to a guideline or to peer-reviewed work, and our internal validation cohorts are reviewed by our clinical advisory board before any model ships.</p>
              <p>You can read more on our <a href="#publications"
                onClick={e => { e.preventDefault(); window.__navigate("publications"); }}
                style={{ borderBottom: "1px solid var(--coral)", color: "var(--coral-2)" }}>Publications page</a>.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-atm-cream">
        <SectionMark ix="02" total="03" label="Team" />
        <div className="container">
          <div className="section-head">
            <div className="eyebrow reveal"><span className="dot" />Team</div>
            <h2 className="display reveal" data-delay="1">
              Clinicians and researchers, working side-by-side.
            </h2>
          </div>
          <div className="team-grid">
            {team.map((m, i) => (
              <div className="team-card reveal" data-delay={Math.min(5, i % 4 + 1)} key={m.name}>
                <div className="photo"><img src={m.photo} alt={`Portrait of ${m.name}`} /></div>
                <h4>{m.name}</h4>
                <div className="role">{m.role}</div>
                <div className="bio">{m.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-banner reveal reveal-scale">
            <h2>If you make hearts last longer, we want to <em>work with you</em>.</h2>
            <div className="right">
              <p>Clinical advisors, research collaborators, complementary medtech teams — we keep the door open.</p>
              <a className="btn btn-primary" href="#contact"
                onClick={e => { e.preventDefault(); window.__navigate("contact"); }}>
                Talk to us <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.About = About;
