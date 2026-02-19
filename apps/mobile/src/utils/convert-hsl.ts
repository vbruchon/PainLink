export const hslToHsla = (hsl: string, alpha: number) => {
  const m = hsl.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)/);
  if (!m) return hsl;
  const [, h, s, l] = m;
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
};
