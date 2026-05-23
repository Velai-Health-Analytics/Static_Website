/* global React, PageHero, useReveal */
// pages/Contact.jsx — contact form with validation and success state.

const { useState } = React;

function Contact() {
  useReveal();
  const [form, setForm] = useState({
    name: "", email: "", org: "",
    role: "Healthcare institution / Provider network",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = k => e => setForm({ ...form, [k]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    if (!form.message.trim()) errs.message = true;
    setErrors(errs);
    if (!Object.keys(errs).length) setSubmitted(true);
  };

  return (
    <div className="page-enter">
      <PageHero
        section="Contact"
        title="Tell us about your <em>population</em>,<br/>your patient, or your idea."
        lede="We read every message. If you're a patient looking for care, a clinician interested in a pilot, a research partner, or a journalist — write to us below."
      />

      <section className="section-tight">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info reveal">
              {[
                { label: "Email",                     val: <a href="mailto:velaihealthanalytics@gmail.com">velaihealthanalytics@gmail.com</a> },
                { label: "Clinical & pilot inquiries", val: <a href="mailto:shivaramvelayutham3223@gmail.com">shivaramvelayutham3223@gmail.com</a> },
                // { label: "Press",                      val: <a href="mailto:press@velai.health">press@velai.health</a> },
                { label: "Office",                     val: (<span style={{ fontStyle: "normal", fontSize: 16, lineHeight: 1.55, color: "var(--ink-2)" }}>
                                                         Velai Health Analytics Pvt LTD.<br />
                                                         INNOV8 SKCL Tech Square Guindy, 2ND Floor, <br />
                                                         SKCL Tech Square NO 14 SP, SIDCOT.V.K Industrial Estate,<br />
                                                         Guindy, Chennai-600032<br />
                                                         India
                                                       </span>) },
                { label: "Hours",                      val: (<span style={{ fontStyle: "normal", fontSize: 16, lineHeight: 1.55, color: "var(--ink-2)" }}>
                                                         Mon–Fri, 09:00 – 18:30 IST<br />
                                                         Replies within one working day.
                                                       </span>) },
              ].map(b => (
                <div className="contact-block" key={b.label}>
                  <span className="label">{b.label}</span>
                  <div className="v">{b.val}</div>
                </div>
              ))}
            </div>

            <form className="contact-form reveal" data-delay="1" onSubmit={onSubmit} noValidate>
              {submitted ? (
                <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 360, justifyContent: "center" }}>
                  <div className="eyebrow"><span className="dot" />Message received</div>
                  <h3 className="display" style={{ fontSize: 36 }}>Thank you, {form.name.split(" ")[0]}.</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--ink-2)", margin: 0, maxWidth: "44ch" }}>
                    We'll write back to {form.email} within one working day. If it's urgent,
                    you can also reach us directly at{" "}
                    <a href="mailto:velaihealthanalytics@gmail.com"
                      style={{ borderBottom: "1px solid var(--line)", color: "var(--ink)" }}>
                      velaihealthanalytics@gmail.com
                    </a>.
                  </p>
                  <button type="button" className="btn btn-ghost"
                    style={{ alignSelf: "start", marginTop: 8 }}
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name:"", email:"", org:"", role:"Healthcare institution / Provider network", message:"" });
                    }}>
                    Send another
                  </button>
                </div>
              ) : (
                <>
                  <div className="field-row">
                    <div className="field">
                      <label>Your name</label>
                      <input type="text" value={form.name} onChange={onChange("name")}
                        placeholder="Jane Doe"
                        style={errors.name ? { borderBottomColor: "var(--coral)" } : null} />
                    </div>
                    <div className="field">
                      <label>Email</label>
                      <input type="email" value={form.email} onChange={onChange("email")}
                        placeholder="jane@example.com"
                        style={errors.email ? { borderBottomColor: "var(--coral)" } : null} />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label>Organisation</label>
                      <input type="text" value={form.org} onChange={onChange("org")} placeholder="(Optional)" />
                    </div>
                    <div className="field">
                      <label>I am a…</label>
                      <select value={form.role} onChange={onChange("role")}>
                        <option>Healthcare institution / Provider network</option>
                        <option>Medtech partner</option>
                        <option>Research collaborator</option>
                        <option>Insurance / Payer</option>
                        <option>Individual clinician</option>
                        <option>Individual patient</option>
                        <option>Journalist</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>How can we help?</label>
                    <textarea rows="5" value={form.message} onChange={onChange("message")}
                      placeholder="Tell us about your population, your patient, or what you'd like to explore together."
                      style={errors.message ? { borderBottomColor: "var(--coral)" } : null} />
                  </div>
                  {!!Object.keys(errors).length && (
                    <div style={{ color: "var(--coral-2)", fontSize: 13, fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
                      A few fields above need your attention.
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary submit">
                    Send message <span className="arrow">→</span>
                  </button>
                  <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.5 }}>
                    By submitting, you agree to be contacted by Velai Health regarding your inquiry.
                    We do not share contact information with third parties.
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Contact = Contact;
