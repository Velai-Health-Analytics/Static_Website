/* global React */
// components/chrome/BrandMark.jsx — site logo mark (favicon image).

function BrandMark() {
  return (
    <img src="favicon.ico" alt="Velai Health Analytics" width="32" height="32" style={{ display: "block" }} />
  );
}

window.BrandMark = BrandMark;
