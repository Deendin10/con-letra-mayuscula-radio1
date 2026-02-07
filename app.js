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