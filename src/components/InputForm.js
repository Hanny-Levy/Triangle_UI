import React from "react";
import LabeledInput from "./LabeledInput";
import "../index.css";

export default function InputForm({ pts, setPts, onShow }) {
    const set = (key, field, v) => setPts((prev) => ({ ...prev, [key]: { ...prev[key], [field]: v } }));
    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
    };
    const box = { border: "1px solid #e5e7eb", borderRadius: 16, padding: 16 };

    return (
        <div style={{ display: "grid", gap: 16 }}>
            <h1 style={{ fontSize: 22, fontWeight: 600 }}>הזנת נקודות משולש</h1>
            <p style={{ color: "#6b7280" }}>הזינו שלוש נקודות (X,Y).</p>
            <div style={grid}>
                {(["A", "B", "C"]).map((k) => (
                    <div key={k} style={box}>
                        <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>נקודה {k}</div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <LabeledInput label="X" value={pts[k].x} onChange={(v) => set(k, "x", v)} />
                            <LabeledInput label="Y" value={pts[k].y} onChange={(v) => set(k, "y", v)} />
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={onShow} style={{ padding: "10px 18px", borderRadius: 12, background: "#111827", color: "#fff", border: 0 }}>
                    הצג משולש
                </button>
            </div>
        </div>
    );
}
