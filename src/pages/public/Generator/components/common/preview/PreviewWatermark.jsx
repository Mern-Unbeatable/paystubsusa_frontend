import React, { useId, useLayoutEffect, useRef, useState } from "react";

const SINGLE_LINE = [{ offset: 0, scale: 1 }];

/**
 * Diagonal "PREVIEW ONLY" stamp across its positioned parent, running from the
 * bottom-left to the top-right corner whatever the parent's aspect ratio.
 * `lines` adds parallel copies: `offset` moves a line across the diagonal (fraction
 * of the shorter side, negative = towards the top-left), `scale` sizes it.
 */
const PreviewWatermark = ({
  text = "PREVIEW ONLY",
  fontWeight = "normal",
  fontFamily = "Arial, Helvetica, sans-serif",
  fill = "rgba(15, 23, 42, 0.22)",
  scale = 1,
  lines = SINGLE_LINE,
  /** Vertical centre of the stamp as a fraction of the parent's height. */
  anchorY = 0.5,
  /** Fixed tilt in degrees; defaults to the parent's corner-to-corner diagonal. */
  angle: fixedAngle,
  /** Repeats `text` small across the whole page, leaving a clear band around the big lines. */
  tiled = false,
  tileFill = fill,
}) => {
  const ref = useRef(null);
  const ids = useId().replace(/:/g, "");
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const diagonal = size ? Math.hypot(size.width, size.height) : 0;
  const shortSide = size ? Math.min(size.width, size.height) : 0;
  const angle =
    fixedAngle ??
    (size ? (Math.atan2(size.height, size.width) * 180) / Math.PI : 0);
  const baseFontSize = size
    ? Math.min(diagonal * 0.1, shortSide * 0.2) * scale
    : 0;
  const cx = size ? size.width / 2 : 0;
  const cy = size ? size.height * anchorY : 0;
  // Longest centre line that stays inside the box at this tilt.
  const rad = (angle * Math.PI) / 180;
  const fitLength = size
    ? Math.min(size.width / Math.cos(rad), (2 * Math.min(cy, size.height - cy)) / Math.sin(rad)) * 0.9
    : 0;
  const maxCenterFontSize = fitLength / (0.6 * text.length);

  const tileFontSize = shortSide * 0.035;
  const tileWidth = tileFontSize * 8;
  const tileHeight = tileFontSize * 3.6;
  const offsets = lines.map((l) => l.offset * shortSide);
  const bandFontSize = Math.min(baseFontSize, maxCenterFontSize);
  const bandTop = Math.min(...offsets) - bandFontSize * 0.9;
  const bandHeight = Math.max(...offsets) - Math.min(...offsets) + bandFontSize * 1.8;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden"
    >
      {diagonal > 0 && (
        <svg width={size.width} height={size.height} className="block">
          {tiled && (
            <>
              <defs>
                <pattern
                  id={`${ids}-tile`}
                  width={tileWidth}
                  height={tileHeight}
                  patternUnits="userSpaceOnUse"
                  patternTransform={`rotate(${-angle} ${cx} ${cy})`}
                >
                  <text
                    x={tileWidth / 2}
                    y={tileHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={tileFontSize}
                    fill={tileFill}
                  >
                    {text}
                  </text>
                </pattern>
                <mask id={`${ids}-band`}>
                  <rect width={size.width} height={size.height} fill="white" />
                  <rect
                    x={cx - diagonal}
                    y={cy + bandTop}
                    width={diagonal * 2}
                    height={bandHeight}
                    fill="black"
                    transform={`rotate(${-angle} ${cx} ${cy})`}
                  />
                </mask>
              </defs>
              <rect
                width={size.width}
                height={size.height}
                fill={`url(#${ids}-tile)`}
                mask={`url(#${ids}-band)`}
              />
            </>
          )}
          <g transform={`rotate(${-angle} ${cx} ${cy})`}>
            {lines.map(({ offset, scale: lineScale }, i) => {
              const fontSize =
                offset === 0
                  ? Math.min(baseFontSize * lineScale, maxCenterFontSize)
                  : baseFontSize * lineScale;
              // Off-centre lines cross a shorter chord; never stretch beyond the natural glyph width.
              const room = diagonal * (offset === 0 ? 0.8 : 0.45);
              return (
                <text
                  key={i}
                  x={cx}
                  y={cy + offset * shortSide}
                  textAnchor="middle"
                  dominantBaseline="central"
                  textLength={Math.min(room, fontSize * 0.6 * text.length)}
                  lengthAdjust="spacingAndGlyphs"
                  fontSize={fontSize}
                  // fontFamily={fontFamily}
                  // fontWeight={fontWeight}
                  fill={fill}
                >
                  {text}
                </text>
              );
            })}
          </g>
        </svg>
      )}
    </div>
  );
};

export default PreviewWatermark;
