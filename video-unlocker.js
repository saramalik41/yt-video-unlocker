
// video-unlocker.js
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".video-widget");
  const videoId = wrapper.getAttribute("data-video");
  const downloadLink = wrapper.getAttribute("data-download");

  wrapper.innerHTML = `
    <div style="border: 3px dashed #007bff; border-radius: 10px; padding: 20px; background: white; max-width: 700px; margin: auto; text-align: center; font-family: Tahoma, sans-serif;">
      <h2>ویڈیو دیکھیں اور فائل ڈاؤنلوڈ کریں</h2>
      <div style="background:#e0f7fa;border:1px solid #00acc1;padding:10px;margin-bottom:10px;font-weight:bold;color:#00796b;">
        📢 براہ کرم چینل کو سبسکرائب کریں تاکہ لنک حاصل ہو
      </div>
      <div id="timer" style="font-size:24px;color:#ff5722;margin-bottom:10px;">3:00</div>
      <button id="startBtn" style="padding:12px 24px;font-size:18px;border:none;border-radius:6px;cursor:pointer;background-color:#007bff;color:white;">▶️ ویڈیو چلائیں</button>
      <div id="videoContainer" style="display:none;margin-top:10px;">
        <iframe id="ytVideo" width="100%" height="315" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      <button id="downloadBtn" style="display:none;padding:12px 24px;font-size:18px;border:none;border-radius:6px;cursor:pointer;background-color:#28a745;color:white;margin-top:20px;">⬇️ فائل ڈاؤنلوڈ کریں</button>
      <audio id="startAudio" src="start.mp3"></audio>
      <audio id="endAudio" src="end.mp3"></audio>
    </div>
  `;

  const startBtn = document.getElementById("startBtn");
  const videoContainer = document.getElementById("videoContainer");
  const iframe = document.getElementById("ytVideo");
  const downloadBtn = document.getElementById("downloadBtn");
  const timerDisplay = document.getElementById("timer");
  const startAudio = document.getElementById("startAudio");
  const endAudio = document.getElementById("endAudio");

  let watchTime = 180;
  let interval = null;
  let isTabActive = true;

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return \`\${min}:\${sec.toString().padStart(2, '0')}\`;
  }

  window.addEventListener("load", () => {
    startAudio.play().catch(() => {});
  });

  startBtn.onclick = () => {
    startBtn.style.display = "none";
    videoContainer.style.display = "block";
    iframe.src = \`https://www.youtube.com/embed/\${videoId}?autoplay=1\`;

    interval = setInterval(() => {
      if (isTabActive && watchTime > 0) {
        watchTime--;
        timerDisplay.textContent = formatTime(watchTime);
        if (watchTime === 0) {
          clearInterval(interval);
          downloadBtn.style.display = "inline-block";
          timerDisplay.textContent = "✅ مکمل!";
          endAudio.play();
          downloadBtn.onclick = () => window.open(downloadLink, "_blank");
        }
      }
    }, 1000);
  };

  document.addEventListener("visibilitychange", () => {
    isTabActive = !document.hidden;
  });
});
