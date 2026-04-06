(function() {
  if (document.getElementById("demoWidget")) return;

  const LANGS = [
    { code:"auto", label:"Auto-detect" }, { code:"EN", label:"English" },
    { code:"ES", label:"Spanish" }, { code:"FR", label:"French" },
    { code:"DE", label:"German" }, { code:"IT", label:"Italian" },
    { code:"PT", label:"Portuguese" }, { code:"RU", label:"Russian" },
    { code:"JA", label:"Japanese" }, { code:"ZH", label:"Chinese" },
    { code:"KO", label:"Korean" }, { code:"AR", label:"Arabic" },
  ];

  const widget = document.createElement("div");
  widget.id = "demoWidget";
  widget.innerHTML = `
    <div id="demoCard">
      <div id="demoHeader">
        <span>⚡ Live Demo</span>
        <span id="demoTag">Web Preview</span>
      </div>
      <div id="demoBody">
        <div id="demoLangRow">
          <select id="demoSrc"></select>
          <span>→</span>
          <select id="demoTgt"></select>
        </div>
        <textarea id="demoInput" placeholder="Type something to translate…" rows="3"></textarea>
        <button id="demoBtn">Translate</button>
        <div id="demoOutput">
          <div id="demoResult"></div>
          <div id="demoProvider"></div>
        </div>
        <p id="demoNote">This is a simplified web preview. The full extension works on any page with one click.</p>
      </div>
    </div>
  `;

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    #demoCard {
      max-width: 440px; margin: 40px auto 0;
      border: 1px solid #e5e7eb; border-radius: 12px;
      overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);
      background: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #demoHeader {
      background: #4a90d9; color: #fff; padding: 10px 16px;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 14px; font-weight: 700;
    }
    #demoTag {
      font-size: 10px; background: rgba(255,255,255,0.25);
      padding: 2px 8px; border-radius: 10px; font-weight: 500;
    }
    #demoBody { padding: 16px; }
    #demoLangRow { display: flex; gap: 8px; align-items: center; margin-bottom: 12px; }
    #demoLangRow select {
      flex: 1; padding: 6px 8px; border: 1px solid #d1d5db;
      border-radius: 6px; font-size: 13px; background: #fff;
    }
    #demoLangRow span { color: #9ca3af; font-size: 16px; }
    #demoInput {
      width: 100%; padding: 10px; border: 1px solid #d1d5db;
      border-radius: 8px; font-size: 14px; resize: vertical;
      font-family: inherit; line-height: 1.5; box-sizing: border-box;
    }
    #demoInput:focus { outline: none; border-color: #4a90d9; box-shadow: 0 0 0 2px rgba(74,144,217,0.15); }
    #demoBtn {
      width: 100%; margin-top: 10px; padding: 10px;
      background: #4a90d9; color: #fff; border: none;
      border-radius: 8px; font-size: 14px; font-weight: 600;
      cursor: pointer; transition: background .2s;
    }
    #demoBtn:hover { background: #357abd; }
    #demoBtn:disabled { background: #9ca3af; cursor: not-allowed; }
    #demoOutput {
      margin-top: 12px; min-height: 36px;
      background: #f9fafb; border: 1px solid #e5e7eb;
      border-radius: 8px; padding: 10px; font-size: 14px;
      color: #1f2937; line-height: 1.5;
      display: flex; align-items: flex-start;
    }
    #demoResult { flex: 1; }
    #demoProvider { font-size: 10px; color: #9ca3af; margin-top: 4px; }
    #demoNote { font-size: 11px; color: #9ca3af; margin-top: 12px; text-align: center; }
    #demoOutput.loading { color: #9ca3af; }
    #demoOutput.error { color: #dc2626; }
  `;
  document.head.appendChild(style);

  // Populate selects
  const srcSel = widget.querySelector("#demoSrc");
  const tgtSel = widget.querySelector("#demoTgt");
  LANGS.forEach(l => {
    srcSel.innerHTML += `<option value="${l.code}" ${l.code==="auto"?"selected":""}>${l.label}</option>`;
  });
  LANGS.filter(l => l.code !== "auto").forEach(l => {
    tgtSel.innerHTML += `<option value="${l.code}" ${l.code==="ES"?"selected":""}>${l.label}</option>`;
  });

  // Translate
  const input  = widget.querySelector("#demoInput");
  const btn    = widget.querySelector("#demoBtn");
  const output = widget.querySelector("#demoOutput");
  const result = widget.querySelector("#demoResult");
  const prov   = widget.querySelector("#demoProvider");

  async function translate() {
    const text = input.value.trim();
    if (!text) return;

    btn.disabled = true;
    btn.textContent = "Translating…";
    output.className = "loading";
    result.textContent = "…";
    prov.textContent = "";

    const src = srcSel.value === "auto" ? "autodetect" : srcSel.value.toLowerCase();
    const tgt = tgtSel.value.toLowerCase();

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${src}|${tgt}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.responseData?.translatedText) throw new Error("No response");

      const translated = data.responseData.translatedText;
      result.textContent = translated;
      output.className = "";
      prov.textContent = "Powered by MyMemory (free tier)";
    } catch(e) {
      output.className = "error";
      result.textContent = "Translation failed — try again or check your connection.";
      prov.textContent = "";
    }

    btn.disabled = false;
    btn.textContent = "Translate";
  }

  btn.addEventListener("click", translate);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); translate(); }
  });

  // Auto-insert into page
  const target = document.getElementById("demoContainer") || document.querySelector(".hero");
  if (target) target.appendChild(widget);
  else document.body.appendChild(widget);
})();
