import { Potrace } from "./potrace";

const __caches: Map<string, string> = new Map();
let __canvasElement: HTMLCanvasElement | undefined;

export function text2path(font: string, fontSize: number, italic: boolean, weight: number, charCode: number): string {

    const saveFontSize = fontSize;
    fontSize = Math.min(Math.round(fontSize * 16), 1024);// 最大1024可以了吧
    const scale = fontSize / saveFontSize;
    const cacheId = font + "#" + fontSize + "#" + charCode + (italic ? '#i' : '') + '#' + weight;
    let path = __caches.get(cacheId);
    if (path) return path;

    if (!__canvasElement) {
        __canvasElement = document.createElement('canvas');
    }
    const canvasElement: HTMLCanvasElement = __canvasElement;

    const size = Math.round(fontSize * 1.25); // 预留防止截断，如italic，g字符
    // const width = size; // italic截断
    // const height = size; // 有字符如：g，j底部被截断
    canvasElement.width = size;
    canvasElement.height = size;
    const canvas = canvasElement.getContext('2d')!
    canvas.imageSmoothingEnabled = false;

    canvas.font = (italic ? 'italic ' : 'normal ') + weight + ' ' + fontSize + 'px ' + font;
    canvas.fillStyle = 'black'
    canvas.textAlign = 'left'
    canvas.textBaseline = 'alphabetic'

    const offsetX = Math.round(fontSize * 0.1); // j左侧也会截断
    canvas.fillText(String.fromCharCode(charCode), offsetX, fontSize)

    const imgdata: ImageData = canvas.getImageData(0, 0, size, size)
    const potrace = new Potrace(imgdata, () => { })
    path = potrace.getSVGPath({ x: 1 / scale, y: 1 / scale }, { x: (- offsetX) / scale, y: (- fontSize) / scale });
    __caches.set(cacheId, path);

    return path;
}
