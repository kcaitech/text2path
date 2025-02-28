import { Curve } from "./types/curve";
import { Point } from "./types/point";
import { Quad } from "./types/quad";

const attrRegexps: { [key: string]: RegExp } = {};

export function getAttrRegexp(attrName: string) {
    if (attrRegexps[attrName]) {
        return attrRegexps[attrName];
    }

    attrRegexps[attrName] = new RegExp(' ' + attrName + '="((?:\\\\(?=")"|[^"])+)"', 'i');
    return attrRegexps[attrName];
}

export function setHtmlAttribute(html: string, attrName: string, value: string): string {
    const attr = ' ' + attrName + '="' + value + '"';

    if (html.indexOf(' ' + attrName + '="') === -1) {
        html = html.replace(/<[a-z]+/i, function (beginning) { return beginning + attr; });
    } else {
        html = html.replace(getAttrRegexp(attrName), attr);
    }

    return html;
}

export function fixed(number: number): string {
    // return number.toFixed(3).replace('.000', '');
    return number.toString();
}

export function mod(a: number, n: number): number {
    return a >= n ? a % n : a >= 0 ? a : n - 1 - (-1 - a) % n;
}

export function xprod(p1: Point, p2: Point): number {
    return p1.x * p2.y - p1.y * p2.x;
}

export function cyclic(a: number, b: number, c: number): boolean {
    if (a <= c) {
        return (a <= b && b < c);
    } else {
        return (a <= b || b < c);
    }
}

export function sign(i: number) {
    return i > 0 ? 1 : i < 0 ? -1 : 0;
}

export function quadform(Q: Quad, w: Point) {
    const v = new Array(3);
    let i, j, sum;

    v[0] = w.x;
    v[1] = w.y;
    v[2] = 1;
    sum = 0.0;

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            sum += v[i] * Q.at(i, j) * v[j];
        }
    }
    return sum;
}

export function interval(lambda: number, a: Point, b: Point) {
    const res = new Point();

    res.x = a.x + lambda * (b.x - a.x);
    res.y = a.y + lambda * (b.y - a.y);
    return res;
}

export function dorth_infty(p0: Point, p2: Point) {
    const r = new Point();

    r.y = sign(p2.x - p0.x);
    r.x = -sign(p2.y - p0.y);

    return r;
}

export function ddenom(p0: Point, p2: Point) {
    const r = dorth_infty(p0, p2);

    return r.y * (p2.x - p0.x) - r.x * (p2.y - p0.y);
}

export function dpara(p0: Point, p1: Point, p2: Point) {
    const x1 = p1.x - p0.x;
    const y1 = p1.y - p0.y;
    const x2 = p2.x - p0.x;
    const y2 = p2.y - p0.y;

    return x1 * y2 - x2 * y1;
}

export function cprod(p0: Point, p1: Point, p2: Point, p3: Point) {
    const x1 = p1.x - p0.x;
    const y1 = p1.y - p0.y;
    const x2 = p3.x - p2.x;
    const y2 = p3.y - p2.y;

    return x1 * y2 - x2 * y1;
}

export function iprod(p0: Point, p1: Point, p2: Point) {
    const x1 = p1.x - p0.x;
    const y1 = p1.y - p0.y;
    const x2 = p2.x - p0.x;
    const y2 = p2.y - p0.y;

    return x1 * x2 + y1 * y2;
}

export function iprod1(p0: Point, p1: Point, p2: Point, p3: Point) {
    const x1 = p1.x - p0.x;
    const y1 = p1.y - p0.y;
    const x2 = p3.x - p2.x;
    const y2 = p3.y - p2.y;

    return x1 * x2 + y1 * y2;
}

export function ddist(p: Point, q: Point) {
    return Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
}


export function luminance(r: number, g: number, b: number) {
    return Math.round(0.2126 * r + 0.7153 * g + 0.0721 * b);
}

export function between(val: number, min: number, max: number) {
    return val >= min && val <= max;
}

export function clamp(val: number, min: number, max: number) {
    return Math.min(max, Math.max(min, val));
}

export function isNumber(val: any) {
    return typeof val === 'number';
}

export const setHtmlAttr = setHtmlAttribute


/**
 * Generates path instructions for given curve
 *
 * @param {Curve} curve
 * @param {Number} [scale]
 * @returns {string}
 */
export function renderCurve(curve: Curve, scale: { x: number, y: number }, trans: { x: number, y: number }) {

    const startingPoint = curve.c[(curve.n - 1) * 3 + 2];

    const path = [
        'M '
        + fixed(startingPoint.x * scale.x + trans.x) + ' '
        + fixed(startingPoint.y * scale.y + trans.y)
    ];

    curve.tag.forEach(function (tag, i) {
        const i3 = i * 3;
        const p0 = curve.c[i3];
        const p1 = curve.c[i3 + 1];
        const p2 = curve.c[i3 + 2];

        if (tag === "CURVE") {
            path.push(
                'C '
                + fixed(p0.x * scale.x + trans.x) + ' ' + fixed(p0.y * scale.y + trans.y) + ', '
                + fixed(p1.x * scale.x + trans.x) + ' ' + fixed(p1.y * scale.y + trans.y) + ', '
                + fixed(p2.x * scale.x + trans.x) + ' ' + fixed(p2.y * scale.y + trans.y)
            );
        } else if (tag === "CORNER") {
            path.push(
                'L '
                + fixed(p1.x * scale.x + trans.x) + ' ' + fixed(p1.y * scale.y + trans.y) + ' '
                + fixed(p2.x * scale.x + trans.x) + ' ' + fixed(p2.y * scale.y + trans.y)
            );
        }
    });

    return path.join(' ');
}

export function bezier(t: number, p0: Point, p1: Point, p2: Point, p3: Point) {
    const s = 1 - t, res = new Point();

    res.x = s * s * s * p0.x + 3 * (s * s * t) * p1.x + 3 * (t * t * s) * p2.x + t * t * t * p3.x;
    res.y = s * s * s * p0.y + 3 * (s * s * t) * p1.y + 3 * (t * t * s) * p2.y + t * t * t * p3.y;

    return res;
}

export function tangent(p0: Point, p1: Point, p2: Point, p3: Point, q0: Point, q1: Point) {
    const A = cprod(p0, p1, q0, q1);
    const B = cprod(p1, p2, q0, q1);
    const C = cprod(p2, p3, q0, q1);

    const a = A - 2 * B + C;
    const b = -2 * A + 2 * B;
    const c = A;

    const d = b * b - 4 * a * c;

    if (a === 0 || d < 0) {
        return -1.0;
    }

    const s = Math.sqrt(d);

    const r1 = (-b + s) / (2 * a);
    const r2 = (-b - s) / (2 * a);

    if (r1 >= 0 && r1 <= 1) {
        return r1;
    } else if (r2 >= 0 && r2 <= 1) {
        return r2;
    } else {
        return -1.0;
    }
}