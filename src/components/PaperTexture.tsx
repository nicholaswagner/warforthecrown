// from https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/
const PaperTexture = ({ height, width }: { height: number; width: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={`${height}`}
      width={`${width}`}
      viewBox={`0 0 ${height} ${width}`}
      style={{ position: 'fixed', left: 0, top: 0 }}
    >
      <filter id="roughpaper" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" numOctaves="5" />
        <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="2">
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
      </filter>
      <rect x="0" y="0" width="100%" height="100%" filter="url(#roughpaper)" fill="none" />
    </svg>
  );
};
export default PaperTexture;
