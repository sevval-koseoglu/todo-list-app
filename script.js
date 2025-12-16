// Elements
const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// Data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add task
btn.onclick = () => {
  if (!input.value.trim()) return; // Empty check
  tasks.push({ text: input.value, done: false }); // Save task
  input.value = ""; // Clear input
  update(); // Refresh
};

// Render + save
function update() {
  list.innerHTML = ""; // Clear list
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Store

  tasks.forEach((task, i) => {
    const li = document.createElement("li"); // Item

    const span = document.createElement("span"); // Text
    span.textContent = task.text;
    span.title = task.text;
    if (task.done) span.className = "completed"; // Done style

    span.onclick = () => {
      task.done = !task.done; // Toggle
      update(); // Refresh
    };

    const edit = document.createElement("button"); // Edit
    edit.textContent = "Edit";
    edit.onclick = () => {
      const t = prompt("Edit task:", task.text); // Input
      if (t) {
        task.text = t; // Update text
        update(); // Refresh
      }
    };

    const del = document.createElement("button"); // Delete
    del.textContent = "Delete";
    del.onclick = () => {
      tasks.splice(i, 1); // Remove
      update(); // Refresh
    };

    const actions = document.createElement("div"); // Buttons
    actions.className = "actions";
    actions.append(edit, del);

    li.append(span, actions); // Build
    list.appendChild(li); // Show
  });
}

// Init
update();