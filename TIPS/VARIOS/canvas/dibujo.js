// var d = document.getElementById("dibujito");
// // El papel seria el lienzo.
// var lienzo = d.getContext("2d");



// dibujarLine("red", 10, 300, 220, 10);
// dibujarLine("black", 300, 10, 10, 220);

// console.log(lienzo);

// function dibujarLine(color, xinicial, yinicial, xfinal, yfinal)
// {
//     //poner el lapiz sobre el papel. 
//     lienzo.beginPath();
//     // Color de la linea
//     lienzo.strokeStyle = color;
//     // Metodo para mover el lapiz 
//     lienzo.moveTo(xinicial, yinicial);
//     lienzo.lineTo(xfinal, yfinal);
//     // dibuja la line
//     lienzo.stroke();
//     //Levantamos el lapiz
//     lienzo.closePath();

// }

// var d = document.getElementById('dibujito');
// var lienzo = d.getContext("2d");
// var x0 =   0, y0 =   0;
// var lineas = parseInt(prompt("Cuantas líneas deseas dibujar?"));
// var colorcito = prompt("Que color deseas para las líneas? (En inglés, please)");
// var l = 0;

// for (var  l= 0; l <= lineas; l++)
// {
//     dibujarLinea(colorcito, 0, x0, y0, 300);
//     dibujarLinea(colorcito, x0, 300, 300, 300 - y0);
//     dibujarLinea(colorcito, 300, 300 - x0, 300 - y0, 0);
//     dibujarLinea(colorcito, 300 - x0, 0, 0, y0);
//     x0 = x0 + 10;
//     y0 = x0 + 10;
// }

// function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal)
// {
//     lienzo.beginPath();
//     lienzo.strokeStyle = color;
//     lienzo.moveTo(xinicial,yinicial);
//     lienzo.lineTo(xfinal,yfinal);
//     lienzo.stroke();
//     lienzo.closePath();
// }

var canvas = document.getElementById("dibujito");
var ctx = canvas.getContext("2d");
var cw = canvas.width = 300,
  cx = cw / 2;
var ch = canvas.height = 300,
  cy = ch / 2;

var dibujar = false;
ctx.lineJoin = "round";

canvas.addEventListener('mousedown', function(evt) {
  dibujar = true;

  
  //ctx.clearRect(0, 0, cw, ch);
  ctx.beginPath();

}, false);

canvas.addEventListener('mouseup', function(evt) {
  dibujar = false;

}, false);

canvas.addEventListener("mouseout", function(evt) {
  dibujar = false;
}, false);

canvas.addEventListener("mousemove", function(evt) {
  if (dibujar) {
    console.log(evt);
    var m = oMousePos(canvas, evt);
    //ctx.arc(m.x, m.y);
    ctx.lineTo(m.x, m.y);
    ctx.stroke();
  }
}, false);

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}