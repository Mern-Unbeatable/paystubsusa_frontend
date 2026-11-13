import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { startConfetti } from "../../../utils/confetti";

// Portaled to <body>: a transformed ancestor would otherwise trap `position: fixed`.
const ConfettiOverlay = ({ active }) => {
  const canvasRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return undefined;
    confettiRef.current?.stop();
    const confetti = startConfetti(canvasRef.current);
    confettiRef.current = confetti;
    return () => confetti.finish();
  }, [active]);

  useEffect(() => {
    const confetti = confettiRef;
    return () => confetti.current?.stop();
  }, []);

  return createPortal(
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-40"
    />,
    document.body,
  );
};

export default ConfettiOverlay;
