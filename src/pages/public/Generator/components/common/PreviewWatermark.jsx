import React, { useLayoutEffect, useRef, useState } from "react";

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
}) => {
  const ref = useRef(null);
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

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden"
    >
      {diagonal > 0 && (
        <svg width={size.width} height={size.height} className="block">
          <g transform={`rotate(${-angle} ${cx} ${cy})`}>
            {lines.map(({ offset, scale: lineScale }, i) => {
              const fontSize = baseFontSize * lineScale;
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
