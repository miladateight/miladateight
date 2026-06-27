import { useRef } from "react";
import { useStarField } from "../hooks/useStarField";

export default function StarField() {
  const canvasRef = useRef(null);
  useStarField(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh"
      }}
    />
  );
}
