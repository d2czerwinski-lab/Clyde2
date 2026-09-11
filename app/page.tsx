```html
<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Clyde 2.0</title>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #171717;
  color: white;
  height: 100vh;
  overflow: hidden;
}

.app {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background: #202020;
  border-right: 1px solid #333;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

button {
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
}

.new-chat {
  background: #333;
  color: white;
  width: 100%;
  margin-bottom: 10px;
}

.new-chat:hover {
  background: #444;
}

.side-button {
  background: transparent;
  color: #ddd;
  text-align: left;
  margin-top: 5px;
}

.side-button:hover {
  background: #333;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.header {
  height: 60px;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
}

.header-title {
  font-weight: bold;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.header-actions button {
  background: #333;
  color: white;
}

.chat {
  flex: 1;
  overflow-y: auto;
  padding: 25px;
}

.message {
  max-width: 850px;
  margin: 0 auto 18px auto;
  padding: 14px 16px;
  border-radius: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.user {
  background: #2f2f2f;
}

.bot {
  background: #202020;
  border: 1px solid #333;
}

.input-area {
  border-top: 1px solid #333;
  padding: 15px;
}

.input-box {
  max-width: 900px;
  margin: auto;
  display: flex;
  gap: 8px;
}

#input {
  flex: 1;
  resize: none;
  min-height: 48px;
  max-height: 150px;
  background: #252525;
  color: white;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 13px;
  outline: none;
}

.send {
  background: #fff;
  color: #111;
  min-width: 75px;
}

.calculator {
  display: none;
  position: fixed;
  right: 20px;
  bottom: 90px;
  width: 300px;
  background: #222;
  border: 1px solid #444;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 10px 40px rgba(0,0,0,.5);
  z-index: 50;
}

.calculator.show {
  display: block;
}

.calc-display {
  width: 100%;
  height: 50px;
  background: #111;
  color: white;
  border: 1px solid #444;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 20px;
  text-align: right;
}

.calc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 7px;
}

.calc-grid button {
  background: #333;
  color: white;
}

.calc-grid button:hover {
  background: #444;
}

.preview {
  display: none;
  position: fixed;
  inset: 0;
  background: #111;
  z-index: 1000;
  flex-direction: column;
}

.preview.show {
  display: flex;
}

.preview-header {
  height: 55px;
  flex-shrink: 0;
  background: #202020;
  border-bottom: 1px solid #444;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.preview-title {
  font-weight: bold;
}

.close-preview {
  background: #d33;
  color: white;
  font-size: 18px;
  width: 42px;
  height: 38px;
  padding: 0;
}

.close-preview:hover {
  background: #f44;
}

#previewFrame {
  flex: 1;
  width: 100%;
  border: 0;
  background: white;
}

.empty {
  text-align: center;
  color: #888;
  margin-top: 80px;
}

@media (max-width: 700px) {
  .sidebar {
    display: none;
  }

  .chat {
    padding: 15px;
  }

  .calculator {
    left: 10px;
    right: 10px;
    width: auto;
  }
}
</style>
</head>

<body>

<div class="app">

  <aside class="sidebar">
    <div class="logo">Clyde 2.0</div>

    <button class="new-chat" onclick="newChat()">
      + Nowy czat
    </button>

    <button class="side-button" onclick="toggleCalculator()">
      🧮 Kalkulator
    </button>

    <button class="side-button" onclick="toggleTheme()">
      🌙 Zmień motyw
    </button>

    <button class="side-button" onclick="openPreview()">
      🌐 Podgląd HTML
    </button>
  </aside>

  <main class="main">

    <header class="header">
      <div class="header-title">Clyde 2.0</div>

      <div class="header-actions">
        <button onclick="toggleCalculator()">🧮</button>
        <button onclick="openPreview()">HTML</button>
      </div>
    </header>

    <section class="chat" id="chat">
      <div class="empty" id="empty">
        <h2>Witaj w Clyde 2.0 👋</h2>
        <p>Napisz wiadomość albo użyj kalkulatora.</p>
      </div>
    </section>

    <div class="input-area">
      <div class="input-box">

        <textarea
          id="input"
          placeholder="Napisz wiadomość..."
          onkeydown="handleKey(event)"
        ></textarea>

        <button class="send" onclick="sendMessage()">
          Wyślij
        </button>

      </div>
    </div>

  </main>
</div>

<!-- KALKULATOR -->

<div class="calculator" id="calculator">

  <input
    id="calcDisplay"
    class="calc-display"
    type="text"
    readonly
  >

  <div class="calc-grid">

    <button onclick="calcClear()">C</button>
    <button onclick="calcAdd('(')">(</button>
    <button onclick="calcAdd(')')">)</button>
    <button onclick="calcAdd('/')">÷</button>

    <button onclick="calcAdd('7')">7</button>
    <button onclick="calcAdd('8')">8</button>
    <button onclick="calcAdd('9')">9</button>
    <button onclick="calcAdd('*')">×</button>

    <button onclick="calcAdd('4')">4</button>
    <button onclick="calcAdd('5')">5</button>
    <button onclick="calcAdd('6')">6</button>
    <button onclick="calcAdd('-')">−</button>

    <button onclick="calcAdd('1')">1</button>
    <button onclick="calcAdd('2')">2</button>
    <button onclick="calcAdd('3')">3</button>
    <button onclick="calcAdd('+')">+</button>

    <button onclick="calcAdd('0')">0</button>
    <button onclick="calcAdd('.')">.</button>
    <button onclick="calcAdd('%')">%</button>
    <button onclick="calculate()">=</button>

  </div>
</div>

<!-- PODGLĄD HTML -->

<div class="preview" id="preview">

  <div class="preview-header">

    <div class="preview-title">
      Podgląd HTML
    </div>

    <button
      class="close-preview"
      id="closePreviewButton"
      onclick="closePreview()"
      title="Zamknij podgląd"
    >
      ✕
    </button>

  </div>

  <iframe
    id="previewFrame"
    title="Podgląd HTML"
  ></iframe>

</div>

<script>

let messages = [];

function addMessage(text, type) {

  const empty = document.getElementById("empty");

  if (empty) {
    empty.remove();
  }

  const chat = document.getElementById("chat");

  const message = document.createElement("div");

  message.className = "message " + type;

  message.textContent = text;

  chat.appendChild(message);

  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {

  const input = document.getElementById("input");

  const text = input.value.trim();

  if (!text) {
    return;
  }

  addMessage(text, "user");

  input.value = "";

  setTimeout(() => {

    const response = generateResponse(text);

    addMessage(response, "bot");

  }, 300);
}

function handleKey(event) {

  if (event.key === "Enter" && !event.shiftKey) {

    event.preventDefault();

    sendMessage();
  }
}

function generateResponse(text) {

  const lower = text.toLowerCase();

  if (
    lower.includes("cześć") ||
    lower.includes("hej") ||
    lower.includes("witaj")
  ) {
    return "Cześć! 👋 Jestem Clyde 2.0. W czym mogę Ci pomóc?";
  }

  if (lower.includes("kim jesteś")) {
    return "Jestem Clyde 2.0 — prostym asystentem działającym lokalnie na Twoim komputerze.";
  }

  if (
    lower.includes("html") ||
    lower.includes("stronę")
  ) {
    return "Mogę pomóc Ci przygotować HTML, CSS i JavaScript. Użyj przycisku „Podgląd HTML”, aby zobaczyć stronę.";
  }

  if (lower.includes("kalkulator")) {
    return "Otwórz 🧮 Kalkulator z menu po lewej stronie.";
  }

  return "Rozumiem. To jest lokalna wersja demonstracyjna Clyde 2.0. Mogę obsługiwać podstawowe polecenia, kalkulator oraz podgląd HTML.";
}

function newChat() {

  messages = [];

  const chat = document.getElementById("chat");

  chat.innerHTML = `
    <div class="empty" id="empty">
      <h2>Nowy czat 👋</h2>
      <p>Napisz wiadomość, aby rozpocząć.</p>
    </div>
  `;
}

function toggleCalculator() {

  const calculator =
    document.getElementById("calculator");

  calculator.classList.toggle("show");
}

function calcAdd(value) {

  const display =
    document.getElementById("calcDisplay");

  display.value += value;
}

function calcClear() {

  document.getElementById("calcDisplay").value = "";
}

function calculate() {

  const display =
    document.getElementById("calcDisplay");

  try {

    let expression = display.value;

    if (!expression) {
      return;
    }

    expression = expression.replace(/%/g, "/100");

    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      throw new Error("Nieprawidłowe wyrażenie");
    }

    const result = Function(
      '"use strict"; return (' + expression + ')'
    )();

    if (!Number.isFinite(result)) {
      throw new Error("Błąd");
    }

    display.value = result;

  } catch (error) {

    display.value = "Błąd";
  }
}

/* =========================
   PODGLĄD HTML
========================= */

function openPreview() {

  const preview =
    document.getElementById("preview");

  const frame =
    document.getElementById("previewFrame");

  const html = `
<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<title>Clyde HTML Preview</title>

<style>
body {
  font-family: Arial, sans-serif;
  padding: 40px;
  background: #f5f5f5;
}

h1 {
  color: #222;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,.15);
}

button {
  padding: 10px 15px;
  border: 0;
  border-radius: 8px;
  background: #222;
  color: white;
}
</style>

</head>

<body>

<div class="card">

<h1>Clyde 2.0 — Podgląd HTML</h1>

<p>
To jest przykładowy podgląd strony HTML.
</p>

<button onclick="alert('Działa!')">
Kliknij mnie
</button>

</div>

</body>
</html>
`;

  frame.srcdoc = html;

  preview.classList.add("show");
}

function closePreview() {

  const preview =
    document.getElementById("preview");

  const frame =
    document.getElementById("previewFrame");

  preview.classList.remove("show");

  frame.srcdoc = "";
}

/* ESC również zamyka podgląd */

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closePreview();
  }

});

/* =========================
   MOTYW
========================= */

let lightMode = false;

function toggleTheme() {

  lightMode = !lightMode;

  if (lightMode) {

    document.body.style.background = "#f5f5f5";
    document.body.style.color = "#111";

  } else {

    document.body.style.background = "#171717";
    document.body.style.color = "white";
  }
}

</script>

</body>
</html>
```
