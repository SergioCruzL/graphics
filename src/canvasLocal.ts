
export class CanvasLocal {
  //atributos
  graphics: CanvasRenderingContext2D;
   rWidth:number;
   rHeight:number;
  maxX: number;
  maxY: number;
  pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  
      
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    this.graphics = g;
    this.rWidth = 18;
    this.rHeight= 8;
    this.maxX = canvas.width - 1
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX/2;
    this.centerY = this.maxY/2;
  }

  iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
  iY(y: number): number{ return Math.round(this.centerY - y / this.pixelSize); }
  
  drawLine(x1: number, y1: number, x2: number, y2:number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }

  fx(x:number):number {
    return Math.sin(x*2.5);
  }


  paint() {
    //dibuja la cuadricula
    this.graphics.clearRect(0,0,this.maxX+1,this.maxY+1);
    this.graphics.strokeStyle = 'lightgray';
    this.graphics.fillStyle = 'black';
    for (let x = -(this.rWidth/2); x <= this.rWidth/2; x+=0.2){
      this.drawLine(this.iX(x), this.iY(-(this.rHeight/2)), this.iX(x), this.iY(this.rHeight/2));
    }
    for (let y = -(this.rHeight/2); y <= this.rHeight/2; y+=0.2){
      this.drawLine(this.iX(-(this.rWidth/2)), this.iY(y), this.iX(this.rWidth/2), this.iY(y));
    }
    //dibuja las divisiones
    this.graphics.strokeStyle = 'gray';
    for (let x = -(this.rWidth/2); x <= this.rWidth/2; x++){
      this.drawLine(this.iX(x), this.iY(-(this.rHeight/2)), this.iX(x), this.iY(this.rHeight/2));
      this.graphics.fillText(x+"", this.iX(x-0.1), this.iY(-0.3));
    }
    for (let y = -(this.rHeight/2); y <= this.rHeight/2; y++){
      this.drawLine(this.iX(-(this.rWidth/2)), this.iY(y), this.iX(this.rWidth/2), this.iY(y));
      if(y!=0){
        this.graphics.fillText(y+"", this.iX(-0.2), this.iY(y-0.1));
      }
    }
    this.graphics.fillText("X", this.iX((this.rWidth/2)-0.3), this.iY(0.2));
    this.graphics.fillText("Y", this.iX(0.2), this.iY((this.rHeight/2)-0.2));
    //dibujar la funcion
    this.graphics.strokeStyle = 'red';
    let paso: number = 0.1;
    for (let x = -(this.rWidth/2); x <= this.rWidth/2; x+=paso){
      this.drawLine(this.iX(x), this.iY(this.fx(x)), this.iX(x+paso), this.iY(this.fx(x+paso)));
    }
    this.graphics.strokeStyle = 'black';
    this.drawLine(this.iX(-this.rWidth/2), this.iY(0), this.iX(this.rWidth/2), this.iY(0));
    this.drawLine(this.iX(0), this.iY(this.rHeight/2), this.iX(0), this.iY(-this.rHeight/2));
  }

}