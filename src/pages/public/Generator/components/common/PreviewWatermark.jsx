import React, { useLayoutEffect, useRef, useState } from "react";

/**
 * Diagonal "PREVIEW ONLY" stamp across its positioned parent, running from the
 * bottom-left to the top-right corner whatever the parent's aspect ratio.
 */
const PreviewWatermark = ({
  text = "PREVIEW ONLY",
  fontWeight = "normal",
  scale = 1,
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
  const angle = size
    ? (Math.atan2(size.height, size.width) * 180) / Math.PI
    : 0;
  const fontSize = size
    ? Math.min(diagonal * 0.1, Math.min(size.width, size.height) * 0.2) * scale
    : 0;
  // Never stretch short words beyond their natural Arial width (~0.6em per glyph).
  const textLength = Math.min(diagonal * 0.8, fontSize * 0.6 * text.length);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden"
    >
      {diagonal > 0 && (
        <svg width={size.width} height={size.height} className="block">
          <text
            x={size.width / 2}
            y={size.height / 2}
            transform={`rotate(${-angle} ${size.width / 2} ${size.height / 2})`}
            textAnchor="middle"
            dominantBaseline="central"
            textLength={textLength}
            lengthAdjust="spacingAndGlyphs"
            fontSize={fontSize}
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight={fontWeight}
            fill="rgba(15, 23, 42, 0.22)"
          >
            {text}
          </text>
        </svg>
      )}
    </div>
  );
};

export default PreviewWatermark;
