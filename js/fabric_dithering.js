let gFabricCanvas;

//BEGIN BEELDEN
var listBeginImages = [
  "img/begin_1.jpeg",
  "img/begin_2.jpeg",
  "img/begin_3.jpeg",
  "img/begin_4.jpeg",
  "img/begin_5.jpeg",
  "img/begin_6.jpeg",
  "img/begin_7.jpeg",
  "img/begin_8.jpeg",
  "img/begin_9.jpeg",
  "img/begin_10.jpeg",
  "img/begin_11.jpg",
];
var beginImage = "img/begin_1.jpeg";
var listBeginObjects = [
  "img/object01.png",
  "img/object02.png",
  "img/object05.png",
  "img/object07.png",
  "img/object08.png",
  "img/object09.png",
  "img/object10.png",
  "img/object11.png",
  "img/object12.png",
  "img/object13.png",
  "img/object14.png",
  "img/object15.png",
  "img/object16.png",
  "img/object17.png",
  "img/object18.png",
];
var beginObject = "img/object01.png";

var presentatieImg1 = "img/dokske.jpg";
var presentatieImg2 = "img/fabiola.jpg";
var presentatieImg3 = "img/reading.jpg";
var presentatieImg4 = "img/runninginpark.jpg";
var presentatieImg7 = "img/typo2.jpg";
var presentatieImg8 = "img/bread.jpg";
var presentatieImg9 = "img/eat1.jpg";
var presentatieImg9 = "img/eat2.jpg";
var presentatieImg10 = "img/typo3.jpg";
var presentatieImg11 = "img/ticket.jpg";
var presentatieImg12 = "img/typo5.jpg";
var presentatieImg13 = "img/typo6.jpg";
var presentatieImg14 = "img/cook1.jpg";
var presentatieImg15 = "img/drink1.jpg";
var presentatieImg16 = "img/flora.jpg";
var presentatieImg17 = "img/middelheim.jpg";

//const gCanvas = document.getElementById("dither-canvas");
//const gCtx = gCanvas.getContext("2d");
let gWidth, gHeight, gStride, gSizeInBytes;
let gPlaying = true;
let gSourceEl = document.getElementById("fabric-canvas");

let gDitherBrightness = 127;
let gDitherError = 0.18;
//zoom
const gDitherCanvas = document.createElement("canvas");
//document.body.appendChild(gDitherCanvas);
gDitherCanvas.width = gSourceEl.width;
gDitherCanvas.height = gSourceEl.height;
const gDitherCtx = gDitherCanvas.getContext("2d");

// output canvas
const gOutputCanvas = document.querySelector("#output-canvas");
const gOutputCtx = gOutputCanvas.getContext("2d");

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
    backgroundColor: "rgb(255, 255, 255)",
  });

  var text1 = new fabric.Text("hello, ", {
    left: 50,
    top: 50,
    fontSize: 15,
    fontFamily: "Kosugi",
    underline: true,
  });

  var text2 = new fabric.Text("my name is Cato", {
    left: 50,
    top: 65,
    fontSize: 15,
    fontFamily: "Kosugi",
    underline: true,
  });

  gFabricCanvas.add(text1, text2);

  fabric.Image.fromURL(presentatieImg1, (img) => {
    img.scale(0.1);
    img.set({ left: 50, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg2, (img) => {
    img.scale(0.04);
    img.set({ left: 50, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg3, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg4, (img) => {
    img.scale(0.04);
    img.set({ left: 300, top: 70 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg7, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg8, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg9, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg10, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg11, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg12, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg13, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg14, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg15, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg16, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  fabric.Image.fromURL(presentatieImg17, (img) => {
    img.scale(0.04);
    img.set({ left: 200, top: 85 });
    gFabricCanvas.add(img);
  });

  //UITGEZET VOOR PRESENTATIE 21/09

  //beginObject =
  //listBeginObjects[Math.floor(Math.random() * listBeginObjects.length)];

  //fabric.Image.fromURL(beginObject, (img) => {
  //img.scale(0.2);
  //img.set({ left: 150, top: 500 });
  //gFabricCanvas.add(img);
  //});

  //beginImage =
  //listBeginImages[Math.floor(Math.random() * listBeginImages.length)];

  //fabric.Image.fromURL(beginImage, (img) => {
  //img.scale(0.2);
  //img.set({ left: 100, top: 100 });
  //gFabricCanvas.add(img);
  //});
}

//
function commonInit() {
  gWidth = gSourceEl.width / devicePixelRatio;
  gHeight = gSourceEl.height / devicePixelRatio;
  gStride = gWidth * 4;
  gSizeInBytes = gWidth * gHeight * 4;
  gDitherCanvas.width = gWidth;
  gDitherCanvas.height = gHeight;
}

function jsDither() {
  gDitherCtx.clearRect(0, 0, gWidth, gHeight);
  //X, Y positie dither beeld
  gDitherCtx.drawImage(gSourceEl, 0, 0, gWidth, gHeight);
  const imageData = gDitherCtx.getImageData(0, 0, gWidth, gHeight);
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
      if (bright <= gDitherBrightness) {
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
          bright2 += err * gDitherError;
          // bright2 = clamp(bright2, 0, 255);
          data[pos2 + 0] = bright2;
          data[pos2 + 1] = bright2;
          data[pos2 + 2] = bright2;
        }
      }
    }
  }
  gDitherCtx.putImageData(imageData, 0, 0);
}

//ZOOM-functie
function draw() {
  gOutputCtx.setTransform(1, 0, 0, 1, 0, 0);
  gOutputCtx.clearRect(0, 0, gOutputCanvas.width, gOutputCanvas.height);

  gOutputCtx.save();
  gOutputCtx.translate(gX, gY);
  gOutputCtx.scale(gZoom, gZoom);

  gOutputCtx.imageSmoothingEnabled = false;
  gOutputCtx.drawImage(gDitherCanvas, 0, 0);

  // gOutputCtx.fillStyle = "#f0f";
  // gOutputCtx.fillRect(0, 0, 100, 200);
  // gOutputCtx.fillStyle = "#696";
  // gOutputCtx.fillRect(400 - 20, 300 - 20, 40, 40);

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

const ZOOM_SPEED = 1.1;

function onMouseWheel(e) {
  e.preventDefault();
  let newZoom = e.deltaY > 0 ? gZoom * ZOOM_SPEED : gZoom / ZOOM_SPEED;
  newZoom = clamp(newZoom, 0.1, 1000.0);
  const oldX = (e.offsetX - gX) / gZoom;
  const oldY = (e.offsetY - gY) / gZoom;
  gZoom = newZoom;
  const newX = oldX * gZoom + gX;
  const newY = oldY * gZoom + gY;
  gX += e.offsetX - newX;
  gY += e.offsetY - newY;
  draw();
}

//library
document.querySelectorAll(".library img").forEach((el) => {
  el.addEventListener("click", () => {
    fabric.Image.fromURL(el.src, (img) => {
      img.scale(0.2);
      img.set({ left: 100, top: 100 });
      gFabricCanvas.add(img);
    });
  });
});

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

  if (e.key === "v") {
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

//save as png
function onSave() {
  gOutputCanvas.toBlob((blob) => {
    const timestamp = Date.now().toString();
    const a = document.createElement("a");
    document.body.append(a);
    a.download = `export-${timestamp}.png`;
    a.href = URL.createObjectURL(blob);
    a.click();
    a.remove();
  });
}

//upload image
const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("upload");

customBtn.addEventListener("click", function () {
  realFileBtn.click();
});

realFileBtn.addEventListener("change", (e) => {
  console.log(e.target.files);

  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  fabric.Image.fromURL(url, (img) => {
    img.scale(0.2);
    img.set({ left: 100, top: 100 });
    gFabricCanvas.add(img);
  });
});

//HOW DOES THIS WORK BTN_____OVERLAY
/* Open */
function openNav() {
  // document.getElementById("myNav").style.width = "100%";
  document.getElementById("myNav").style.display = "block";
  //document.getElementById("myNav").style.visibility = "visible";
}
/* Close */
function closeNav() {
  // document.getElementById("myNav").style.width = "0%";
  document.getElementById("myNav").style.display = "none";
  //document.getElementById("myNav").style.visibility = "hidden";
}

//

function resetZoom() {
  gZoom = 1;
  gX = 0;
  gY = 0;
}

gOutputCanvas.addEventListener("mousedown", onMouseDown);
gOutputCanvas.addEventListener("wheel", onMouseWheel);
gOutputCanvas.addEventListener("dblclick", resetZoom);
document.querySelector("#save").addEventListener("click", onSave);

//SLIDERS

document.querySelector("#slider-brightness").addEventListener("input", (e) => {
  gDitherBrightness = parseInt(e.target.value);
});

document.querySelector("#slider-error").addEventListener("input", (e) => {
  gDitherError = parseInt(e.target.value) / 100;
});

//resize canvas
// var gDitherCanvas = document.getElementsByTagName("dither-canvas")[0];
// gDitherCanvas.setWidth(100);
// gDitherCanvas.setHeight(100);

// gDitherCanvas.calcOffset();

function animate() {
  jsDither();
  draw();
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
