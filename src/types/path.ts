import { Curve } from "./curve";
import { Point } from "./point";

export class Path {
    area: number = 0;
    len: number = 0;
    curve: Curve = new Curve(0);
    pt: Array<Point> = [];
    minX: number = 100000;
    minY: number = 100000;
    maxX: number = -1;
    maxY: number = -1;
}
