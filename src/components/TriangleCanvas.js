import React, { useMemo } from "react";
import { angleAt, centroid, formatAngle, mapToViewport } from "../utils/geometry";
import { arcPath } from "../utils/svg";
import "../index.css";

export default function TriangleCanvas({ pts, onBack }) {
    const size = 800;
    const raw = [pts.A, pts.B, pts.C];
    const { map } = useMemo(() => mapToViewport(raw, size, 40), [pts]);
    const A = map(pts.A), B = map(pts.B), C = map(pts.C);
    const cen = centroid(A, B, C);

    const angA = angleAt(B, A, C);
    const angB = angleAt(A, B, C);
    const angC = angleAt(A, C, B);

    const crossABAC = (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x);
    const ccw = crossABAC > 0;

    const radius = 40;
    const arcA = arcPath(A, B, C, radius, ccw);
    const arcB = arcPath(B, C, A, radius, ccw);
    const arcC = arcPath(C, A, B, radius, ccw);

    const labelPos = (P) => ({ x: P.x * 0.75 + cen.x * 0.25, y: P.y * 0.75 + cen.y * 0.25 });
    const LA = labelPos(A), LB = labelPos(B), LC = labelPos(C);

    const head = { display: "flex", alignItems: "center", justifyContent: "space-between" };
    const backBtn = { padding: "8px 12px", borderRadius: 12, border: "1px solid #e5e7eb", background: "white" };

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={head}>
                <h2 style={{ fontSize: 22, fontWeight: 600 }}>תצוגת משולש וזוויות</h2>
                <button onClick={onBack} style={backBtn}>חזרה לקלט</button>
            </div>

            <div style={{ overflow: "auto", border: "1px solid #e5e7eb", borderRadius: 16 }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <rect x="0" y="0" width={size} height={size} fill="#fafafa" />
                    <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#dde7ff" stroke="#1f2937" strokeWidth="2" />
                    {[A, B, C].map((P, idx) => (
                        <circle key={idx} cx={P.x} cy={P.y} r={5} fill="#111" />
                    ))}
                    <path d={arcA} stroke="#111" strokeWidth="2" fill="none" />
                    <path d={arcB} stroke="#111" strokeWidth="2" fill="none" />
                    <path d={arcC} stroke="#111" strokeWidth="2" fill="none" />
                    <text x={LA.x} y={LA.y} fontSize="16" textAnchor="middle" dominantBaseline="middle">{formatAngle(angA)}</text>
                    <text x={LB.x} y={LB.y} fontSize="16" textAnchor="middle" dominantBaseline="middle">{formatAngle(angB)}</text>
                    <text x={LC.x} y={LC.y} fontSize="16" textAnchor="middle" dominantBaseline="middle">{formatAngle(angC)}</text>
                </svg>
            </div>

            <div style={{ fontSize: 13, color: "#6b7280" }}>
                ערכי ברירת מחדל מוצגים להמחשה. ניתן לחזור ולעדכן נקודות.
            </div>
        </div>
    );
}
