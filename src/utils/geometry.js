export function toNumber(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
}

export function formatAngle(rad) {
    const deg = (rad * 180) / Math.PI;
    return `${deg.toFixed(1)}°`;
}

export function angleAt(A, B, C) {
    const v1 = { x: A.x - B.x, y: A.y - B.y };
    const v2 = { x: C.x - B.x, y: C.y - B.y };
    const dot = v1.x * v2.x + v1.y * v2.y;
    const n1 = Math.hypot(v1.x, v1.y);
    const n2 = Math.hypot(v2.x, v2.y);
    const cos = Math.min(1, Math.max(-1, dot / (n1 * n2)));
    return Math.acos(cos);
}

export function centroid(A, B, C) {
    return { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
}

export function mapToViewport(points, size = 800, pad = 40) {
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const w = Math.max(1, maxX - minX);
    const h = Math.max(1, maxY - minY);
    const scale = Math.min((size - 2 * pad) / w, (size - 2 * pad) / h);
    const tx = pad - minX * scale;
    const ty = pad - minY * scale;
    const map = (p) => ({ x: p.x * scale + tx, y: size - (p.y * scale + ty) });
    return { map, scale };
}