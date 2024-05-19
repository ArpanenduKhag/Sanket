const modelURL =
  "https://teachablemachine.withgoogle.com/models/riOJKjJZ1/model.json";
const metadataURL =
  "https://teachablemachine.withgoogle.com/models/riOJKjJZ1/metadata.json";

let gttsBtn = document.getElementById("gtts-btn");
let cameraBtn = document.getElementById("camera-btn");
let uploadBtn = document.querySelector("#upload-btn");
let textArea = document.querySelector("#textarea");
let backBtn = document.querySelector("#back-btn");
let line = document.createElement("p");

line.className = "line";
line.id = "last-line";
line.innerHTML = `Ready to roll !`;
textArea.appendChild(line);
line.scrollIntoView({
  behavior: "smooth",
  block: "end",
  inline: "nearest",
});

// back btn
backBtn.addEventListener("click", function () {
  window.location = "/";
});

let webcamON = false;

//open github repo
document.querySelector("#webcam-banner").addEventListener("click", function () {
  window.open("https://github.com/VedaByte/Sanket/", "_blank");
});

// test function
async function addTestLines(totalLines) {
  for (let i = 1; i < totalLines + 1; i++) {
    let line = document.createElement("p");
    line.className = "line";
    line.innerHTML = `Hello`;
    textArea.appendChild(line);
    line.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
}
// addTestLines(10);

// adds new line in transcript box
async function addNewTranslateLine(text) {
  let lastLine = textArea.lastElementChild;
  try {
    document.querySelector("#last-line").id = "";
  } catch (err) {
    console.log(err);
  }

  let newLine = document.createElement("p");
  newLine.innerHTML = text;
  newLine.className = "line";
  newLine.id = "last-line";
  textArea.appendChild(newLine);
  newLine.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

// start sign prediction
cameraBtn.addEventListener("click", function () {
  // Redirect to the specified URL
  window.location.href = "http://localhost:3000";
});

// text to speech btn colour change
gttsBtn.addEventListener("click", function () {
  if (gttsBtn.style.backgroundColor === "rgb(212, 236, 126)") {
    gttsBtn.style.background = "#EAF1C5"; // deactivate btn
  } else {
    gttsBtn.style.background = "#62E6BF";
  }
});

let file;

async function predictImage(file) {
  const model = await tmImage.load(modelURL, metadataURL);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const imageElement = document.createElement("img");
    imageElement.src = reader.result;
    const prediction = await model.predict(imageElement);
    addNewTranslateLine(prediction.map((p) => p.className).join(", "));
    console.log(prediction);
  };
}

//upload img
uploadBtn.addEventListener("click", function () {
  uploadBtn.style.background = "#62E6BF";
  uploadBtn.style.background = "";
  const fileInput = document.querySelector("#file-input");
  fileInput.click();
  fileInput.addEventListener("change", async (event) => {
    file = event.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
    predictImage(file);
  });
});

//text to speech
async function tts(text) {
  if ("speechSynthesis" in window) {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  } else {
    alert("Text to speech not available 😞");
    location.reload();
  }
}

// delay function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Define the spamFilter variable
let spamFilter = ["class1", "class2", "class3"]; // Replace with your actual class names
let index = 0;

// tensorflow.js magic
let model, webcam, labelContainer, maxPredictions;
async function init() {
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip 180
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  document.querySelector(".webcam-view").appendChild(webcam.canvas).className =
    "canvas";
  labelContainer = document.getElementById("last-line");
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    if (prediction[i].probability.toFixed(2) == 1.0) {
      if (prediction[i].className == spamFilter[index]) {
        index += 1;
        if (index == spamFilter.length) {
          index = 0;
        }
        if (
          document.querySelector("#last-line").innerHTML !=
          prediction[i].className
        ) {
          await addNewTranslateLine(prediction[i].className);
          if (gttsBtn.style.backgroundColor === "rgb(212, 236, 126)") {
            await tts(prediction[i].className);
          }
        }
      }
    }
  }
}
