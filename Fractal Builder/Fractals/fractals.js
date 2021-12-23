var slider_r = document.getElementById("range_r");
var output_r = document.getElementById("value_r");
var slider_g = document.getElementById("range_g");
var output_g = document.getElementById("value_g");
var slider_b = document.getElementById("range_b");
var output_b = document.getElementById("value_b");
var pixelCol = document.getElementById("pixel");
output_r.innerHTML = slider_r.value;
output_g.innerHTML = slider_g.value;
output_b.innerHTML = slider_b.value;

pixel.style.backgroundColor = "rgb(243,145,60)";

slider_r.oninput = function() {
  output_r.innerHTML = this.value;
  pixel.style.backgroundColor = getRandomColor();
}
slider_g.oninput = function() {
  output_g.innerHTML = this.value;
  pixel.style.backgroundColor = getRandomColor();
}
slider_b.oninput = function() {
  output_b.innerHTML = this.value;
  pixel.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
  var color = [];
  color.push(slider_r.value);
  color.push(slider_g.value);
  color.push(slider_b.value);
  return 'rgb('+color.join(', ')+')';
}

const build = document.getElementById('build');
const iter = document.getElementById('iter');
const inputX = document.getElementById('coorX');
const inputY = document.getElementById('coorY');
const inputStyle = document.getElementById('lineStyle');
const inputFractalType = document.getElementById('fractalType');
const confStyleAndColor = document.getElementById('confSAC');
const download = document.getElementById('downloadBtn');
const style = document.getElementById('canvasStyle');

let depth = 1;
let biasX = 0;
let biasY = 0;
let lineStyle = 'solid';
let fractalType = 'tFractal';

const canvas = document.getElementById("c");
const context = c.getContext("2d");
context.strokeStyle = getRandomColor();


//H-Fractal
//============================================================================
let count = 0;

let center = {
  x: canvas.width / 2.0,
  y: canvas.height / 2.0
}

function setX() {
  if(inputX.value >= 0) {
    center.x = Number(inputX.value);
  }else {
    alert("The minimum value of the coordinates of the center (0,0)!");
  }
}
function setY() {
  if(inputY.value >= 0) {
    center.y = Number(inputY.value);
  }else {
    alert("The minimum value of the coordinates of the center (0,0)!");
  }
}

function setFractalType(){
  fractalType = inputFractalType.value;
  if(fractalType === 'tFractal') {
    context.fillStyle = getRandomColor();
    context.fillRect(0,0,680,680);
    paintTFractal();
  }
  if(fractalType === 'fFractal') paintHFractal();

}

const sqrt2 = Math.sqrt(2)
const len = canvas.width / 2.0
let counter = 0;

const hTree = (point, len, depth) => {

  if (depth === 0) {
    return
  }

  const h1 = { x: point.x - len / 2.0, y: point.y }
  const h2 = { x: point.x + len / 2.0, y: point.y }
  drawLine(h1, h2)


if(counter === 0){
  counter++;

  const v1 = { x: h1.x, y: h1.y - len / 2.0 }
  const v2 = { x: h1.x, y: h1.y + len / 2.0 }
  drawLine(v1, v2)

  const v3 = { x: h2.x, y: h2.y - len / 2.0 }
  const v4 = { x: h2.x, y: h2.y + len / 2.0 }
  drawLine(v3, v4)

  depth--
  len = len / 2.0

  hTree(v1, len, depth)
  hTree(v2, len, depth)
  hTree(v3, len, depth)
  hTree(v4, len, depth)
}else {

  const v1 = { x: h1.x, y: h1.y - len / 2.0 }
  const v2 = { x: h1.x, y: h1.y + len / 2.0 }
  drawLine(v1, v2)

  const v3 = { x: h2.x, y: h2.y - len / 2.0 }
  const v4 = { x: h2.x, y: h2.y + len / 2.0 }
  drawLine(v3, v4)

  depth--
  len = len / 2.0

  hTree(v1, len, depth)
  hTree(v2, len, depth)
  hTree(v3, len, depth)
  hTree(v4, len, depth)
}
}

const drawLine = (from, to) => {
  context.beginPath()
  context.moveTo(from.x, from.y)
  context.lineTo(to.x, to.y)
  context.stroke()
}

const paintHFractal = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  hTree(center, len, depth)
}
build.addEventListener("click", ()=>{
  if(fractalType === 'fFractal'){
  if(iter.value < 10) {
    depth = iter.value;
  }else {
    alert("The maximum number of iterations should not exceed 9!");
  }}
  lineStyle = inputStyle.value;
  if(lineStyle === 'dashed')
  {
    context.setLineDash([20,15]);
  } else {
    context.setLineDash([]);
  }
  context.strokeStyle = getRandomColor();
  style.style.backgroundColor = "#fff";

  if(fractalType === 'fFractal') paintHFractal();
})


//T-Fractal
//============================================================================

const tSquare = (ctx, point, side, depth) => {
    if (depth === 0) {
      return;
    }

    const newSide = side / 2.0;

    const a1 = { x: point.x - side / 2.0, y: point.y - side / 2.0 };
    const a2 = { x: point.x - side / 2.0, y: point.y + side / 2.0 };
    const a3 = { x: point.x + side / 2.0, y: point.y + side / 2.0 }
    const a4 = { x: point.x + side / 2.0, y: point.y - side / 2.0 };

    ctx.fillStyle = "black";
    ctx.fillRect(a1.x, a1.y, side, side);

    depth--;

    tSquare(ctx, a1, newSide, depth);
    tSquare(ctx, a2, newSide, depth);
    tSquare(ctx, a3, newSide, depth);
    tSquare(ctx, a4, newSide, depth);
  };

const paintTFractal = () => {
  tSquare(context, center, len, depth)
}

build.addEventListener("click", ()=>{
  if(fractalType === 'tFractal'){
  if(iter.value < 10) {
    depth = iter.value;
  }else {
    alert("The maximum number of iterations should not exceed 9!");
  }}
  lineStyle = inputStyle.value;
  if(lineStyle === 'dashed')
  {
    context.setLineDash([5,15]);
  } else {
    context.setLineDash([]);
  }
  if(fractalType === 'tFractal') {
      context.fillStyle = getRandomColor();
      context.fillRect(0,0,680,680);
      paintTFractal();
  }
});
context.fillStyle = getRandomColor();
context.fillRect(0,0,680,680);
paintTFractal();

//Save image
//============================================================================
function saveImage(image) {
    var link = document.createElement("a");

    link.setAttribute("href", image.src);
    link.setAttribute("download", "Fractal");
    link.click();
}

download.addEventListener("click", ()=>{
var image = ReImg.fromCanvas(document.getElementById('c')).toPng();
saveImage(image);
})

context.renderAll();
alert(context.getZoom());
context.setZoom(context.getZoom()*2);
context.renderAll();
alert(context.getZoom());
