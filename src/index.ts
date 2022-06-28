
//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './point3D.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

let cv: CvHLines;
let obj: Obj3D;
let ang: number=0;
let pza2Open: boolean =false;
let pza3Open: boolean =false;

function leerArchivo(e:any) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
    obj = new Obj3D();
    if (obj.read(contenido)) {
      //sDir = sDir1;
      cv = new CvHLines(graphics, canvas);
      cv.setObj(obj);
      cv.paint();
    }
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido:any) {
  var elemento = document.getElementById('contenido-archivo');
  //
  //readObject(new Input(contenido));
  elemento.innerHTML = contenido;
}

function vp(dTheta:number, dPhi:number, fRho:number):void{  // Viewpoint
  if (obj != undefined) {
    let obj: Obj3D = cv.getObj();
    if (!obj.vp(cv, dTheta, dPhi, fRho))
      alert('datos no validos');
  }
  else
    alert('aun no has leido un archivo');
}

function eyeDownFunc() {
  vp(0, 0.1, 1);
}

function eyeUpFunc() {
  vp(0, -0.1, 1);
}

function eyeLeftFunc() {
  vp(-0.1, 0, 1);
}

function eyeRightFunc() {
  vp(0.1, 0, 1);
}

function incrDistFunc() {
  vp(0, 0, 2);
}

function decrDistFunc() {
  vp(0, 0, 0.5);
}

function pza2Abrir() {
  let tr = -1.0;
 	
  if(!pza3Open){
    if(!pza2Open){
      for (let i = 191; i <= 216; i++){
        obj.w[i].y = obj.w[i].y + tr;
      }
      cv.setObj(obj);
      cv.paint();
      pza2Open=true;	
    }
  }else{alert('Quita la llave primero');}
}

function pza2Cerrar() {
  let tr = 1.0;
 	
	if(pza2Open){
    for (let i = 191; i <= 216; i++){
      obj.w[i].y = obj.w[i].y + tr;
    }
    cv.setObj(obj);
    cv.paint();
    pza2Open=false;	
  }
  
}

function pza3pLlave() {
  let tr = 0.9;
  let tr2 = 1;
  if(!pza3Open){
    for (let i = 221; i <= 228; i++){
      obj.w[i].y = obj.w[i].y + tr;
    }
    cv.setObj(obj);
    cv.paint();
    pza3Open=true;

    let af = 90;
 	
    Rota3D.initRotate( obj.w[259], obj.w[260], af*Math.PI/180);	
    
    for (let i = 251; i <= 254; i++){
      obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    for (let i = 255; i <= 258; i++){
      obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
  }
  if(pza2Open){
    for (let i = 191; i <= 216; i++){
      obj.w[i].y = obj.w[i].y + tr;
    }
    cv.setObj(obj);
    cv.paint();
    pza2Open=false;	
  }


}

function pza3qLlave() {
  let tr = -0.9;
  if(pza3Open){
    for (let i = 221; i <= 228; i++){
      obj.w[i].y = obj.w[i].y + tr;
    }
    cv.setObj(obj);
    cv.paint();
    pza3Open=false;

    let af = 90;
 	
    //Rota3D.initRotate( obj.w[259], obj.w[260], af*Math.PI/180);	
    
    for (let i = 251; i <= 254; i++){
      obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    for (let i = 255; i <= 258; i++){
      obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
  }
}

function pza4Girar() {
  let af = 90;
 	
	Rota3D.initRotate( obj.w[259], obj.w[260], af*Math.PI/180);	
	
  for (let i = 251; i <= 254; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();
}


document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);


//movimiento de piezas
document.getElementById('pza2Abrir').addEventListener('click', pza2Abrir, false);
document.getElementById('pza2Cerrar').addEventListener('click', pza2Cerrar, false);
document.getElementById('pza3pLlave').addEventListener('click', pza3pLlave, false);
document.getElementById('pza3qLlave').addEventListener('click', pza3qLlave, false);

let Pix: number, Piy: number;
let Pfx: number, Pfy: number;
let theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
let flag: boolean = false;

function handleMouse(evento: any) {
  Pix=evento.offsetX;
  Piy = evento.offsetY;
  flag = true;
}

function makeVizualization(evento: any) {
  if (flag) {
    Pfx = evento.offsetX;
    Pfy = evento.offsetY;
    //console.log(Pfx, Pfy)
    let difX = Pix - Pfx;
    let difY = Pfy - Piy;
    vp(0, 0.1 * difY / 50, 1);
    Piy = Pfy;
    vp(0.1 * difX, 0 / 50, 1);
    Pix = Pfx;
    /*if( Piy>Pfy+1 ){
      phi += SensibilidadY;
      vp(0, 0.1*, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }

    if(Pfy>Piy+1){
      phi -= SensibilidadY;
      vp(0,-0.1, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }*/

    /*if (Pix > Pfx + 1) {
      theta += SensibilidadX;
      vp(0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }
        
    if (Pfx > Pix + 1) {
      theta -= SensibilidadX;
      vp(-0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }*/
  }
}

function noDraw() {
  flag = false;
}

canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);