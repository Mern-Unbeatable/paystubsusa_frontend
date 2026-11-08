import React, { useLayoutEffect, useRef, useState } from "react";

// 210mm at 96 CSS px per inch.
const A4_PAGE_WIDTH_PX = (210 * 96) / 25.4;

/**
 * White 210mm × 297mm page scaled to the container width. `children` keep their own
 * layout at `contentWidth` px, scaled uniformly to fit the page width inside `inset`,
 * and sit at the top of the page; space they don't use stays blank.
 */
const A4PreviewPage = ({ contentWidth, inset = 0, framed = true, className = "", children }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const update = () => setScale(container.clientWidth / A4_PAGE_WIDTH_PX);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const contentScale = (A4_PAGE_WIDTH_PX - inset * 2) / contentWidth;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-white ${
        framed ? "border border-slate-200/80 rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.03)]" : ""
      } ${className}`}
      style={{ aspectRatio: "210 / 297" }}
    >
      <div
        style={{
          width: "210mm",
          height: "297mm",
          padding: inset,
          boxSizing: "border-box",
          overflow: "hidden",
          background: "#ffffff",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      >
        <div style={{ width: contentWidth, transform: `scale(${contentScale})`, transformOrigin: "top left" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default A4PreviewPage;
