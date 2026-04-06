(function() {
  // Sample curated translations — replace with a live feed later
  const SAMPLES = [
    { from: "hello world", to: "hola mundo", src: "EN", tgt: "ES" },
    { from: "good morning", to: "guten Morgen", src: "EN", tgt: "DE" },
    { from: "how are you?", to: "comment allez-vous ?", src: "EN", tgt: "FR" },
    { from: "thank you very much", to: "molto grazie", src: "EN", tgt: "IT" },
    { from: "bonjour le monde", to: "hello world", src: "FR", tgt: "EN" },
    { from: "yo tengo un gato", to: "I have a cat", src: "ES", tgt: "EN" },
    { from: "where is the station?", to: "onde fica a estação?", src: "EN", tgt: "PT" },
    { from: "おはようございます", to: "good morning", src: "JA", tgt: "EN" },
    { from: "nice to meet you", to: "приятно познакомиться", src: "EN", tgt: "RU" },
    { from: "i love this song", to: "사랑해 이 노래", src: "EN", tgt: "KO" },
    { from: "where is the bathroom?", to: "أين الحمام؟", src: "EN", tgt: "AR" },
    { from: "你好世界", to: "hello world", src: "ZH", tgt: "EN" },
  ];

  const LANG_COLORS = {
    EN:"#4a90d9", ES:"#e74c3c", FR:"#3498db", DE:"#f39c12",
    IT:"#27ae60", PT:"#e67e22", RU:"#9b59b6", JA:"#1abc9c",
    KO:"#34495e", AR:"#c0392b", ZH:"#2980b9",
  };

  const grid = document.getElementById("recentsGrid");
  if (!grid) return;

  // Shuffle and pick 6
  const picks = SAMPLES.sort(() => Math.random() - 0.5).slice(0, 6);

  grid.innerHTML = picks.map(s => {
    const srcColor = LANG_COLORS[s.src] || "#888";
    const tgtColor = LANG_COLORS[s.tgt] || "#888";
    return `
      <div class="recent-card">
        <div class="recent-lang">
          <span class="lang-badge" style="background:${srcColor}">${s.src}</span>
          <span class="lang-arrow">→</span>
          <span class="lang-badge" style="background:${tgtColor}">${s.tgt}</span>
        </div>
        <div class="recent-from">${esc(s.from)}</div>
        <div class="recent-to">${esc(s.to)}</div>
      </div>
    `;
  }).join("");

  function esc(s) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
})();
