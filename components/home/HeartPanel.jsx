/* global React, HeartBase, HeartFramePlayer */
// components/home/HeartPanel.jsx — wraps heart animation for hero & other sections.

function HeartPanel({ isActive, sectionKey = "hero", animKey }) {
  return (
    <div className={`hs-panel heart-panel${isActive ? " panel-in" : ""}`}>
      {sectionKey === "hero" ? (
        <HeartFramePlayer animKey={animKey} />
      ) : (
        <div className="heart-svg-panel">
          {/* key=animKey remounts HeartBase on each activation, restarting animations */}
          <HeartBase key={animKey} sectionKey={sectionKey} />
        </div>
      )}
    </div>
  );
}

window.HeartPanel = HeartPanel;
