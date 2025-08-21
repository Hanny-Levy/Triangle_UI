export function arcPath(center, startPt, endPt, radius, sweepCW) {
    const vec = (p) => ({ x: p.x - center.x, y: p.y - center.y });
    const v1 = vec(startPt);
    const v2 = vec(endPt);
    const n1 = Math.hypot(v1.x, v1.y);
    const n2 = Math.hypot(v2.x, v2.y);
    const s1 = { x: center.x + (v1.x / n1) * radius, y: center.y + (v1.y / n1) * radius };
    const s2 = { x: center.x + (v2.x / n2) * radius, y: center.y + (v2.y / n2) * radius };
    const largeArc = 0;
    const sweepFlag = sweepCW ? 1 : 0;
    return `M ${s1.x} ${s1.y} A ${radius} ${radius} 0 ${largeArc} ${sweepFlag} ${s2.x} ${s2.y}`;
}