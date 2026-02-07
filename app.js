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

// Reproductor
const audio = document.getElementById("radio-stream");
const playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", () => {
    audio.play();
});

// VÚMETRO DISCOTECA (FUNCIONA SIEMPRE)
const canvas = document.getElementById("vumeter");
const ctx = canvas.getContext("2d");

let bars = 20;
let barWidth = canvas.width / bars - 2;

function discoVumeter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bars; i++) {
        let barHeight = Math.random() * canvas.height;

        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(i * (barWidth + 2), canvas.height - barHeight, barWidth, barHeight);
    }

    requestAnimationFrame(discoVumeter);
}

discoVumeter();