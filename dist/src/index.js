import { CanvasLocal } from './canvasLocal.js';
let canvas;
let graphics;
let botonEjecutar = document.getElementById("ejecutar");
;
let ancho;
let alto;
let inputAncho = document.getElementById("ancho");
let inputAlto = document.getElementById("alto");
botonEjecutar.addEventListener('click', getAnchoAlto);
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
const miCanvas = new CanvasLocal(graphics, canvas);
miCanvas.paint();
function getAnchoAlto(evt) {
    ancho = parseFloat(inputAncho.value);
    alto = parseFloat(inputAlto.value);
    miCanvas.rWidth = ancho;
    miCanvas.rHeight = alto;
    miCanvas.pixelSize = Math.max(miCanvas.rWidth / miCanvas.maxX, miCanvas.rHeight / miCanvas.maxY);
    miCanvas.paint();
}
