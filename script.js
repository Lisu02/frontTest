// Inicjalizacja CodeMirror
const editor = CodeMirror(document.getElementById("editor"), {
  mode: "text/x-csrc",
  theme: "default",
  lineNumbers: true,
  value:
    '// Wpisz tutaj swój kod C\n#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
});

// Zmiana trybu CodeMirror na podstawie wybranego języka
document
  .getElementById("language-select")
  .addEventListener("change", (event) => {
    const language = event.target.value;
    let mode = "text/x-csrc";

    if (language === "python3") {
      mode = "text/x-python";
      editor.setValue("# Wpisz tutaj swój kod Python3\nprint('Hello, World!')");
    } else if (language === "c") {
      mode = "text/x-csrc";
      editor.setValue(
        '// Wpisz tutaj swój kod C\n#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
      );
    }

    editor.setOption("mode", mode);
  });

// Obsługa przycisku "Uruchom Kod"
const runButton = document.getElementById('run-button');
const loader = document.getElementById('loader');

runButton.addEventListener('click', async () => {
  // Zablokuj przycisk i pokaż loader
  runButton.disabled = true;
  loader.style.display = 'inline-block';

  try {
    // Pobierz kod z edytora
    const code = editor.getValue(); // Assuming you have a CodeMirror instance named `editor`
    const language = document.getElementById('language-select').value;

    // Wyślij kod do backendu
    const response = await fetch('http://localhost:8080/playgroundCompile/v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ programmingLanguage: language, code })
    });

    if (response.ok) {
      const result = await response.text();
      document.getElementById('output').innerText = result;
    } else {
      console.error('Compilation failed:', response.statusText);
      document.getElementById('output').innerText = 'Compilation failed.';
    }
  } catch (error) {
    console.error('Error during compilation:', error);
    document.getElementById('output').innerText = 'Error during compilation.';
  } finally {
    // Odblokuj przycisk i ukryj loader
    runButton.disabled = false;
    loader.style.display = 'none';
  }
});


const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;

themeToggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    themeToggleButton.textContent = "☀️ Light Mode";
  } else {
    themeToggleButton.textContent = "🌙 Dark Mode";
  }
});



