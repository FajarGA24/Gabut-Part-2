const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const lyricsBox = document.getElementById("lyrics");

// floating hearts bucin
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["❤️","💗","💞","💖"][Math.floor(Math.random()*4)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 12 + Math.random() * 20 + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 800);

// Lirik + durasi tampil berbeda (ms)
const lyrics = [
  { time: 0.0, text: "Jadi waktu itu panas", duration: 3500 },
  { time: 3.5, text: "Kuberi kau angin", duration: 3000 },
  { time: 6.5, text: "Walaupun ku juga gerah", duration: 2200 },
  { time: 8.7, text: "Tapi ku... penuh saat kau teduh", duration: 3000 },
  { time: 11.7, text: "Sudah paham... 'kan sejauh ini?", duration: 6000 },
  { time: 19.7, text: "Ku yang lama di sini...", duration: 2000 },
  { time: 21.7, text: "Menjagamu tak patah hati", duration: 4000 },
  { time: 25.7, text: "Sedia aku sebelum hujan", duration: 3000 },
  { time: 28.7, text: "Apa yang kau butuh, kuberikan", duration: 3500 }
];

// render lirik
lyrics.forEach(l => {
  const div = document.createElement("div");
  div.className = "line";
  div.textContent = l.text;
  lyricsBox.appendChild(div);
});
const lines = document.querySelectorAll(".line");

let isPlaying = false;
let isFinished = false;

// play/pause toggle
playBtn.addEventListener("click", () => {
  if (isFinished) {
    // replay dari awal
    audio.currentTime = 0;
    audio.play();
    playBtn.textContent = "⏸ PAUSE";
    isPlaying = true;
    isFinished = false;
    startLyrics();
  } else if (!isPlaying) {
    audio.play();
    playBtn.textContent = "⏸ PAUSE";
    isPlaying = true;
    startLyrics();
  } else {
    audio.pause();
    playBtn.textContent = "▶ PLAY";
    isPlaying = false;
  }
});

function startLyrics() {
  clearInterval(window.lyricInterval);

  window.lyricInterval = setInterval(() => {
    const t = audio.currentTime;
    lines.forEach(l => l.classList.remove("active"));

    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (t >= lyrics[i].time && t < lyrics[i].time + lyrics[i].duration / 1000) {
        lines[i].classList.add("active");
        break;
      }
    }

    // Jika lirik terakhir sudah habis, stop musik otomatis & ubah tombol jadi REPLAY
    const lastLyric = lyrics[lyrics.length - 1];
    if (t >= lastLyric.time + lastLyric.duration / 1000) {
      audio.pause();
      playBtn.textContent = "🔁 REPLAY";
      isPlaying = false;
      isFinished = true;
      clearInterval(window.lyricInterval);
    }

  }, 50);
}