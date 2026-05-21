/* global React, ReactDOM, Nav, Footer, Home, About, Services, Publications, Contact */
// app.jsx — root: path-based router with live meta/title sync.

const { useState, useEffect } = React;

const PAGES = {
  home:         { path: "/",             title: "Velai Health Analytics — Cardiovascular risk intelligence",  desc: "Velai Health Analytics builds cardiovascular AI risk intelligence for healthcare institutions, medtech teams and research networks — and is the maker of Second Opinion." },
  about:        { path: "/about",        title: "About — Velai Health Analytics",                             desc: "We exist to make cardiovascular care continuous, evidenced, and human. Meet the cardiologists, scientists and engineers behind Velai Health Analytics." },
  services:     { path: "/services",     title: "Services — Velai Health Analytics",                          desc: "Risk model development, medtech co-development, research partnerships and population analytics for healthcare institutions and medtech teams." },
  publications: { path: "/publications", title: "Publications — Velai Health Analytics",                      desc: "Peer-reviewed cardiovascular research from the Velai Health Analytics team — journals, preprints and perspectives." },
  contact:      { path: "/contact",      title: "Contact — Velai Health Analytics",                           desc: "Start a conversation with Velai Health Analytics about cardiovascular AI for your institution, medtech product or research programme." },
};

const BASE_URL = "https://velaihealth.com";

function routeFromPath() {
  const p = window.location.pathname.replace(/\/$/, "") || "/";
  const map = { "/": "home", "/about": "about", "/services": "services", "/publications": "publications", "/contact": "contact" };
  return map[p] || "home";
}

function syncMeta(key) {
  const m = PAGES[key] || PAGES.home;
  document.title = m.title;
  const qs  = (attr, val) => document.querySelector(`[${attr}="${val}"]`);
  const set = (el, prop, val) => { if (el) el[prop] = val; };
  set(qs("name",     "description"),         "content", m.desc);
  set(qs("property", "og:title"),            "content", m.title);
  set(qs("property", "og:description"),      "content", m.desc);
  set(qs("property", "og:url"),              "content", BASE_URL + m.path);
  set(qs("name",     "twitter:title"),       "content", m.title);
  set(qs("name",     "twitter:description"), "content", m.desc);
  const canon = document.querySelector('link[rel="canonical"]');
  if (canon) canon.href = BASE_URL + m.path;
}

function App() {
  const [route, setRoute] = useState(routeFromPath());

  const navigate = (id) => {
    if (id === route) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const path = PAGES[id]?.path || "/";
    history.pushState({}, "", path);
    setRoute(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => { window.__navigate = navigate; });

  useEffect(() => {
    const onPop = () => { const r = routeFromPath(); syncMeta(r); setRoute(r); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => { syncMeta(route); }, [route]);

  const page =
    route === "about"        ? <About /> :
    route === "services"     ? <Services /> :
    route === "publications" ? <Publications /> :
    route === "contact"      ? <Contact /> :
                               <Home />;

  return (
    <>
      <Nav route={route} navigate={navigate} />
      <main key={route}>{page}</main>
      <Footer navigate={navigate} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
