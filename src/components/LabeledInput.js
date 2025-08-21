import React from "react";
import "../index.css";

export default function LabeledInput({ label, value, onChange }) {
    return (
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "5px 5px", width: 100 }}
        />
            <span style={{ width: 16, fontSize: 14, color: "#6b7280" }}> :{label} </span>

        </label>
    );
}