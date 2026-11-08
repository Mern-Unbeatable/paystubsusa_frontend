import React, { useLayoutEffect, useRef, useState } from "react";

/**
 * Renders a fixed-size document scaled down to the container width.
 * `visibleHeight` (unscaled px) crops the bottom, e.g. for card thumbnails.
 */
const ScaledDocument = ({ width, height, visibleHeight = height, className = "", children }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    const update = () => setScale(node.clientWidth / width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: visibleHeight * scale }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScaledDocument;
