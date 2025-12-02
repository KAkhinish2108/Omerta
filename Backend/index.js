// script.js
import { analyzeCode } from './analyzer.js';

// DOM references
const analyzeBtn = document.getElementById('analyzeBtn');
const uploadInput = document.getElementById('fileInput');
const codeInput = document.getElementById('codeInput');
const output = document.getElementById('output');

// --- Render Results
function renderResults(results) {
  output.innerHTML = "";

  if (!results || results.length === 0) {
    output.innerHTML = `<div class="issue">✔ No issues found</div>`;
    return;
  }

  results.forEach(r => {
    const el = document.createElement("div");
    el.className = "issue";

    el.innerHTML = `
      <strong>${r.rule}</strong>
      <span class="sev">[${r.severity}]</span>
      <div class="suggest">${r.suggestion || ""}</div>
      ${r.details ? `<small>Details: ${JSON.stringify(r.details)}</small>` : ""}
    `;

    output.appendChild(el);
  });
}

// --- Analyze Typed Code
analyzeBtn.addEventListener("click", () => {
  const code = codeInput.value.trim();
  if (code === "") {
    output.innerHTML = "<div class='issue'>⚠ Please enter some code to analyze.</div>";
    return;
  }
  const result = analyzeCode(code);
  renderResults(result);
});

// --- Analyze File
uploadInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const code = reader.result;
    const result = analyzeCode(code);
    renderResults(result);
  };

  reader.readAsText(file, "utf-8");
});

// 🔥 Infinite Typing Animation
const text = "CosaCode Analyzer";
let index = 0;
let isDeleting = false;
const speed = 120;

function typeEffect() {
  const el = document.getElementById("typewriter");

  if (!isDeleting) {
    el.textContent = text.substring(0, index++);
  } else {
    el.textContent = text.substring(0, index--);
  }

  if (index === text.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 800);
    return;
  }

  if (isDeleting && index === 0) {
    isDeleting = false;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();
