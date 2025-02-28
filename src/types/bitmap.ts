import { Point } from "./point";
import * as utils from "../utils"

// var Histogram;
import { Histogram } from "./histogram";
/**
 * Represents a bitmap where each pixel can be a number in range of 0..255
 * Used internally to store luminance data.
 *
 * @param {Number} w
 * @param {Number} h
 * @constructor
 */
export class Bitmap {
    private _histogram?: Histogram;

    width: number;
    height: number;
    size: number;
    arrayBuffer: ArrayBuffer;
    data: Uint8Array;

    constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
        this.size = w * h;
        this.arrayBuffer = new ArrayBuffer(this.size);
        this.data = new Uint8Array(this.arrayBuffer);
    }

    /**
     * Returns pixel value
     *
     * @param {Number|Point} x - index, point or x
     * @param {Number} [y]
     */
    getValueAt(x: number, y: number) {
        const index = this.pointToIndex(x, y);
        return this.data[index];
    }

    /**
     * Converts {@link Point} to index value
     *
     * @param {Number} index
     * @returns {Point}
     */
    indexToPoint(index: number, point?: Point) {
        point = point ?? new Point();

        if (utils.between(index, 0, this.size)) {
            point.y = Math.floor(index / this.width);
            point.x = index - point.y * this.width;
        } else {
            point.x = -1;
            point.y = -1;
        }

        return point;
    }

    /**
     * Calculates index for point or coordinate pair
     *
     * @param {Number|Point} pointOrX
     * @param {Number} [y]
     * @returns {Number}
     */
    pointToIndex(point: Point): number;
    pointToIndex(x: number, y: number): number;
    pointToIndex(pointOrX: Point | number, y?: number) {
        let _x = pointOrX,
            _y = y || 0;

        if (pointOrX instanceof Point) {
            _x = pointOrX.x;
            _y = pointOrX.y;
        }

        if (!utils.between(_x as number, 0, this.width) || !utils.between(_y!, 0, this.height)) {
            return -1;
        }

        return this.width * _y + (_x as number);
    }

    /**
     * Makes a copy of current bitmap
     *
     * @param {Function} [iterator] optional callback, used for processing pixel value. Accepted arguments: value, index
     * @returns {Bitmap}
     */
    copy(iterator?: (value: number, index: number) => number) {
        const bm = new Bitmap(this.width, this.height),
            iteratorPresent = typeof iterator === 'function';
            // i;

        if (iteratorPresent) {
            bm.data = this.data.map(iterator!);
        }
        else {
            bm.data = this.data.slice(0);
        }

        return bm;
    }

    histogram() {
        if (this._histogram) {
            return this._histogram;
        }

        this._histogram = new Histogram(this);
        return this._histogram;
    }
}