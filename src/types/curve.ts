import { Point } from "./point";

/**
 * Curve type
 *
 * @param n
 * @constructor
 * @protected
 */
export class Curve {
    n: number;
    tag: Array<string>;
    c: Array<Point>;
    alphaCurve: number;
    vertex: Array<Point>;
    alpha: Array<number>;
    alpha0: Array<number>;
    beta: Array<number>;
    constructor(n: number) {
        this.n = n;
        this.tag = new Array(n);
        this.c = new Array(n * 3);
        this.alphaCurve = 0;
        this.vertex = new Array(n);
        this.alpha = new Array(n);
        this.alpha0 = new Array(n);
        this.beta = new Array(n);
    }
}
