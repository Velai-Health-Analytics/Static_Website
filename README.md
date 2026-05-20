# Velai Health Analytics — Site

Cardiovascular AI startup site. Single-page React app with hash-based routing, animated SVG panels, and a dev-tweaks panel for palette switching.

---

## Tech stack

| Thing | What |
|---|---|
| React 18 | UMD build loaded from unpkg CDN |
| Babel standalone | Transpiles JSX in-browser — no build step needed |
| CSS | Plain CSS (`styles.css` + `home.css`) |
| Fonts | Newsreader (display serif), Geist (sans), Geist Mono — Google Fonts |

**There is no bundler.** Files are loaded as `<script type="text/babel" src="...">` in `index.html`. Each file exposes its exports to `window` (e.g. `window.Nav = Nav`) and declares its dependencies via `/* global ... */` comments at the top.

---

## Directory structure

```
velai_health_revamp/
│
├── index.html                  ← Entry point. Loads ALL scripts in dependency order.
├── styles.css                  ← Global design tokens, layout, typography, buttons
├── home.css                    ← Home page specific styles (sections, panels, animations)
├── favicon.ico
│
├── app.jsx                     ← Root App component + hash router + ReactDOM.createRoot
│
├── tweaks/
│   └── TweaksPanel.jsx         ← Floating dev panel for live palette switching.
│                                 Exports: useTweaks, TweaksPanel, TweakSection,
│                                 TweakRow, TweakSlider, TweakToggle, TweakRadio,
│                                 TweakSelect, TweakText, TweakNumber, TweakColor,
│                                 TweakButton
│
├── hooks/
│   └── hooks.jsx               ← Shared React hooks.
│                                 Exports: useReveal, useActivatedKey
│
├── components/
│   │
│   ├── chrome/                 ← Site-wide UI shell
│   │   ├── BrandMark.jsx       ← favicon.ico wrapped in <img>. Exports: BrandMark
│   │   ├── Nav.jsx             ← Top nav bar. Exports: Nav
│   │   └── Footer.jsx          ← Site footer with nav columns. Exports: Footer
│   │
│   ├── svg/                    ← Animated SVG illustrations
│   │   ├── HeartBase.jsx       ← Anatomical heart SVG with draw-on, blood flow
│   │   │                         particles, and section-specific overlays.
│   │   │                         Exports: HeartBase, Heart
│   │   ├── HeartStage.jsx      ← Fixed-position heart stage with floating chip
│   │   │                         annotations per section.
│   │   │                         Exports: HomeHeartStage, ChipGlyph
│   │   └── DaVinciSVG.jsx      ← Vitruvian Man SVG with parallax mouse tracking
│   │                             and hover zone highlights.
│   │                             Exports: DaVinciSVG
│   │
│   ├── shared/                 ← Reusable UI components used across pages
│   │   ├── PageHero.jsx        ← Page header (breadcrumb + h1 + lede).
│   │   │                         Used by: About, Services, Publications, Contact
│   │   │                         Exports: PageHero
│   │   └── SectionMark.jsx     ← Section progress label (e.g. "01 / 03 — Team").
│   │                             Exports: SectionMark
│   │
│   └── home/                   ← Home page components (not used on other pages)
│       ├── SideIndex.jsx       ← Vertical section nav dots on left edge.
│       │                         Also exports: SECTIONS (array used by Home.jsx)
│       ├── HeartPanel.jsx      ← Wrapper around HeartBase for home sections.
│       │                         Exports: HeartPanel
│       ├── DaVinciPanel.jsx    ← Wrapper around DaVinciSVG with callout overlays.
│       │                         Exports: DaVinciPanel
│       └── sections/           ← One file per home page section
│           ├── SectionHero.jsx         ← Section 01 — hero text + heart
│           ├── SectionModalities.jsx   ← Section 02 — Da Vinci + signals list
│           ├── SectionFlow.jsx         ← Section 03 — workflow steps + Da Vinci
│           ├── SectionAudience.jsx     ← Section 04 — partner tabs (full-width)
│           ├── SectionProof.jsx        ← Section 05 — proof quote + metrics + heart
│           └── SectionCTA.jsx          ← Section 06 — call to action (full-width)
│
└── pages/                      ← One file per route
    ├── Home.jsx                ← Route: #home  — assembles all 6 sections,
    │                             scroll-snap, keyboard/wheel/touch nav
    ├── About.jsx               ← Route: #about
    ├── Services.jsx            ← Route: #services
    ├── Publications.jsx        ← Route: #publications
    └── Contact.jsx             ← Route: #contact
```

---

## How routing works

Routing is hash-based (`window.location.hash`). There is no React Router.

- `app.jsx` reads `window.location.hash` on load and on `hashchange` events.
- `navigate(id)` sets `window.location.hash = id` and updates React state.
- `window.__navigate` is set globally so any deeply nested component can navigate without prop-drilling.

**Valid routes:** `home`, `about`, `services`, `publications`, `contact`

---

## How the script load order works

Because there's no bundler, `index.html` must load scripts in dependency order. The layers are:

1. **Foundation** — `tweaks/TweaksPanel.jsx` (no deps)
2. **Chrome atoms** — `BrandMark` → `Nav`, `Footer`
3. **SVG components** — `HeartBase` → `HeartStage`, `DaVinciSVG`
4. **Hooks + shared UI** — `hooks.jsx`, `SectionMark`, `PageHero`
5. **Home building blocks** — `SideIndex`, `HeartPanel`, `DaVinciPanel`, then all 6 sections
6. **Pages** — `Home`, `About`, `Services`, `Publications`, `Contact`
7. **App root** — `app.jsx` (mounts to `#root`)

If you add a new file, add it to `index.html` in the correct layer. If a new file depends on something in layer 5, it must load after layer 5.

---

## How the global namespace works

Each file follows this pattern:

```jsx
/* global React, SomeDependency, AnotherDep */

function MyComponent(props) { ... }

window.MyComponent = MyComponent;
```

- The `/* global ... */` comment tells linters these names come from `window`.
- The `window.X = X` line at the bottom makes the component available to files loaded later.
- **Never use `import`/`export`** — Babel standalone doesn't support ES modules in this setup.

---

## How the SVG animations work

All draw-on animations use the CSS `stroke-dashoffset` trick:

```css
/* pathLength="1" on the SVG element sets total path length to 1 */
/* CSS then animates dashoffset from 1 (hidden) to 0 (fully drawn) */
.dp {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset var(--dur) ease-out var(--del);
}
.drawn .dp, .dv-drawn .dv-dp {
  stroke-dashoffset: 0;
}
```

- `HeartBase` gets `.drawn` class added via `useState` after a double `requestAnimationFrame` on mount.
- `DaVinciSVG` gets `.dv-drawn` the same way.
- Section-specific overlays inside `HeartBase` (modalities probes, flow nodes, proof rings, etc.) remount via the `animKey` prop, which increments each time the section becomes active. This restarts their CSS animations cleanly.

---

## Adding a new page

1. Create `pages/NewPage.jsx`:

```jsx
/* global React, PageHero, useReveal */

function NewPage() {
  useReveal();
  return (
    <div className="page-enter">
      <PageHero section="New Page" title="Your <em>title</em> here." lede="Subtitle text." />
      {/* sections */}
    </div>
  );
}

window.NewPage = NewPage;
```

2. Add to `index.html` in Layer 6 (before `app.jsx`):

```html
<script type="text/babel" src="pages/NewPage.jsx"></script>
```

3. Add the route in `app.jsx`:

```jsx
else if (route === "new-page") page = <NewPage />;
```

4. Add the nav link in `components/chrome/Nav.jsx` links array.

---

## Adding a new home section

1. Create `components/home/sections/SectionName.jsx` (copy an existing section as a template).
2. Export it: `window.SectionName = SectionName`.
3. Add to `index.html` in Layer 5.
4. Add a new entry in `SECTIONS` array in `components/home/SideIndex.jsx`.
5. Render it in `pages/Home.jsx` with the correct `isActive={activeSection === N}` index.

---

## Design tokens

Defined in `styles.css` as CSS custom properties on `:root`:

| Token | Value | Use |
|---|---|---|
| `--accent` | `oklch(0.50 0.11 155)` | Forest green — primary brand colour |
| `--coral` | `oklch(0.60 0.18 22)` | Terra — CTAs, Second Opinion |
| `--paper` | `oklch(0.975 0.008 145)` | Off-white background |
| `--ink` | `oklch(0.20 0.015 200)` | Body text |
| `--ink-2` | `oklch(0.38 0.012 200)` | Secondary text |
| `--ink-3` | `oklch(0.55 0.010 200)` | Tertiary / metadata text |
| `--font-display` | Newsreader | Headings, display text |
| `--font-sans` | Geist | Body, UI |
| `--font-mono` | Geist Mono | Labels, numbers, code |

Palette switching is done via `data-palette` on `<body>` (set by `app.jsx` from the tweaks panel). CSS overrides accent/coral tokens for `terra` and `ink` palettes.

---

## Dev notes

- **No build step.** Just open `index.html` in a browser or serve the folder with any static server (e.g. `npx serve .` or VS Code Live Server).
- **Babel transpiles on every page load** — this is slow in development but fine for prototyping. For production, pre-compile with `@babel/cli`.
- The tweaks panel (bottom-right) is only visible when activated via `window.postMessage({ type: '__activate_edit_mode' }, '*')`. It's used by the Omelette/FleetView design host.
