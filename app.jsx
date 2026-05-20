/* global React, ReactDOM, Nav, Footer, Home, About, Services, Publications, Contact */
// app.jsx — root component: hash-based router and chrome.

const { useState, useEffect } = React;

function routeFromHash() {
  const h = (window.location.hash || "").replace(/^#/, "").trim();
  if (["home", "about", "services", "publications", "contact"].includes(h)) return h;
  return "home";
}

function App() {
  const [route, setRoute] = useState(routeFromHash());

  const navigate = (id) => {
    if (id === route) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = id;
    setRoute(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => { window.__navigate = navigate; });

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  let page;
  if (route === "home")              page = <Home />;
  else if (route === "about")        page = <About />;
  else if (route === "services")     page = <Services />;
  else if (route === "publications") page = <Publications />;
  else if (route === "contact")      page = <Contact />;

  return (
    <>
      <Nav route={route} navigate={navigate} />
      <main key={route}>
        {page}
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
