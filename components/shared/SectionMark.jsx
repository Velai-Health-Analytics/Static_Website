/* global React */
// components/shared/SectionMark.jsx — section progress marker (e.g. "01 / 03 — Team").

function SectionMark({ ix, total = "06", label }) {
  return (
    <div className="section-mark">
      <span className="bar" />
      <span>{ix} / {total}</span>
      <span style={{ opacity: 0.7 }}>— {label}</span>
    </div>
  );
}

window.SectionMark = SectionMark;
