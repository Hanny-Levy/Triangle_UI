import React, { useMemo, useState } from "react";
import InputForm from "./components/InputForm";
import TriangleCanvas from "./components/TriangleCanvas";
import { toNumber } from "./utils/geometry";
import "./index.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [pts, setPts] = useState({
    A: { x: "0", y: "0" },
    B: { x: "4", y: "0" },
    C: { x: "1", y: "3" },
  });

  const numericPts = useMemo(() => ({
    A: { x: toNumber(pts.A.x), y: toNumber(pts.A.y) },
    B: { x: toNumber(pts.B.x), y: toNumber(pts.B.y) },
    C: { x: toNumber(pts.C.x), y: toNumber(pts.C.y) },
  }), [pts]);

  const outer = {
    minHeight: "100vh", padding: 24, display: "flex", justifyContent: "center", alignItems: "center", background: "#f6f7fb", boxSizing: "border-box",
  };
  const card = { width: "100%", maxWidth: 1000, borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", background: "#fff", padding: 24, boxSizing: "border-box" };

  return (
      <div style={outer}>
        <div style={card}>
          {step === 1 ? (
              <InputForm pts={pts} setPts={setPts} onShow={() => setStep(2)} />
          ) : (
              <TriangleCanvas pts={numericPts} onBack={() => setStep(1)} />
          )}
        </div>
      </div>
  );
}

