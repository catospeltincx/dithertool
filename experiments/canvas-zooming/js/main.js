const gCanvas = document.querySelector("#c");
const gCtx = gCanvas.getContext("2d");
let gZoom = 1;
let gX = 0;
let gY = 0;

function clamp(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}

function draw() {
  gCtx.setTransform(1, 0, 0, 1, 0, 0);
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

  gCtx.save();
  // gCtx.translate(gCanvas.width / 2, gCanvas.height / 2);
  // gCtx.setTransform(gZoom, 0, 0, gZoom, gX, gY);
  gCtx.translate(gX, gY);
  gCtx.scale(gZoom, gZoom);
  gCtx.fillStyle = "#ff9";
  gCtx.fillRect(0, 0, 800, 600);
  gCtx.fillStyle = "#696";
  gCtx.fillRect(400 - 20, 300 - 20, 40, 40);

  gCtx.restore();
}

function onMouseDown(e) {
  e.preventDefault();
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e) {
  e.preventDefault();
  gX += e.movementX;
  gY += e.movementY;
  draw();
}

function onMouseUp(e) {
  e.preventDefault();
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
}

const ZOOM_SPEED = 1.2;

function onMouseWheel(e) {
  e.preventDefault();
  let newZoom = e.deltaY > 0 ? gZoom * ZOOM_SPEED : gZoom / ZOOM_SPEED;
  //let newZoom = gZoom - e.deltaY * 0.005;
  newZoom = clamp(newZoom, 0.1, 8.0);
  const zoomDelta = gZoom - newZoom;
  console.log(zoomDelta);
  const halfWidth = gCanvas.width / 2;
  const halfHeight = gCanvas.height / 2;
  const k = newZoom / gZoom;
  // gX = halfWidth - k * (halfWidth - gX);
  // gY = halfHeight - k * (halfHeight - gY);
  // gX = 0 - k * (0 - gX);
  // gY = (0 - k) * (0 - gY);
  //gX -= e.offsetX * (zoomDelta - 1);
  //gY -= e.offsetY * (zoomDelta - 1);
  // gX = gCanvas.width - k * (gCanvas.width - gX);
  // gY = gCanvas.height - k * (gCanvas.height - gY);
  // gX += halfWidth - e.offsetX * k;
  // gY += halfHeight - e.offsetY * k;
  //gY += k;
  // gY = gY - k * gCanvas.height;
  // gX -= e.offsetX - halfWidth;
  // gY -= e.offsetX - halfWidth;
  // halfWidth / zoom;
  // const dx = -e.offsetX; // - gCanvas.width; // - halfWidth;
  // const dy = -e.offsetY; // - gCanvas.height; // - halfHeight;
  const dx = e.offsetX - halfWidth;
  const dy = e.offsetY - halfHeight;
  // gX = gX - dx / newZoom + dx / gZoom;
  // gY = gY - dy / newZoom + dy / gZoom;
  // gX += e.offsetX * zoomDelta;
  // gY += e.offsetY * zoomDelta;
  // gX = -(e.offsetX * newZoom - halfWidth);
  // gY = -(e.offsetY * newZoom - halfHeight);
  gZoom = newZoom;
  console.log(gX, gY, gZoom, k);
  draw();
}

draw();
gCanvas.addEventListener("mousedown", onMouseDown);
gCanvas.addEventListener("wheel", onMouseWheel);
