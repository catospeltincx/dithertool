let gFabricCanvas;
//const gCanvas = document.getElementById("dither-canvas");
//const gCtx = gCanvas.getContext("2d");
let gWidth, gHeight, gStride, gSizeInBytes;
let gPlaying = true;
let gSourceEl = document.getElementById("fabric-canvas");

//zoom
const gDitherCanvas = document.querySelector("#dither-canvas");
const gCtx = gDitherCanvas.getContext("2d");
let gZoom = 1;
let gX = 0;
let gY = 0;

//kleur -> zwart/wit maken
function brightness(r, g, b) {
  let cmax = r > g ? r : g;
  if (b > cmax) cmax = b;
  return cmax;
}

function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

const OFFSETS = [
  [1, 0],
  [2, 0],
  //grijze schijn
  //[-1, 1],
  [0, 1],
  [1, 1],
  [0, 2],
];

function fabricInit() {
  gFabricCanvas = new fabric.Canvas("fabric-canvas", {
    width: 400,
  });

  // create a rectangle object
  // var rect = new fabric.Rect({
  //   left: 100,
  //   top: 100,
  //   fill: "#666666",
  //   width: 20,
  //   height: 100,
  // });
  // gFabricCanvas.add(rect);

  // create a circle
  var circle = new fabric.Circle({
    radius: 50,
    fill: "#333333",
    left: 50,
    top: 50,
  });

  circle.setGradient("fill", {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: circle.height,
    colorStops: {
      0: "#c7c7c7",
      0.2: "#545454",
      0.4: "#e0e0e0",
      0.6: "#b0b0b0",
      0.8: "#474747",
      1: "#999999",
    },
  });

  gFabricCanvas.add(circle);

  //test:groen-rode-kader-hendels
  // gFabricCanvas.item(0).set({
  //   borderColor: "red",
  //   cornerColor: "green",
  //   cornerSize: 6,
  //   transparentCorners: false,
  // });

  // gFabricCanvas.setActiveObject(gFabricCanvas.item(0));

  // gradients

  //afbeelding
  // fabric.Image.fromURL("img/russian-blue-sunglasses.jpg", function (oImg) {
  //   oImg.scale(0.5);
  //   gFabricCanvas.add(oImg);
  // });

  //test: text with background
  //   var text = "merci\nbedankt\nthankyou";
  //   var textWithBackground = new fabric.Text(text, {
  //     left: 100,
  //     top: 100,
  //     fontFamily: "Kosugi",
  //     fontSize: 17,
  //     textBackgroundColor: "rgb(0,205,0)",
  //     stroke: "rgb(205, 0, 0)",
  //     strokeWidth: 0.5,
  //   });
  //   // gFabricCanvas.add(text);
  //   gFabricCanvas.add(textWithBackground);
}

//
function commonInit() {
  gWidth = gSourceEl.width;
  gHeight = gSourceEl.height;
  gStride = gWidth * 4;
  gSizeInBytes = gWidth * gHeight * 4;
  gDitherCanvas.width = gWidth;
  gDitherCanvas.height = gHeight;
}

function jsDither() {
  gCtx.clearRect(0, 0, gWidth, gHeight);
  //X, Y positie dither beeld
  gCtx.drawImage(gSourceEl, 0, 0);
  const imageData = gCtx.getImageData(0, 0, gWidth, gHeight);
  const { data } = imageData;
  for (let x = 0; x < gWidth; x++) {
    for (let y = 0; y < gHeight; y++) {
      //strepen, in helft .... iets geflipt
      const pos = y * gStride + x * 4;
      //verandering in patroon?
      const r = data[pos];
      const g = data[pos + 1];
      const b = data[pos + 2];
      const bright = brightness(r, g, b);
      let err;
      //brightness, standaar op 127= 255/2 -> zwart = wit
      if (bright <= 127) {
        //dikke vlakken: één lijn code weg = kleur, alles weg = grijs
        data[pos + 0] = 0x00;
        data[pos + 1] = 0x00;
        data[pos + 2] = 0x00;
        err = bright;
      } else {
        //dunne lijntjes, puntjes
        data[pos + 0] = 0xff;
        data[pos + 1] = 0xff;
        data[pos + 2] = 0xff;
        //brightness: veranderingen in patroon
        err = bright - 220;
      }
      for (const [dx, dy] of OFFSETS) {
        const x2 = x + dx;
        const y2 = y + dy;
        if (x2 < gWidth && y2 < gHeight) {
          //iets geflipt
          const pos2 = y2 * gStride + x2 * 4;
          const r2 = data[pos2];
          const g2 = data[pos2 + 1];
          const b2 = data[pos2 + 2];

          let bright2 = brightness(r2, g2, b2);
          //up = more noise
          bright2 += err * 0.18;
          // bright2 = clamp(bright2, 0, 255);
          data[pos2 + 0] = bright2;
          data[pos2 + 1] = bright2;
          data[pos2 + 2] = bright2;
        }
      }
    }
  }
  gCtx.putImageData(imageData, 0, 0);
}

//ZOOM-functie
function draw() {
  gCtx.setTransform(1, 0, 0, 1, 0, 0);
  gCtx.clearRect(0, 0, gDitherCanvas.width, gDitherCanvas.height);

  gCtx.save();
  // s
  gCtx.translate(gX, gY);
  gCtx.scale(gZoom, gZoom);
  gCtx.fillStyle = "#ff9";
  gCtx.fillRect(0, 0, 800, 600);
  gCtx.fillStyle = "#696";
  gCtx.fillRect(400 - 20, 300 - 20, 40, 40);

  //gCtx.restore();
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

const ZOOM_SPEED = 1.02;

function onMouseWheel(e) {
  e.preventDefault();
  let newZoom = e.deltaY > 0 ? gZoom * ZOOM_SPEED : gZoom / ZOOM_SPEED;
  //let newZoom = gZoom - e.deltaY * 0.005;
  newZoom = clamp(newZoom, 0.1, 100.0);
  const zoomDelta = gZoom - newZoom;
  console.log(zoomDelta);
  const halfWidth = gDitherCanvas.width / 2;
  const halfHeight = gDitherCanvas.height / 2;
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
gDitherCanvas.addEventListener("mousedown", onMouseDown);
gDitherCanvas.addEventListener("wheel", onMouseWheel);

//"remove image"-key
window.addEventListener("keydown", (e) => {
  // console.log(e);
  if (e.key === "Delete" || e.key === "Backspace") {
    gFabricCanvas.remove(gFabricCanvas.getActiveObject());
  }

  //"copy and paste"-key
  if (e.key === "c") {
    console.log(e);
    gFabricCanvas.getActiveObject().clone(function (cloned) {
      _clipboard = cloned;
    });
  }

  if (e.key === "p") {
    console.log(e);
    _clipboard.clone(function (clonedObj) {
      gFabricCanvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });
      if (clonedObj.type === "activeSelection") {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = canvas;
        clonedObj.forEachObject(function (obj) {
          gFabricCanvas.add(obj);
        });
        // this should solve the unselectability
        clonedObj.setCoords();
      } else {
        gFabricCanvas.add(clonedObj);
      }
      _clipboard.top += 10;
      _clipboard.left += 10;
      gFabricCanvas.setActiveObject(clonedObj);
      // gFabricCanvas.requestRenderAll();
    });
  }
});

function animate() {
  jsDither();
  if (gPlaying) {
    requestAnimationFrame(animate);
  }
}

async function main() {
  fabricInit();
  commonInit();
  animate();
}

main();
