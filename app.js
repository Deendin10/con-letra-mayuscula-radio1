// Reloj en vivo
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Cargar podcasts
fetch("podcasts.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("podcast-list");

    data.episodios.forEach(ep => {
      const card = document.createElement("div");
      card.className = "podcast-card";

      card.innerHTML = `
        <h3>${ep.titulo}</h3>
        <audio controls src="${ep.url}"></audio>
      `;

      container.appendChild(card);
    });
  });
const audio = document.getElementById("radio-stream");
const playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", () => {
    audio.play();
});
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = document.getElementById("radio-stream");
const track = audioCtx.createMediaElementSource(audioElement);

const analyser = audioCtx.createAnalyser();
analyser.fftSize = 64;

track.connect(analyser);
analyser.connect(audioCtx.destination);

const canvas = document.getElementById("vumeter");
const ctx = canvas.getContext("2d");

function drawVumeter() {
    requestAnimationFrame(drawVumeter);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 1.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;

        // Colores tipo LED
        const r = barHeight + 50;
        const g = 255 - barHeight;
        const b = 50;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

drawVumeter();
const canvas = document.getElementById("vumeter");
const ctx = canvas.getContext("2d");

let bars = 20; // número de barras
let barWidth = canvas.width / bars - 2;

function discoVumeter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bars; i++) {
        // Altura aleatoria para efecto discoteca
        let barHeight = Math.random() * canvas.height;

        // Colores tipo discoteca
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(i * (barWidth + 2), canvas.height - barHeight, barWidth, barHeight);
    }

    requestAnimationFrame(discoVumeter);
}

discoVumeter();