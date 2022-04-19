import { CanvasLocal } from './canvasLocal.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;
let botonEjecutar= <HTMLElement>document.getElementById("ejecutar");;
let ancho: number;
let alto: number;
let inputAncho =<HTMLInputElement> document.getElementById("ancho");
let inputAlto =<HTMLInputElement> document.getElementById("alto");
botonEjecutar.addEventListener('click',getAnchoAlto);

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

const miCanvas:CanvasLocal = new CanvasLocal(graphics, canvas);

miCanvas.paint();

function getAnchoAlto(evt: any): void{
    ancho=parseFloat(inputAncho.value);
    alto=parseFloat(inputAlto.value);
    miCanvas.rWidth=ancho;
    miCanvas.rHeight=alto;
    miCanvas.pixelSize = Math.max(miCanvas.rWidth / miCanvas.maxX, miCanvas.rHeight /miCanvas.maxY);
    miCanvas.paint();
}