/* global React, BrandMark */
// components/chrome/Nav.jsx — top navigation bar.

const { useState, useEffect } = React;

function Nav({ route, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "about",        label: "About" },
    { id: "services",     label: "Services" },
    { id: "publications", label: "Publications" },
    { id: "contact",      label: "Contact" },
  ];

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="container nav-inner">
        <a
          href="#home"
          className="brand"
          aria-label="Velai Health Analytics — home"
          onClick={(e) => { e.preventDefault(); navigate("home"); }}
        >
          <span className="brand-mark"><BrandMark /></span>
          <span>Velai</span>
          <span className="brand-suffix">Health Analytics</span>
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a
              key={l.id}
              href={"#" + l.id}
              className={"nav-link" + (route === l.id ? " active" : "")}
              onClick={(e) => { e.preventDefault(); navigate(l.id); }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary nav-cta"
            onClick={(e) => { e.preventDefault(); navigate("contact"); }}
          >
            Start a conversation
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
