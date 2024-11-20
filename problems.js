// Pobieranie listy zadań
async function fetchTasks() {
  try {
    const response = await fetch("http://localhost:8080/v1/taskId");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tasks = await response.json();

    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Wyczyść listę przed dodaniem nowych elementów

    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.textContent = `ID: ${task.taskId}, Funkcja: ${task.functionName}, Typ: ${task.returnType}`;
      taskList.appendChild(listItem);
    });
  } catch (error) {
    document.getElementById("task-list").textContent = `Błąd: ${error.message}`;
  }
}

// Wywołanie pobierania zadań przy załadowaniu strony
document.addEventListener("DOMContentLoaded", fetchTasks);

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
