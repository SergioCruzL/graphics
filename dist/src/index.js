//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
var canvas;
var graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
var cv;
var obj;
var ang = 0;
var pza2Open = false;
var pza3Open = false;
function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
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
function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    //
    //readObject(new Input(contenido));
    elemento.innerHTML = contenido;
}
function vp(dTheta, dPhi, fRho) {
    if (obj != undefined) {
        var obj_1 = cv.getObj();
        if (!obj_1.vp(cv, dTheta, dPhi, fRho))
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
    var tr = -1.0;
    if (!pza3Open) {
        if (!pza2Open) {
            for (var i = 191; i <= 216; i++) {
                obj.w[i].y = obj.w[i].y + tr;
            }
            cv.setObj(obj);
            cv.paint();
            pza2Open = true;
        }
    }
    else {
        alert('Quita la llave primero');
    }
}
function pza2Cerrar() {
    var tr = 1.0;
    if (pza2Open) {
        for (var i = 191; i <= 216; i++) {
            obj.w[i].y = obj.w[i].y + tr;
        }
        cv.setObj(obj);
        cv.paint();
        pza2Open = false;
    }
}
function pza3pLlave() {
    var tr = 0.9;
    var tr2 = 1;
    if (!pza3Open) {
        for (var i = 221; i <= 228; i++) {
            obj.w[i].y = obj.w[i].y + tr;
        }
        cv.setObj(obj);
        cv.paint();
        pza3Open = true;
        var af = 90;
        Rota3D.initRotate(obj.w[259], obj.w[260], af * Math.PI / 180);
        for (var i = 251; i <= 254; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        for (var i = 255; i <= 258; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        cv.setObj(obj);
        cv.paint();
    }
    if (pza2Open) {
        for (var i = 191; i <= 216; i++) {
            obj.w[i].y = obj.w[i].y + tr;
        }
        cv.setObj(obj);
        cv.paint();
        pza2Open = false;
    }
}
function pza3qLlave() {
    var tr = -0.9;
    if (pza3Open) {
        for (var i = 221; i <= 228; i++) {
            obj.w[i].y = obj.w[i].y + tr;
        }
        cv.setObj(obj);
        cv.paint();
        pza3Open = false;
        var af = 90;
        //Rota3D.initRotate( obj.w[259], obj.w[260], af*Math.PI/180);	
        for (var i = 251; i <= 254; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        for (var i = 255; i <= 258; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        cv.setObj(obj);
        cv.paint();
    }
}
function pza4Girar() {
    var af = 90;
    Rota3D.initRotate(obj.w[259], obj.w[260], af * Math.PI / 180);
    for (var i = 251; i <= 254; i++) {
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
var Pix, Piy;
var Pfx, Pfy;
var theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
var flag = false;
function handleMouse(evento) {
    Pix = evento.offsetX;
    Piy = evento.offsetY;
    flag = true;
}
function makeVizualization(evento) {
    if (flag) {
        Pfx = evento.offsetX;
        Pfy = evento.offsetY;
        //console.log(Pfx, Pfy)
        var difX = Pix - Pfx;
        var difY = Pfy - Piy;
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
