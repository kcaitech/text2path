import { Point } from "./point";

export class Opti {
    pen: number = 0;
    c: Array<Point> = [new Point(), new Point()];
    t: number = 0;
    s: number = 0;
    alpha: number = 0;
}