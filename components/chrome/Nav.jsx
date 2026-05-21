/* global React, BrandMark */
// components/chrome/Nav.jsx — top navigation bar.

const { useState, useEffect } = React;

function Nav({ route, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { id: "about",        label: "About" },
    { id: "services",     label: "Services" },
    { id: "publications", label: "Publications" },
    { id: "contact",      label: "Contact" },
  ];

  const handleNav = (id) => {
    setMenuOpen(false);
    navigate(id);
  };

  return (
    <>
      <nav className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="container nav-inner">
          <a
            href="/"
            className="brand"
            aria-label="Velai Health Analytics — home"
            onClick={(e) => { e.preventDefault(); handleNav("home"); }}
          >
            <span className="brand-mark"><BrandMark /></span>
            <span>Velai</span>
            <span className="brand-suffix">Health Analytics</span>
          </a>

          {/* Desktop nav links */}
          <div className="nav-links">
            {links.map((l) => (
              <a
                key={l.id}
                href={"/" + l.id}
                className={"nav-link" + (route === l.id ? " active" : "")}
                onClick={(e) => { e.preventDefault(); handleNav(l.id); }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact"
              className="btn btn-primary nav-cta"
              onClick={(e) => { e.preventDefault(); handleNav("contact"); }}
            >
              Start a conversation
              <span className="arrow">→</span>
            </a>
          </div>

          {/* Mobile: hamburger toggle only */}
          <button
            className={"nav-menu-btn" + (menuOpen ? " open" : "")}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="nav-menu-bar" />
            <span className="nav-menu-bar" />
            <span className="nav-menu-bar" />
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div
          className="nav-mobile-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
        >
          <nav className="nav-mobile-menu">
            {links.map((l) => (
              <a
                key={l.id}
                href={"/" + l.id}
                className={"nav-mobile-link" + (route === l.id ? " active" : "")}
                onClick={(e) => { e.preventDefault(); handleNav(l.id); }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary nav-mobile-cta-menu"
              onClick={(e) => { e.preventDefault(); handleNav("contact"); }}
            >
              Start a conversation
              <span className="arrow">→</span>
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

window.Nav = Nav;
