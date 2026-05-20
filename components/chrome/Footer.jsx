/* global React, BrandMark */
// components/chrome/Footer.jsx — site footer with nav columns.

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 20 }}>
              <span className="brand-mark"><BrandMark /></span>
              <span>Velai</span>
              <span className="brand-suffix">Health Analytics</span>
            </div>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              lineHeight: 1.35,
              color: "var(--ink-2)",
              margin: 0,
              maxWidth: "34ch",
            }}>
              Cardiovascular risk intelligence for the institutions building the future of heart care.
            </p>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#about"        onClick={(e) => { e.preventDefault(); navigate("about"); }}>About</a></li>
              <li><a href="#services"     onClick={(e) => { e.preventDefault(); navigate("services"); }}>Services</a></li>
              <li><a href="#publications" onClick={(e) => { e.preventDefault(); navigate("publications"); }}>Publications</a></li>
              <li><a href="#contact"      onClick={(e) => { e.preventDefault(); navigate("contact"); }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>What we do</h4>
            <ul>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigate("services"); }}>Risk model development</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigate("services"); }}>Medtech co-development</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigate("services"); }}>Research partnerships</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigate("services"); }}>Second Opinion™ product</a></li>
            </ul>
          </div>
          <div>
            <h4>Stay in touch</h4>
            <ul>
              <li><a href="mailto:velaihealthanalytics@gmail.com">velaihealthanalytics@gmail.com</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }}>Press inquiries</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }}>Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Velai Health Analytics, Inc. — All rights reserved.</span>
          <span>Velai Health Analytics is the maker of Second Opinion™.</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
